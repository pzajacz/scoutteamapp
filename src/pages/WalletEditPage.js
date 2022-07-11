import React from 'react';
import {Form, useFormik} from "formik";
import {TextField, Button, Typography} from "@mui/material";
import {AXIOS_METHOD, doApiCall} from "../hooks/useApi";

const WalletEdtPage = () => {
  /*const navigation = useNavigate();*/

/*  const nav = ()=> {
    navigation('/wallets')
  }*/

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      extra: {
        'amount': ''
      }
    },

    onSubmit: (values) => {
      console.log(JSON.stringify(values));
      doApiCall(AXIOS_METHOD.PUT, 'wallet',
        (values)=> {
          console.log(values);
        },
        (apiError)=>{
          console.log(apiError);
        },
        values
      )
    },
  });

  return (
    <>
      <Typography variant="h3">Add/Edit wallet</Typography>
      <form onSubmit={formik.handleSubmit}>

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

      </form>
    </>
  );
}

export default WalletEdtPage;
