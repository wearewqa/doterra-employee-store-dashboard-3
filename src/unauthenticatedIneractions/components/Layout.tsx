import backgroundArt from "@assets/images/login-background.svg";
import saleorDarkLogo from "@assets/images/logo-dark.svg";
import saleorLightLogo from "@assets/images/logo-light.svg";
import { makeStyles, useTheme } from "@saleor/macaw-ui";
import React from "react";
import SVG from "react-inlinesvg";

const useStyles = makeStyles(
  theme => ({
    logo: {
      display: "block",
      height: 40,
      marginBottom: theme.spacing(4),
    },
    mainPanel: {
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2),
      },
      background: theme.palette.background.paper,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: theme.spacing(5, 6, 4, 6),
      width: "100%",
    },
    mainPanelContent: {
      margin: "auto",
      width: "100%",
    },
    root: {
      gap: theme.spacing(3),
      height: "100vh",
      overflow: "hidden",
      position: "relative",
      width: "100vw",
    },
  }),
  {
    name: "Layout",
  },
);
const Layout: React.FC = props => {
  const { children } = props;
  const classes = useStyles(props);
  const { themeType } = useTheme();

  return (
    <div className={classes.root}>
      <div className={classes.mainPanel}>
        <SVG
          className={classes.logo}
          src={themeType === "dark" ? saleorDarkLogo : saleorLightLogo}
        />
        <div className={classes.mainPanelContent}>{children}</div>
      </div>
    </div>
  );
};

Layout.displayName = "Layout";
export default Layout;
