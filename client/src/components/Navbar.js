import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Box,
  Button,
  Avatar,
  Menu,
  MenuItem,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Search as SearchIcon, AccountCircle, MoreVert as MoreVertIcon, Menu as MenuIcon } from '@mui/icons-material';

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#2575fc', padding: '0 20px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo and Website Name */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            alt="Logo"
            src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            sx={{
              width: 40,
              height: 40,
              border: '2px solid white',
              marginRight: 1,
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
            GaadiDekho
          </Typography>
        </Box>

        {/* Center Section: Navigation Links (Hidden on Mobile) */}
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Button sx={{ color: 'white', textTransform: 'none' }}>Home</Button>
            <Button sx={{ color: 'white', textTransform: 'none' }}>About</Button>
            <Button sx={{ color: 'white', textTransform: 'none' }}>Services</Button>
            <Button sx={{ color: 'white', textTransform: 'none' }}>Contact</Button>
          </Box>
        )}

        {/* Right Section: User Profile and Search (Hamburger menu on mobile) */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {isMobile ? (
            <IconButton sx={{ color: 'white' }} onClick={() => toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              {/* Search Button */}
              <IconButton sx={{ color: 'white' }} onClick={toggleSearch}>
                <SearchIcon />
              </IconButton>

              {showSearch && (
                <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', borderRadius: 2, padding: '5px 10px', width: '200px' }}>
                  <InputBase placeholder="Search..." sx={{ flex: 1, fontSize: '14px' }} />
                </Box>
              )}

              {/* User Account Menu */}
              <IconButton sx={{ color: 'white' }} onClick={handleMenuClick}>
                <AccountCircle />
              </IconButton>

              {/* More Options (Mobile/Small Screens) */}
              <IconButton sx={{ color: 'white' }} onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>

              {/* Menu */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>

      {/* Drawer for Mobile Navigation */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => toggleDrawer(false)}>
        <Box sx={{ width: 250 }}>
          <List>
            <ListItem button onClick={() => toggleDrawer(false)}>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={() => toggleDrawer(false)}>
              <ListItemText primary="About" />
            </ListItem>
            <ListItem button onClick={() => toggleDrawer(false)}>
              <ListItemText primary="Services" />
            </ListItem>
            <ListItem button onClick={() => toggleDrawer(false)}>
              <ListItemText primary="Contact" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
