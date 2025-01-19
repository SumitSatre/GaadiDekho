import React, { useState, useEffect } from 'react';
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
  Snackbar,
  Alert,
} from '@mui/material';
import { Search as SearchIcon, AccountCircle, MoreVert as MoreVertIcon, Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AuthToken from '../helper/AuthToken';
import logo from "../images/Logo.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [UserAdminStatus, setUserAdminStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
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

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    // Handle logout logic here
    AuthToken.clearToken();
    navigate("/login");
  };

  const handleHomeClick = () => {
    navigate("/"); 
  };

  const handleAboutClick = () => {
    navigate("/about");
  };

  const handleContactClick = () => {
    navigate("/contact");
  };

  const handleDashboardClick = () => {
    navigate("/dashboard"); 
  };

  const UserEmail = AuthToken.getEmail();
  const token = AuthToken.getToken();

  useEffect(() => {
    if (UserEmail && token) {
      fetchUserData(token);
    }
  }, [UserEmail]);

  const fetchUserData = async (token) => {
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch('http://localhost:5000/api/v1/user/info', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      });

      // Await response.json() to correctly handle the JSON body
      const responseData = await response.json(); 

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      if (responseData.success) {
        setUserAdminStatus(responseData.data.isAdmin);
      } else {
        throw new Error(responseData.message || 'Unknown error');
      }
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred while fetching user data');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: '#2575fc', padding: '0 20px' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              alt="Logo"
              src={logo} 
              sx={{
                width: isMobile ? 40 : 60,
                height: isMobile ? 40 : 60,
                border: '2px solid white',
                borderRadius: 0, 
                marginRight: 1,
              }}
            />
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
              GaadiDekho
            </Typography>
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Button sx={{ color: 'white', textTransform: 'none' }} onClick={handleHomeClick}>Home</Button>
              <Button sx={{ color: 'white', textTransform: 'none' }} onClick={handleAboutClick}>About</Button>
              <Button sx={{ color: 'white', textTransform: 'none' }} onClick={handleContactClick}>Contact</Button>

              {/* Conditionally show the Dashboard button */}
              {UserAdminStatus && (
                <Button sx={{ color: 'white', textTransform: 'none' }} onClick={handleDashboardClick}>
                  Dashboard
                </Button>
              )}
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isMobile ? (
              <IconButton sx={{ color: 'white' }} onClick={() => toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            ) : (
              <>
                <IconButton sx={{ color: 'white' }} onClick={toggleSearch}>
                  <SearchIcon />
                </IconButton>

                {showSearch && (
                  <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', borderRadius: 2, padding: '5px 10px', width: '200px' }}>
                    <InputBase placeholder="Search..." sx={{ flex: 1, fontSize: '14px' }} />
                  </Box>
                )}

                {AuthToken.isValidToken() ? (
                  <>
                    <IconButton sx={{ color: 'white' }} onClick={handleMenuClick}>
                      <AccountCircle />
                    </IconButton>
                    <IconButton sx={{ color: 'white' }} onClick={handleMenuClick}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Button
                    sx={{
                      color: 'white',
                      backgroundColor: '#4caf50',
                      borderRadius: '20px',
                      padding: '8px 20px',
                      fontWeight: 'bold',
                      textTransform: 'none',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      '&:hover': {
                        backgroundColor: '#388e3c',
                        boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
                      },
                    }}
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                )}
              </>
            )}
          </Box>
        </Toolbar>

        <Drawer anchor="right" open={drawerOpen} onClose={() => toggleDrawer(false)}>
          <Box sx={{ width: 250 }}>
            <List>
              <ListItem button onClick={() => toggleDrawer(false)}>
                <ListItemText primary="Home" onClick={handleHomeClick} />
              </ListItem>
              <ListItem button onClick={() => toggleDrawer(false)}>
                <ListItemText primary="About" onClick={handleAboutClick} />
              </ListItem>
              <ListItem button onClick={() => toggleDrawer(false)}>
                <ListItemText primary="Contact" onClick={handleContactClick} />
              </ListItem>
              {/* Conditionally show the Dashboard button */}
              {UserAdminStatus && (
                <ListItem button onClick={handleDashboardClick}>
                  <ListItemText primary="Dashboard" />
                </ListItem>
              )}
            </List>
          </Box>
        </Drawer>
      </AppBar>

      {/* Error Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Navbar;
