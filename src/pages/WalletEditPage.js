import React from 'react';
import {Form, Formik} from "formik";
import {TextField, Button, Typography} from "@mui/material";

const ProfileEdtPage = () => {
  return (
    <>
      <Typography variant="h3">Edit wallet</Typography>
      <Formik
        initialValues={{
          title: '',
          amount: '',
          description: '',
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form>
          <TextField
            required
            id="title"
            label="Title"
            variant="standard"
            fullWidth
            margin="dense"
          />
          <TextField
            required
            id="amount"
            label="Amount"
            variant="standard"
            fullWidth
            margin="dense"
          />
          <TextField
            id="description"
            label="Description"
            multiline
            rows={4}
            variant="standard"
            fullWidth
            margin="dense"
          />

          <Button fullWidth type="submit" variant="outlined" sx={{mt:3}}>Save wallet</Button>
        </Form>
      </Formik>
    </>
  );
}

export default ProfileEdtPage;
