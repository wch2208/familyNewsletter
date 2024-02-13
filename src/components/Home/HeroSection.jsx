import { Link } from "react-router-dom";
import TextSlide from "./TextSlide";
import CustomVideo from "../ui/CustomVideo";
import HeroSectionContainer from "../ui/HeroSectionContainer";
import TitleTypography from "../ui/TitleTypography";
import BtnInfo from "../ui/BtnInfo";
import YellowBtn from "../ui/YellowBtn";
import ArrowDown from "../ui/ArrowDown";

function HeroSection() {
  return (
    <HeroSectionContainer>
      <CustomVideo />
      <TitleTypography>Family Newsletter</TitleTypography>
      <TextSlide />
      <BtnInfo>챗봇과 인터뷰하면 기사가 자동으로 생성됩니다.</BtnInfo>
      <Link to="/chatpage">
        <YellowBtn>인터뷰 시작하기</YellowBtn>
      </Link>
      <ArrowDown />
    </HeroSectionContainer>
  );
}

export default HeroSection;
