import Link from "next/link";
import { EnvelopeSimple, WhatsappLogo, ClipboardText } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/content/site";

export function StickyInquiryBar() {
  return (
    <>
      <div className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 overflow-hidden rounded-[4px] border border-white/10 bg-[var(--charcoal)]/95 text-white shadow-sm lg:block">
        <a
          aria-label="WhatsApp"
          href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
          className="flex h-12 w-12 items-center justify-center border-b border-white/10 transition hover:bg-[var(--olive)]"
        >
          <WhatsappLogo size={22} />
        </a>
        <a
          aria-label="Email"
          href={`mailto:${site.email}`}
          className="flex h-12 w-12 items-center justify-center border-b border-white/10 transition hover:bg-[var(--olive)]"
        >
          <EnvelopeSimple size={22} />
        </a>
        <Link
          aria-label="Request Quote"
          href="/contact"
          className="flex h-12 w-12 items-center justify-center transition hover:bg-[var(--olive)]"
        >
          <ClipboardText size={22} />
        </Link>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-white/10 bg-[var(--charcoal)] text-white lg:hidden">
        <a href={`mailto:${site.email}`} className="py-3 text-center text-xs font-bold uppercase tracking-[0.08em]">
          Contact
        </a>
        <Link
          href="/contact"
          className="bg-[var(--olive)] py-3 text-center text-xs font-bold uppercase tracking-[0.08em]"
        >
          Request Quote
        </Link>
      </div>
    </>
  );
}
