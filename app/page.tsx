import BannerPage from "@/components/landingPage/BannerPage";
import HowItWorks from "@/components/landingPage/HowItWorks";
import CuratedPortfolio from "@/components/landingPage/CuratedPortfolio";
import AutonomousCalendar from "@/components/landingPage/AutonomousCalendar";
import InstitutionalNetwork from "@/components/landingPage/InstitutionalNetwork";
import HarmonizedOperations from "@/components/landingPage/HarmonizedOperations";
import ComplianceStandards from "@/components/landingPage/ComplianceStandards";
import CallToAction from "@/components/landingPage/CallToAction";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col">
      <BannerPage />
      <HowItWorks />
      <CuratedPortfolio />
      <AutonomousCalendar />
      <InstitutionalNetwork />
      <HarmonizedOperations />
      <ComplianceStandards />
      <CallToAction />
    </main>
  );
}
