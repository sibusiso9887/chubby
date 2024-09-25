import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Rating from '../components/Rating';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Button from 'react-bootstrap/Button';
import User from '../components/User';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import Checkbox from '@mui/material/Checkbox';
import '../SearchPage.css'
import DesktopHeader from '../components/DesktopHeader';
import MobileHeader from '../components/MobileHeader';


import CircularProgress from '@mui/material/CircularProgress';

//design

import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
//icons

import SortIcon from '@mui/icons-material/Sort';
import TuneIcon from '@mui/icons-material/Tune';
import FilterListIcon from '@mui/icons-material/FilterList';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import StoreIcon from '@mui/icons-material/Store';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import MobileSearchHeader from '../components/MobileSearchHeader';
import { Store } from '../Store';

//icons

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        users: action.payload.users,
        page: action.payload.page,
        pages: action.payload.pages,
        categoryCounts: action.payload.categoryCounts, // Add categoryCounts to state
        sizeCounts: action.payload.sizeCounts, // Add sizeCounts to state
        bodyCounts: action.payload.bodyCounts, // Add bodyCounts to state
        provinceCounts: action.payload.provinceCounts, // Add provinceCounts to state
        cityCounts: action.payload.cityCounts, // Add cityCounts to state
        countryCounts: action.payload.countryCounts, // Add countryCounts to state
        personalityCounts: action.payload.personalityCounts, // Add personalityCounts to state
        countUsers: action.payload.countUsers,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const ages = [
  {
    name: '18 to 25 ',
    value: '18-25',
  },

];



//design
const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));
//design

