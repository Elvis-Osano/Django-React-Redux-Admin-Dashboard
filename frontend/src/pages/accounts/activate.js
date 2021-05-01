import { Typography, Button } from "@material-ui/core";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../../auth/actions/auth";

const Activate = ({ match, verify }) => {
  const [verified, setVerified] = useState(false);

  const verifyAccount = () => {
    const uid = match.params.uid;
    const token = match.params.token;
    verify(uid, token);
    setVerified(true);
  };
  if (verified) {
    return <Redirect to="/login" />;
  }

  return (
    <div className={"wrapper"}>
      <Typography component={"h2"} variant={"h6"}>
        Verify Your Account
      </Typography>

      <Button onClick={verifyAccount()} fullwidth>
        Verify{" "}
      </Button>
    </div>
  );
};

export default connect(null, { verify })(Activate);
