import * as React from 'react';
import '../MobileHeader.css'
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
//drawer 
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';


//icon
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import InterestsIcon from '@mui/icons-material/Interests';
import LoyaltyIcon from '@mui/icons-material/Loyalty';

function MobileHeader() {

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo } = state;


  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };


  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <div className='mobile_header_drawer' >

      <div className='mobile_header_drawer_top'  >
      <Link to='/'  >
            <img src='/logo.png' alt='' className='mobile_header_drawer_top_logo' />
          </Link>
      </div>
        <div className='mobile_header_drawer_center'>
          <Link to='/' style={{ textDecoration: 'none' }} >
            <div className='mobile_header_drawer_center_link_con' >
              <span className='mobile_header_drawer_center_link_con_left' >
                <HomeIcon />
              </span>
              <span className='mobile_header_drawer_center_link_con_right' >Home</span>
            </div>
          </Link>

          <Link to='/search' style={{ textDecoration: 'none' }} >
            <div className='mobile_header_drawer_center_link_con' >
              <span className='mobile_header_drawer_center_link_con_left' >
                <SearchIcon />
              </span>
              <span className='mobile_header_drawer_center_link_con_right' >Explore</span>
            </div>
          </Link>
          <Link to={`/myprofile/${userInfo.slug}`}  style={{ textDecoration: 'none' }} >
            <div className='mobile_header_drawer_center_link_con' >
              <span className='mobile_header_drawer_center_link_con_left' >
                <PersonIcon />
              </span>
              <span className='mobile_header_drawer_center_link_con_right' >Profile</span>
            </div>
          </Link>



        </div>
        <div className='mobile_header_drawer_bottom' >
 
          <button type='submit' className='mobile_header_drawer_bottom_logout' onClick={signoutHandler} >
            <span className='mobile_header_drawer_bottom_logout_icon' ><LogoutIcon /></span>
            <span className='mobile_header_drawer_bottom_logout_text' >Logout</span>
          </button>

        </div>

      </div>
    </Box>
  );

 
  return (
    <div className='mobile_header' >
      
        <div className='mobile_header_left' >

          <Button onClick={toggleDrawer(true)}>
            <span className="btn " >
              <MenuIcon fontSize="large" />

            </span>
          </Button>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>

        </div>
        <div className='mobile_header_center' >
          <Link to='/'  >
            <img src='/logo.png' alt='' className='mobile_header_center_logo' />
          </Link>
        </div>

        <div className='mobile_header_right' >
          <Link style={{ textDecoration: 'none' }} to='/'>
            <span className='mobile_header_right_icon' >

              <img src={userInfo.image} alt='' className='mobile_header_right_profile' />
            </span>
          </Link>

        </div>
      </div>
     
  )
}

export default MobileHeader
