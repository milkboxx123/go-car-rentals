import { jsonError, jsonOk } from "@/lib/api-utils";
import { sendContactEmail } from "@/lib/email";
import {
  contactSchema,
  contactTopicLabels,
} from "@/lib/schemas/contact";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(parsed.error.errors[0]?.message ?? "Invalid input");
    }

    const { name, email, phone, topic, message } = parsed.data;

    try {
      await sendContactEmail({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone?.trim() || undefined,
        topicLabel: contactTopicLabels[topic],
        message: message.trim(),
      });
    } catch (emailError) {
      console.error("Contact email error:", emailError);
      const messageText =
        emailError instanceof Error &&
        emailError.message === "POSTMARK_API_KEY is not configured"
          ? "Contact form is temporarily unavailable. Please email us directly."
          : "Unable to send your message. Please try again or email us directly.";
      return jsonError(messageText, 503);
    }

    return jsonOk(
      { message: "Thanks for reaching out. We will get back to you soon." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return jsonError("Unable to send your message", 500);
  }
}
