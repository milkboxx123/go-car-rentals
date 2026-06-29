import { ServerClient } from "postmark";

import { siteConfig } from "@/lib/site-config";

function getPostmarkClient() {
  const apiKey = process.env.POSTMARK_API_KEY;
  if (!apiKey) {
    throw new Error("POSTMARK_API_KEY is not configured");
  }
  return new ServerClient(apiKey);
}

function getFromEmail() {
  return process.env.POSTMARK_FROM_EMAIL ?? siteConfig.supportEmail;
}

function getSiteUrl() {
  return siteConfig.baseUrl.replace(/\/$/, "");
}

export async function sendVerificationEmail(email: string, token: string) {
  const client = getPostmarkClient();
  const verifyUrl = `${getSiteUrl()}/verify-email?token=${token}`;

  await client.sendEmail({
    From: getFromEmail(),
    To: email,
    Subject: "Confirm your Go Rentals account",
    TextBody: `Welcome to Go Rentals!\n\nPlease confirm your email address by visiting:\n${verifyUrl}\n\nThis link expires in 24 hours.`,
    HtmlBody: `<p>Welcome to Go Rentals!</p><p>Please confirm your email address by clicking the link below:</p><p><a href="${verifyUrl}">Confirm email</a></p><p>This link expires in 24 hours.</p>`,
    MessageStream: "outbound",
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const client = getPostmarkClient();
  const resetUrl = `${getSiteUrl()}/reset-password?token=${token}`;

  await client.sendEmail({
    From: getFromEmail(),
    To: email,
    Subject: "Reset your Go Rentals password",
    TextBody: `We received a request to reset your password.\n\nReset your password here:\n${resetUrl}\n\nThis link expires in 1 hour. If you did not request this, you can ignore this email.`,
    HtmlBody: `<p>We received a request to reset your password.</p><p><a href="${resetUrl}">Reset your password</a></p><p>This link expires in 1 hour. If you did not request this, you can ignore this email.</p>`,
    MessageStream: "outbound",
  });
}

export async function sendWelcomeEmail(email: string, firstName: string) {
  const client = getPostmarkClient();

  await client.sendEmail({
    From: getFromEmail(),
    To: email,
    Subject: "Welcome to Go Rentals",
    TextBody: `Hi ${firstName},\n\nYour email is confirmed. You're all set to book your next rental with Go Rentals.`,
    HtmlBody: `<p>Hi ${firstName},</p><p>Your email is confirmed. You're all set to book your next rental with Go Rentals.</p>`,
    MessageStream: "outbound",
  });
}

export interface ContactEmailPayload {
  name: string;
  email: string;
  phone?: string;
  topicLabel: string;
  message: string;
}

export async function sendContactEmail(payload: ContactEmailPayload) {
  const client = getPostmarkClient();
  const { name, email, phone, topicLabel, message } = payload;
  const phoneLine = phone?.trim() ? `Phone: ${phone.trim()}\n` : "";

  const textBody = [
    "New contact form submission",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    phoneLine,
    `Topic: ${topicLabel}`,
    "",
    "Message:",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const htmlBody = [
    "<p><strong>New contact form submission</strong></p>",
    "<ul>",
    `<li><strong>Name:</strong> ${escapeHtml(name)}</li>`,
    `<li><strong>Email:</strong> ${escapeHtml(email)}</li>`,
    phone?.trim()
      ? `<li><strong>Phone:</strong> ${escapeHtml(phone.trim())}</li>`
      : "",
    `<li><strong>Topic:</strong> ${escapeHtml(topicLabel)}</li>`,
    "</ul>",
    `<p><strong>Message:</strong></p>`,
    `<p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`,
  ]
    .filter(Boolean)
    .join("");

  await client.sendEmail({
    From: getFromEmail(),
    To: siteConfig.supportEmail,
    ReplyTo: email,
    Subject: `[Contact] ${topicLabel} — ${name}`,
    TextBody: textBody,
    HtmlBody: htmlBody,
    MessageStream: "outbound",
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
