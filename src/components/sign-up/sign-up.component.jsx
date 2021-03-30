import React, {useState} from 'react';
import './sign-up.styles.css';
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
import {
  Container,
  CssBaseline,
  Grid,
  FormControlLabel,
  TextField,
  Link,
  Button,
  Typography,
  // Checkbox,
  // Avatar,
  InputLabel,
  Input,
  FormHelperText,
} from "@material-ui/core";

const SignUp = () => {
  const initialState = {
      fullName: '',
      email: '',
      password: '',
      address: '',
      phone: '',
  }
  const [userDetails, setUserDetails] = useState(initialState);

  //validate the form input 
  // const validate = (values) => {
  //   let errors = {};
  //   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  //   if(!values.fullName) return errors.fullName = "fullname is required"
  //   if(!values.email) return errors.email = "email is required"
  //   if(!values.password) return errors.password = "password is required"
  //   if(values.password.length < 4) return errors.password = "password is too short"
  //   if(!values.address) return errors.address = "address is required"
  //   if(!values.phone) return errors.phone = "phone is required"

  //   return errors;
  
  // }
  const SignUpSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password is too short - should be 4 chars minimum"),
    phone: Yup.number().required("Phone number is required").integer(),
    fullName: Yup.string().required("Your fullName is required"),
    address: Yup.string().required("Your address is required"),
  });
  //to get the value from the form
  const handleChange = (e) => {
      const {name, value} = e.target
      setUserDetails((userDetails) => ({...userDetails, [name]: value}))
      console.log({value})
  }

  //submit the form
  const handleSubmit = (e) => {
         e.preventDefault();

         let userData = userDetails;

         fetch("http://8a139d948cb8.ngrok.io/users", {
           method: "POST",
           body: JSON.stringify(userData),
           headers: {
             Accept: "application/json",
             "Content-Type": "application/json",
           },
         }).then((response) => {
              if (!response.ok) {
             console.log("this request was not successful");
               }
            return response.body;
         });

  }

  const submitValue = (value) => {
    console.log({value})
  }
 
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
 const submitForm = (values) => {
  console.log(values);
};

   
   
   const classes = useStyles();
    return (
      <div  className="sign-up">
        <div>
          <CssBaseline />
          <div className={classes.paper}>
            <Typography
              component="h1"
              variant="h5"
              style={{ textAlign: "center" }}
            >
              Welcome! <br />
              Please, Sign up
            </Typography>
            <Formik
              initialValues={userDetails}
              validationSchema={SignUpSchema}
              onSubmit={handleSubmit}
            >
              {(formik) => {
                const {
                  values,
                  handleSubmit,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  isValid,
                  dirty,
                } = formik;
                console.log({ formik, values });
                return (
                  <form
                    className={classes.form}
                    noValidate
                    onSubmit={handleSubmit}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          autoComplete="fullName"
                          name="fullName"
                          variant="outlined"
                          required
                          fullWidth
                          id="fullName"
                          label="FullName"
                          value={values.fullName}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          autoFocus
                          className={
                            errors.fullName && touched.fullName
                              ? "input-error"
                              : null
                          }
                        />
                        <ErrorMessage
                          name="fullName"
                          component="span"
                          className="error"
                        />
                      </Grid>
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
                            errors.email && touched.email ? "input-error" : null
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
                          id="phone"
                          label="Phone number"
                          name="phone"
                          value={values.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="phoneNumber"
                          className={
                            errors.phone && touched.phone ? "input-error" : null
                          }
                        />
                        <ErrorMessage
                          name="phone"
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
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="password"
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
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          name="address"
                          label="Address"
                          type="text"
                          id="address"
                          value={values.address}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          autoComplete="address"
                          className={
                            errors.address && touched.address
                              ? "input-error"
                              : null
                          }
                        />
                        <ErrorMessage
                          name="address"
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
                      Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                      <Grid item>
                        <Link href="#" variant="body2">
                          Are you an admin? Sign in
                        </Link>
                      </Grid>
                    </Grid>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    );
}

export default SignUp;