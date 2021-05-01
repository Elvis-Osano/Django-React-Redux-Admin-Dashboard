import { Typography, TextField, Button, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../auth/actions/auth";
import axios from "axios";
import { blue, green, red } from "@material-ui/core/colors";
import FacebookIcon from "@material-ui/icons/Facebook";

const Login = ({ login, isAuthenticated }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  const contineWithGoogle = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/auth/o/google-oauth2/?redirect_uri=http://localhost:8000/google"
      );
      window.location.replace(res.data.authorization_url);
    } catch (error) {}
  };
  const contineWithFacebook = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/auth/o/facebook/?redirect_uri=http://localhost:8000/facebook"
      );
      window.location.replace(res.data.authorization_url);
    } catch (error) {
      console.log(error);
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
          Sign In
        </Typography>
        <TextField
          id="filled-basic"
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            onChange(e);
          }}
          variant="filled"
          label="Email"
          className={classes.input}
          color="secondary"
          required
          fullWidth
        />
        <TextField
          name="password"
          type="password"
          value={password}
          onChange={(e) => {
            onChange(e);
          }}
          variant="filled"
          label="Password"
          className={classes.input}
          color="secondary"
          required
          fullWidth
        />

        <Button
          fullWidth
          color="secondary"
          variant="outlined"
          type="submit"
          className={classes.button}
        >
          Login
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
        Don't Have an account?{" "}
        <Link to="/signup" className={classes.link}>
          SignUp Today
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
export default connect(mapStateToProps, { login })(Login);
