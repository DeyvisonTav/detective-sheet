"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DetetiveSheet } from "../components/detective-sheet";
import Image from "next/image";

const Home: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("darkMode");
      return savedMode ? JSON.parse(savedMode) : true;
    }
    return true;
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          background: {
            default: darkMode ? "#101820" : "white",
            paper: darkMode ? "#1c1c1e" : "white",
          },
          text: {
            primary: darkMode ? "white" : "#2c3e50",
          },
        },
        typography: {
          fontFamily: "Roboto, Arial, sans-serif",
          h6: {
            fontWeight: "bold",
            color: darkMode ? "white" : "#2c3e50",
          },
        },
      }),
    [darkMode]
  );

  const toggleDarkMode = () => {
    setDarkMode((prevMode: boolean) => {
      const newMode = !prevMode;
      if (typeof window !== "undefined") {
        localStorage.setItem("darkMode", JSON.stringify(newMode));
      }
      return newMode;
    });
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const resetSelections = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
    window.location.reload();
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }
  }, [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ backgroundColor: "#34495e" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }}>
            <div className="flex gap-8 items-center">
              <Image
                className="w-8"
                src={"/logo.png"}
                width={500}
                height={500}
                alt="logo"
              />
              <p className="truncate">Detetive: Um Crime Desafiador</p>
            </div>
          </Typography>
          <IconButton color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={resetSelections}>Resetar Jogo</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 10 }}>
        <DetetiveSheet />
      </Container>
    </ThemeProvider>
  );
};

export default Home;
