import LandingPage from "@/pages/LandingPage/LandingPage";
import GFooter from "@/sections/GFooter/GFooter";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white justify-between">
      <LandingPage />
      <GFooter />
    </main>
  );
}
