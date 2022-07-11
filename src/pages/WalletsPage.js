import React, {useState} from 'react';
import Wallet from "../components/Wallet";
import {Grid} from "@mui/material";


const WalletsPage = () => {
  const [wallets, setWallets] = useState({});

  return (

      <Grid container spacing={4}>

        <Wallet/>
        <Wallet/>
        <Wallet/>
        <Wallet/>
      </Grid>

  );
}

export default WalletsPage;
