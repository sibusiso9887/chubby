import React, { useState } from 'react';
import '../SearchForm.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
export default function SearchForm() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };

  return (
    <form className="search_form" onSubmit={submitHandler}>
     
        <input
          type="text"
          name="q"
          id="q"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search Thick and Chubby..."
       
          className="search_form_input" 
        />
        <button type='submit' className='search_form_btn' >
        <SearchIcon />
        </button>
    
    </form>
  );
}
 