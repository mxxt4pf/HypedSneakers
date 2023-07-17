import { useEffect, useState } from "react";
import { Product } from "../model/Product";
import ProductCatalog from "../../features/ProductCatalog/ProductCatalog";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import Appbar from "./Appbar";
import { dark, light } from "@mui/material/styles/createPalette";
import { Outlet } from "react-router-dom";

function ClientApp() {
  const [modeType, setModeType] = useState(false);
  const themeType = modeType ? "dark" : "light";

  function themeSwitch() {
    setModeType(!modeType);
  }

  const theme = createTheme({
    palette: {
      background: {
        default: themeType == "light" ? "#9b9b9b" : "#333333",
      },
      mode: themeType,
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline> </CssBaseline>
        <Appbar themeMode={modeType} themeSwitch={themeSwitch}></Appbar>
        <Container>
          <Outlet />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default ClientApp;
