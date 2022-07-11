import React from 'react';
import {Form, useFormik} from "formik";
import {TextField, Button, Typography} from "@mui/material";
import {AXIOS_METHOD, doApiCall} from "../hooks/useApi";
import {useNavigate} from "react-router-dom";

const WalletEdtPage = () => {
  const navigate = useNavigate();

  const nav = ()=> {
    navigate('/wallets')
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      extra: {
        goalAmount: '985'
      }
    },

    onSubmit: (values) => {
      console.log(JSON.stringify(values));
      doApiCall(AXIOS_METHOD.PUT, 'wallet',
        (values)=> {
          console.log(values);
          nav()
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
      <Typography variant="h3" mt={3}>Add new wallet</Typography>
      <form onSubmit={formik.handleSubmit}>

          <TextField
            required
            id="name"
            label="Name"
            variant="standard"
            fullWidth
            margin="dense"
            type={"text"}
          />
          <TextField
            required
            id="amount"
            label="Amount"
            variant="standard"
            fullWidth
            margin="dense"
            type={"number"}
          />
          <TextField
            id="description"
            label="Description"
            multiline
            rows={4}
            variant="standard"
            fullWidth
            margin="dense"
            type={"text"}
          />

          <Button fullWidth type="submit" variant="outlined" sx={{mt:3}}>Save wallet</Button>

      </form>
    </>
  );
}

export default WalletEdtPage;
