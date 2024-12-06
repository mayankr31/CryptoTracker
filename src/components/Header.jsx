import {
  AppBar,
  Container,
  createTheme,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";

import React from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    mode: "dark",
  },
});

export function Header(props) {
  const navigate = useNavigate();

  const {currency, setCurrency} = CryptoState();
  

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate("/")}
              variant="h6"
              className="!flex-1 !text-[#FFD700] !font-montseratt !font-extrabold !cursor-pointer"
            >
              Crypto Tracker
            </Typography>
            <Select variant="outlined" 
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-24 h-10 mr-4">
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
