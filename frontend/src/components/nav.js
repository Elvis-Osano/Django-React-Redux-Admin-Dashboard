import React from "react";
import {Button,Grid} from "@material-ui/core";
import {makeStyles } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const NavBAr = () => {

const classes=useStyles()



  return (
    <Grid className={classes.nav} container direction="column">
      <br/>
      <Button fullWidth className={classes.buttonStyles}
      endIcon={< ChevronRightIcon/>}
      
      >
        {" "}
        Testing
      </Button>
    </Grid>
  );
};

export default NavBAr;
const useStyles = makeStyles({
  root: {
    color: "blue",
    backgroundImage: "linear-gradient(to bottom , #e14eca, #ba54f5)",
    height: "90vh",
    width:"200px",
    backgroundSize: "210% 210%",
    backgroundPosition: "top right",
    
  },
  buttonStyles: {
    color: "#fff",
    font:"20px"
  },
  nav:{
    position: "fixed",
    top: "80px",
    maxWidth: "200px !important",
    minHeight: "90vh",
    borderRadius: "10px",
    left: "20px",
    backgroundImage: "linear-gradient(to bottom,#e14eca, #ba54f5)",
  }
});