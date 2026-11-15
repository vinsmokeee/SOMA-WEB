import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/coming-soon";

export const metadata: Metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <ComingSoon
      title="Create your free account"
      milestone="Milestone 2"
      description="Free registration opens soon. You will be able to sign up with your name and email and start with free mock examinations."
    />
  );
}
