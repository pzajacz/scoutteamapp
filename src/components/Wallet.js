import React from 'react';
import {Card, CardContent, CardActions, Button, Typography, Grid} from "@mui/material";
import {ArrowForwardIosOutlined} from "@mui/icons-material";
import LinearProgressWithLabel from "./LinearProgress";
import {Link} from "react-router-dom";

const Wallet = () => {
  return (
    <Grid item xs={12}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{mb:1}}>{'Wallet title comes here'}</Typography>
          <Typography variant="body2">{'Rapidiously disintermediate functional mindshare vis-a-vis web-enabled mindshare. Compellingly reconceptualize superior platforms for distributed systems.'}</Typography>
          <LinearProgressWithLabel value={75} />
        </CardContent>
        <CardActions>
          <Button component={Link} to={'/wallet/123'} size="small" variant={"outlined"} endIcon={<ArrowForwardIosOutlined />}>Details</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default Wallet;
