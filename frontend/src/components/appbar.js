import React, { Fragment } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { connect } from "react-redux";
import { logout } from "../auth/actions/auth";
import { Link } from "react-router-dom";
import { Avatar, ButtonGroup } from "@material-ui/core";
import { orange, green } from "@material-ui/core/colors";

const PrimarySearchAppBar = ({ isAuthenticated, logout }) => {
  const classes = useStyles();

  const renderMenu = () => (
    <Fragment>
      <a href="login" onClick={logout} className={classes.links}>
        Logout
      </a>
      <div className={"row"}>
        <NotificationsIcon color="secondary" />
        <Avatar className={classes.small} src="/static/girl.jpg" />
      </div>
    </Fragment>
  );
  const guestLink = () => (
    <ButtonGroup>
      <Link to="/login" className={classes.links}>
        Login
      </Link>
      <Link to="/signup" className={classes.links}>
        Sign Up
      </Link>
    </ButtonGroup>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appbar} elevation={0}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Adminstrator
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          {isAuthenticated ? renderMenu() : guestLink()}
        </Toolbar>
      </AppBar>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { logout })(PrimarySearchAppBar);
const useStyles = makeStyles((theme) => ({
  links: {
    borderRadius: "50px",
    color: orange[400],
    display: "flex",
    textDecoration: "none",
    border: "1px solid rgba(0,0,0,0.5)",
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: "5px",
    alignItems: "center",
    justifyContent: "center",

    "&:hover": {
      color: green[300],
      backgroundColor: "transparent",
    },
  },
  appbar: {
    backgroundColor: "rgb(30, 30, 47)",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    marginLeft: theme.spacing(3),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },

  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));
