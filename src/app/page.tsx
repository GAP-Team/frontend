'use client';
import LandingPage from "@/screens/landing_page/LandingPage";
import GFooter from "@/components/common/GFooter/GFooter";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white justify-between">
      <LandingPage />
      <GFooter />
    </main>
  );
}
