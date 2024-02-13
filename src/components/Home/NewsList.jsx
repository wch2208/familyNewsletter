import React from "react";
import Grid from "@mui/material/Grid";
import CardComponent from "./CardComponent";
import { useSelector } from "react-redux";

const NewsList = () => {
  const newsList = useSelector(state => state.news.newsList);
  return (
    <Grid container>
      {newsList.map(newsData => (
        <Grid item xs={12} sm={6} md={4} lg={6} xl={3} key={newsData.id}>
          <CardComponent {...newsData} />
        </Grid>
      ))}
    </Grid>
  );
};

export default NewsList;
