import React, { useContext, useReducer, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';



import axios from 'axios';
import '../ProfilePage.css'


//icon
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

import LogoutIcon from '@mui/icons-material/Logout';
import MobileHeader from '../components/MobileHeader';



const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };

    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };


    default:
      return state;
  }
};

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [name, setName] = useState(userInfo.name);
  const [gender, setGender] = useState(userInfo.gender);
  const [gender_pref, setGender_pref] = useState(userInfo.gender_pref);
  const [category, setCategory] = useState(userInfo.category);
  const [size, setSize] = useState(userInfo.size);
  const [body, setBody] = useState(userInfo.body);
  const [country, setCountry] = useState(userInfo.country);
  const [personality, setPersonality] = useState(userInfo.personality);
  const [mindset, setMindset] = useState(userInfo.mindset);
  const [age, setAge] = useState(userInfo.age);
  const [province, setProvince] = useState(userInfo.province);
  const [city, setCity] = useState(userInfo.city);



  const [phone, setPhone] = useState(userInfo.phone);
  const [whatsapp, setWhatsapp] = useState(userInfo.whatsapp);
  const [instagram, setInstagram] = useState(userInfo.instagram);

  const [link, setLink] = useState(userInfo.link);
  const [high_school, setHigh_school] = useState(userInfo.high_school);
  const [primary_school, setPrimary_school] = useState(userInfo.primary_school);
  const [college, setCollege] = useState(userInfo.college);
  const [about_me, setAbout_me] = useState(userInfo.about_me);


  const [{ loading, loadingUpdate, error, loadingUpload }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
    loading: true,
    error: '',
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        '/api/users/profile',
        {
          name,
          gender,
          gender_pref,
          category,
          size,
          body,
          country,
          personality,
          mindset,

          age,
          province,
          city,

          phone,
          whatsapp,
          instagram,
          link,
          high_school,
          college,
          about_me,
          primary_school,

        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('User updated successfully');
      navigate('/');
    } catch (err) {
      dispatch({
        type: 'FETCH_FAIL',
      });
      toast.error(getError(err));
    }
  };



  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };



  return (
    <div className="edit_profile_page">
      <Helmet>
        <title>Update Profile</title>
      </Helmet>

      <div className='edit_profile_desktop_page' >
        <div className='edit_profile_desktop_page_left' >
          <div className='edit_profile_desktop_page_left_side_bar' >

            <div className='edit_profile_desktop_page_left_side_bar_top'  >
              <Link to='/'  >
                <img src='/logo.png' alt='' className='edit_profile_desktop_page_left_side_bar_top_logo' />
              </Link>
            </div>
            <div className='edit_profile_desktop_page_left_side_bar_center'>
              <Link to='/' style={{ textDecoration: 'none' }} >
                <div className='edit_profile_desktop_page_left_side_bar_center_link_con' >
                  <span className='edit_profile_desktop_page_left_side_bar_center_link_con_left' >
                    <HomeIcon />
                  </span>
                  <span className='edit_profile_desktop_page_left_side_bar_center_link_con_right' >Home</span>
                </div>
              </Link>

              <Link to='/search' style={{ textDecoration: 'none' }} >
                <div className='edit_profile_desktop_page_left_side_bar_center_link_con' >
                  <span className='edit_profile_desktop_page_left_side_bar_center_link_con_left' >
                    <SearchIcon />
                  </span>
                  <span className='edit_profile_desktop_page_left_side_bar_center_link_con_right' >Explore</span>
                </div>
              </Link>
              <Link to={`/myprofile/${userInfo.slug}`} style={{ textDecoration: 'none' }} >
                <div className='edit_profile_desktop_page_left_side_bar_center_link_con' >
                  <span className='edit_profile_desktop_page_left_side_bar_center_link_con_left' >
                    <PersonIcon />
                  </span>
                  <span className='edit_profile_desktop_page_left_side_bar_center_link_con_right' >Profile</span>
                </div>
              </Link>



            </div>
            <div className='edit_profile_desktop_page_left_side_bar_bottom' >

              <button type='submit' className='edit_profile_desktop_page_left_side_bar_bottom_logout' onClick={signoutHandler} >
                <span className='edit_profile_desktop_page_left_side_bar_bottom_logout_icon' ><LogoutIcon /></span>
                <span className='edit_profile_desktop_page_left_side_bar_bottom_logout_text' >Logout</span>
              </button>

            </div>

          </div>
        </div>
        <div className='edit_profile_desktop_page_right' >
          <div className='edit_profile_page_bottom'>

            <Form className='edit_profile_form' onSubmit={submitHandler}>
              <div className='edit_profile_page_form_top' >
                <span>Edit Profile</span>
              </div>
              <div className='edit_profile_page_form_center' >


                <Form.Group className="edit_profile_page_form_form_input_container" controlId="name">
                  <Form.Label className='edit_profile_page_form_form_input_container_label' > Name</Form.Label>
                  <Form.Control
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className='register_form_center_input'
                  />
                </Form.Group>

                <Form.Group className="edit_profile_page_form_form_input_container" controlId="gender">
                  <Form.Label className='edit_profile_page_form_form_input_container_label'>Gender</Form.Label>
                  <Form.Select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                    className='register_form_center_input'
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="edit_profile_page_form_form_input_container" controlId="gender_pref">
                  <Form.Label className='edit_profile_page_form_form_input_container_label'>Gender Pref</Form.Label>
                  <Form.Select
                    value={gender_pref}
                    onChange={(e) => setGender_pref(e.target.value)}
                    required
                    className='register_form_center_input'
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="edit_profile_page_form_form_input_container" controlId="category">
                  <Form.Label className='edit_profile_page_form_form_input_container_label'>What are you looking for</Form.Label>
                  <Form.Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className='register_form_center_input'
                  >
                    <option value="">What are looking for</option>
                    <option value="blind date">Blind date</option>
                    <option value="onenight">One Night</option>
                    <option value="friends">Friends</option>
                    <option value="open relationship">Open Relationship</option>
                    <option value="serious relationship">Serious Relationship</option>
                    <option value="casual relationship">Casual Relationship</option>
                    <option value="speed date">Speed Date</option>
                    <option value="friends with benefits">Friends With Benefits</option>
                    <option value="long distance relationship">Long Distance Relationship</option>

                  </Form.Select>
                </Form.Group>

                <Form.Group className="edit_profile_page_form_form_input_container" controlId="size">
                  <Form.Label className='edit_profile_page_form_form_input_container_label'>Size</Form.Label>
                  <Form.Select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    required
                    className='register_form_center_input'
                  >
                    <option value="">Select Size</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="extralarge">Extra Large</option>
                  </Form.Select>
                </Form.Group>

                <>
                  {userInfo.gender === 'female' ? (
                    <Form.Group className="edit_profile_page_form_form_input_container" controlId="body">
                      <Form.Label className='edit_profile_page_form_form_input_container_label'>Body 1</Form.Label>
                      <Form.Select
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                        className='register_form_center_input'
                      >
                        <option value="">Select body</option>
                        <option value="chubby">Chubby</option>
                        <option value="thick">Thick</option>
                      </Form.Select>
                    </Form.Group>
                  ) : (
                    <Form.Group className="edit_profile_page_form_form_input_container" controlId="body">
                      <Form.Label className='edit_profile_page_form_form_input_container_label'>Body 2</Form.Label>
                      <Form.Select
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                        className='register_form_center_input'
                      >
                        <option value="">Select body</option>
                        <option value="slim">Slim</option>
                        <option value="chubby">Chubby</option>
                        <option value="average">Average</option>

                      </Form.Select>
                    </Form.Group>
                  )}
                </>

                <Form.Group className="edit_profile_page_form_form_input_container" controlId="country">
                  <Form.Label className='edit_profile_page_form_form_input_container_label'>Country</Form.Label>
                  <Form.Select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    className='register_form_center_input'
                  >
                    <option value="">Select country</option>
                    <option value="uk">United Kingdom</option>
                    <option value="usa">United States</option>
                    <option value="sa">South Africa</option>
                    <option value="indial">Indial</option>
                    <option value="nigeria">Nigeria</option>
                  </Form.Select>
                </Form.Group>


                <Form.Group className="edit_profile_page_form_form_input_container" controlId="personality">
                  <Form.Label className='edit_profile_page_form_form_input_container_label'>Personality</Form.Label>
                  <Form.Select
                    value={personality}
                    onChange={(e) => setPersonality(e.target.value)}
                    required
                    className='register_form_center_input'
                  >
                    <option value="">Select personality</option>
                    <option value="introvert">Introvert</option>
                    <option value="extrovert">Extrovert</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="edit_profile_page_form_form_input_container" controlId="mindset">
                  <Form.Label className='edit_profile_page_form_form_input_container_label'>Mindset</Form.Label>
                  <Form.Select
                    value={mindset}
                    onChange={(e) => setMindset(e.target.value)}
                    required
                    className='register_form_center_input'
                  >
                    <option value="">Select mindset</option>
                    <option value="modern">Modern</option>
                    <option value="traditional">Traditional</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="edit_profile_page_form_form_input_container" controlId="age">
                  <Form.Label className='edit_profile_page_form_form_input_container_label' > Age</Form.Label>
                  <Form.Control
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                    className='register_form_center_input'
                  />
                </Form.Group>

                <Form.Group className="edit_profile_page_form_form_input_container" controlId="province">
                  <Form.Label className='edit_profile_page_form_form_input_container_label' > province</Form.Label>
                  <Form.Control
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    required
                    className='register_form_center_input'
                  />
                </Form.Group>
                <Form.Group className="edit_profile_page_form_form_input_container" controlId="city">
                  <Form.Label className='edit_profile_page_form_form_input_container_label' > city</Form.Label>
                  <Form.Control
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className='register_form_center_input'
                  />
                </Form.Group>
                <Form.Group className="edit_profile_page_form_form_input_container" controlId="phone">
                  <Form.Label className='edit_profile_page_form_form_input_container_label' > phone</Form.Label>
                  <Form.Control
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className='register_form_center_input'
                  />
                </Form.Group>
                <Form.Group className="edit_profile_page_form_form_input_container" controlId="whatsapp">
                  <Form.Label className='edit_profile_page_form_form_input_container_label' > whatsapp</Form.Label>
                  <Form.Control
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    required
                    className='register_form_center_input'
                  />
                </Form.Group>
                <Form.Group className="edit_profile_page_form_form_input_container" controlId="instagram">
                  <Form.Label className='edit_profile_page_form_form_input_container_label' > instagram</Form.Label>
                  <Form.Control
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    required
                    placeholder='instagram @username'
                    className='register_form_center_input'
                  />
                </Form.Group>
                <Form.Group className="edit_profile_page_form_form_input_container" controlId="link">
                  <Form.Label className='edit_profile_page_form_form_input_container_label' > link</Form.Label>
                  <Form.Control
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    required
                    placeholder='linktree Link'
                    className='register_form_center_input'
                  />
                </Form.Group>
                <Form.Group className="edit_profile_page_form_form_input_container" controlId="high_school">
                  <Form.Label className='edit_profile_page_form_form_input_container_label' > high_school</Form.Label>
                  <Form.Control
                    value={high_school}
                    onChange={(e) => setHigh_school(e.target.value)}
                    required
                    className='register_form_center_input'
                  />
                </Form.Group>
                <Form.Group className="edit_profile_page_form_form_input_container" controlId="primary_school">
                  <Form.Label className='edit_profile_page_form_form_input_container_label' > primary_school</Form.Label>
                  <Form.Control
                    value={primary_school}
                    onChange={(e) => setPrimary_school(e.target.value)}
                    required
                    className='register_form_center_input'
                  />
                </Form.Group>
                <Form.Group className="edit_profile_page_form_form_input_container" controlId="college">
                  <Form.Label className='edit_profile_page_form_form_input_container_label' > college</Form.Label>
                  <Form.Control
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    required
                    className='register_form_center_input'
                  />
                </Form.Group>
                <Form.Group className="edit_profile_page_form_form_input_container" controlId="about_me">
                  <Form.Label className='edit_profile_page_form_form_input_container_label' > About Me</Form.Label>
                  <Form.Control
                    value={about_me}
                    onChange={(e) => setAbout_me(e.target.value)}
                    required
                    className='register_form_center_input'
                  />
                </Form.Group>
              </div>
              <div className='edit_profile_page_form_bottom' >
                <Button className='edit_profile_page_form_bottom_btn' type="submit">Update Profile</Button>
              </div>
              {loadingUpdate && <LoadingBox></LoadingBox>}
            </Form>
          </div>
        </div>
      </div>
      <div className='edit_profile_mobile_page' > 
        <MobileHeader />
        <div className='edit_profile_mobile_page_bottom'>

            <Form className='edit_profile_form' onSubmit={submitHandler}>
              <div className='edit_profile_page_form_top' >
                <span>Edit Profile</span>
              </div>
              <div className='edit_profile_page_form_center' >


                <Form.Group className="edit_profile_page_form_form_input_container" controlId="name">
                  <Form.Label className='edit_profile_page_form_form_input_container_label' > Name</Form.Label>
                  <Form.Control
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className='register_form_center_input'
                  />
                </Form.Group>

                <Form.Group className="edit_profile_page_form_form_input_container" controlId="gender">
                  <Form.Label className='edit_profile_page_form_form_input_container_label'>Gender</Form.Label>
                  <Form.Select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                    className='register_form_center_input'
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="edit_profile_page_form_form_input_container" controlId="gender_pref">
                  <Form.Label className='edit_profile_page_form_form_input_container_label'>Gender Pref</Form.Label>
                  <Form.Select
                    value={gender_pref}
                    onChange={(e) => setGender_pref(e.target.value)}
                    required
                    className='register_form_center_input'
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="edit_profile_page_form_form_input_container" controlId="category">
                  <Form.Label className='edit_profile_page_form_form_input_container_label'>What are you looking for</Form.Label>
                  <Form.Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className='register_form_center_input'
                  >
                    <option value="">What are looking for</option>
                    <option value="blind date">Blind date</option>
                    <option value="onenight">One Night</option>
                    <option value="friends">Friends</option>
                    <option value="open relationship">Open Relationship</option>
                    <option value="serious relationship">Serious Relationship</option>
                    <option value="casual relationship">Casual Relationship</option>
                    <option value="speed date">Speed Date</option>
                    <option value="friends with benefits">Friends With Benefits</option>
                    <option value="long distance relationship">Long Distance Relationship</option>

                  </Form.Select>
                </Form.Group>

                <Form.Group className="edit_profile_page_form_form_input_container" controlId="size">
                  <Form.Label className='edit_profile_page_form_form_input_container_label'>Size</Form.Label>
                  <Form.Select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    required
                    className='register_form_center_input'
                  >
                    <option value="">Select Size</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="extralarge">Extra Large</option>
                  </Form.Select>
                </Form.Group>

                <>
                  {userInfo.gender === 'female' ? (
                    <Form.Group className="edit_profile_page_form_form_input_container" controlId="body">
                      <Form.Label className='edit_profile_page_form_form_input_container_label'>Body 1</Form.Label>
                      <Form.Select
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                        className='register_form_center_input'
                      >
                        <option value="">Select body</option>
                        <option value="chubby">Chubby</option>
                        <option value="thick">Thick</option>
                      </Form.Select>
                    </Form.Group>
                  ) : (
                    <Form.Group className="edit_profile_page_form_form_input_container" controlId="body">
                      <Form.Label className='edit_profile_page_form_form_input_container_label'>Body 2</Form.Label>
                      <Form.Select
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                        className='register_form_center_input'
                      >
                        <option value="">Select body</option>
                        <option value="slim">Slim</option>
                        <option value="chubby">Chubby</option>
                        <option value="average">Average</option>

                      </Form.Select>
                    </Form.Group>
                  )}
                </>

                <Form.Group className="edit_profile_page_form_form_input_container" controlId="country">
                  <Form.Label className='edit_profile_page_form_form_input_container_label'>Country</Form.Label>
                  <Form.Select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    className='register_form_center_input'
                  >
                    <option value="">Select country</option>
                    <option value="uk">United Kingdom</option>
                    <option value="usa">United States</option>
                    <option value="sa">South Africa</option>
                    <option value="indial">Indial</option>
                    <option value="nigeria">Nigeria</option>
                  </Form.Select>
                </Form.Group>


                <Form.Group className="edit_profile_page_form_form_input_container" controlId="personality">
                  <Form.Label className='edit_profile_page_form_form_input_container_label'>Personality</Form.Label>
                  <Form.Select
                    value={personality}
                    onChange={(e) => setPersonality(e.target.value)}
                    required
                    className='register_form_center_input'
                  >
                    <option value="">Select personality</option>
                    <option value="introvert">Introvert</option>
                    <option value="extrovert">Extrovert</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="edit_profile_page_form_form_input_container" controlId="mindset">
                  <Form.Label className='edit_profile_page_form_form_input_container_label'>Mindset</Form.Label>
                  <Form.Select
                    value={mindset}
                    onChange={(e) => setMindset(e.target.value)}
                    required
                    className='register_form_center_input'
                  >
                    <option value="">Select mindset</option>
                    <option value="modern">Modern</option>
                    <option value="traditional">Traditional</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="edit_profile_page_form_form_input_container" controlId="age">
                  <Form.Label className='edit_profile_page_form_form_input_container_label' > Age</Form.Label>
                  <Form.Control
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                    className='register_form_center_input'
                  />
                </Form.Group>

                <Form.Group className="edit_profile_page_form_form_input_container" controlId="province">
                  <Form.Label className='edit_profile_page_form_form_input_container_label' > province</Form.Label>
                  <Form.Control
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    required
                    className='register_form_center_input'
                  />
                </Form.Group>
                <Form.Group className="edit_profile_page_form_form_input_container" controlId="city">
                  <Form.Label className='edit_profile_page_form_form_input_container_label' > city</Form.Label>
                  <Form.Control
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className='register_form_center_input'
                  />
                </Form.Group>
                <Form.Group className="edit_profile_page_form_form_input_container" controlId="phone">
                  <Form.Label className='edit_profile_page_form_form_input_container_label' > phone</Form.Label>
                  <Form.Control
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className='register_form_center_input'
                  />
                </Form.Group>
                <Form.Group className="edit_profile_page_form_form_input_container" controlId="whatsapp">
                  <Form.Label className='edit_profile_page_form_form_input_container_label' > whatsapp</Form.Label>
                  <Form.Control
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    required
                    className='register_form_center_input'
                  />
                </Form.Group>
                <Form.Group className="edit_profile_page_form_form_input_container" controlId="instagram">
                  <Form.Label className='edit_profile_page_form_form_input_container_label' > instagram</Form.Label>
                  <Form.Control
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    required
                    placeholder='instagram @username'
                    className='register_form_center_input'
                  />
                </Form.Group>
                <Form.Group className="edit_profile_page_form_form_input_container" controlId="link">
                  <Form.Label className='edit_profile_page_form_form_input_container_label' > link</Form.Label>
                  <Form.Control
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    required
                    placeholder='linktree @username'
                    className='register_form_center_input'
                  />
                </Form.Group>
                <Form.Group className="edit_profile_page_form_form_input_container" controlId="high_school">
                  <Form.Label className='edit_profile_page_form_form_input_container_label' > high_school</Form.Label>
                  <Form.Control
                    value={high_school}
                    onChange={(e) => setHigh_school(e.target.value)}
                    required
                    className='register_form_center_input'
                  />
                </Form.Group>
                <Form.Group className="edit_profile_page_form_form_input_container" controlId="primary_school">
                  <Form.Label className='edit_profile_page_form_form_input_container_label' > primary_school</Form.Label>
                  <Form.Control
                    value={primary_school}
                    onChange={(e) => setPrimary_school(e.target.value)}
                    required
                    className='register_form_center_input'
                  />
                </Form.Group>
                <Form.Group className="edit_profile_page_form_form_input_container" controlId="college">
                  <Form.Label className='edit_profile_page_form_form_input_container_label' > college</Form.Label>
                  <Form.Control
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    required
                    className='register_form_center_input'
                  />
                </Form.Group>
                <Form.Group className="edit_profile_page_form_form_input_container" controlId="about_me">
                  <Form.Label className='edit_profile_page_form_form_input_container_label' > About Me</Form.Label>
                  <Form.Control
                    value={about_me}
                    onChange={(e) => setAbout_me(e.target.value)}
                    required
                    className='register_form_center_input'
                  />
                </Form.Group>
              </div>
              <div className='edit_profile_page_form_bottom' >
                <Button className='edit_profile_page_form_bottom_btn' type="submit">Update Profile</Button>
              </div>
              {loadingUpdate && <LoadingBox></LoadingBox>}
            </Form>
          </div>

      </div>



    </div>
  );
}
