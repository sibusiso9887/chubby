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
import '../RegisterPage.css'

export default function FemaleSignupScreen() { 
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [gender_pref, setGender_pref] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const { data } = await Axios.post('/api/users/signup', {
        name,
        slug,
        gender,
        gender_pref,
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/createprofile');
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
    <div className='register_page'>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>

      <div className='register_page_top'>
        <img src='/logo.png' className='register_page_top_logo' alt='' />
      </div>
      
      <div className='register_page_bottom' >
      <Form onSubmit={submitHandler} className='register_page_form' >
        <div className='register_form_top' >
          <span>Register</span>
        </div>
        <div className='register_form_center' >
          <Form.Group className="register_page_form_input_container" controlId="name">
            <Form.Label className='register_page_form_input_container_label' >Name</Form.Label>
            <Form.Control
              className='register_form_center_input' onChange={(e) => setName(e.target.value)} required />
          </Form.Group>

          <Form.Group className="register_page_form_input_container" controlId="slug">
            <Form.Label className='register_page_form_input_container_label' >Username</Form.Label>
            <Form.Control
              className='register_form_center_input' onChange={(e) => setSlug(e.target.value)} required />
          </Form.Group>

          <Form.Group className="register_page_form_input_container" controlId="email">
            <Form.Label className='register_page_form_input_container_label' >Email</Form.Label>
            <Form.Control
              className='register_form_center_input'
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="create_profile_page_form_form_input_container" controlId="gender">
              <Form.Label className='create_profile_page_form_form_input_container_label'>Gender</Form.Label>
              <Form.Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className='register_form_center_input'
              >
                <option value="">Select Gender</option>

                <option  value="female">Female</option>
                
              </Form.Select>
            </Form.Group>


            <Form.Group className="create_profile_page_form_form_input_container" controlId="gender">
              <Form.Label className='create_profile_page_form_form_input_container_label'>Gender Pref</Form.Label>
              <Form.Select
                value={gender_pref}
                onChange={(e) => setGender_pref(e.target.value)}
                required
                className='register_form_center_input'
              >
                <option value=""> Select Gender pref</option>
                <option value="male">Male</option>
                
              </Form.Select>
            </Form.Group>

          <Form.Group className="register_page_form_input_container" controlId="password">
            <Form.Label className='register_page_form_input_container_label' >Password</Form.Label>
            <Form.Control
              className='register_form_center_input'
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Group className="register_page_form_input_container" controlId="confirmPassword">
              <Form.Label className='register_page_form_input_container_label' >Confirm Password</Form.Label>
              <Form.Control
                className='register_form_center_input'
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
          </Form.Group>
          
          <div className='register_form_center_btn_con' >
            <button type='submit' className='register_form_center_btn' >Register</button>
          </div>
        </div>
        <div className='register_form_bottom' >
          <span className='register_form_bottom_link_text' >Don't have an account?</span>
          <Link to='/signin' style={{ textDecoration: "none" }} >
            <span className='register_form_bottom_link_register' >Signin</span>
          </Link>
        </div>
      </Form>
      </div>
    </div>
  );
}
