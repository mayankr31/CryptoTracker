import { Container, Typography } from "@mui/material";
import React from "react";
import { Carousel } from "./Carousel";

export function Banner(props) {
  return (
    <div className="bg-banner">
      <Container className="h-[400px] flex flex-col pt-6 justify-around">
        <div className="flex h-[40%] flex-col justify-center text-center">
          <Typography
            variant="h2"
            className="!font-extrabold !mb-4 !font-montseratt"
          >
            Crypto Tracker
          </Typography>
          <Typography
            variant="subtitle2"
            className="!text-gray-400 !font-montseratt !capitalize"
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </div>
        <Carousel/>
      </Container>
    </div>
  );
}
