import { Resend } from "resend";
import fs from "fs";
import path from "path";

const getEmailTemplate = (templateName: string) => {
  const templatePath = path.join(
    process.cwd(),
    "lib/learn/emails",
    `${templateName}.html`
  );
  return fs.readFileSync(templatePath, "utf8");
};

const replaceTemplateVariables = (
  template: string,
  variables: Record<string, string>
) => {
  return Object.entries(variables).reduce((html, [key, value]) => {
    return html.replace(new RegExp(`{{${key}}}`, "g"), value);
  }, template);
};

export const sendPaymentSuccessEmail = async (email: string) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const template = getEmailTemplate("payment-success");
    const html = replaceTemplateVariables(template, {
      email,
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.lingu.africa",
    });

    await resend.emails.send({
      from: "Lionel at Lingu.Africa <lionel@resend.lingu.africa>",
      replyTo: "lionel@lingu.africa",
      to: email,
      subject: "Thank you for your purchase!",
      html,
    });
  } catch (error) {
    console.error("Error sending payment success email:", error);
  }
};
