"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import type { AnalyticsParams } from "@/lib/analytics";
import { trackEvent } from "@/lib/analytics";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  href: string;
  trackingEvent?: string;
  trackingParams?: AnalyticsParams;
};

function isInternalHref(href: string) {
  return href.startsWith("/") || href.startsWith("#");
}

export function TrackedLink({
  children,
  href,
  trackingEvent,
  trackingParams,
  onClick,
  ...props
}: TrackedLinkProps) {
  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (trackingEvent) {
      trackEvent(trackingEvent, trackingParams);
    }
    onClick?.(event);
  }

  if (isInternalHref(href)) {
    return (
      <Link href={href} onClick={handleClick} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
