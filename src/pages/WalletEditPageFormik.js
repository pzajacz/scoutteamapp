import React from 'react';
import {Form, Formik} from "formik";
import {TextField, Button, Typography} from "@mui/material";
import {AXIOS_METHOD, doApiCall} from "../hooks/useApi";
import {useNavigate} from "react-router-dom";

const WalletEdtPageFormik = () => {
  const navigation = useNavigate();

/*  const nav = ()=> {
    navigation('/wallets')
  }*/

  return (
    <>
      <Typography variant="h3">Add/Edit wallet</Typography>
      <Formik
        initialValues={{
          name: '',
          description: '',
        }}
        onSubmit={(values) => {
          console.log(JSON.stringify(values, null, 2));
          doApiCall(AXIOS_METHOD.PUT,
            'wallet',
            (values)=> {
              console.log(values);
            },
            (apiError)=> {
              console.log(apiError);
            },
            values
            )
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
{/*          <TextField
            required
            id="amount"
            label="Amount"
            variant="standard"
            fullWidth
            margin="dense"
          />*/}
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

export default WalletEdtPageFormik;
