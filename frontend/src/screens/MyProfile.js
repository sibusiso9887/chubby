import axios from 'axios';
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import React from 'react'
import '../MyProfile.css'
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { Store } from '../Store';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { toast } from 'react-toastify';



//icons 
import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlaceIcon from '@mui/icons-material/Place';
import InfoIcon from '@mui/icons-material/Info';
import VerifiedIcon from '@mui/icons-material/Verified';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';

import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import LanguageIcon from '@mui/icons-material/Language';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LinkIcon from '@mui/icons-material/Link';
import AddLinkIcon from '@mui/icons-material/AddLink';
import FlagIcon from '@mui/icons-material/Flag';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import DesktopHeader from '../components/DesktopHeader';

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
    <div className='loading' >
        <CircularProgress />
                  </div>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox> 
  ) : (
    <div className='my_profile' >
      <div className='my_profile_desktop' >
        <DesktopHeader />
        <div className='my_profile_desktop_con' >
          <div className='my_profile_desktop_left' >

          {user.image ? (<>
            <img src={user.image} alt='' className='my_profile_desktop_left_img' />
          
                      </>) : (<>
                        <div className='my_profile_desktop_left_img_skeleton' >
                          <div className='my_profile_desktop_left_img_skeleton_con' >
                            <Link to='/uploadimage' style={{ textDecoration: 'none' }} >
                              <div className='my_profile_desktop_left_img_skeleton_icon' ><CameraAltIcon fontSize="large" /></div>
                            </Link>
                          </div>
                        </div>
                      </>)}

            
            <div className='my_profile_desktop_left_contacts' >
              <a style={{ textDecoration: 'none' }} href={`https://instagram.com/${user.instagram}`}>
                <span className='my_profile_desktop_left_contacts_link' >
                  <InstagramIcon />
                </span>
              </a>
              <a style={{ textDecoration: 'none' }} href={`tel:${user.whatsapp}`} >
                <span className='my_profile_desktop_left_contacts_link_chat' >
                  Message
                </span> 
              </a>
              <a style={{ textDecoration: 'none' }} href={`tel:${user.phone}`}>
                <span className='my_profile_desktop_left_contacts_link' >
                  <CallIcon />
                </span>
              </a>


            </div>
          </div>
          <div className='my_profile_desktop_right' >
            <div className='my_profile_desktop_right_top' >
              <span className='my_profile_desktop_right_top_name' >{user.name},</span>
              <span className='my_profile_desktop_right_top_age' >{user.age}</span>
             <div className='my_profile_desktop_right_top_edit_profile_link_con' >
              <Link style={{ textDecoration: 'nome',color: 'black' }} to='/profile' >
                  <span className='my_profile_desktop_right_top_edit_profile_link' >
                    <SettingsIcon />
                  </span>
               
                </Link>
                </div>
            </div>

            <div className='my_profile_desktop_right_location' >
              <div className='my_profile_desktop_right_location_card' >
                <div className='my_profile_desktop_right_location_card_left' >
                  <span><FlagIcon fontSize="medium" /></span>
                </div>
                <div className='my_profile_desktop_right_location_card_right' >
                  <span>{user.country}</span>
                </div>
              </div>

              <div className='my_profile_desktop_right_location_card' >
                <div className='my_profile_desktop_right_location_card_left' >
                  <span><LocationCityIcon fontSize="medium" /></span>
                </div>
                <div className='my_profile_desktop_right_location_card_right' >
                  <span>{user.city}</span>
                </div>
              </div>
              <div className='my_profile_desktop_right_location_card' >
                <div className='my_profile_desktop_right_location_card_left' >
                  <span><LinkIcon fontSize="medium" /></span>
                </div>
                <div className='my_profile_desktop_right_location_card_right' >
                  <a href={`https://${user.link}`} >
                    <span className='my_profile_desktop_con_right_top_bio_right_contact_text' >{user.link}</span>
                  </a>
                </div>
              </div>

            </div>

            <div className='my_profile_desktop_right_biography ' >
              <div className='my_profile_desktop_right_biography_top ' >
                <span>Bio</span>
              </div>
              <div className='my_profile_desktop_right_biography_bottom' >
                <p>{user.about_me}</p>
              </div>
            </div>
            <div className='my_profile_desktop_right_tabs' >
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Images" {...a11yProps(0)} />
                    <Tab label="contact" {...a11yProps(1)} />
                    <Tab label="Details" {...a11yProps(2)} />
                  </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                  <div className='my_profile_desktop_right_tab' >
                    <div className='my_profile_desktop_right_tab_images' >




                      {user.image_1 ? (<>
                        <img src={user.image_1} alt='' className='my_profile_desktop_right_tab_img' />

                      </>) : (<>
                        <div className='my_profile_desktop_con_right_bottom_select_details_image_card_skeleton' >
                          <div className='my_profile_desktop_con_right_bottom_select_details_image_card_skeleton_link' >
                            <Link to='/uploadimageone' style={{ textDecoration: 'none' }} >
                              <span className='my_profile_desktop_con_right_bottom_select_details_image_card_skeleton_link_icon' >
                                +
                              </span>
                            </Link>
                          </div>
                        </div>
                      </>)}

                      {user.image_2 ? (<>
                        <img src={user.image_2} alt='' className='my_profile_desktop_right_tab_img' />

                      </>) : (<>
                        <div className='my_profile_desktop_con_right_bottom_select_details_image_card_skeleton' >
                          <div className='my_profile_desktop_con_right_bottom_select_details_image_card_skeleton_link' >
                            <Link to='/uploadimagetwo' style={{ textDecoration: 'none' }} >
                              <span className='my_profile_desktop_con_right_bottom_select_details_image_card_skeleton_link_icon' >
                                +
                              </span>
                            </Link>
                          </div>
                        </div>
                      </>)}

                      {user.image_3 ? (<>
                        <img src={user.image_3} alt='' className='my_profile_desktop_right_tab_img' />

                      </>) : (<>
                        <div className='my_profile_desktop_con_right_bottom_select_details_image_card_skeleton' >
                          <div className='my_profile_desktop_con_right_bottom_select_details_image_card_skeleton_link' >
                            <Link to='/uploadimagethree' style={{ textDecoration: 'none' }} >
                              <span className='my_profile_desktop_con_right_bottom_select_details_image_card_skeleton_link_icon' >
                                +
                              </span>
                            </Link>
                          </div>
                        </div>
                      </>)}

                      {user.image_4 ? (<>
                        <img src={user.image_4} alt='' className='my_profile_desktop_right_tab_img' />

                      </>) : (<>
                        <div className='my_profile_desktop_con_right_bottom_select_details_image_card_skeleton' >
                          <div className='my_profile_desktop_con_right_bottom_select_details_image_card_skeleton_link' >
                            <Link to='/uploadimagefour' style={{ textDecoration: 'none' }} >
                              <span className='my_profile_desktop_con_right_bottom_select_details_image_card_skeleton_link_icon' >
                                +
                              </span>
                            </Link>
                          </div>
                        </div>
                      </>)}
                    </div>
                  </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  <div className='my_profile_desktop_right_tab' >
                    <div className='my_profile_desktop_right_tabs_con' >
                      <div className='my_profile_desktop_right_tabs_con_card' >
                        <div className='my_profile_desktop_right_tabs_con_card_left' >
                          <span><FlagIcon fontSize="medium" /></span>
                        </div>
                        <div className='my_profile_desktop_right_tabs_con_card_right' >
                          <span>{user.country}</span>
                        </div>
                      </div>

                      <div className='my_profile_desktop_right_tabs_con_card' >
                        <div className='my_profile_desktop_right_tabs_con_card_left' >
                          <span><LocationCityIcon fontSize="medium" /></span>
                        </div>
                        <div className='my_profile_desktop_right_tabs_con_card_right' >
                          <span>{user.city}</span>
                        </div>
                      </div>
                      <div className='my_profile_desktop_right_tabs_con_card' >
                        <div className='my_profile_desktop_right_tabs_con_card_left' >
                          <span><PlaceIcon fontSize="medium" /></span>
                        </div>
                        <div className='my_profile_desktop_right_tabs_con_card_right' >
                          <span>{user.province}</span>
                        </div>
                      </div>

                    </div>
                    <div className='my_profile_desktop_right_tabs_con' >
                      <div className='my_profile_desktop_right_tabs_con_card' >
                        <div className='my_profile_desktop_right_tabs_con_card_left' >
                          <span><CallIcon fontSize="medium" /></span>
                        </div>
                        <div className='my_profile_desktop_right_tabs_con_card_right' >
                          <a href={`tel:${user.phone}`} >
                            <span  >{user.phone}</span>
                          </a>
                        </div>
                      </div>

                      <div className='my_profile_desktop_right_tabs_con_card' >
                        <div className='my_profile_desktop_right_tabs_con_card_left' >
                          <span><WhatsAppIcon fontSize="medium" /></span>
                        </div>
                        <div className='my_profile_desktop_right_tabs_con_card_right' >
                          <a href={`tel:${user.whatsapp}`}  >
                            <span  >{user.whatsapp}</span>
                          </a>
                        </div>
                      </div>
                      <div className='my_profile_desktop_right_tabs_con_card' >
                        <div className='my_profile_desktop_right_tabs_con_card_left' >
                          <span><InstagramIcon fontSize="medium" /></span>
                        </div>
                        <div className='my_profile_desktop_right_tabs_con_card_right' >
                          <a href={`https://instagram.com/${user.instagram}`} >
                            <span  >{user.instagram}</span>
                          </a>
                        </div>
                      </div>
                      <div className='my_profile_desktop_right_tabs_con_card' >
                        <div className='my_profile_desktop_right_tabs_con_card_left' >
                          <span><LinkIcon fontSize="medium" /></span>
                        </div>
                        <div className='my_profile_desktop_right_tabs_con_card_right' >
                          <a href={`https://treelink.com/${user.link}`} >
                            <span  >{user.link}</span>
                          </a>
                        </div>
                      </div>

                    </div>

                  </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                  <div className='my_profile_desktop_right_tab' >
                    <div className='my_profile_desktop_right_tabs_con' >
                      <div className='my_profile_desktop_right_tabs_con_card' >
                        <div className='my_profile_desktop_right_tabs_con_details_card_left' >
                          <span>Personality</span>:
                        </div>
                        <div className='my_profile_desktop_right_tabs_con_card_right' >
                          <span>{user.personality}</span>
                        </div>
                      </div>
                      <div className='my_profile_desktop_right_tabs_con_card' >
                        <div className='my_profile_desktop_right_tabs_con_details_card_left' >
                          <span>Interest</span>:
                        </div>
                        <div className='my_profile_desktop_right_tabs_con_card_right' >
                          <span>{user.category}</span>
                        </div>
                      </div>

                      <div className='my_profile_desktop_right_tabs_con_card' >
                        <div className='my_profile_desktop_right_tabs_con_details_card_left' >
                          <span>Body</span>:
                        </div>
                        <div className='my_profile_desktop_right_tabs_con_card_right' >
                          <span>{user.body}</span>
                        </div>
                      </div>

                      <div className='my_profile_desktop_right_tabs_con_card' >
                        <div className='my_profile_desktop_right_tabs_con_details_card_left' >
                          <span>Size</span>:
                        </div>
                        <div className='my_profile_desktop_right_tabs_con_card_right' >
                          <span>{user.size}</span>
                        </div>
                      </div>

                      <div className='my_profile_desktop_right_tabs_con_card' >
                        <div className='my_profile_desktop_right_tabs_con_details_card_left' >
                          <span>Mindset</span>:
                        </div>
                        <div className='my_profile_desktop_right_tabs_con_card_right' >
                          <span>{user.mindset}</span>
                        </div>
                      </div>

                    </div>
                    <div className='my_profile_desktop_right_tabs_con' >
                      <div className='my_profile_desktop_right_tabs_con_card' >
                        <div className='my_profile_desktop_right_tabs_con_details_card_left' >
                          <span>High Scool</span>:
                        </div>
                        <div className='my_profile_desktop_right_tabs_con_card_right' >
                          <span>{user.high_school}</span>
                        </div>
                      </div>
                      <div className='my_profile_desktop_right_tabs_con_card' >
                        <div className='my_profile_desktop_right_tabs_con_details_card_left' >
                          <span>Primary</span>:
                        </div>
                        <div className='my_profile_desktop_right_tabs_con_card_right' >
                          <span>{user.primary_school}</span>
                        </div>
                      </div>

                      <div className='my_profile_desktop_right_tabs_con_card' >
                        <div className='my_profile_desktop_right_tabs_con_details_card_left' >
                          <span>College/varsity</span>:
                        </div>
                        <div className='my_profile_desktop_right_tabs_con_card_right' >
                          <span>{user.college}</span>
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
      <div className='my_profile_mobile' >
        <div className='my_profile_desktop_con' >
          <div className='my_profile_desktop_left' >

            <div className='my_profile_desktop_left_top_nav' >
              <div className='my_profile_desktop_left_top_nav_left' >
                <Link style={{ textDecoration: 'nome' }} to='/' >
                  <span className='my_profile_desktop_left_top_nav_left_icon' >
                    <ArrowBackIcon />
                  </span>
                </Link>
              </div>

              <div className='my_profile_desktop_left_top_nav_right' >
                <Link style={{ textDecoration: 'nome' }} to='/profile' >
                  <span className='my_profile_desktop_left_top_nav_left_icon' >
                    <SettingsIcon /> 
                  </span>
                </Link>
              </div>

            </div>
            
          {user.image ? (<>
            <img src={user.image} alt='' className='my_profile_desktop_left_img' />
          
                      </>) : (<>
                     
                        
                            <Link to='/uploadimage' style={{ textDecoration: 'none' }} >
                              <div className='my_profile_desktop_left_img_skeleton_icon' ><CameraAltIcon fontSize="large" /></div>
                            </Link>
                       
                       
                      </>)}
            <div className='my_profile_desktop_left_contacts' >
              <a style={{ textDecoration: 'none' }} href={`https://instagram.com/${user.instagram}`}>
                <span className='my_profile_desktop_left_contacts_link' >
                  <InstagramIcon />
                </span>
              </a>
              <a style={{ textDecoration: 'none' }} href={`tel:${user.whatsapp}`} >
                <span className='my_profile_desktop_left_contacts_link_chat' >
                  Message
                </span>
              </a>
              <a style={{ textDecoration: 'none' }} href={`tel:${user.phone}`}>
                <span className='my_profile_desktop_left_contacts_link' >
                  <CallIcon />
                </span>
              </a>


            </div>
          </div>
          <div className='my_profile_desktop_right' >
            <div className='my_profile_desktop_right_top' >
              <span className='my_profile_desktop_right_top_name' >{user.name},</span>
              <span className='my_profile_desktop_right_top_age' >{user.age}</span>
            </div>

            <div className='my_profile_desktop_right_location' >
              <div className='my_profile_desktop_right_location_card' >
                <div className='my_profile_desktop_right_location_card_left' >
                  <span><FlagIcon fontSize="medium" /></span>
                </div>
                <div className='my_profile_desktop_right_location_card_right' >
                  <span>{user.country}</span>
                </div>
              </div>

              <div className='my_profile_desktop_right_location_card' >
                <div className='my_profile_desktop_right_location_card_left' >
                  <span><LocationCityIcon fontSize="medium" /></span>
                </div>
                <div className='my_profile_desktop_right_location_card_right' >
                  <span>{user.city}</span>
                </div>
              </div>
              <div className='my_profile_desktop_right_location_card' >
                <div className='my_profile_desktop_right_location_card_left' >
                  <span><LinkIcon fontSize="medium" /></span>
                </div>
                <div className='my_profile_desktop_right_location_card_right' >
                  <a href={`https://${user.link}`} >
                    <span className='my_profile_desktop_con_right_top_bio_right_contact_text' >{user.link}</span>
                  </a>
                </div>
              </div>

            </div>

            <div className='my_profile_desktop_right_biography ' >
              <div className='my_profile_desktop_right_biography_top ' >
                <span>Bio</span>
              </div>
              <div className='my_profile_desktop_right_biography_bottom' >
                <p>{user.about_me}</p>
              </div>
            </div>
            <div className='my_profile_desktop_right_tabs' >
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Images" {...a11yProps(0)} />
                    <Tab label="contact" {...a11yProps(1)} />
                    <Tab label="Details" {...a11yProps(2)} />
                  </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                  <div className='my_profile_desktop_right_tab' >
                    <div className='my_profile_desktop_right_tab_images' >




                      {user.image_1 ? (<>
                        <img src={user.image_1} alt='' className='my_profile_desktop_right_tab_img' />

                      </>) : (<>
                        <div className='my_profile_desktop_con_right_bottom_select_details_image_card_skeleton' >
                          <div className='my_profile_desktop_con_right_bottom_select_details_image_card_skeleton_link' >
                            <Link to='/uploadimageone' style={{ textDecoration: 'none' }} >
                              <span className='my_profile_desktop_con_right_bottom_select_details_image_card_skeleton_link_icon' >
                                +
                              </span>
                            </Link>
                          </div>
                        </div>
                      </>)}

                      {user.image_2 ? (<>
                        <img src={user.image_2} alt='' className='my_profile_desktop_right_tab_img' />

                      </>) : (<>
                        <div className='my_profile_desktop_con_right_bottom_select_details_image_card_skeleton' >
                          <div className='my_profile_desktop_con_right_bottom_select_details_image_card_skeleton_link' >
                            <Link to='/uploadimagetwo' style={{ textDecoration: 'none' }} >
                              <span className='my_profile_desktop_con_right_bottom_select_details_image_card_skeleton_link_icon' >
                                +
                              </span>
                            </Link>
                          </div>
                        </div>
                      </>)}

                      {user.image_3 ? (<>
                        <img src={user.image_3} alt='' className='my_profile_desktop_right_tab_img' />

                      </>) : (<>
                        <div className='my_profile_desktop_con_right_bottom_select_details_image_card_skeleton' >
                          <div className='my_profile_desktop_con_right_bottom_select_details_image_card_skeleton_link' >
                            <Link to='/uploadimagethree' style={{ textDecoration: 'none' }} >
                              <span className='my_profile_desktop_con_right_bottom_select_details_image_card_skeleton_link_icon' >
                                +
                              </span>
                            </Link>
                          </div>
                        </div>
                      </>)}

                      {user.image_4 ? (<>
                        <img src={user.image_4} alt='' className='my_profile_desktop_right_tab_img' />

                      </>) : (<>
                        <div className='my_profile_desktop_con_right_bottom_select_details_image_card_skeleton' >
                          <div className='my_profile_desktop_con_right_bottom_select_details_image_card_skeleton_link' >
                            <Link to='/uploadimagefour' style={{ textDecoration: 'none' }} >
                              <span className='my_profile_desktop_con_right_bottom_select_details_image_card_skeleton_link_icon' >
                                +
                              </span>
                            </Link>
                          </div>
                        </div>
                      </>)}
                    </div>
                  </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  <div className='my_profile_desktop_right_tab' >
                    <div className='my_profile_desktop_right_tabs_con' >
                      <div className='my_profile_desktop_right_tabs_con_card' >
                        <div className='my_profile_desktop_right_tabs_con_card_left' >
                          <span><FlagIcon fontSize="medium" /></span>
                        </div>
                        <div className='my_profile_desktop_right_tabs_con_card_right' >
                          <span>{user.country}</span>
                        </div>
                      </div>

                      <div className='my_profile_desktop_right_tabs_con_card' >
                        <div className='my_profile_desktop_right_tabs_con_card_left' >
                          <span><LocationCityIcon fontSize="medium" /></span>
                        </div>
                        <div className='my_profile_desktop_right_tabs_con_card_right' >
                          <span>{user.city}</span>
                        </div>
                      </div>
                      <div className='my_profile_desktop_right_tabs_con_card' >
                        <div className='my_profile_desktop_right_tabs_con_card_left' >
                          <span><PlaceIcon fontSize="medium" /></span>
                        </div>
                        <div className='my_profile_desktop_right_tabs_con_card_right' >
                          <span>{user.province}</span>
                        </div>
                      </div>

                    </div>
                    <div className='my_profile_desktop_right_tabs_con' >
                      <div className='my_profile_desktop_right_tabs_con_card' >
                        <div className='my_profile_desktop_right_tabs_con_card_left' >
                          <span><CallIcon fontSize="medium" /></span>
                        </div>
                        <div className='my_profile_desktop_right_tabs_con_card_right' >
                          <a href={`tel:${user.phone}`} >
                            <span  >{user.phone}</span>
                          </a>
                        </div>
                      </div>

                      <div className='my_profile_desktop_right_tabs_con_card' >
                        <div className='my_profile_desktop_right_tabs_con_card_left' >
                          <span><WhatsAppIcon fontSize="medium" /></span>
                        </div>
                        <div className='my_profile_desktop_right_tabs_con_card_right' >
                          <a href={`tel:${user.whatsapp}`}  >
                            <span  >{user.whatsapp}</span>
                          </a>
                        </div>
                      </div>
                      <div className='my_profile_desktop_right_tabs_con_card' >
                        <div className='my_profile_desktop_right_tabs_con_card_left' >
                          <span><InstagramIcon fontSize="medium" /></span>
                        </div>
                        <div className='my_profile_desktop_right_tabs_con_card_right' >
                          <a href={`https://instagram.com/${user.instagram}`} >
                            <span  >{user.instagram}</span>
                          </a>
                        </div>
                      </div>
                      <div className='my_profile_desktop_right_tabs_con_card' >
                        <div className='my_profile_desktop_right_tabs_con_card_left' >
                          <span><LinkIcon fontSize="medium" /></span>
                        </div>
                        <div className='my_profile_desktop_right_tabs_con_card_right' >
                          <a href={`https://${user.link}`} >
                            <span  >{user.link}</span>
                          </a>
                        </div>
                      </div>

                    </div>

                  </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                  <div className='my_profile_desktop_right_tab' >
                    <div className='my_profile_desktop_right_tabs_con' >
                      <div className='my_profile_desktop_right_tabs_con_card' >
                        <div className='my_profile_desktop_right_tabs_con_details_card_left' >
                          <span>Personality</span>:
                        </div>
                        <div className='my_profile_desktop_right_tabs_con_card_right' >
                          <span>{user.personality}</span>
                        </div>
                      </div>
                      <div className='my_profile_desktop_right_tabs_con_card' >
                        <div className='my_profile_desktop_right_tabs_con_details_card_left' >
                          <span>Interest</span>:
                        </div>
                        <div className='my_profile_desktop_right_tabs_con_card_right' >
                          <span>{user.category}</span>
                        </div>
                      </div>

                      <div className='my_profile_desktop_right_tabs_con_card' >
                        <div className='my_profile_desktop_right_tabs_con_details_card_left' >
                          <span>Body</span>:
                        </div>
                        <div className='my_profile_desktop_right_tabs_con_card_right' >
                          <span>{user.body}</span>
                        </div>
                      </div>

                      <div className='my_profile_desktop_right_tabs_con_card' >
                        <div className='my_profile_desktop_right_tabs_con_details_card_left' >
                          <span>Size</span>:
                        </div>
                        <div className='my_profile_desktop_right_tabs_con_card_right' >
                          <span>{user.size}</span>
                        </div>
                      </div>

                      <div className='my_profile_desktop_right_tabs_con_card' >
                        <div className='my_profile_desktop_right_tabs_con_details_card_left' >
                          <span>Mindset</span>:
                        </div>
                        <div className='my_profile_desktop_right_tabs_con_card_right' >
                          <span>{user.mindset}</span>
                        </div>
                      </div>

                    </div>
                    <div className='my_profile_desktop_right_tabs_con' >
                      <div className='my_profile_desktop_right_tabs_con_card' >
                        <div className='my_profile_desktop_right_tabs_con_details_card_left' >
                          <span>High Scool</span>:
                        </div>
                        <div className='my_profile_desktop_right_tabs_con_card_right' >
                          <span>{user.high_school}</span>
                        </div>
                      </div>
                      <div className='my_profile_desktop_right_tabs_con_card' >
                        <div className='my_profile_desktop_right_tabs_con_details_card_left' >
                          <span>Primary</span>:
                        </div>
                        <div className='my_profile_desktop_right_tabs_con_card_right' >
                          <span>{user.primary_school}</span>
                        </div>
                      </div>

                      <div className='my_profile_desktop_right_tabs_con_card' >
                        <div className='my_profile_desktop_right_tabs_con_details_card_left' >
                          <span>College/varsity</span>:
                        </div>
                        <div className='my_profile_desktop_right_tabs_con_card_right' >
                          <span>{user.college}</span>
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
