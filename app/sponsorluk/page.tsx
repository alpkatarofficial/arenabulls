import { SponsorshipTiers } from "@/components/sponsors";

export default function SponsorshipPage() {
  const tiers = [
    {
      level: "Platin",
      benefits: ["Logo on jersey", "Social media mentions"]
    }
  ];

  return (
    <div>
      <h1>Sponsorluk Paketleri</h1>
      <SponsorshipTiers tiers={tiers} />
      <ContactForm isSponsorForm />
    </div>
  )
}
