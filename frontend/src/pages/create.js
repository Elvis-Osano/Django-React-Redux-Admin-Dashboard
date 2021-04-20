import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Create = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [sale, setSales] = useState("");
  let history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      fetch("http://localhost:8000", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, sale }),
      })
        .then((res) => {
          console.log(res);

          history.push("/");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <Container spacing={3}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            id="filled-basic"
            label="Branch"
            variant="filled"
            className={classes.margin}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />
          <FormControl xs={6} variant="outlined" className={classes.margin}>
            <InputLabel htmlFor="outlined-adornment-amount">Sale</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={70000}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              labelWidth={60}
              onChange={(e) => {
                setSales(e.target.value);
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
export default Create;
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
