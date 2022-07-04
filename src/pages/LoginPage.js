import React from 'react';
import {Link as RouterLink} from "react-router-dom";
import {Button, TextField, Typography, Link} from "@mui/material";
import {Form, Formik} from "formik";
import {useAuth} from "../hooks/useAuth";

const LoginPage = () => {
  const {handleLoginResult} = useAuth()
  return (
    <>
      <Typography variant="h3" mb={5}>Login</Typography>
      <Formik
        initialValues={{
          name: '',
          password: '',
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          console.log(JSON.stringify(values, null, 2));
        }}
      >
        <Form>
          <TextField
            /*required*/
            id="name"
            label="Name"
            variant="standard"
            fullWidth
            margin="dense"
          />
          <TextField
            /*required*/
            id="password"
            label="Password"
            variant="standard"
            fullWidth
            margin="dense"
          />

          <Button fullWidth type="submit" variant="outlined" sx={{mt:5}} onClick={()=> {
            handleLoginResult({
              "token": "MzI0MzM2Mzg1MzU4MTg5NTQ_NDI1NzU5MDEyNDE1NDMxMQ_22622822431122430138221203888119220249252681501702296523128254551001151180621989",
              "user": {
                "id": "MzI0MzM2Mzg1MzU4MTg5NTQ",
                "name": "barack",
                "wallets": []
              }
            })
          }}>Login</Button>
        </Form>
      </Formik>
      <Typography variant="body2" paragraph={true} mt={3} align={'center'} fullWidth>You don't have account? <Link component={RouterLink} to={"/registration"} style={{ fontWeight: 600 }}>Register</Link></Typography>

    </>
  );
}

export default LoginPage;
