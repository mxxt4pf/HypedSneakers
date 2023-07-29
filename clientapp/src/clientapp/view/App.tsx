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
import { useSaveContext } from "../SaveContext/SaveContext";
import axios from "axios";
import axiosAPI from "../clientAPI/Axios";
import { fetchCookies } from "../utilities/utillities";

function ClientApp() {
  const { setCart } = useSaveContext();

  const [buffering, setBuffering] = useState(true);

  useEffect(() => {
    const userId = fetchCookies("userId");

    if (userId) {
      axiosAPI.ShoppingCart.get()

        .then((cart) => setCart(cart))

        .catch((error) => console.log(error))

        .finally(() => setBuffering(false));
    } else {
      setBuffering(false);
    }
  }, [setCart]);

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
