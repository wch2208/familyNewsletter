import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded";
import { Link } from "react-router-dom";

export default function BasicSpeedDial() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const actions = [
    // { icon: <FileCopyIcon />, name: "Copy" },
    // { icon: <SaveIcon />, name: "Save" },
    // { icon: <PrintIcon />, name: "Print" },
    // { icon: <ShareIcon />, name: "Share" },
    {
      icon: (
        <Link to="/chatpage" style={{ color: "inherit", marginTop: "6px" }}>
          <ForumRoundedIcon />
        </Link>
      ),
      name: "Interview",
    },
    {
      icon: <ArrowCircleUpRoundedIcon onClick={handleScrollToTop} />,
      name: "Top",
    },
  ];

  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: "fixed", bottom: "16px", right: "16px", zIndex: 3 }}
      icon={<SpeedDialIcon />}
    >
      {actions.map(action => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
        />
      ))}
    </SpeedDial>
  );
}
