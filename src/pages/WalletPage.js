import React, {useEffect, useState} from 'react';
import {
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  IconButton,
  Typography,
  Link,
  ListItem,
  ListItemText,
  Box, Button, Dialog, DialogContent, DialogTitle
} from "@mui/material";
import LinearProgressWithLabel from "../components/LinearProgress";
import {Link as RouterLink, useParams} from "react-router-dom";
import {AXIOS_METHOD, doApiCall} from "../hooks/useApi";
import {EditSharp} from "@mui/icons-material";
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import PersonRemoveSharpIcon from '@mui/icons-material/PersonRemoveSharp';
import PersonAddAltSharpIcon from '@mui/icons-material/PersonAddAltSharp';
import AddCardSharpIcon from '@mui/icons-material/AddCardSharp';
import {Formik, Form, Field} from "formik";
import {TextField} from 'formik-mui'
import {useNavigate} from "react-router-dom";

const WalletPage = () => {
  const {id} = useParams();
  const [wallet, setWallet] = useState([]);
  const [transactions, setTransactions] = useState([])
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();
  const nav = () => navigate('/wallets');
  useEffect(()=> {
    doApiCall(AXIOS_METHOD.GET, `wallet/${id}`, (res)=> {
      setWallet(res)
      doApiCall(AXIOS_METHOD.POST, 'transactions',
      (res)=>{
      setTransactions(res.transactions);
      },
      (apiError)=> {
        console.log(apiError);
      },
        {"wallet_id": `${id}`})
    },
    (apiError)=>console.log(apiError));
  },[setWallet, update]);

  const deleteWallet = () => {
    doApiCall(AXIOS_METHOD.DELETE, `wallet/${id}`,
      ()=>nav()
    )
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(wallet);
  console.log(transactions);
  return (
    <>
      <Grid item xs={12}>
        <Card elevation={0}>
          <CardContent>
            <Typography variant="body2" paragraph={true} mt={2} mb={1}>
              <Link component={RouterLink} to={"/wallets"} style={{ fontWeight: 600 }}>{'< Back to wallets'}</Link>
            </Typography>
            <Typography variant="h5" component="div" sx={{mb:1, display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
              {wallet.name}
              <Box className={"buttons"} sx={{ ml: 'auto', alignItems: 'flex-end' }}>
              <IconButton aria-label="edit" size="small" component={RouterLink} to={`/walletedit/${id}`}>
                <EditSharp fontSize="inherit" />
              </IconButton>
              <IconButton aria-label="delete" size="small" onClick={deleteWallet}>
                <DeleteForeverSharpIcon fontSize="inherit" />
              </IconButton>
              <IconButton aria-label="delete" size="small">
                <PersonAddAltSharpIcon fontSize="inherit" />
              </IconButton>
              <IconButton aria-label="delete" size="small" onClick={handleClickOpen}>
                <AddCardSharpIcon fontSize="inherit" />
              </IconButton>
            </Box>
            </Typography>
            <Typography variant="body1">{wallet.description}</Typography>
            <Typography variant="h5" mt={3}>Balance: ${wallet.balance}</Typography>
            <LinearProgressWithLabel value={wallet.balance} goal={wallet.extra?.goalAmount}/>
            <Divider sx={{mt:2}}/>
            <Typography variant="body1" mt={2}>Last five transaction:</Typography>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {
                transactions.map((transaction) => {
                return (
                  <ListItem
                  variant="body2"
                  key={transaction.id}
                  disableGutters
                  secondaryAction={`$${transaction.amount}`}>
                  <ListItemText variant="body2" primary={`${transaction.title}`} />
                  </ListItem>
                )
              })}
            </List>
          </CardContent>
        </Card>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new transaction</DialogTitle>
        <DialogContent>
          <Formik
          initialValues={{
            title: '',
            amount: '',
            wallet_id: `${id}`
          }}
          onSubmit={(values, {setFieldError, setSubmitting}) => {
            setSubmitting(true);
            doApiCall(AXIOS_METHOD.PUT, `transactions`,
              (res)=> {
                console.log('transaction added:'+ res);
                setOpen(false);
                setUpdate(!update);
              },
              (apiError)=> {
                setFieldError('amount', apiError)
              },
              values
            )
          }}>
            <Form>
              <Field
                component={TextField}
                required
                id="title"
                name="title"
                label="Name"
                variant="standard"
                fullWidth
                margin="dense"
                type={"text"}
              />
              <Field
                component={TextField}
                required
                id="amount"
                name="amount"
                label="Amount ($)"
                variant="standard"
                fullWidth
                margin="dense"
                type={"number"}
              />
              <Button type="submit">Add transaction</Button>
              <Button onClick={handleClose} color={"warning"}>Cancel</Button>
            </Form>
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default WalletPage;

