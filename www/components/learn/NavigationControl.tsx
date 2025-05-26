"use client";

import SignInForm from "./SignInForm";

type Props = {
  email: string | null;
};

export default function NavigationControl({ email }: Props) {
  if (!email) {
    return <SignInForm />;
  }

  return null;
}
