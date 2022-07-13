import React, {useEffect, useState} from 'react';
import Wallet from "../components/Wallet";
import {Grid} from "@mui/material";
import {AXIOS_METHOD, doApiCall} from "../hooks/useApi";

const WalletsPage = () => {
  const [wallets, setWallets] = useState([]);

  useEffect(()=> {
    doApiCall(AXIOS_METHOD.GET, 'wallets', (res)=> {
      console.log(res);
      setWallets(res);
    },
    (apiError)=> {
      console.log(apiError);
    })
    console.log(wallets);
  }, [setWallets])

  return (
      <Grid container spacing={4}>
        {wallets ? wallets?.map((wallet, index)=>{
          return <Wallet data={wallet} title={wallet.name} description={wallet.description} id={wallet.id} balance={wallet.balance} goal={wallet.extra.goalAmount} key={index}/>
        }) :null }
      </Grid>
  );
}

export default WalletsPage;