export default function SearchScreen(props) {

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  //design
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  //design

  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search); // /search?category=Shirts
  const category = sp.get('category') || 'all';

  const size = sp.get('size') || 'all';
  const body = sp.get('body') || 'all';
  const province = sp.get('province') || 'all';
  const city = sp.get('city') || 'all';
  const country = sp.get('country') || 'all';
  const personality = sp.get('personality') || 'all';

  const query = sp.get('query') || 'all';
  const age = sp.get('age') || 'all';
  const order = sp.get('order') || 'newest';
  const page = sp.get('page') || 1;

  const [{ loading, error, users, pages, countUsers, categoryCounts, sizeCounts, bodyCounts, provinceCounts, cityCounts, countryCounts, personalityCounts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const genderPref = userInfo?.gender_pref || '';
        const { data } = await axios.get(
          `/api/users/search?page=${page}&query=${query}&category=${category}&size=${size}&body=${body}&province=${province}&city=${city}&country=${country}&personality=${personality}&age=${age}&order=${order}`
          , {
            params: { genderPref }
          });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [category, userInfo, error, order, page, age, size, body, province, city, country, personality, query]);

  const [categories, setCategories] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [bodies, setBodies] = useState([]);
  const [personalities, setPersonalities] = useState([]);

  useEffect(() => {

    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/users/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };

    const fetchPersonalities = async () => {
      try {
        const { data } = await axios.get(`/api/users/personalities`);
        setPersonalities(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };

    const fetchProvinces = async () => {
      try {
        const { data } = await axios.get(`/api/users/provinces`);
        setProvinces(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };

    const fetchBodies = async () => {
      try {
        const { data } = await axios.get(`/api/users/bodies`);
        setBodies(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };

    const fetchSizes = async () => {
      try {
        const { data } = await axios.get(`/api/users/sizes`);
        setSizes(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };

    const fetchCities = async () => {
      try {
        const { data } = await axios.get(`/api/users/cities`);
        setCities(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };

    const fetchCountries = async () => {
      try {
        const { data } = await axios.get(`/api/users/countries`);
        setCountries(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };



    fetchProvinces();
    fetchCountries();
    fetchCities();
    fetchSizes();
    fetchBodies();
    fetchPersonalities();
    fetchCategories();

  }, [dispatch]);

  const getFilterUrl = (filter, skipPathname) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterSize = filter.size || size;
    const filterBody = filter.body || body;
    const filterProvince = filter.province || province;
    const filterCity = filter.city || city;
    const filterCountry = filter.country || country;
    const filterPersonality = filter.personality || personality;
    const filterQuery = filter.query || query;
    const filterAge = filter.age || age;
    const sortOrder = filter.order || order;
    return `${skipPathname ? '' : '/search?'
      }category=${filterCategory}&query=${filterQuery}&size=${filterSize}&body=${filterBody}&province=${filterProvince}&city=${filterCity}&country=${filterCountry}&personality=${filterPersonality}&age=${filterAge}&order=${sortOrder}&page=${filterPage}`;
  };
  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <div className='search_page' >
      {loading ? (
        <div className='loading' >
<CircularProgress />
          </div>
      
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className='search_page_desktop' >
            <DesktopHeader />
            <div className='search_page_desktop_con' >

              <div className='search_page_desktop_left' >
                <div className='search_page_desktop_left_header' >
                  <span>Filter </span>
                </div>
                <div className='search_page_desktop_left_filter_con' >
                  <div className='search_page_desktop_left_filter_top' >
                    <span>Category</span>
                  </div>
                  <div className='search_page_desktop_left_filter_bottom' >
                    {categories.map((c) => (
                      <span className='search_page_desktop_left_filter_bottom_link' key={c}>
                        <Link
                          style={{ textDecoration: 'none', color: 'black' }}
                          className={c === category ? 'selected' : ''}
                          to={getFilterUrl({ category: c })}
                        >
                          {c} ({categoryCounts[c] || 0})
                        </Link>
                      </span>

                    ))}



                  </div>
                </div>

                <div className='search_page_desktop_left_filter_con' >
                  <div className='search_page_desktop_left_filter_top' >
                    <span>Size</span>
                  </div>
                  <div className='search_page_desktop_left_filter_bottom' >
                    {sizes.map((s) => (
                      <span className='search_page_desktop_left_filter_bottom_link' key={s}>
                        <Link
                          style={{ textDecoration: 'none', color: 'black' }}
                          className={s === size ? 'selected' : ''}
                          to={getFilterUrl({ size: s })}
                        >
                          {s} ({sizeCounts[s] || 0})
                        </Link>
                      </span>

                    ))}



                  </div>
                </div>

                <div className='search_page_desktop_left_filter_con' >
                  <div className='search_page_desktop_left_filter_top' >
                    <span>Type</span>
                  </div>
                  <div className='search_page_desktop_left_filter_bottom' >
                    <>
                      {userInfo.gender === 'male' ? (
                        <>
                          <span className='search_page_desktop_left_filter_bottom_link' >
                            <Link
                              style={{ textDecoration: 'none', color: 'black' }}
                              className={body === 'thick' ? 'selected' : ''}
                              to={getFilterUrl({ body: 'thick' })}
                            >
                              Thick ({bodyCounts['thick'] || 0})
                            </Link>
                          </span>
                          <span className='search_page_desktop_left_filter_bottom_link' >
                            <Link
                              style={{ textDecoration: 'none', color: 'black' }}
                              className={body === 'chubby' ? 'selected' : ''}
                              to={getFilterUrl({ body: 'chubby' })}
                            >
                              Chubby ({bodyCounts['chubby'] || 0})
                            </Link>
                          </span>
                        </>
                      ) : (
                        <>
                          <span className='search_page_desktop_left_filter_bottom_link' >
                            <Link
                              style={{ textDecoration: 'none', color: 'black' }}
                              className={body === 'slim' ? 'selected' : ''}
                              to={getFilterUrl({ body: 'slim' })}
                            >
                              Slim ({bodyCounts['slim'] || 0})
                            </Link>
                          </span>
                          <span className='search_page_desktop_left_filter_bottom_link' >
                            <Link
                              style={{ textDecoration: 'none', color: 'black' }}
                              className={body === 'average' ? 'selected' : ''}
                              to={getFilterUrl({ body: 'average' })}
                            >
                              Average ({bodyCounts['average'] || 0})
                            </Link>
                          </span>
                          <span className='search_page_desktop_left_filter_bottom_link' >
                            <Link
                              style={{ textDecoration: 'none', color: 'black' }}
                              className={body === 'chubby' ? 'selected' : ''}
                              to={getFilterUrl({ body: 'chubby' })}
                            >
                              Chubby ({bodyCounts['chubby'] || 0})
                            </Link>
                          </span>
                        </>
                      )}
                    </>
                  </div>
                </div>

                <div className='search_page_desktop_left_filter_con' >
                  <div className='search_page_desktop_left_filter_top' >
                    <span>Country</span>
                  </div>
                  <div className='search_page_desktop_left_filter_bottom' >
                    <div className='search_page_desktop_left_filter_bottom' >
                      {countries.map((co) => (
                        <span className='search_page_desktop_left_filter_bottom_link' key={co}>
                          <Link
                            style={{ textDecoration: 'none', color: 'black' }}
                            className={co === country ? 'selected' : ''}
                            to={getFilterUrl({ country: co })}
                          >
                            {co} ({countryCounts[co] || 0})
                          </Link>
                        </span>

                      ))}



                    </div>
                  </div>
                </div>

                <div className='search_page_desktop_left_filter_con' >
                  <div className='search_page_desktop_left_filter_top' >
                    <span>State/Province</span>
                  </div>
                  <div className='search_page_desktop_left_filter_bottom' >
                    {provinces.map((p) => (
                      <span className='search_page_desktop_left_filter_bottom_link' key={p}>
                        <Link
                          style={{ textDecoration: 'none', color: 'black' }}
                          className={p === province ? 'selected' : ''}
                          to={getFilterUrl({ province: p })}
                        >
                          {p} ({provinceCounts[p] || 0})
                        </Link>
                      </span>

                    ))}




                  </div>
                </div>

                <div className='search_page_desktop_left_filter_con' >
                  <div className='search_page_desktop_left_filter_top' >
                    <span>City</span>
                  </div>
                  <div className='search_page_desktop_left_filter_bottom' >
                    {cities.map((ci) => (
                      <span className='search_page_desktop_left_filter_bottom_link' key={ci}>
                        <Link
                          style={{ textDecoration: 'none', color: 'black' }}
                          className={ci === city ? 'selected' : ''}
                          to={getFilterUrl({ city: ci })}
                        >
                          {ci} ({cityCounts[ci] || 0})
                        </Link>
                      </span>

                    ))}



                  </div>
                </div>

                <div className='search_page_desktop_left_filter_con' >
                  <div className='search_page_desktop_left_filter_top' >
                    <span>Personality</span>
                  </div>
                  <div className='search_page_desktop_left_filter_bottom' >
                    {personalities.map((per) => (
                      <span className='search_page_desktop_left_filter_bottom_link' key={per}>
                        <Link
                          style={{ textDecoration: 'none', color: 'black' }}
                          className={per === personality ? 'selected' : ''}
                          to={getFilterUrl({ personality: per })}
                        >
                          {per} ({personalityCounts[per] || 0})
                        </Link>
                      </span>

                    ))}



                  </div>
                </div>


              </div>
              <div className='search_page_desktop_right' >

                <div className='search_page_desktop_right_top' >
                  <div className='search_page_desktop_right_top_left' >
                    <div className='search_page_results' >
                      {countUsers === 0 ? 'No' : countUsers} Results
                      {query !== 'all' && ' : ' + query}
                      {size !== 'all' && ' : ' + size}
                      {body !== 'all' && ' : ' + body}
                      {province !== 'all' && ' : ' + province}
                      {city !== 'all' && ' : ' + city}
                      {country !== 'all' && ' : ' + country}
                      {personality !== 'all' && ' : ' + personality}
                      {category !== 'all' && ' : ' + category}
                      {age !== 'all' && ' : Age ' + age}
                      {query !== 'all' ||
                        size !== 'all' ||
                        body !== 'all' ||
                        province !== 'all' ||
                        city !== 'all' ||
                        country !== 'all' ||
                        personality !== 'all' ||
                        category !== 'all' ||
                        age !== 'all' ? (
                        <Button
                          variant="light"
                          onClick={() => navigate('/search')}
                        >
                          <i className="fas fa-times-circle"></i>
                        </Button>
                      ) : null}
                    </div>
                  </div>
                  <div className='search_page_desktop_right_top_right' >
                    <div className='search_page_desktop_right_top_right_sort' >
                      <span className='search_page_desktop_right_top_right_sort_icon' ><SortIcon /></span>
                      <select
                        value={order}
                        onChange={(e) => {
                          navigate(getFilterUrl({ order: e.target.value }));
                        }}
                        className='search_page_desktop_right_top_right_sort_select' >
                        <option value="newest">Newes Users</option>
                        <option value="lowest">Young</option>
                        <option value="highest">Old</option>

                      </select>
                    </div>
                  </div>
                </div>
                <div className='search_page_desktop_right_center' >
                  {users.length === 0 && (
                    <MessageBox>No User Found</MessageBox>
                  )}

{users
                  .filter(user => user.image) // Filter users who have an image
                  .map(user => (
                    <User key={user.slug} user={user} />
                  ))}

                </div>
                <div className='search_page_desktop_right_bottom' >
                  {[...Array(pages).keys()].map((x) => (
                    <LinkContainer
                      key={x + 1}
                      className="link_container"
                      to={{
                        pathname: '/search',
                        search: getFilterUrl({ page: x + 1 }, true),
                      }}
                    >
                      <Button
                        className={Number(page) === x + 1 ? 'text-bold' : ''}
                        variant="light"
                        aria-current={Number(page) === x + 1 ? 'page' : undefined}
                      >
                        {x + 1}
                      </Button>
                    </LinkContainer>
                  ))}

                </div>
              </div>
            </div>

          </div>
          <div className='search_page_mobile' >
            <MobileSearchHeader />
            <div className='search_page_mobile_top' >
              <div className='search_page_mobile_top_child_1' >
                <div className='search_page_mobile_top_child_1_left' >
                  <div className='search_page_mobile_top_child_1_left_sort' >
                    <span className='search_page_mobile_top_child_1_left_sort_icon' ><SortIcon /></span>
                    <select className='search_page_mobile_top_child_1_left_sort_select'
                      value={order}
                      onChange={(e) => {
                        navigate(getFilterUrl({ order: e.target.value }));
                      }}
                    >
                      <option>Sort</option>
                      <option value="newest">Newes Users</option>
                      <option value="lowest">Young</option>
                      <option value="highest">Old</option>
                    </select>
                  </div>


                </div>
                <div className='search_page_mobile_top_child_1_right' >

                  <button className='search_page_mobile_top_child_1_right_btn' onClick={toggleDrawer(true)}>

                    <span className='search_page_mobile_top_child_1_right_btn_icon' ><FilterListIcon /></span>
                    <span className='search_page_mobile_top_child_1_right_btn_text' >Filter</span>
                  </button>

                </div>
              </div>
              <div className='search_page_mobile_top_child_2' >

              </div>

            </div>
            <div className='search_page_results' >
              {countUsers === 0 ? 'No' : countUsers} Results
              {query !== 'all' && ' : ' + query}
              {size !== 'all' && ' : ' + size}
              {body !== 'all' && ' : ' + body}
              {province !== 'all' && ' : ' + province}
              {city !== 'all' && ' : ' + city}
              {country !== 'all' && ' : ' + country}
              {personality !== 'all' && ' : ' + personality}
              {category !== 'all' && ' : ' + category}
              {age !== 'all' && ' : Age ' + age}
              {query !== 'all' ||
                size !== 'all' ||
                body !== 'all' ||
                province !== 'all' ||
                city !== 'all' ||
                country !== 'all' ||
                personality !== 'all' ||
                category !== 'all' ||
                age !== 'all' ? (
                <Button
                  variant="light"
                  onClick={() => navigate('/search')}
                >
                  <i className="fas fa-times-circle"></i>
                </Button>
              ) : null}
            </div>
            <div className='search_page_mobile_centre' >
              {users.length === 0 && (
                <MessageBox>No User Found</MessageBox>
              )}
              {users
                  .filter(user => user.image) // Filter users who have an image
                  .map(user => (
                    <User key={user.slug} user={user} />
                  ))}

            </div>
            <div className='search_page_mobile_bottom' >
              {[...Array(pages).keys()].map((x) => (
                <LinkContainer
                  key={x + 1}
                  className="link_container"
                  to={{
                    pathname: '/search',
                    search: getFilterUrl({ page: x + 1 }, true),
                  }}
                >
                  <Button
                    className={Number(page) === x + 1 ? 'pagination_link' : ''}
                    variant="light"
                    aria-current={Number(page) === x + 1 ? 'page' : undefined}
                  >
                    {x + 1}
                  </Button>
                </LinkContainer>
              ))}
            </div>

            <CssBaseline />
            <Global
              styles={{
                '.MuiDrawer-root > .MuiPaper-root': {
                  height: `calc(50% - ${drawerBleeding}px)`,
                  overflow: 'visible',
                },
              }}
            />

            <SwipeableDrawer
              container={container}
              anchor="bottom"
              open={open}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
              swipeAreaWidth={drawerBleeding}
              disableSwipeToOpen={false}
              ModalProps={{
                keepMounted: true,
              }}
            >
              <StyledBox
                sx={{
                  position: 'absolute',
                  top: 0,
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  visibility: 'visible',
                  right: 0,
                  left: 0,
                }}
              >
                <Puller />
                <Typography sx={{ p: 2, color: 'text.secondary' }}>
                  <div className='search_page_results_counter' >
                    {countUsers === 0 ? 'No' : countUsers} Results
                    {query !== 'all' && ' : ' + query}
                    {size !== 'all' && ' : ' + size}
                    {body !== 'all' && ' : ' + body}
                    {province !== 'all' && ' : ' + province}
                    {city !== 'all' && ' : ' + city}
                    {country !== 'all' && ' : ' + country}
                    {personality !== 'all' && ' : ' + personality}
                    {category !== 'all' && ' : ' + category}
                    {age !== 'all' && ' : Age ' + age}
                    {query !== 'all' ||
                      size !== 'all' ||
                      body !== 'all' ||
                      province !== 'all' ||
                      city !== 'all' ||
                      country !== 'all' ||
                      personality !== 'all' ||
                      category !== 'all' ||
                      age !== 'all' ? (
                      <Button
                        variant="light"
                        onClick={() => navigate('/search')}
                      >
                        <i className="fas fa-times-circle"></i>
                      </Button>
                    ) : null}
                  </div>
                </Typography>
              </StyledBox>
              <StyledBox
                sx={{
                  px: 2,
                  pb: 2,
                  height: '100%',
                  overflow: 'auto',
                }}
              >
                <div className='search_page_desktop_left' >
                  <div className='search_page_desktop_left_header' >
                    <span>Filter </span>
                  </div>
                  <div className='search_page_desktop_left_filter_con' >
                    <div className='search_page_desktop_left_filter_top' >
                      <span>Category</span>
                    </div>
                    <div className='search_page_desktop_left_filter_bottom' >
                      {categories.map((c) => (
                        <span className='search_page_desktop_left_filter_bottom_link' key={c}>
                          <Link
                            style={{ textDecoration: 'none', color: 'black' }}
                            className={c === category ? 'selected' : ''}
                            to={getFilterUrl({ category: c })}
                          >
                            {c} ({categoryCounts[c] || 0})
                          </Link>
                        </span>

                      ))}



                    </div>
                  </div>
                
                  <div className='search_page_desktop_left_filter_con' >
                    <div className='search_page_desktop_left_filter_top' >
                      <span>Size</span>
                    </div>
                    <div className='search_page_desktop_left_filter_bottom' >
                      {sizes.map((s) => (
                        <span className='search_page_desktop_left_filter_bottom_link' key={s}>
                          <Link
                            style={{ textDecoration: 'none', color: 'black' }}
                            className={s === size ? 'selected' : ''}
                            to={getFilterUrl({ size: s })}
                          >
                            {s} ({sizeCounts[s] || 0})
                          </Link>
                        </span>

                      ))}



                    </div>
                  </div>
                  <div className='search_page_desktop_left_filter_con' >
                    <div className='search_page_desktop_left_filter_top' >
                      <span>Type</span>
                    </div>
                    <div className='search_page_desktop_left_filter_bottom' >
                      {bodies.map((b) => (
                        <span className='search_page_desktop_left_filter_bottom_link' key={b}>
                          <Link
                            style={{ textDecoration: 'none', color: 'black' }}
                            className={b === body ? 'selected' : ''}
                            to={getFilterUrl({ category: b })}
                          >
                            {b} ({bodyCounts[b] || 0})
                          </Link>
                        </span>

                      ))}



                    </div>
                  </div>

                  <div className='search_page_desktop_left_filter_con' >
                    <div className='search_page_desktop_left_filter_top' >
                      <span>Country</span>
                    </div>
                    <div className='search_page_desktop_left_filter_bottom' >
                      <div className='search_page_desktop_left_filter_bottom' >
                        {countries.map((co) => (
                          <span className='search_page_desktop_left_filter_bottom_link' key={co}>
                            <Link
                              style={{ textDecoration: 'none', color: 'black' }}
                              className={co === country ? 'selected' : ''}
                              to={getFilterUrl({ country: co })}
                            >
                              {co} ({countryCounts[co] || 0})
                            </Link>
                          </span>

                        ))}



                      </div>
                    </div>
                  </div>

                  <div className='search_page_desktop_left_filter_con' >
                    <div className='search_page_desktop_left_filter_top' >
                      <span>State/Province</span>
                    </div>
                    <div className='search_page_desktop_left_filter_bottom' >
                      {provinces.map((p) => (
                        <span className='search_page_desktop_left_filter_bottom_link' key={p}>
                          <Link
                            style={{ textDecoration: 'none', color: 'black' }}
                            className={p === province ? 'selected' : ''}
                            to={getFilterUrl({ province: p })}
                          >
                            {p} ({provinceCounts[p] || 0})
                          </Link>
                        </span>

                      ))}



                    </div>
                  </div>

                  <div className='search_page_desktop_left_filter_con' >
                    <div className='search_page_desktop_left_filter_top' >
                      <span>City</span>
                    </div>
                    <div className='search_page_desktop_left_filter_bottom' >
                      {cities.map((ci) => (
                        <span className='search_page_desktop_left_filter_bottom_link' key={ci}>
                          <Link
                            style={{ textDecoration: 'none', color: 'black' }}
                            className={ci === city ? 'selected' : ''}
                            to={getFilterUrl({ city: ci })}
                          >
                            {ci} ({cityCounts[ci] || 0})
                          </Link>
                        </span>

                      ))}



                    </div>
                  </div>

                  <div className='search_page_desktop_left_filter_con' >
                    <div className='search_page_desktop_left_filter_top' >
                      <span>Personality</span>
                    </div>
                    <div className='search_page_desktop_left_filter_bottom' >
                      {personalities.map((per) => (
                        <span className='search_page_desktop_left_filter_bottom_link' key={per}>
                          <Link
                            style={{ textDecoration: 'none', color: 'black' }}
                            className={per === personality ? 'selected' : ''}
                            to={getFilterUrl({ personality: per })}
                          >
                            {per} ({personalityCounts[per] || 0})
                          </Link>
                        </span>

                      ))}



                    </div>
                  </div>


                </div>
              </StyledBox>

            </SwipeableDrawer>

          </div>
        </>
      )}
    </div>
  );
}



SearchScreen.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};