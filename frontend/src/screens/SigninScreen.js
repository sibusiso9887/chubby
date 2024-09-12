import Axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import '../LoginPage.css'

export default function SigninScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post('/api/users/signin', {
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div className='login_page'>
      
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <div className='login_page_top'>
        <img src='/logo.png' className='login_page_top_logo' alt='' />
      </div>
      
      <div className='login_page_bottom' >
      <Form className='login_form' onSubmit={submitHandler}> 
      <div className='login_form_top' >
          <span>Login</span>
        </div>
        <div className='login_form_center' >
        <Form.Group  className="login_form_center_input_con" controlId="email">
          <Form.Label className="login_form_center_input_label" >Email</Form.Label>
          <Form.Control
           className="login_form_center_input"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group  className="login_form_center_input_con" controlId="password">
          <Form.Label className="login_form_center_input_label" >Password</Form.Label>
          <Form.Control
           className="login_form_center_input"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
       
        <div className='login_form_center_password_con' >
            <Link to={`/forget-password`}>
              <span className='login_form_center_password_link' >Forgot Password</span>
            </Link>
          </div>
          <div className='login_form_center_btn_con' >
            <button type='submit' className='login_form_center_btn' >Login</button>
          </div>
          </div>
          <div className='login_form_bottom' >
          <span className='login_form_bottom_link_text' >Don't have an account?</span>
          <Link to={`/selectgender?redirect=${redirect}`} style={{ textDecoration: "none" }} >
            <span className='login_form_bottom_link_register' >Register</span>
          </Link>
        </div>
       
      </Form>
      </div>
     
    </div>
  );
}
