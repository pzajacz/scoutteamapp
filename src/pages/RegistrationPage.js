import React, {useState} from 'react';
import {useFormik} from "formik";
import {Button, Link, TextField, Typography} from "@mui/material";
import {AXIOS_METHOD, doApiCall} from "../hooks/useApi";
import {Link as RouterLink} from "react-router-dom";

const RegistrationPage = () => {
  const [success, setSuccess] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },

    onSubmit: (values) => {
      console.log(JSON.stringify(values));
      doApiCall(AXIOS_METHOD.POST, 'reg',
        (values)=> {
          console.log(values);
          setSuccess(true)
        },
        ()=>{},
        values
      )
    },
  });
  return (
    <>
      <Typography variant="h3" mb={5} mt={5}>Registration</Typography>
      {success ?
        <Typography variant="body2" paragraph={true} mt={3} align={'center'}>Registration was successful, please go to <Link component={RouterLink} to={"/"} style={{ fontWeight: 600 }}>Login Page</Link></Typography>
        : null
      }

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          variant="standard"
          margin="dense"
          type="text"
          disabled={success}
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="text"
          variant="standard"
          margin="dense"
          disabled={success}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button sx={{mt:3}} color="primary" variant="contained" fullWidth type="submit" disabled={success}>
          Submit
        </Button>
      </form>
    </>
  );
}

export default RegistrationPage;
