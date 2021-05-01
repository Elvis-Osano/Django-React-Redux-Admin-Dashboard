import { Typography, TextField, Button } from "@material-ui/core";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password_confirm } from "../../auth/actions/auth";

const ResetPasswordConfirm = ({ match, reset_password_confirm }) => {
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });
  const { new_password, re_new_password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    const uid = match.params.uid;
    const token = match.params.token;
    reset_password_confirm(uid, token, new_password, re_new_password);
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
          Reset password:
        </Typography>
        <TextField
          name="new_password"
          type="password"
          value={new_password}
          onChange={(e) => {
            onChange(e);
          }}
          variant="filled"
          label="Password"
        />
        <TextField
          name="re_new_password"
          type="password"
          value={re_new_password}
          onChange={(e) => {
            onChange(e);
          }}
          variant="filled"
          label="Password"
        />

        <Button
          fullWidth
          color="secondary"
          variant="outlined"
          spacing={2}
          type="submit"
        >
          Reset password
        </Button>
      </form>
    </div>
  );
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
