import { EnvelopeSimple, WhatsappLogo, ClipboardText } from "@phosphor-icons/react/dist/ssr";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { site } from "@/content/site";

export function StickyInquiryBar() {
  return (
    <>
      <div className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 overflow-hidden rounded-[4px] border border-white/10 bg-[var(--charcoal)]/95 text-white shadow-sm lg:block">
        <TrackedLink
          aria-label="WhatsApp"
          href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          trackingEvent="contact_click"
          trackingParams={{ method: "whatsapp", location: "sticky_desktop" }}
          className="flex h-12 w-12 items-center justify-center border-b border-white/10 transition hover:bg-[var(--olive)]"
        >
          <WhatsappLogo size={22} />
        </TrackedLink>
        <TrackedLink
          aria-label="Email"
          href={`mailto:${site.email}`}
          trackingEvent="contact_click"
          trackingParams={{ method: "email", location: "sticky_desktop" }}
          className="flex h-12 w-12 items-center justify-center border-b border-white/10 transition hover:bg-[var(--olive)]"
        >
          <EnvelopeSimple size={22} />
        </TrackedLink>
        <TrackedLink
          aria-label="Request Quote"
          href="/contact"
          trackingEvent="quote_click"
          trackingParams={{ location: "sticky_desktop" }}
          className="flex h-12 w-12 items-center justify-center transition hover:bg-[var(--olive)]"
        >
          <ClipboardText size={22} />
        </TrackedLink>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-white/10 bg-[var(--charcoal)] text-white lg:hidden">
        <TrackedLink
          href={`mailto:${site.email}`}
          trackingEvent="contact_click"
          trackingParams={{ method: "email", location: "sticky_mobile" }}
          className="py-3 text-center text-xs font-bold uppercase tracking-[0.08em]"
        >
          Contact
        </TrackedLink>
        <TrackedLink
          href="/contact"
          trackingEvent="quote_click"
          trackingParams={{ location: "sticky_mobile" }}
          className="bg-[var(--olive)] py-3 text-center text-xs font-bold uppercase tracking-[0.08em]"
        >
          Request Quote
        </TrackedLink>
      </div>
    </>
  );
}
