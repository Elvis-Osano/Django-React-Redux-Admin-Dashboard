import React, { useEffect } from "react";
import { connect } from "react-redux";
import queryString from "query-string";
import { Button, Typography } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import { googleAuth } from "../../auth/actions/auth";
const Google = ({ googleAuth }) => {
  let location = useLocation();
  useEffect(() => {
    const values = queryString.parse(location.search);
    const state = values.state ? values.state : null;
    const code = values.code ? values.code : null;

    if (state && code) {
      googleAuth(state, code);
    }
  }, [location]);

  return (
    <div className={"wrapper"}>
      <Typography component={"h3"} variant={"body2"}>
        SuccessFul Logged in
      </Typography>
      <br />
      <Button>
        <Link to="/">Home</Link>
      </Button>
    </div>
  );
};

export default connect(null, { googleAuth })(Google);
