import React from 'react';
import {Form, Formik} from "formik";
import {TextField, Button, Typography} from "@mui/material";

const ProfileEditPage = () => {
  return (
    <>
      <Typography variant="h3">Edit profile</Typography>
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

          <Button fullWidth type="submit" variant="outlined" sx={{mt:3}}>Save profile</Button>
        </Form>
      </Formik>
    </>
  );
}

export default ProfileEditPage;
