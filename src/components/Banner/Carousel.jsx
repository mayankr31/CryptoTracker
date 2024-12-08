import React, { useEffect, useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { TrendingCoins } from "../../config/api";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import {numberWithCommas} from '../../config/data';
import { LinearProgress } from "@mui/material";

export function Carousel(props) {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));

    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  if(trending.length===0) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      <Link
        className="flex flex-col items-center cursor-pointer uppercase text-white"
        to={`/coins/${coin.id}`}
      >
        <img src={coin?.image} alt={coin.name} className="h-20 mb-2.5" />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            className={`${profit > 0 ? "text-emerald-500" : "text-[rgb(255,0,0)]"} font-medium`}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span
          className="font-medium text-[22px]"
        >
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  return (
    <div className="h-[50%] flex items-center">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
}
