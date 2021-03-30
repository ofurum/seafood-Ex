import React, { useState } from "react";
import {
  CssBaseline,
  Grid,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import "./login.styles.css"; 
import { makeStyles } from "@material-ui/core/styles";
import { Formik, ErrorMessage } from "formik";
import './login.styles.css'
import * as Yup from "yup";

const LogIn = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const [Login, setLogin] = useState(initialState);

   const SignInSchema = Yup.object().shape({
     email: Yup.string().email().required("Email is required"),
     password: Yup.string()
       .required("Password is required")
       .min(4, "Password is too short - should be 4 chars minimum"),
   });

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
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
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((LoginDetails) => ({ ...LoginDetails, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let loginData = Login;

    fetch(" http://8a139d948cb8.ngrok.io/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        console.log("this request was not successful");
      }
      console.log("successful");
    });
  };


  const classes = useStyles();
  return (
    <div style={{ marginTop: "30px", width: "50%", display: "flex", justifyContent: "flex-end"}}>
      <div style={{width: "50%"}}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <Formik
            initialValues={Login}
            onSubmit={handleSubmit}
            validationSchema={SignInSchema}
          >
            {(formik) => {
              const {
                values,
                handleChange,
                errors,
                handleBlur,
                touched,
                isValid,
                dirty,
              } = formik;

              return (
                <div>
                  <form
                    className={classes.form}
                    noValidate
                    // onSubmit={handleSubmit}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="email"
                          className={
                            errors.email ? "input-error" : null
                          }
                        />
                        <ErrorMessage
                          name="email"
                          component="span"
                          className="error"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          value={values.password}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          autoComplete="current-password"
                          className={
                            errors.password && touched.password
                              ? "input-error"
                              : null
                          }
                        />
                        <ErrorMessage
                          name="password"
                          component="span"
                          className="error"
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={dirty && isValid ? "" : "disabled-btn"}
                      disabled={!(dirty && isValid)}
                      style={{ marginTop: "30px" }}
                    >
                      Log In
                    </Button>
                  </form>
                </div>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
