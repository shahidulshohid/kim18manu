import BannerPage from "@/components/landingPage/BannerPage";
import HowItWorks from "@/components/landingPage/HowItWorks";
import CuratedPortfolio from "@/components/landingPage/CuratedPortfolio";
import AutonomousCalendar from "@/components/landingPage/AutonomousCalendar";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col">
      <BannerPage />
      <HowItWorks />
      <CuratedPortfolio />
      <AutonomousCalendar />
    </main>
  );
}
