import React, { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { CoinList } from "../config/api";
import {
  Container,
  createTheme,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  LinearProgress,
  TextField,
  ThemeProvider,
  Typography,
  TableBody,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function CoinsTable(props) {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const { currency, symbol } = CryptoState();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
    components: {
      MuiPaginationItem: {
        styleOverrides: {
          root: {
            color: "gold",
          },
        },
      },
    },
  });

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
  };

  console.log(coins);

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container className="text-center">
        <Typography variant="h4" className="!m-[18px] !font-montseratt">
          Cryptocurrency Prices by Market Cap
        </Typography>

        <TextField
          label="Search For a Crypto Currency"
          variant="outlined"
          className="!mb-5 w-full"
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress className="!bg-[#FFD700]" />
          ) : (
            <Table>
              <TableHead className="!bg-[#EEBC1D]">
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      className="!text-black !font-bold !font-montseratt"
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;

                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        key={row.name}
                        className="!bg-[#16171a] !cursor-pointer hover:!bg-[#131111] !font-montseratt"
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          className="!flex !gap-4"
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            className="h-[50px] mb-[10px]"
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                            className="flex flex-col"
                          >
                            <span className="text-[22px] uppercase">
                              {row.symbol}
                            </span>
                            <span className="text-neutral-400">{row.name}</span>
                          </div>
                        </TableCell>

                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>

                        <TableCell
                          align="right"
                          className={`${
                            profit > 0
                              ? "!text-[rgb(14,203,129)]"
                              : "!text-[rgb(255,0,0)]"
                          } !font-medium`}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>

                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
          className="p-5 w-full flex justify-center"
        />
      </Container>
    </ThemeProvider>
  );
}
