import React, { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem } from '@mui/material';
import Logo from "../../../assets/images/logo.png"
import { MdAccountCircle } from 'react-icons/md';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function AppBars() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "#006064" }} >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={Logo} alt="logo" style={{ height: "50px" }} sx={{ mr: 1 }} />

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              ml: 10,
              display: { xs: 'none', md: 'flex' },
              color: 'inherit',
              textDecoration: 'none', fontWeight: "bold", fontSize: "20px"
            }}
          >
            REIZ
          </Typography>



          <Typography
            align="center"
            sx={{
              ml: 10,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              color: 'inherit',
              textDecoration: 'none',
              fontWeight: "bold", fontSize: "20px"
            }}
          >
            REIZ
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar style={{ border: "2px solid #ffffff", backgroundColor: "#006064" }}>
                  <MdAccountCircle style={{ fontSize: 25 }} />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AppBars;
