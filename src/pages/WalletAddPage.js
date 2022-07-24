import React from 'react';
import {Formik, Form, Field} from "formik";
import {Button, Typography} from "@mui/material";
import {TextField} from 'formik-mui'
import {AXIOS_METHOD, doApiCall} from "../hooks/useApi";
import {Link, useNavigate} from "react-router-dom";

const WalletEdtPage = () => {
  const navigate = useNavigate();
  const nav = ()=>navigate('/wallets');

  return (
    <>
      <Typography variant="h5" mt={3} mb={3}>Add new wallet</Typography>
      <Formik
        initialValues={{name: '', description: '', extra: {goalAmount:''}}}
        onSubmit={(values, {setFieldError, setSubmitting}) => {
          setSubmitting(true);
          doApiCall(AXIOS_METHOD.PUT, 'wallet',
            ( )=> { nav(); },
            (apiError)=> {
              setSubmitting(false);
              setFieldError('password', apiError)
            },
            values
          )
        }}
      >
        <Form>
          <Field
            component={TextField}
            required
            id="name"
            name="name"
            label="Name"
            variant="standard"
            fullWidth
            margin="dense"
            type={"text"}
          />
          <Field
            component={TextField}
            required
            id="extra.goalAmount"
            name="extra.goalAmount"
            label="Goal amount ($)"
            variant="standard"
            fullWidth
            margin="dense"
            type={"number"}
          />
          <Field
            component={TextField}
            id="description"
            name="description"
            label="Description"
            multiline
            rows={4}
            variant="standard"
            fullWidth
            margin="dense"
            type={"text"}
          />

          <Button fullWidth type="submit" variant="outlined" sx={{mt:3}}>Add wallet</Button>
          <Button component={Link} to={`/wallets`} fullWidth type="submit" variant="outlined" sx={{mt:3}} color={"warning"}>Cancel</Button>
        </Form>
      </Formik>
    </>
  );
}

export default WalletEdtPage;
