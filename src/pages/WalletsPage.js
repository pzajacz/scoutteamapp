import React, {useEffect, useState} from 'react';
import Wallet from "../components/Wallet";
import {Grid} from "@mui/material";
import {AXIOS_METHOD, doApiCall} from "../hooks/useApi";


const WalletsPage = () => {
  const [wallets, setWallets] = useState({});

  useEffect(()=> {
    doApiCall(AXIOS_METHOD.GET, 'wallets', (data)=> {
      console.log('data');
      setWallets(data);
    },
      (apiError)=> {
        console.log(apiError);
      })
    console.log(wallets);
  }, [wallets])



  return (

      <Grid container spacing={4}>

{/*        {
          wallets.map((wallet) => {
            return (
              <Wallet/>
            )
          })
        }*/}

{/*        <Wallet/>
        <Wallet/>
        <Wallet/>
        <Wallet/>*/}
      </Grid>

  );
}

export default WalletsPage;
