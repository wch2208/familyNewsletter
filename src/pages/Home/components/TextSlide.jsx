import { useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { storeLatestFiveNewsTitles } from "../../../features/news/newsSlice";

import { motion } from "framer-motion";

const TextSlide = () => {
  const dispatch = useDispatch();
  const newsList = useSelector(state => state.news.newsList);
  const titleList = useSelector(state => state.news.titleList);

  useEffect(() => {
    dispatch(storeLatestFiveNewsTitles(newsList));
  }, [newsList, dispatch]);

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "700px",
        }}
      >
        {titleList.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            style={{
              marginBottom: "30px",
              fontSize: "1.5rem",
              color: "#ffffff",
              overflow: "hidden",
              width: "90vw",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {line}
          </motion.div>
        ))}
      </Box>
    </>
  );
};

export default TextSlide;
