import BasicSpeedDial from "../../components/common/SpeedDial";
import ListSection from "./components/ListSection";
import HeroSection from "./components/HeroSection";
import OutlineContainer from "./components/ui/OutlineContainer";

function HomePage() {
  return (
    <OutlineContainer>
      <HeroSection />
      <ListSection />
      <BasicSpeedDial />
    </OutlineContainer>
  );
}
export default HomePage;
