import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AppBar, Button, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import "./Header.Module.scss";

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

export default function Header({ handleThemeChange, darkMode }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AppBar
      position="fixed"
      color={isScrolled ? "primary" : "transparent"}
      elevation={0}
      className="app-bar"
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box className="header-container">
          <Button component={Link} to={`/type/show`} className="logo-button">PHIM HAY</Button>

          <Button className="nav-button">Tìm kiếm</Button>
          <Button className="nav-button">Phim Hot</Button>
          <Button className="nav-button">Phim Lẻ</Button>
          <Button component={Link} to={`/type/show`} className="nav-button">Phim Bộ</Button>
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
