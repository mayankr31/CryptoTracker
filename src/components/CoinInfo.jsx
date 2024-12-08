import React, { useEffect, useState } from "react";
import { chartDays } from "../config/data";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { CircularProgress, createTheme, ThemeProvider } from "@mui/material";
import { Line } from "react-chartjs-2";
import { HistoricalChart } from "../config/api";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import SelectButton from "./SelectButton";

// In Chart.js 3.x or above, you need to explicitly register components like scales, tooltips, etc., before using them.
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function CoinInfo({ coin }) {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [flag, setflag] = useState(false);

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setflag(true);
    setHistoricData(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
  }, [days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });


  return (
    <ThemeProvider theme={darkTheme}>
      <div className="w-[75%] flex flex-col items-center justify-center mt-6 p-10 xs:max-lg:w-full xs:max-lg:mt-0 xs:max-lg:p-5 xs:max-lg:pt-0">
        {!historicData ? (
          <CircularProgress className="!text-gold" size={250} thickness={1} />
        ) : (
          <>
            {/* Chart: we are taking only the price array from the api data. Each element in price array 
          contains two things: date and price on that date. So for labels it is coin[0] (date) and for
          datasets it is coin[1] the prices on particular date. */}
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />

            {/* Days */}
            <div className="flex mt-5 justify-around w-full">
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}
