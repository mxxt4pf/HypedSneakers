import { DarkMode, ShoppingCart } from "@mui/icons-material";
import {
  Badge,
  IconButton,
  InputBase,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";

interface Props {
  themeMode: boolean;
  themeSwitch: () => void;
}

const featureLinks = [
  {
    title: "aboutus",
    path: "/aboutus",
  },
  {
    title: "contactus",
    path: "/contactus",
  },
  {
    title: "productcatalog",
    path: "/productcatalog",
  },
];
const signupLinks = [
  {
    title: "login",
    path: "/login",
  },
  {
    title: "signup",
    path: "/signup",
  },
];

export default function Appbar({ themeMode, themeSwitch }: Props) {
  return (
    //Setting margin border for the navigation bar using mb
    <AppBar
      position="relative"
      sx={{ mb: 8, color: "purple", fontPalette: "dark" }}
    >
      <Toolbar
        variant="dense"
        sx={{
          display: "-ms-flexbox",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h5"
            sx={{
              textDecorationColor: "transparent",
              "&:hover": {
                color: "skyblue",
                cursor: "pointer",
              },
              color: "white",
            }}
            component={NavLink}
            to="/"
          >
            HYPEDSNEAKERS
          </Typography>
          <Switch
            checked={themeMode}
            onChange={themeSwitch}
            sx={{ tabSize: "large" }}
          ></Switch>
        </Box>

        <List
          sx={{
            display: "flex",
            flexDirection: "row",
            fontFamily: "monospace",
          }}
        >
          {featureLinks.map(({ title, path }) => (
            <ListItem
              component={NavLink}
              to={path}
              key={path}
              sx={{
                "&:hover": {
                  color: "skyblue",
                  cursor: "pointer",
                },
                typography: "h5",
                color: "azure",
              }}
            >
              {title}
            </ListItem>
          ))}
        </List>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            edge="start"
            size="small"
            sx={{ color: "darkgray", margin: 1 }}
          >
            <Badge
              badgeContent="5"
              sx={{
                display: "flex",
                alignItems: "flex-end",
                color: "white",
                "&:hover": {
                  color: "skyblue",
                  cursor: "pointer",
                },
                border: "black",
              }}
            >
              <ShoppingCart />
            </Badge>
          </IconButton>

          <List
            sx={{
              display: "flex",
              alignItems: "flex-end",
              flexDirection: "row",
              fontFamily: "monospace",
            }}
          >
            {signupLinks.map(({ title, path }) => (
              <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={{
                  typography: "h5",
                  "&:hover": {
                    color: "skyblue",
                    cursor: "pointer",
                  },
                  color: "azure",
                }}
              >
                {title}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
