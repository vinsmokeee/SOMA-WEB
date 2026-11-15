import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/coming-soon";

export const metadata: Metadata = { title: "Privacy policy" };

export default function PrivacyPage() {
  return (
    <ComingSoon
      title="Privacy policy"
      description="Our privacy policy is being prepared and will be published before student accounts open."
    />
  );
}
