import React from 'react';
import {Card, CardContent, CardActions, Button, Typography, Grid} from "@mui/material";
import {ArrowForwardIosOutlined} from "@mui/icons-material";
import LinearProgressWithLabel from "./LinearProgress";
import {Link} from "react-router-dom";

const Wallet = (props) => {
  const [title, description, balance, id] = props;
  return (
    <Grid item xs={12}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{mb:1}}>{title}</Typography>
          <Typography variant="body2">{description}</Typography>
          <LinearProgressWithLabel value={balance} />
        </CardContent>
        <CardActions>
          <Button component={Link} to={`/wallet/${id}`} size="small" variant={"outlined"} endIcon={<ArrowForwardIosOutlined />}>Details</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default Wallet;
