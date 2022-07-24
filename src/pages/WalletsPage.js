import React, {useEffect, useState} from 'react';
import Wallet from "../components/Wallet";
import {Grid} from "@mui/material";
import {AXIOS_METHOD, doApiCall} from "../hooks/useApi";

const WalletsPage = () => {
  const [wallets, setWallets] = useState([]);

  useEffect(()=> {
    doApiCall(AXIOS_METHOD.GET, 'wallets',
      (res)=>setWallets(res),
      (apiError)=>console.log(apiError)
    )}, [setWallets])

  return (
      <Grid container spacing={4}>
        {wallets ? wallets?.map((wallet)=>{
          return <Wallet data={wallet} title={wallet.name} description={wallet.description} id={wallet.id} balance={wallet.balance} goal={wallet.extra.goalAmount} key={wallet.id}/>
        }) : null }
      </Grid>
  );
}

export default WalletsPage;
