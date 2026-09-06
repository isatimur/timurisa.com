"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
export function CookieConsent() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      setShow(!localStorage.getItem("cookieConsent"));
    } catch {
      setShow(true);
    }
  }, []);
  const dismiss = () => {
    try {
      localStorage.setItem("cookieConsent", "true");
    } catch {}
    setShow(false);
  };
  if (!show) return null;
  return (
    <div className="cookie-notice">
      <p>
        This site uses cookies to understand how it’s used. Read the{" "}
        <Link href="/privacy-policy">privacy policy</Link> for details.
      </p>
      <div>
        <button onClick={dismiss}>Got it</button>
        <button
          className="cookie-dismiss"
          aria-label="Dismiss cookie notice"
          onClick={dismiss}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
