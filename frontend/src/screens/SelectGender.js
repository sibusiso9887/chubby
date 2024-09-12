import React from 'react'
import '../SelectGender.css'
import { Helmet } from "react-helmet-async";
import { Link } from 'react-router-dom';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import FavoriteIcon from '@mui/icons-material/Favorite';

function SelectGender() {
  return (
    <div className='select_gender_page'>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>

      <div className='select_gender_page_top'>
        <img src='/logo.png' className='select_gender_page_top_logo' alt='' />
      </div>

      <div className='select_gender_page_bottom' >

        <h1>Select your gender</h1>

        <div className='select_gender_card_con' >




          <div className='select_gender_card_link' >
            <Link to='/female/account' style={{textDecoration: 'none'}} >
              <span className='select_gender_card_link_icon' ><FemaleIcon /></span>
              <span className='select_gender_card_link_title' >Female</span>
            </Link>
          </div>




          <div className='select_gender_card_link' >
            <Link to='/male/account' style={{textDecoration: 'none'}} >
              <span className='select_gender_card_link_icon' ><MaleIcon /></span>
              <span className='select_gender_card_link_title' >Male</span>
            </Link>
          </div>


        </div>
      </div>

    </div>
  )
}

export default SelectGender