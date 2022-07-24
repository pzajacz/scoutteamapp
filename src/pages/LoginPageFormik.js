import React from 'react';
import {Button, Link, Typography} from "@mui/material";
import {Formik, Form, Field } from 'formik';
import {TextField} from 'formik-mui'
import {useAuth} from "../hooks/useAuth";
import {doApiCall, AXIOS_METHOD} from "../hooks/useApi";
import {Link as RouterLink, useNavigate} from "react-router-dom";


const LoginPageFormik = () => {
  const {handleLoginResult} = useAuth();
  const navigate= useNavigate();

  const nav = () => {
    navigate('/wallets');
  }
  return (
    <>
      <Typography variant="h3" mb={5} mt={5}>Login</Typography>
      <Formik
        initialValues={{name: '', password: ''}}
        onSubmit={(values, {setFieldError, setSubmitting}) => {
            setSubmitting(true);
            doApiCall(AXIOS_METHOD.POST, 'login',
              (res)=> {
                handleLoginResult(res);
                nav();
              },
              (apiError)=>setFieldError('password', apiError),
              values
            )
        }}
      >
        <Form>
          <Field
            component={TextField}
            id="name"
            name="name"
            label="Name"
            variant="standard"
            fullWidth
            margin="dense"
            type="text"
          />
          <Field
            component={TextField}
            id="password"
            name="password"
            label="Password"
            variant="standard"
            fullWidth
            margin="dense"
            type="text"
          />
          <Button fullWidth type="submit" variant="outlined" sx={{mt: 5}}>Login</Button>
        </Form>
      </Formik>
      <Typography variant="body2" paragraph={true} mt={3} align={'center'}>You don't have account? <Link component={RouterLink} to={"/registration"} style={{ fontWeight: 600 }}>Register</Link></Typography>
    </>
  );
}

export default LoginPageFormik;

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
