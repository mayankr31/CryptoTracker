import { LinearProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../config/api";
import CoinInfo from "../components/CoinInfo";
import axios from "axios";
import parse from "html-react-parser";
import {numberWithCommas} from '../config/data';


export function CoinPage(props) {
  const { id } = useParams();
  const [coin, setCoin] = useState([]);

  const { symbol, currency } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);


  if (coin.length === 0)
    return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className="flex xs:max-lg:flex-col xs:max-lg:items-center">
      {/*Sidebar */}
      <div className="w-[30%] flex flex-col items-center mt-6 border-r-2 border-gray-400 xs:max-lg:w-full">
        {/* coin symbol */}
        <img
          src={coin?.image.large}
          alt={coin?.name}
          className="h-[200px] mb-5"
        />

        {/* Coin name */}
        <Typography variant="h3" className="!font-bold !mb-5 !font-montseratt">
          {coin?.name}
        </Typography>

        {/* Coin description: description has some HTML content inside it, so we will use html-react-parser package 
        to display a proper description. */}
        <Typography
          variant="subtitle1"
          className="!w-full !font-montseratt !p-6 !pb-4 !pt-0 !text-justify"
        >
          {parse(String(coin?.description.en.split(". ")[0]))}.
        </Typography>

        {/* Market Data */}
        <div
          className="self-start p-6 pt-2.5 w-full xs:max-lg:flex xs:max-lg:justify-around xs:max-mid:flex-col xs:max-mid:items-center xs:max-sm:items-start"
        >
          <span className="flex">
            <Typography
              variant="h5"
              className="!font-bold !mb-5 !font-montseratt"
            >
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" className="!font-montseratt">
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span className="flex">
            <Typography
              variant="h5"
              className="!font-bold !mb-5 !font-montseratt"
            >
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" className="!font-montseratt">
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span className="flex">
            <Typography
              variant="h5"
              className="!font-bold !mb-5 !font-montseratt"
            >
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" className="!font-montseratt">
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>
      </div>

      {/*Chart */}
      <CoinInfo coin={coin} />
    </div>
  );
}
