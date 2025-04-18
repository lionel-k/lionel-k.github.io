"use client";

import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export default function PaymentSuccessMessage() {
  const searchParams = useSearchParams();
  const showPaymentSuccess = searchParams.get("payment_success") === "true";

  if (!showPaymentSuccess) return null;

  return (
    <div className="bg-[#DAA520]/10 border border-[#DAA520]/20 p-4 flex items-center justify-center gap-2 text-[#DAA520]">
      <CheckCircle2 className="h-5 w-5" />
      <p className="text-sm font-medium text-center">
        Payment successful! Please log in to access premium features.
      </p>
    </div>
  );
}
