import React from 'react';
import {Card, CardContent, Divider, Grid, List, ListItem, ListItemText,IconButton, Typography} from "@mui/material";
import LinearProgressWithLabel from "../components/LinearProgress";

const WalletPage = () => {
  return (
    <>
        <Grid item xs={12}>
            <Card elevation={0}>
                <CardContent>
                    <Typography variant="h5" component="div" sx={{mb:1}}>{'Wallet title comes here'}</Typography>
                    <Typography variant="body2">{'Rapidiously disintermediate functional mindshare vis-a-vis web-enabled mindshare. Compellingly reconceptualize superior platforms for distributed systems.'}</Typography>
                    <LinearProgressWithLabel value={75} />
                  <Divider sx={{mt:2}}/>
                  <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {[1, 2, 3].map((value) => (
                      <ListItem
                        key={value}
                        disableGutters
                        secondaryAction={
                          <IconButton aria-label="comment">
                            icic
                          </IconButton>
                        }
                      >
                        <ListItemText variant="body2" primary={`Line item ${value}`} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>

            </Card>
        </Grid>
    </>
  );
}

export default WalletPage;

