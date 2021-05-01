import { Typography, TextField, Button } from "@material-ui/core";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password } from "../../auth/actions/auth";

const ResetPassword = ({ reset_password }) => {
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });
  const { email } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    reset_password(email);
    setRequestSent(true);
  };
  if (requestSent) {
    return <Redirect to="/" />;
  }

  return (
    <div className={"wrapper"}>
      <form
        action=""
        method="post"
        className={"form"}
        onSubmit={(e) => onSubmit(e)}
      >
        <Typography component={"h4"} variant={"h4"} color="primary">
          Request Password Reset:
        </Typography>
        <TextField
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            onChange(e);
          }}
          variant="filled"
          label="Email"
          fullWidth
        />

        <Button
          fullWidth
          color="secondary"
          variant="outlined"
          spacing={2}
          type="submit"
        >
          Send Request
        </Button>
      </form>
    </div>
  );
};

export default connect(null, { reset_password })(ResetPassword);
