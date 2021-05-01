import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { useHistory, useLocation } from "react-router";
import { Typography } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CreateIcon from "@material-ui/icons/Create";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import { connect } from "react-redux";
import { checkAuthentication, load_user } from "../auth/actions/auth";
import PrimarySearchAppBar from "../components/appbar";

const MiniDrawer = (props) => {
  let location = useLocation();
  useEffect(() => {
    if (location.pathname === "/login") {
      setOpen(false);
    } else if (location.pathname === "/signup") {
      setOpen(false);
    } else {
      setOpen(true);
    }

    props.checkAuthentication();
    props.load_user();
  }, [location]);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const history = useHistory();

  const menuItems = [
    {
      text: "DashBoard",
      icon: <DashboardIcon />,
      path: "/",
    },
    {
      text: "create",

      icon: <CreateIcon />,
      path: "/create",
    },
    {
      text: "Bitcoin",
      icon: <MonetizationOnIcon />,
      path: "/bitcoin",
    },
  ];

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <PrimarySearchAppBar></PrimarySearchAppBar>

      <Drawer
        variant="permanent"
        className={clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          {open ? (
            <Typography variant="h6" className={classes.flex} component="h5">
              Manager
            </Typography>
          ) : null}

          <IconButton onClick={handleDrawerOpen}>
            {theme.direction === "rtl" ? <MenuIcon /> : <MenuIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => {
                history.push(item.path);
              }}
              className={
                location.pathname === item.path ? classes.active : null
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Hello", "Update", "Send email", "Drafts"].map((text, index) => (
            <ListItem
              button
              key={text}
              onClick={() => {
                history.push("/create");
              }}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div
        className={
          (classes.content,
          clsx({
            [classes.content]: open,
            [classes.less]: !open,
          }))
        }
      >
        {props.children}
      </div>
    </div>
  );
};

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "cwnte",
  },
  less: {
    width: "100%",
    marginTop: theme.spacing(7),
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(2),
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBar: {
    width: "100%",
    background: "rgb(30, 30, 47)",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    color: "blue",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    background: "linear-gradient(45deg, #e14eca 30%, #ba54f5 90%)",
    marginTop: theme.spacing(7),
    marginLeft: theme.spacing(4),
    borderRadius: "10px",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginTop: theme.spacing(7),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  active: {
    background: "rgba(0,0,0,0.3)",
  },
  flex: {
    flexGrow: 1,
    marginLeft: "9px",
  },
}));
export default connect(null, { checkAuthentication, load_user })(MiniDrawer);
