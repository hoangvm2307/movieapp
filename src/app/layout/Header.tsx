import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import classNames from "classnames";
import "./Header.Module.scss";

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

export default function Header({ handleThemeChange, darkMode }: Props) {
  return (
    <AppBar position="fixed" color="transparent" elevation={0} className="app-bar">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box className="header-container">
          <Button className="logo-button">PHIM HAY</Button>

          <Button className="nav-button">Tìm kiếm</Button>
          <Button className="nav-button">Phim Hot</Button>
          <Button className="nav-button">Phim Lẻ</Button>
          <Button className="nav-button">Phim Bộ</Button>
          <Button className="nav-button">Phim Mới</Button>
        </Box>
        
        <Box>
          <Button sx={{}} component={NavLink} to={`/login`} className="sign-in-button">
            Đăng nhập
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
 