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

    const to = "tyagivansh372@gmail.com";
    const subject = `New portfolio message from ${name}`;
    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial; line-height: 1.6;">
        <h2 style="margin: 0 0 12px;">New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <div style="white-space: pre-wrap; background: #f6f6f6; padding: 12px; border-radius: 8px; border: 1px solid #eee;">
          ${escapeHtml(message)}
        </div>
        <hr style="margin: 16px 0; border: none; border-top: 1px solid #eee;" />
        <p style="font-size: 12px; color: #666;">Sent from Vansh's Portfolio</p>
      </div>
    `;

    const payload = {
      from: "Vansh Portfolio <onboarding@resend.dev>",
      to,
      subject,
      reply_to: email,
      html,
    };

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(
        `Failed to send email (status ${res.status}). ${text || "Please verify your Resend API key and domain/sender."}`
      );
    }

    return { ok: true };
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