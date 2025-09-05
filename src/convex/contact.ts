"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";

export const sendContactEmail = action({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
  },
  handler: async (ctx, { name, email, message }) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error(
        "Email service not configured. Please set RESEND_API_KEY in the Integrations panel."
      );
    }

    // Add: Basic input normalization and validation
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2 || trimmedName.length > 100) {
      throw new Error("Please provide a valid name (2–100 characters).");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    if (!emailRegex.test(trimmedEmail) || /[\r\n]/.test(trimmedEmail)) {
      // prevent header injection via CRLF
      throw new Error("Please provide a valid email address.");
    }
    if (trimmedMessage.length < 10 || trimmedMessage.length > 5000) {
      throw new Error("Please provide a message between 10 and 5000 characters.");
    }

    const to = "tyagivansh372@gmail.com";
    const subject = `New portfolio message from ${trimmedName}`;
    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial; line-height: 1.6;">
        <h2 style="margin: 0 0 12px;">New Contact Message</h2>
        <p><strong>Name:</strong> ${escapeHtml(trimmedName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(trimmedEmail)}</p>
        <p><strong>Message:</strong></p>
        <div style="white-space: pre-wrap; background: #f6f6f6; padding: 12px; border-radius: 8px; border: 1px solid #eee;">
          ${escapeHtml(trimmedMessage)}
        </div>
        <hr style="margin: 16px 0; border: none; border-top: 1px solid #eee;" />
        <p style="font-size: 12px; color: #666;">Sent from Vansh's Portfolio</p>
      </div>
    `;

    const payload = {
      from: "Vansh Portfolio <onboarding@resend.dev>",
      to,
      subject,
      reply_to: trimmedEmail,
      html,
    };

    // Add: Timeout + robust error handling around fetch
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) {
        // Try to parse structured error from Resend
        let detail = "";
        try {
          const data = await res.json();
          // Resend error format typically: { error: { message: string } }
          detail =
            (data && (data.error?.message || data.message || JSON.stringify(data))) ||
            "";
        } catch {
          // Fallback to raw text if JSON not available
          detail = (await res.text().catch(() => "")) || "";
        }
        const hint =
          "Please verify your Resend API key and that your sender domain/address is verified.";
        throw new Error(
          `Failed to send email (status ${res.status}). ${detail || hint}`
        );
      }

      return { ok: true };
    } catch (err) {
      clearTimeout(timeout);
      if ((err as Error).name === "AbortError") {
        throw new Error("Email service timed out. Please try again in a moment.");
      }
      // Normalize unexpected errors
      const msg =
        err instanceof Error
          ? err.message
          : "Unexpected error occurred while sending email.";
      throw new Error(msg);
    }
  },
});

// Simple HTML escaping for safety
function escapeHtml(input: string) {
  // Use regex-based replacements for compatibility with older TS/JS targets
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}