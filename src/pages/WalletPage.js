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
  const [users, setUsers] = useState([]);
  const [dialogTr, setDialogTr] = useState(true);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();
  const nav = () => navigate('/wallets');

  useEffect(()=> {
    doApiCall(AXIOS_METHOD.GET, `wallet/${id}`, (res)=> {
      setWallet(res);
      setUsers(res.access);
      doApiCall(AXIOS_METHOD.POST, 'transactions',
      (res)=>setTransactions(res.transactions),
      (apiError)=>console.log(apiError),
        {"wallet_id": `${id}`})
    },
    (apiError)=>console.log(apiError));
  },[id, update]);

  const deleteWallet = () => {
    doApiCall(AXIOS_METHOD.DELETE, `wallet/${id}`,
      ()=>nav()
    )
  }

  const deleteUser = (user) => {
    doApiCall(AXIOS_METHOD.POST, `wallet/${id}/remove_access`,
      ()=>setUpdate(!update),
      (apiError)=>console.log(apiError),
      {"user_id": user.id}
    )
  }

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
              <IconButton aria-label="editwallet" size="small" component={RouterLink} to={`/walletedit/${id}`}>
                <EditSharp fontSize="inherit" />
              </IconButton>
              <IconButton aria-label="deletewallet" size="small" onClick={deleteWallet}>
                <DeleteForeverSharpIcon fontSize="inherit" />
              </IconButton>
              <IconButton aria-label="adduser" size="small" onClick={()=> {
                setDialogTr(false);
                handleClickOpen();
              }}>
                <PersonAddAltSharpIcon fontSize="inherit" />
              </IconButton>
              <IconButton aria-label="addtransaction" size="small" onClick={()=> {
                setDialogTr(true);
                handleClickOpen();
              }}>
                <AddCardSharpIcon fontSize="inherit" />
              </IconButton>
            </Box>
            </Typography>
            <Typography variant="body1">{wallet.description}</Typography>
            <Typography variant="h5" mt={3}>Balance: ${wallet.balance}</Typography>
            <LinearProgressWithLabel value={(wallet.balance)/(wallet.extra?.goalAmount)*100} goal={wallet.extra?.goalAmount}/>
            <Divider sx={{mt:2}}>Last 5 transaction</Divider>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {transactions ? transactions?.map((transaction) => {
                return (
                  <ListItem
                  variant="body2"
                  key={transaction.id}
                  disableGutters
                  secondaryAction={`$${transaction.amount}`}>
                  {transaction.title}
                  </ListItem>
                )
              }) : null }
            </List>
            <Divider sx={{mt:2}}>Users</Divider>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {users ? users?.map((user, i) => {
               return  (
                 <ListItem
                   variant="body2"
                   key={user.id}
                   disableGutters
                   secondaryAction={ i > 0 ?
                     <IconButton aria-label="deleteuser" size="small" onClick={()=> {
                       deleteUser(user);
                     }}>
                       <PersonRemoveSharpIcon fontSize="inherit" />
                     </IconButton> : null
                   }>
                   {user.name}
                 </ListItem>
               )
              }) : null }
            </List>
          </CardContent>
        </Card>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        { dialogTr ?
          <>
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
                setOpen(false);
                setUpdate(!update);
              },
              (apiError)=> {
                setSubmitting(false);
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
        </>
          :
          <>
            <DialogTitle>Add new user</DialogTitle>
            <DialogContent>
              <Formik
                initialValues={{
                  name: ''
                }}
                onSubmit={(values, {setFieldError, setSubmitting}) => {
                  setSubmitting(true);
                    doApiCall(AXIOS_METHOD.POST, `user/search`,
                      (res)=> {
                        doApiCall(AXIOS_METHOD.POST, `wallet/${id}/grant_access`,
                          (res)=> {
                            setOpen(false);
                            setUpdate(!update);
                          },
                          (apiError)=> {
                            setSubmitting(false)
                            setFieldError('name', apiError)
                          },
                          {"user_id": res})
                      },
                      (apiError)=> {
                        setSubmitting(false)
                        setFieldError('name', apiError)
                      },
                      values
                    )
                }}>
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
                  <Button type="submit">Add user</Button>
                  <Button onClick={handleClose} color={"warning"}>Cancel</Button>
                </Form>
              </Formik>
            </DialogContent>
          </>}
      </Dialog>
    </>
  );
}

export default WalletPage;

