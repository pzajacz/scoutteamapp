import React from 'react';
import Wallet from "../components/Wallet";
import {Grid} from "@mui/material";

const WalletsPage = () => {
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
