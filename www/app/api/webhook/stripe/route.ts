import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "@/lib/supabase";
import { sendPaymentSuccessEmail } from "@/lib/learn/emails";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export async function POST(req: Request) {
  console.log("Webhook received");

  try {
    const body = await req.text();
    console.log("Request body received");

    const headersList = await headers();
    const sig = headersList.get("stripe-signature");

    if (!sig) {
      console.error("No stripe signature found");
      return NextResponse.json(
        { error: "No stripe signature" },
        { status: 400 }
      );
    }

    console.log("Constructing Stripe event");
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
      console.log("Event constructed successfully:", event.type);
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }

    // Handle the event
    if (event.type === "checkout.session.completed") {
      console.log("Processing checkout.session.completed");
      const session = event.data.object as Stripe.Checkout.Session;
      const customerEmail = session.customer_details?.email;

      console.log("Customer email:", customerEmail);

      if (!customerEmail) {
        console.error("No customer email found in session:", session.id);
        return NextResponse.json(
          { error: "No customer email found" },
          { status: 400 }
        );
      }

      // Update or create user in Supabase
      console.log("Updating Supabase");
      const { error } = await supabase.from("paid_users").upsert({
        email: customerEmail,
      });

      if (error) {
        console.error("Error updating paid user:", error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
      }

      // Send thank you email
      await sendPaymentSuccessEmail(customerEmail);

      console.log("Successfully updated paid user:", customerEmail);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Unexpected error in webhook:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
