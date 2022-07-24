import React, {useEffect, useState} from 'react';
import {Formik, Form, Field} from "formik";
import {Button, Typography} from "@mui/material";
import {TextField} from 'formik-mui'
import {AXIOS_METHOD, doApiCall} from "../hooks/useApi";
import {useNavigate, useParams, Link} from "react-router-dom";

const WalletEdtPage = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const nav = ()=>navigate(`/wallet/${id}`);
  const [wallet, setWallet] = useState({});

  useEffect(()=> {
    doApiCall(AXIOS_METHOD.GET, `/wallet/${id}`,
      (res)=>setWallet(res),
      (apiError)=>console.log(apiError));
  },[id, setWallet]);

  return (
    <>
      <Typography variant="h5" mt={3} mb={3}>Edit <i>{`${wallet.name}`}</i> wallet</Typography>
      <Formik
        enableReinitialize
        initialValues={{
          description: `${wallet.description}`,
          extra: {goalAmount: `${wallet.extra?.goalAmount}`}
        }}
        onSubmit={(values, {setFieldError, setSubmitting}) => {
          setSubmitting(true);
          doApiCall(AXIOS_METHOD.PATCH, `wallet/${id}`,
            ()=> { nav(); },
            (apiError)=> {
              setSubmitting(false);
              setFieldError('description', apiError)
            },
            values
          )
        }}
      >
        <Form>
          <Field
            component={TextField}
            required
            id="extra.goalAmount"
            name="extra.goalAmount"
            label="Goal amount"
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

          <Button fullWidth type="submit" variant="outlined" sx={{mt:3}}>Update wallet</Button>
          <Button component={Link} to={`/wallet/${id}`} fullWidth type="submit" variant="outlined" sx={{mt:3}} color={"warning"}>Cancel</Button>
        </Form>
      </Formik>
    </>
  );
}

export default WalletEdtPage;
