import React, { useState, useEffect } from "react";

import { useParams } from "react-router";

import apiConfig from "../../api/apiConfig";
import agent from "../../api/agent";
import apiKey from "../../api/apiConfig";
import { Actor } from "../../app/models/cast";
import { Grid, Typography } from "@mui/material";

const CastList = (props: any) => {
  const { category } = useParams();

  const [casts, setCasts] = useState<Actor[]>([]);
  const params = {
    language: "en-US",
    page: 2,
    api_key: apiKey,
  };
  useEffect(() => {
    const getCredits = async () => {
      const res = await agent.Credits.creditList(props.id, params);
      setCasts(res.cast.slice(0, 6));
    };
    getCredits();
  }, [props.id]);
  return (
    <>
      <Typography sx={{ fontSize: "1.5rem", fontWeight: 700, color: "white" }}>Casts</Typography>
      <Grid container spacing={3} xs={12} className="casts">
        {casts.map((item, i) => (
          <Grid item key={i} xs={2}>
            <div
              className="casts__item__img"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${item.profile_path})`,
              }}
            ></div>
            <Typography className="casts__item__name">{item.name}</Typography>
            <Typography className="casts__item__character">{item.character}</Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CastList;
