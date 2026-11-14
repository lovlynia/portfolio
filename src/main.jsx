import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import App from "./App.jsx";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#a9c8f2" },
    background: { default: "#0b1018", paper: "#131b27" },
    text: { primary: "#eaf1ff", secondary: "#a5b4cb" },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", sans-serif',
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
