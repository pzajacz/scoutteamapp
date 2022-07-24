import React from 'react';
import {Button, Link, TextField, Typography} from "@mui/material";
import {useFormik} from 'formik';
import {useAuth} from "../hooks/useAuth";
import {doApiCall, AXIOS_METHOD} from "../hooks/useApi";
import {Link as RouterLink, useNavigate} from "react-router-dom";


const LoginPage = () => {
  const {handleLoginResult} = useAuth();
  const navigate= useNavigate();

  const nav = () => {
    navigate('/wallets');
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },

    onSubmit: (values) => {
      doApiCall(AXIOS_METHOD.POST, 'login',
        (values)=> {
          handleLoginResult(values);
          nav();
        },
        ()=>{},
        values
      )
    },
  });
  return (
    <>
      <Typography variant="h3" mb={5}>Login</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          variant="standard"
          margin="dense"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="text"
          variant="standard"
          margin="dense"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <Button sx={{mt:3}} color="primary" variant="contained" fullWidth type="submit">
          Login
        </Button>
      </form>
      <Typography variant="body2" paragraph={true} mt={3} align={'center'}>You don't have account? <Link component={RouterLink} to={"/registration"} style={{ fontWeight: 600 }}>Register</Link></Typography>

    </>
  );
}

export default LoginPage;

/*onClick={()=> {
  handleLoginResult({
    "token": "MzI0MzM2Mzg1MzU4MTg5NTQ_NDI1NzU5MDEyNDE1NDMxMQ_22622822431122430138221203888119220249252681501702296523128254551001151180621989",
    "user": {
      "id": "MzI0MzM2Mzg1MzU4MTg5NTQ",
      "name": "barack",
      "wallets": []
    }
  })
}}*/
