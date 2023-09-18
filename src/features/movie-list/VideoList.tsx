import React, { useState, useEffect, useRef } from "react";

import { useParams } from "react-router";
import agent from "../../api/agent";
import apiKey from "../../api/apiConfig";
import { Grid, Typography } from "@mui/material";

const VideoList = (props: any) => {
  const { category } = useParams();

  const [videos, setVideos] = useState([]);
  const params = {
    language: "en-US",
    page: 2,
    api_key: apiKey,
  };
  useEffect(() => {
    const getVideos = async () => {
      const res = await agent.Movie.movieVideo(props.id, params);
      setVideos(res.results.slice(0, 3));
    };
    getVideos();
  }, [category, props.id]);

  return (
    <div className="video-list">
      <Typography sx={{ fontSize: "1.5rem", fontWeight: 700, color: "white" }}>Trailer</Typography>
      <Grid container spacing={3} xs={12}>
        {videos.map((item, i) => (
          <Grid item xs={4}>
            <Video key={i} item={item} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const Video = (props: any) => {
  const { item } = props;
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";
      iframeRef.current.setAttribute("height", height);
    }
  }, []);
  return (
    <iframe
      src={`https://www.youtube.com/embed/${item.key}`}
      ref={iframeRef}
      width="100%"
      title="video"
    ></iframe>
  );
};

export default VideoList;
