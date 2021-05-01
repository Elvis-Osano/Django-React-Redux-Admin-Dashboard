import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container } from "@material-ui/core";
import { createData } from "../auth/actions/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router";

const Create = ({ createData }) => {
  const classes = useStyles();
  const [created, setCreated] = useState(false);

  const [branchsales, setBranchSales] = useState({
    name: "",
    sale: "",
  });
  const { name, sale } = branchsales;
  const onChange = (e) =>
    setBranchSales({ ...branchsales, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    createData(name, sale);
    setCreated(true);
  };
  if (created) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Container spacing={3}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            id="filled-secondary"
            name="name"
            label="Branch"
            variant="filled"
            value={name}
            className={classes.margin}
            onChange={(e) => {
              onChange(e);
            }}
          />
          <br />
          <FormControl xs={6} variant="outlined" className={classes.margin}>
            <InputLabel htmlFor="outlined-adornment-amount">Sale</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              name="sale"
              value={sale}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              labelWidth={60}
              onChange={(e) => {
                onChange(e);
              }}
            />
          </FormControl>
          <br />
          <Button
            type="submit"
            variant="outlined"
            className={classes.margin}
            color="primary"
          >
            Send
          </Button>
        </form>
      </Container>
    </div>
  );
};
export default connect(null, { createData })(Create);
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
}));
