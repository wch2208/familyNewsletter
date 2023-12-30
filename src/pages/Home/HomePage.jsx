import { Grid } from "@mui/material";
import BasicSpeedDial from "../../components/common/SpeedDial";
import ListSection from "./components/ListSection";
import HeroSection from "./components/HeroSection";

function HomePage() {
  return (
    <Grid
      id="outline"
      container
      sx={{
        overflow: "hidden",
        backgroundColor: "#f2f2f2",
        p: 0,
        m: 0,
      }}
    >
      <HeroSection />
      <ListSection />
      <BasicSpeedDial />
    </Grid>
  );
}
export default HomePage;
