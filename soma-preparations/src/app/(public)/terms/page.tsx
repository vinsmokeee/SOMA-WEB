import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/coming-soon";

export const metadata: Metadata = { title: "Terms and conditions" };

export default function TermsPage() {
  return (
    <ComingSoon
      title="Terms and conditions"
      description="Our terms and conditions are being prepared and will be published before registration and payments open."
    />
  );
}
