"use client";

import { useEffect } from "react";
import { EMAIL_CONFIG } from "@/config/email-config";

export function EmailConfigTest() {
  useEffect(() => {
    console.log("EmailJS Configuration Test:");
    console.log("Public Key:", EMAIL_CONFIG.PUBLIC_KEY?.slice(0, 8) + "...");
    console.log("Service ID:", EMAIL_CONFIG.SERVICE_ID);
    console.log("Template ID:", EMAIL_CONFIG.TEMPLATE_ID);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-white/10 backdrop-blur-lg rounded-lg text-sm">
      <h3 className="font-semibold mb-2">EmailJS Config Test</h3>
      <div className="space-y-1 text-xs">
        <p>Public Key: {EMAIL_CONFIG.PUBLIC_KEY ? "✅" : "❌"}</p>
        <p>Service ID: {EMAIL_CONFIG.SERVICE_ID ? "✅" : "❌"}</p>
        <p>Template ID: {EMAIL_CONFIG.TEMPLATE_ID ? "✅" : "❌"}</p>
      </div>
    </div>
  );
}
