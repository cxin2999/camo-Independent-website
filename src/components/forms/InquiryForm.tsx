"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { trackLead } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type InquiryFormProps = {
  compact?: boolean;
  sourcePage: string;
  title?: string;
};

type FormState = "idle" | "loading" | "success" | "error";

const productOptions = [
  "Camo Loop Fabric Rolls",
  "Adhesive Backed Camo Loop Fabric",
  "Laminated Camo Hook and Loop Fabric",
  "Custom Camouflage Loop Fabric"
];

export function InquiryForm({ compact, sourcePage, title }: InquiryFormProps) {
  const startedAtRef = useRef<number | null>(null);
  const isSubmittingRef = useRef(false);
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmittingRef.current) return;

    const form = event.currentTarget;
    isSubmittingRef.current = true;
    setState("loading");
    setMessage("");
    setErrors({});

    try {
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          sourcePage,
          startedAt: startedAtRef.current
        })
      });

      const data = await response.json();
      if (!response.ok) {
        setState("error");
        setMessage(data.message || "Please check your information and try again.");
        setErrors(data.errors || {});
        return;
      }

      setState("success");
      setMessage(data.message);
      trackLead(
        sourcePage,
        typeof payload.productInterest === "string" ? payload.productInterest : undefined,
        compact ? "compact_inquiry_form" : "inquiry_form"
      );
      form.reset();
      startedAtRef.current = Date.now();
    } catch {
      setState("error");
      setMessage("We could not send your inquiry. Please try again.");
    } finally {
      isSubmittingRef.current = false;
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
      {title ? <h3 className="mb-5 text-xl font-semibold tracking-[-0.02em]">{title}</h3> : null}
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className={cn("grid gap-4", compact ? "grid-cols-1" : "md:grid-cols-2")}>
        {!compact ? <Field name="name" label="Name" error={errors.name?.[0]} required /> : null}
        {!compact ? <Field name="company" label="Company" error={errors.company?.[0]} /> : null}
        <Field name="email" label="Email" type="email" error={errors.email?.[0]} required />
        {!compact ? <Field name="country" label="Country" error={errors.country?.[0]} /> : null}
        {!compact ? <Field name="whatsapp" label="WhatsApp" error={errors.whatsapp?.[0]} /> : null}
        <div className="grid gap-2">
          <label className="text-sm font-semibold" htmlFor="productInterest">
            Product Interest
          </label>
          <select
            id="productInterest"
            name="productInterest"
            required
            className="focus-ring h-11 rounded-[4px] border border-[var(--border)] bg-white px-3 text-sm"
          >
            <option value="">Select product</option>
            {productOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          {errors.productInterest?.[0] ? <p className="text-sm text-red-700">{errors.productInterest[0]}</p> : null}
        </div>
        {!compact ? <Field name="patternColor" label="Required Pattern / Color" error={errors.patternColor?.[0]} /> : null}
        {!compact ? <Field name="widthThickness" label="Width / Thickness" error={errors.widthThickness?.[0]} /> : null}
        <Field name="quantity" label="Quantity" error={errors.quantity?.[0]} required />
        {!compact ? <Field name="backingType" label="Backing Type" error={errors.backingType?.[0]} /> : null}
        <div className={cn("grid gap-2", compact ? "" : "md:col-span-2")}>
          <label className="text-sm font-semibold" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={compact ? 4 : 5}
            required
            placeholder="Tell us the pattern, backing, width, quantity, and application."
            className="focus-ring resize-none rounded-[4px] border border-[var(--border)] bg-white px-3 py-3 text-sm"
          />
          {errors.message?.[0] ? <p className="text-sm text-red-700">{errors.message[0]}</p> : null}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" className="w-full sm:w-auto" disabled={state === "loading"}>
          {state === "loading" ? "Sending" : compact ? "Get Material Quote" : "Send Inquiry"}
        </Button>
        <p className="text-sm text-[var(--muted)]">Reference images can be sent by email after first contact.</p>
      </div>

      {message ? (
        <div
          className={cn(
            "mt-4 border px-4 py-3 text-sm",
            state === "success"
              ? "border-[var(--olive)] bg-[#eef7df] text-[var(--olive-dark)]"
              : "border-red-200 bg-red-50 text-red-800"
          )}
        >
          {message}
        </div>
      ) : null}
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  error,
  required
}: {
  name: string;
  label: string;
  type?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-semibold" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="focus-ring h-11 rounded-[4px] border border-[var(--border)] bg-white px-3 text-sm"
      />
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
    </div>
  );
}
