"use client";

export type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

function cleanParams(params: AnalyticsParams) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== "")
  ) as Record<string, string | number | boolean>;
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined" || !process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(["event", eventName, cleanParams(params)]);
}

export function trackLead(sourcePage: string, productInterest?: string, formType = "inquiry_form") {
  trackEvent("generate_lead", {
    source_page: sourcePage,
    product_interest: productInterest,
    form_type: formType
  });
}

export function trackContactClick(method: string, location?: string) {
  trackEvent("contact_click", {
    method,
    location
  });
}

export function trackQuoteClick(location?: string) {
  trackEvent("quote_click", {
    location
  });
}
