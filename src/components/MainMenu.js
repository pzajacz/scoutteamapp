import React from 'react';
import {Box, Menu, MenuItem, ListItemIcon, Divider, IconButton, Tooltip} from '@mui/material';
import {AccountBalanceWalletOutlined, AddCardOutlined, MenuOutlined, Settings, Logout} from "@mui/icons-material";
import {Link} from "react-router-dom";
import WalletsPage from "../pages/WalletsPage";
import ProfileEditPage from "../pages/ProfileEditPage";
import {useAuth} from "../hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import WalletAddPage from "../pages/WalletAddPage";

const MainMenu = () => {
    const navigate = useNavigate();
    const {logout} = useAuth()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
      <>
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'right', justifyContent: 'space-between' }}>
              <Link to={"/wallets"} element={<WalletsPage/>}>LOGO</Link>
              <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                      <MenuOutlined sx={{ width: 32, height: 32 }}/>
                  </IconButton>
              </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    }
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
              <MenuItem>
                  <ListItemIcon>
                      <AccountBalanceWalletOutlined fontSize="small" />
                  </ListItemIcon>
                  <Link to={"/wallets"} element={<WalletsPage/>}>My wallets</Link>
              </MenuItem>
              <Divider />
              <MenuItem>
                  <ListItemIcon>
                      <AddCardOutlined fontSize="small" />
                  </ListItemIcon>
                  <Link to={"/addwallet"} element={<WalletAddPage/>}>Add wallet</Link>
              </MenuItem>
              <MenuItem>
                  <ListItemIcon>
                      <Settings fontSize="small" />
                  </ListItemIcon>
                  <Link to={"/settings"} element={<ProfileEditPage/>}>Profile settings</Link>

              </MenuItem>
              <MenuItem onClick={()=> {
                  logout();
                  navigate('/');
              }}>
                  <ListItemIcon>
                      <Logout fontSize="small"/>
                  </ListItemIcon>
                  Logout
              </MenuItem>
          </Menu>
          <Divider/>
      </>
    );
}

export default MainMenu;

