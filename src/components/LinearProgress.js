import React from 'react';
import {Box, Typography} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

export default function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', mt:2 }}>
          <Box sx={{ minWidth: 35 }}>
              <Typography variant="body" color="text.secondary">{'$419'}</Typography>
          </Box>
          <Box sx={{ width: '100%', mr: 1, ml:1 }}>
              <LinearProgress variant="determinate" {...props} />
          </Box>
          <Box sx={{ minWidth: 35 }}>
              <Typography variant="body" color="text.secondary">{`${Math.round(
                props.value,
              )}%`}</Typography>
          </Box>
      </Box>
    );
}


