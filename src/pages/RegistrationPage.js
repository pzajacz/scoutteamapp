import React from 'react';
import {Formik, Form} from "formik";
import {Button, TextField, Typography} from "@mui/material";

const RegistrationPage = () => {
  return (
    <>
      <Typography variant="h3" mb={5}>Registration</Typography>
      <Formik
        initialValues={{
          name: '',
          password: '',
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form>
          <TextField
            required
            id="name"
            label="Name"
            variant="standard"
            fullWidth
            margin="dense"
          />
          <TextField
            required
            id="password"
            label="Password"
            variant="standard"
            fullWidth
            margin="dense"
          />

          <Button fullWidth type="submit" variant="outlined" sx={{mt:5}}>Save</Button>
        </Form>
      </Formik>
    </>
  );
}

export default RegistrationPage;
