import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/coming-soon";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <ComingSoon
      title="Log in"
      milestone="Milestone 2"
      description="Student accounts are being set up. Secure login, registration and password recovery will be available here soon."
    />
  );
}
