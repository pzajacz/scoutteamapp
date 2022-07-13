import React from 'react';
import {Card, CardContent, CardActions, Button, Typography, Grid} from "@mui/material";
import {ArrowForwardIosOutlined} from "@mui/icons-material";
import LinearProgressWithLabel from "./LinearProgress";
import {Link} from "react-router-dom";

const Wallet = ({title, description, id, goal, balance}) => {
  return (
    <Grid item xs={12}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{mb:1}}>{title}</Typography>
          <Typography variant="body2">{description}</Typography>
          <LinearProgressWithLabel value={balance} goal={goal}/>
        </CardContent>
        <CardActions>
          <Button component={Link} to={`/wallet/${id}`} size="small" variant={"outlined"} endIcon={<ArrowForwardIosOutlined />}>Details</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default Wallet;
