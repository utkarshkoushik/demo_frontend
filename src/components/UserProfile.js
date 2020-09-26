import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundSize: "100%",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundSize: "100%",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(3, 4),
    padding: theme.spacing(2,0),
    textAlign: "center",
    color: "black",
    fontSize: "18px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Sign({ match }) {
  const classes = useStyles();
  const history = useHistory();
  const [res, setRes] = useState({});
  const [noUser, setNoUser] = useState(false);
  useEffect(() => {
    if (!match.params.id) {
      history.push("/create");
    } else {
      axios
        .get(`http://13.235.80.12:8000/api/userData/${match.params.id}`)
        .then((response) => {
          console.log(response);
          setRes(response.data);
        })
        .catch((err) => {
          console.log(err);
          setNoUser(true);
        });
    }
  }, []);

  return (
    <div>
      {res.pathname != undefined && (
        <Grid container component="main" className={classes.root}>
          <CssBaseline />

          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
              <img
                src={"http://13.235.80.12:8000" + res.photo}
                style={{
                  height: "150px",
                  width: "150px",
                  borderRadius: "100%",
                }}
              ></img>
              <Typography component="h1" variant="h5">
                User Details
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>Name: {res.name}</Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>Email: {res.email}</Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper className={classes.paper}>Age: {res.age}</Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper className={classes.paper}>Gender: {res.gender}</Paper>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      )}
      {noUser && (
        <Grid container component="main" className={classes.root}>
          <CssBaseline />

          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                User Details
              </Typography>
              <h1>No user with the given username found</h1>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  history.push("/create");
                }}
              >
                Return Home
              </Button>
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
