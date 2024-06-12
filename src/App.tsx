import { ThemeProvider } from "styled-components";
import theme from "ui/theme";
import { AppRouter } from "./router";
import "./services/FireBase/fireBase";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  );
};
