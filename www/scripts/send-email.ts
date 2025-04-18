import { config } from "dotenv";
import { resolve } from "path";
import { sendPaymentSuccessEmail } from "../lib/learn/emails";

// Load environment variables from .env.local
config({ path: resolve(__dirname, "../.env.local") });

if (!process.env.RESEND_API_KEY) {
  console.error("Error: RESEND_API_KEY is not set in .env.local");
  process.exit(1);
}

const email = process.argv[2];

if (!email) {
  console.error("Please provide an email address");
  process.exit(1);
}

console.log(`Sending payment success email to ${email}...`);

sendPaymentSuccessEmail(email)
  .then(() => {
    console.log("Email sent successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error sending email:", error);
    process.exit(1);
  });
