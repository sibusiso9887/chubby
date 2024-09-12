import React, { useState } from 'react';
import '../MobileSearchPage.css'
import {Link} from 'react-router-dom'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';

import { useNavigate } from 'react-router-dom';

function MobileSearchPage() {
    const navigate = useNavigate(); 
  const [query, setQuery] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };
    return (
        <div className='mobile_search_page' >
            <form className='mobile_search_form' onSubmit={submitHandler} >
                <div className='mobile_search_form_left' >
                    <Link to='/'>
                        <span className='mobile_search_form_left_icon' >
                            <ArrowBackIcon />
                        </span>
                    </Link>
                </div>
                <div className='mobile_search_form_center' >
                    <input type="text" name="q" id="q" onChange={(e) => setQuery(e.target.value)} placeholder='serach users' className='mobile_search_form_center_input' />
                </div>
                <div className='mobile_search_form_left_right' >
                    <button type="submit" className='mobile_search_form_left_right_btn_icon' >
                        <SendIcon />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default MobileSearchPage