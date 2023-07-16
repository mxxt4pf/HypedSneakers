import { DarkMode } from "@mui/icons-material";
import {
  IconButton,
  InputBase,
  Switch,
  Toolbar,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

interface Props {
  themeMode: boolean;
  themeSwitch: () => void;
}
export default function Appbar({ themeMode, themeSwitch }: Props) {
  return (
    //Setting margin border for the navigation bar using mb
    <AppBar position="relative" color="secondary" sx={{ mb: 8 }}>
      <Toolbar>
        <Typography variant="h5"> HYPEDSNEAKERS</Typography>
        <Switch checked={themeMode} onChange={themeSwitch}></Switch>
      </Toolbar>
    </AppBar>
  );
}
