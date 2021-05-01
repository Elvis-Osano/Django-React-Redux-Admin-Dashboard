import { Typography, TextField, Button, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../../auth/actions/auth";
import axios from "axios";
import { green, red, blue } from "@material-ui/core/colors";
import FacebookIcon from "@material-ui/icons/Facebook";

const Signup = ({ signup, isAuthenticated }) => {
  const classes = useStyles();
  const [created, setCreated] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
  });

  const { first_name, last_name, email, password, re_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (password === re_password) {
      signup(first_name, last_name, email, password, re_password);
    }
    setCreated(true);
  };
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  if (created) {
    return <Redirect to="/login" />;
  }
  const contineWithGoogle = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/auth/o/google-oauth2/?redirect_uri=http://localhost:8000/google"
      );
      window.location.replace(res.data.authorization_url);
    } catch (error) {
      console.log(error, "google");
    }
  };
  const contineWithFacebook = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/auth/o/facebook/?redirect_uri=http://localhost:8000/facebook"
      );
      window.location.replace(res.data.authorization_url);
    } catch (error) {
      console.log(error, "facebook");
    }
  };
  return (
    <div className={"wrapper"}>
      <form
        action=""
        method="post"
        className={"form"}
        onSubmit={(e) => onSubmit(e)}
      >
        <Typography component={"h4"} variant={"h4"} color="primary">
          Sign Up Today
        </Typography>
        <TextField
          type="text"
          name="first_name"
          value={first_name}
          onChange={(e) => {
            onChange(e);
          }}
          variant="filled"
          label="First Name"
          required
          fullWidth
          className={classes.input}
        />
        <TextField
          type="text"
          name="last_name"
          value={last_name}
          onChange={(e) => {
            onChange(e);
          }}
          variant="filled"
          label="Last Name"
          required
          fullWidth
          className={classes.input}
        />
        <TextField
          name="email"
          type="email"
          value={email}
          onChange={(e) => {
            onChange(e);
          }}
          variant="filled"
          label="Email"
          required
          fullWidth
          className={classes.input}
        />
        <TextField
          type="password"
          name="password"
          value={password}
          onChange={(e) => {
            onChange(e);
          }}
          variant="filled"
          label="Password"
          required
          fullWidth
          className={classes.input}
        />
        <TextField
          name="re_password"
          type="password"
          value={re_password}
          onChange={(e) => {
            onChange(e);
          }}
          variant="filled"
          label="Comfirm Password"
          required
          fullWidth
          className={classes.input}
        />

        <Button
          fullWidth
          color="secondary"
          variant="outlined"
          type="submit"
          className={classes.button}
        >
          Signup
        </Button>
      </form>
      <Button
        variant="outlined"
        onClick={() => {
          contineWithGoogle();
        }}
        className={classes.google}
      >
        Continue With Google
      </Button>
      <Button
        startIcon={<FacebookIcon />}
        variant="outlined"
        onClick={() => {
          contineWithFacebook();
        }}
        className={classes.facebook}
      >
        Continue With Facebook
      </Button>
      <Typography
        component={"p"}
        variant={"h6"}
        font={12}
        style={{ color: "#f4f4f4" }}
        className={"form"}
      >
        Already Have an account?{" "}
        <Link to="/login" className={classes.link}>
          Sign In
        </Link>
      </Typography>
    </div>
  );
};
const useStyles = makeStyles((theme) => ({
  input: {
    "& .MuiInputBase-root": {
      color: "black",
      background: "rgba(255,255,255,0.2)",
    },
    "& .MuiFormLabel-root": {
      color: "#f4f4f4",
    },

    marginTop: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(1),
  },
  google: {
    color: "#101010",
    backgroundColor: red[400],
    borderRadius: "50px",
    marginTop: theme.spacing(1),
    width: "300px",

    "&:hover": {},
  },
  facebook: {
    color: "#f4f4f4",
    backgroundColor: blue[400],
    borderRadius: "50px",
    marginTop: theme.spacing(1),
    width: "300px",

    "&:hover": {},
  },
  link: {
    color: "#777",
    fontSize: "16px",

    "&:hover": {
      color: green[300],
    },
  },
}));
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { signup })(Signup);
