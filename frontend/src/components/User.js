import React from 'react';
import PropTypes from 'prop-types';
import '../User.css';
import { Link } from 'react-router-dom';
// Icons
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlaceIcon from '@mui/icons-material/Place';
import InfoIcon from '@mui/icons-material/Info';
import VerifiedIcon from '@mui/icons-material/Verified';

function User(props) {
  const { user } = props;
  return (
    <div className='user_card'>
      <img
        src={user.image}
        alt={user.name}
        className='user_card_img'
      />
      <div className='user_card_details'>
        <Link
          to={`/user/${user.slug}`}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <div className='user_card_details_top'>
            <span className='user_card_details_name'>{user.name},</span>
            <span className='user_card_details_age'>{user.age}</span>
            <span className='user_card_details_verification'>
              <VerifiedIcon />
            </span>
          </div>
        </Link>
        <div className='user_card_details_bottom'>
          <div className='user_card_details_location'>
            <span className='user_card_details_location_icon'>
              {user.country === 'india' ? (
                <img
                  src=''
                  alt='Indian Flag'
                  className='user_card_details_location_img'
                />
              ) : null}

              {user.country === 'usa' ? (
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/1920px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png'
                  alt='usa Flag'
                  className='user_card_details_location_img'
                />
              ) : null}

              {user.country === 'sa' ? (
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Flag_of_South_Africa.svg/1280px-Flag_of_South_Africa.svg.png'
                  alt='sa Flag'
                  className='user_card_details_location_img'
                />
              ) : null}

              {user.country === 'uk' ? (
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/1920px-Flag_of_the_United_Kingdom_%281-2%29.svg.png'
                  alt='uk Flag'
                  className='user_card_details_location_img'
                />
              ) : null}




            </span>
            <span className='user_card_details_location_province'>{user.province}</span>,
            <span className='user_card_details_location_city'>{user.city}</span>
          </div>
        </div>
      </div>
    </div>
  );
}



export default User;
