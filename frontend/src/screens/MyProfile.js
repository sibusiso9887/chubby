import axios from 'axios';
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import React from 'react'
import '../userpage.css'
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { Store } from '../Store';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { toast } from 'react-toastify';



//icons 
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlaceIcon from '@mui/icons-material/Place';
import InfoIcon from '@mui/icons-material/Info';
import VerifiedIcon from '@mui/icons-material/Verified';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import LanguageIcon from '@mui/icons-material/Language';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LinkIcon from '@mui/icons-material/Link';
import AddLinkIcon from '@mui/icons-material/AddLink';

import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'REFRESH_USER':
      return { ...state, user: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreateReview: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreateReview: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreateReview: false };
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, user: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function MyProfile() {
  let reviewsRef = useRef();

  //design

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //design

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, user, loadingCreateReview }, dispatch] =
    useReducer(reducer, {
      user: [],
      loading: true,
      error: '',
    });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/users/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;


 
  return loading ? (
    <LoadingBox /> 
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className='seller_page' >
    <div className='seller_page_desktop' >
      <div className='seller_page_desktop_con' >
        
        <div className='seller_page_desktop_con_right' >
          <div className='seller_page_desktop_con_right_top' >
            <div className='seller_page_desktop_con_right_top_banner' >
              <img src={user.banner} alt='' className='seller_page_desktop_con_right_top_banner_img' />
            </div>
            <div className='seller_page_desktop_con_right_top_bio' >


              <div className='seller_page_desktop_con_right_top_bio_left' >
                <img src={user.image} alt='' className='seller_page_desktop_con_right_top_bio_left_logo' />
              </div>


              <div className='seller_page_desktop_con_right_top_bio_right' >
                <div className='seller_page_desktop_con_right_top_bio_right_user_info' >
                <div className='seller_page_desktop_con_right_top_bio_right_user_info_left' >
                <span className='seller_page_desktop_con_right_top_bio_right_user_info_name' >{user.name},</span>
                  <span className='seller_page_desktop_con_right_top_bio_right_user_info_age' >{user.age}</span>
                  <span className='seller_page_desktop_con_right_top_bio_right_user_info_verification' ><VerifiedIcon fontSize='small' /></span>
                
                </div>
                <div className='seller_page_desktop_con_right_top_bio_right_user_info_right' >
                <Link to='/profile' style={{textDecoration: 'none'}} >
                    <span className='seller_page_desktop_con_right_top_bio_right_user_info_edit_profile_link' >Edit Profile</span>
                  </Link>
                  </div>

                  

                </div>
                <div className='seller_page_desktop_con_right_top_bio_right_location' >
                  <span className='seller_page_desktop_con_right_top_bio_right_location_icon' ><PlaceIcon /></span>
                  <span className='seller_page_desktop_con_right_top_bio_right_location_province' >{user.province},</span>
                  <span className='seller_page_desktop_con_right_top_bio_right_location_city' >{user.city}</span>
                </div>
                <div className='seller_page_desktop_con_right_top_bio_right_contact' >
                <span className='seller_page_desktop_con_right_top_bio_right_contact_icon' ><CallIcon /></span>

                <Link to='/' >    <span className='seller_page_desktop_con_right_top_bio_right_contact_text' >{user.phone}</span></Link>
              </div>

              <div className='seller_page_desktop_con_right_top_bio_right_contact' >
                <span className='seller_page_desktop_con_right_top_bio_right_contact_icon' ><WhatsAppIcon /></span>

                <Link to='/' >    <span className='seller_page_desktop_con_right_top_bio_right_contact_text' >{user.whatsapp}</span></Link>
              </div>

              <div className='seller_page_desktop_con_right_top_bio_right_contact' >
                <span className='seller_page_desktop_con_right_top_bio_right_contact_icon' ><LinkIcon /></span>
                <Link to='/' > <span className='seller_page_desktop_con_right_top_bio_right_contact_text' >{user.link}</span>
                </Link>
              </div>

              </div>

            </div>

          </div>
          <div className='seller_page_desktop_con_right_bottom' >
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Images" {...a11yProps(0)} />
                <Tab label="Details" {...a11yProps(1)} />
               
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <div className='seller_page_desktop_con_right_bottom_select_details' >
                  <div className='seller_page_desktop_con_right_bottom_select_details_product_list' >
                    <img src={user.image_1} alt='' className='seller_page_desktop_con_right_bottom_select_details_image_list' />
                    <img src={user.image_2} alt='' className='seller_page_desktop_con_right_bottom_select_details_image_list' />
                    <img src={user.image_3} alt='' className='seller_page_desktop_con_right_bottom_select_details_image_list' />
                    <img src={user.image_4} alt='' className='seller_page_desktop_con_right_bottom_select_details_image_list' />
                    <img src={user.image_5} alt='' className='seller_page_desktop_con_right_bottom_select_details_image_list' />
                 
                  </div>
                </div>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <div className='seller_page_desktop_con_right_bottom_select_details' >
                  <div className='seller_page_desktop_con_right_bottom_select_details_seller_info' >
                    <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_con' >
                      <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_name' >
                        <h3>{user.name}</h3>
                      </div>



                      <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_2' >
                        <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_top' >
                          <h5>Location</h5>
                        </div>
                        <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_bottom_2' >
                          <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card' >
                            <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_left' >
                              <span>City</span>
                            </div>
                            <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_right' >
                              <span>{user.city}</span>
                            </div>
                          </div>
                          <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card' >
                            <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_left' >
                              <span>Province</span>
                            </div>
                            <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_right' >
                              <span>{user.province}</span>
                            </div>
                          </div>
                          <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card' >
                            <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_left' >
                              <span>Country</span>
                            </div>
                            <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_right' >
                              <span>{user.country}</span>
                            </div>
                          </div>
                        </div>

                      </div>

                      <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_2' >
                        <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_top' >
                          <h5>Scchool</h5>
                        </div>
                        <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_bottom_2' >
                          <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card' >
                            <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_left' >
                              <span>High School</span>
                            </div>
                            <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_right' >
                              <span>{user.high_school}</span>
                            </div>
                          </div>
                          <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card' >
                            <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_left' >
                              <span>Primary</span>
                            </div>
                            <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_right' >
                              <span>{user.primary_school}</span>
                            </div>
                          </div>
                          <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card' >
                            <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_left' >
                              <span>College</span>
                            </div>
                            <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_right' >
                              <span> {user.college}</span>
                            </div>
                          </div>
                        </div>

                      </div>

                  

                      <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_2' >
                        <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_top' >
                          <h5>Contact Information</h5>
                        </div>
                        <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_bottom_2' >

                          <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card' >
                            <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_left_contact' >
                              <span><EmailIcon /></span>
                            </div>
                            <Link to='' style={{ textDecoration: 'none', color: 'black' }} >
                              <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_right_contact' >
                                <span>{user.email}</span>
                              </div>
                            </Link>
                          </div>
                          <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card' >
                            <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_left_contact' >
                              <span><CallIcon /></span>
                            </div>
                            <Link to='' style={{ textDecoration: 'none', color: 'black' }} >
                              <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_right_contact' >
                                <span>{user.phone}</span>
                              </div>
                            </Link>
                          </div>
                          <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card' >
                            <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_left_contact' >
                              <span><WhatsAppIcon /></span>
                            </div>
                            <Link to='' style={{ textDecoration: 'none', color: 'black' }} >
                              <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_right_contact' >
                                <span>{user.whatsapp}</span>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>

                    </div>
                    <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_description' >
                      <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_description_top' >
                        <h5>Personality</h5>
                      </div>
                      <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_description_bottom' >
                        <li>{user.personality}</li>
                      </div>
                    </div>

                    <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_description' >
                      <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_description_top' >
                        <h5>Looking For</h5>
                      </div>
                      <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_description_bottom' >
                        <li>{user.category}</li>
                      </div>
                    </div>
                    
                     <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_description' >
                      <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_description_top' >
                        <h5>Mindset</h5>
                      </div>
                      <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_description_bottom' >
                        <li>{user.mindset}</li>
                      </div>
                    </div>
                 
                    <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_description' >
                      <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_description_top' >
                        <h5>About me </h5>
                      </div>
                      <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_description_bottom' >
                        <p>{user.about_me}</p>
                      </div>
                    </div>
                   
                    
                  </div>
                </div>
              </CustomTabPanel>
             
            </Box>
          </div>
        </div>
      </div>
    </div>
   
    <div className='seller_page_mobile' >
      <div className='seller_page_desktop_con' >
       
        <div className='seller_page_desktop_con_right' >
          <div className='seller_page_desktop_con_right_top' >
            <div className='seller_page_desktop_con_right_top_banner' >
              <img src={user.banner} alt='' className='seller_page_desktop_con_right_top_banner_img' />
            </div>
            <Link to='/' >    
                <span className='seller_page_desktop_con_right_top_banner_arrow' >
                  <ArrowBackIcon />
                </span>
                </Link>
            <div className='seller_page_desktop_con_right_top_bio' >
           
                
              <div className='seller_page_desktop_con_right_top_bio_left' >
                <img src={user.image} alt='' className='seller_page_desktop_con_right_top_bio_left_logo' />
              </div>


              <div className='seller_page_desktop_con_right_top_bio_right' >
              <div className='seller_page_desktop_con_right_top_bio_right_user_info' >
                <div className='seller_page_desktop_con_right_top_bio_right_user_info_left' >
                <span className='seller_page_desktop_con_right_top_bio_right_user_info_name' >{user.name},</span>
                  <span className='seller_page_desktop_con_right_top_bio_right_user_info_age' >{user.age}</span>
                  <span className='seller_page_desktop_con_right_top_bio_right_user_info_verification' ><VerifiedIcon fontSize='small' /></span>
                
                </div>
                <div className='seller_page_desktop_con_right_top_bio_right_user_info_right' >
                <Link to='/profile' style={{textDecoration: 'none'}} >
                    <span className='seller_page_desktop_con_right_top_bio_right_user_info_edit_profile_link' >Edit Profile</span>
                  </Link>
                  </div>

                  

                </div>
                <div className='seller_page_desktop_con_right_top_bio_right_location' >

                {userInfo.country === 'india' ? (
                <img
                  src=''
                  alt='Indian Flag'
                  className='user_card_details_location_img'
                />
              ) : null}

              {userInfo.country === 'usa' ? (
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/1920px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png'
                  alt='usa Flag'
                  className='user_card_details_location_img'
                />
              ) : null}

              {userInfo.country === 'sa' ? (
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Flag_of_South_Africa.svg/1280px-Flag_of_South_Africa.svg.png'
                  alt='sa Flag'
                  className='user_card_details_location_img'
                />
              ) : null}

              {userInfo.country === 'uk' ? (
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/1920px-Flag_of_the_United_Kingdom_%281-2%29.svg.png'
                  alt='uk Flag'
                  className='user_card_details_location_img'
                />
              ) : null}
                
                  <span className='seller_page_desktop_con_right_top_bio_right_location_province' >{user.province},</span>
                  <span className='seller_page_desktop_con_right_top_bio_right_location_city' >{user.city}</span>
                </div>
                <div className='seller_page_desktop_con_right_top_bio_right_contact' >
                <span className='seller_page_desktop_con_right_top_bio_right_contact_icon' ><CallIcon /></span>

                <Link to='/' >    <span className='seller_page_desktop_con_right_top_bio_right_contact_text' >{user.phone}</span></Link>
              </div>

              <div className='seller_page_desktop_con_right_top_bio_right_contact' >
                <span className='seller_page_desktop_con_right_top_bio_right_contact_icon' ><WhatsAppIcon /></span>

                <Link to='/' >    <span className='seller_page_desktop_con_right_top_bio_right_contact_text' >{user.whatsapp}</span></Link>
              </div>

              <div className='seller_page_desktop_con_right_top_bio_right_contact' >
                <span className='seller_page_desktop_con_right_top_bio_right_contact_icon' ><LinkIcon /></span>
                <Link to='/' > <span className='seller_page_desktop_con_right_top_bio_right_contact_text' >{user.link}</span></Link>
              </div>

              </div>

            </div>

          </div>
          <div className='seller_page_desktop_con_right_bottom' >
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Images" {...a11yProps(0)} />
                <Tab label="Details" {...a11yProps(1)} />
               
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <div className='seller_page_desktop_con_right_bottom_select_details' >
                  <div className='seller_page_desktop_con_right_bottom_select_details_product_list' >
                    <img src={user.image_1} alt='' className='seller_page_desktop_con_right_bottom_select_details_image_list' />
                    <img src={user.image_2} alt='' className='seller_page_desktop_con_right_bottom_select_details_image_list' />
                    <img src={user.image_3} alt='' className='seller_page_desktop_con_right_bottom_select_details_image_list' />
                    <img src={user.image_4} alt='' className='seller_page_desktop_con_right_bottom_select_details_image_list' />
                    <img src={user.image_5} alt='' className='seller_page_desktop_con_right_bottom_select_details_image_list' />
                 
                  </div>
                </div>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <div className='seller_page_desktop_con_right_bottom_select_details' >
                  <div className='seller_page_desktop_con_right_bottom_select_details_seller_info' >
                    <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_con' >
                      <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_name' >
                        <h3>{user.name}</h3>
                      </div>



                      <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_2' >
                        <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_top' >
                          <h5>Location</h5>
                        </div>
                        <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_bottom_2' >
                          <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card' >
                            <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_left' >
                              <span>City</span>
                            </div>
                            <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_right' >
                              <span>{user.city}</span>
                            </div>
                          </div>
                          <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card' >
                            <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_left' >
                              <span>Province</span>
                            </div>
                            <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_right' >
                              <span>{user.province}</span>
                            </div>
                          </div>
                          <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card' >
                            <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_left' >
                              <span>Country</span>
                            </div>
                            <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_right' >
                              <span>{user.country}</span>
                            </div>
                          </div>
                        </div>

                      </div>

                      <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_2' >
                        <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_top' >
                          <h5>Scchool</h5>
                        </div>
                        <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_bottom_2' >
                          <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card' >
                            <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_left' >
                              <span>High School</span>
                            </div>
                            <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_right' >
                              <span>{user.high_school}</span>
                            </div>
                          </div>
                          <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card' >
                            <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_left' >
                              <span>Primary</span>
                            </div>
                            <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_right' >
                              <span>{user.primary_school}</span>
                            </div>
                          </div>
                          <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card' >
                            <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_left' >
                              <span>College</span>
                            </div>
                            <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_right' >
                              <span> {user.college}</span>
                            </div>
                          </div>
                        </div>

                      </div>

                  

                      <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_2' >
                        <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_top' >
                          <h5>Contact Information</h5>
                        </div>
                        <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_bottom_2' >

                          <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card' >
                            <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_left_contact' >
                              <span><EmailIcon /></span>
                            </div>
                            <Link to='' style={{ textDecoration: 'none', color: 'black' }} >
                              <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_right_contact' >
                                <span>{user.email}</span>
                              </div>
                            </Link>
                          </div>
                          <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card' >
                            <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_left_contact' >
                              <span><CallIcon /></span>
                            </div>
                            <Link to='' style={{ textDecoration: 'none', color: 'black' }} >
                              <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_right_contact' >
                                <span>{user.phone}</span>
                              </div>
                            </Link>
                          </div>
                          <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card' >
                            <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_left_contact' >
                              <span><WhatsAppIcon /></span>
                            </div>
                            <Link to='' style={{ textDecoration: 'none', color: 'black' }} >
                              <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_card_right_contact' >
                                <span>{user.whatsapp}</span>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>

                    </div>
                    <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_description' >
                      <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_description_top' >
                        <h5>Personality</h5>
                      </div>
                      <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_description_bottom' >
                        <li>{user.personality}</li>
                      </div>
                    </div>

                    <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_description' >
                      <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_description_top' >
                        <h5>Looking For</h5>
                      </div>
                      <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_description_bottom' >
                        <li>{user.category}</li>
                      </div>
                    </div>
                    
                     <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_description' >
                      <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_description_top' >
                        <h5>Mindset</h5>
                      </div>
                      <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_description_bottom' >
                        <li>{user.mindset}</li>
                      </div>
                    </div>
                 
                    <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_description' >
                      <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_description_top' >
                        <h5>About me </h5>
                      </div>
                      <div className='seller_page_desktop_con_right_bottom_select_details_seller_info_description_bottom' >
                        <p>{user.about_me}</p>
                      </div>
                    </div>
                   
                    
                  </div>
                </div>
              </CustomTabPanel>
             
            </Box>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
export default MyProfile;
