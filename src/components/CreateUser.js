import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";

const options = ["Male", "Female"];

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundSize: "100%",
    backgroundSize: 'cover',
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(2, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  input: {
    display: "none",
  },
}));

export default function SignInSide() {
  const history = useHistory();
  useEffect(()=>{
    if(!localStorage.getItem("token")){
      history.push('/login');
    }
  },[])

  const classes = useStyles();
  
  const [firstName, setFirstName] = useState({
    value: "",
    error: false,
    helperText: "",
  });
  const [lastName, setLastName] = useState({
    value: "",
    error: false,
    helperText: "",
  });
  const [userName, setUserName] = useState({
    value: "",
    error: false,
    helperText: "",
  });
  const [email, setEmail] = useState({
    value: "",
    error: false,
    helperText: "",
  });
  const [age, setAge] = useState({
    value: "",
    error: false,
    helperText: "",
  });
  const [gender, setGender] = useState({
    value: "",
    error: false,
    helperText: "",
  });
  const [photo, setPhoto] = useState(null);
  const [pError, setPError] = useState({
    error: false,
    helperText: "",
  });
  const [preview,setPreview] = useState();
  const handleFirstName = (event) => {
    setFirstName({
      value: event.target.value,
      error: false,
      helperText: "",
    });
  };
  const handleLastName = (event) => {
    setLastName({
      value: event.target.value,
      error: false,
      helperText: "",
    });
  };
  const handleUserName = (event) => {
    setUserName({
      value: event.target.value,
      error: false,
      helperText: "",
    });
  };
  const handleEmail = (event) => {
    setEmail({
      value: event.target.value,
      error: false,
      helperText: "",
    });
  };
  const handleAge = (event) => {
    setAge({
      value: event.target.value,
      error: false,
      helperText: "",
    });
  };

  const onFileChange = (event) => {
    setPhoto(event.target.files[0]);
    setPError({
      error: false,
      helperText: "",
    });
  };

  const callApi = () => {
    const formData = new FormData();
    formData.append("name", firstName.value + lastName.value);
    formData.append("pathname", userName.value);
    formData.append("email", email.value);
    formData.append("age", age.value);
    formData.append("gender", gender.value);
    formData.append("photo", photo, photo.name);
    var token = localStorage.getItem('token');
    console.log(token);
    axios({
      method : 'post',
      url : "http://13.235.80.12:8000/api/userData",
      data : formData,
      headers: {
        Authorization: 'Token ' + token
      }
      })
      .then((res) => {
        console.log(res);
        if (res.data.msg1 == "Username already taken") {
          setUserName({
            value: userName.value,
            error: true,
            helperText: "Username already taken",
          });
        }
        if (res.data.msg2 == "Email already exists") {
          setEmail({
            value: email.value,
            error: true,
            helperText: "Email already exists",
          });
        }
        if (res.status == 201) {
          const id = "/" + res.data.pathname;
          history.push(id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(()=>{
    if(!photo){
      setPreview("")
    }
    else{
    const objectUrl = URL.createObjectURL(photo)
    setPreview(objectUrl)
    }
  },[photo])
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName.value) {
      setFirstName({
        value: firstName.value,
        error: true,
        helperText: "First name cannot be left blank",
      });
    }
    if (!lastName.value) {
      setLastName({
        value: lastName.value,
        error: true,
        helperText: "Last name cannot be left blank",
      });
    }
    if (!userName.value) {
      setUserName({
        value: userName.value,
        error: true,
        helperText: "Username cannot be left blank",
      });
    }
    if (!email.value) {
      setEmail({
        value: email.value,
        error: true,
        helperText: "Email cannot be left blank",
      });
    }
    if (!age.value) {
      setAge({
        value: age.value,
        error: true,
        helperText: "Age cannot be left blank",
      });
    } else if (age.value <= 0) {
      setAge({
        value: age.value,
        error: true,
        helperText: "Enter a valid age",
      });
    }
    if (!gender.value) {
      setGender({
        value: gender.value,
        error: true,
        helperText: "Gender cannot be left blank",
      });
    }
    if (!photo) {
      setPError({
        error: true,
        helperText: "Upload a photo",
      });
    }
    if (
      gender.value &&
      age.value &&
      age.value > 0 &&
      email.value &&
      userName.value &&
      lastName.value &&
      firstName.value &&
      photo
    ) {
      callApi();
    }
  };
  return (
    <div>
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" style={{marginBottom : "10px"}}>
            Enter Your Details &nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="contained"
            color="secondary" onClick={()=>{localStorage.clear();history.push('/login')}}>Logout</Button>
          </Typography>
          <img
                src={preview || 'https://www.computerhope.com/jargon/g/guest-user.jpg'}
                style={{
                  height: "150px",
                  width: "150px",
                  borderRadius: "100%",
                  marginBottom : "15px"
                }}
              ></img>
          <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={onFileChange}
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" color={pError.error?"secondary" : "primary"} component="span">
                  Upload
                </Button>
              </label>
              {pError.error && (
              <p style={{ color: "red" }}>{pError.helperText}</p>
            )}
          <form className={classes.form} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                
                <TextField
                  error={firstName.error}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="First Name"
                  label="First Name"
                  name="First Name"
                  autoComplete="First Name"
                  autoFocus
                  helperText={firstName.helperText}
                  onChange={handleFirstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={lastName.error}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="Last Name"
                  label="Last Name"
                  type="Last Name"
                  id="Last Name"
                  autoComplete="Last Name"
                  helperText={lastName.helperText}
                  onChange={handleLastName}
                />
              </Grid>
            </Grid>
            <TextField
              error={userName.error}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="Username"
              label="Username (must be unique)"
              type="Username"
              id="Username"
              onChange={handleUserName}
              autoComplete="Username"
              helperText={userName.helperText}
            />
            <TextField
              error={email.error}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              helperText={email.helperText}
              onChange={handleEmail}
            />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={age.error}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="Age"
                  label="Age"
                  name="Age"
                  type="number"
                  autoComplete="Age"
                  helperText={age.helperText}
                  onChange={handleAge}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  id="Gender"
                  onChange={(event, newValue) => {
                    setGender({
                      value: newValue,
                      error: false,
                      helperText: "",
                    });
                  }}
                  options={options}
                  style={{ width: 250, marginTop: 15 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={gender.error}
                      helperText={gender.helperText}
                      label="Gender"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
            </Grid>
            <h3>
            </h3>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Register
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
    </div>
  );
}
