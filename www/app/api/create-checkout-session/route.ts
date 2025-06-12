import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

export async function POST(req: Request) {
  try {
    const { language, origin } = await req.json();

    const priceId = process.env.STRIPE_PRICE_ID!;
    const coupon = process.env.STRIPE_COUPON_ID!;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      discounts: [
        {
          coupon: coupon,
        },
      ],
      success_url: `${origin}/learn/${language}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/learn/${language}/pricing`,
      metadata: {
        language: language,
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err: any) {
    console.error("Error creating checkout session:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
