import React, { useEffect, useReducer, useState } from 'react';
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
import '../SearchPage.css';
import DesktopHeader from '../components/DesktopHeader';
import MobileHeader from '../components/MobileHeader';

// design
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
// icons
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';

// design
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
        countUsers: action.payload.countUsers,
        categoryCounts: action.payload.categoryCounts, // Add categoryCounts to state
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function SearchScreen(props) {
  // design
  const { window } = props;
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

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
  const rating = sp.get('rating') || 'all';
  const order = sp.get('order') || 'newest';
  const page = sp.get('page') || 1;

  const [{ loading, error, users, pages, countUsers, categoryCounts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/users/search?page=${page}&query=${query}&category=${category}&size=${size}&body=${body}&province=${province}&city=${city}&country=${country}&personality=${personality}&age=${age}&rating=${rating}&order=${order}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [category, error, order, page, age, size, body, province, city, country, personality, query, rating]);

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
    const filterRating = filter.rating || rating;
    const filterAge = filter.age || age;
    const sortOrder = filter.order || order;
    return `${
      skipPathname ? '' : '/search?'
    }category=${filterCategory}&query=${filterQuery}&size=${filterSize}&body=${filterBody}&province=${filterProvince}&city=${filterCity}&country=${filterCountry}&personality=${filterPersonality}&age=${filterAge}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className='search_page'>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className='search_page_desktop'>
            <DesktopHeader />
            <div className='search_page_desktop_con'>
              <div className='search_page_desktop_left'>
                <div className='search_page_filter'>
                  <h4>Categories</h4>
                  <ul>
                    {categories.map((c) => (
                      <li key={c}>
                        <Link
                          className={c === category ? 'active' : ''}
                          to={getFilterUrl({ category: c })}
                        >
                          {c} ({categoryCounts[c] || 0})
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <h4>Personalities</h4>
                  <ul>
                    {personalities.map((p) => (
                      <li key={p}>
                        <Link
                          className={p === personality ? 'active' : ''}
                          to={getFilterUrl({ personality: p })}
                        >
                          {p} ({categoryCounts[p] || 0})
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {/* Add more filters similarly */}
                </div>
              </div>
              <div className='search_page_desktop_right'>
                <div className='search_page_desktop_products'>
                  <h2>Results</h2>
                  <div className='search_page_sort'>
                    <span>Sort By</span>
                    <select
                      value={order}
                      onChange={(e) => {
                        navigate(getFilterUrl({ order: e.target.value }));
                      }}
                    >
                      <option value='newest'>Newest</option>
                      <option value='lowest'>Price: Low to High</option>
                      <option value='highest'>Price: High to Low</option>
                    </select>
                  </div>
                  <Row>
                    {users.map((user) => (
                      <Col key={user._id} sm={6} md={4} lg={3} xl={2}>
                        <div className='search_page_product'>
                          <Link to={`/user/${user._id}`}>
                            <img
                              src={user.image}
                              alt={user.name}
                            />
                            <div className='search_page_product_info'>
                              <p>{user.name}</p>
                              <Rating
                                rating={user.rating}
                                numReviews={user.numReviews}
                              />
                            </div>
                          </Link>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
                <div className='search_page_desktop_pagination'>
                  {[...Array(pages).keys()].map((x) => (
                    <Link
                      key={x + 1}
                      className={x + 1 === Number(page) ? 'active' : ''}
                      to={getFilterUrl({ page: x + 1 })}
                    >
                      {x + 1}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className='search_page_mobile'>
            <MobileHeader />
            <SwipeableDrawer
              container={container}
              variant='temporary'
              anchor='left'
              open={open}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
              sx={{
                width: drawerBleeding,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerBleeding,
                  boxSizing: 'border-box',
                },
              }}
            >
              <Puller />
              <div className='search_page_filter'>
                <h4>Categories</h4>
                <ul>
                  {categories.map((c) => (
                    <li key={c}>
                      <Link
                        className={c === category ? 'active' : ''}
                        to={getFilterUrl({ category: c })}
                      >
                        {c} ({categoryCounts[c] || 0})
                      </Link>
                    </li>
                  ))}
                </ul>
                <h4>Personalities</h4>
                <ul>
                  {personalities.map((p) => (
                    <li key={p}>
                      <Link
                        className={p === personality ? 'active' : ''}
                        to={getFilterUrl({ personality: p })}
                      >
                        {p} ({categoryCounts[p] || 0})
                      </Link>
                    </li>
                  ))}
                </ul>
                {/* Add more filters similarly */}
              </div>
            </SwipeableDrawer>
            <div className='search_page_mobile_content'>
              <div className='search_page_mobile_filters'>
                <Button onClick={toggleDrawer(true)}>
                  <FilterListIcon />
                </Button>
                <Button>
                  <SortIcon />
                </Button>
              </div>
              <div className='search_page_mobile_products'>
                <h2>Results</h2>
                <div className='search_page_sort'>
                  <span>Sort By</span>
                  <select
                    value={order}
                    onChange={(e) => {
                      navigate(getFilterUrl({ order: e.target.value }));
                    }}
                  >
                    <option value='newest'>Newest</option>
                    <option value='lowest'>Price: Low to High</option>
                    <option value='highest'>Price: High to Low</option>
                  </select>
                </div>
                <Row>
                  {users.map((user) => (
                    <Col key={user._id} sm={6} md={4} lg={3} xl={2}>
                      <div className='search_page_product'>
                        <Link to={`/user/${user._id}`}>
                          <img
                            src={user.image}
                            alt={user.name}
                          />
                          <div className='search_page_product_info'>
                            <p>{user.name}</p>
                            <Rating
                              rating={user.rating}
                              numReviews={user.numReviews}
                            />
                          </div>
                        </Link>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
              <div className='search_page_mobile_pagination'>
                {[...Array(pages).keys()].map((x) => (
                  <Link
                    key={x + 1}
                    className={x + 1 === Number(page) ? 'active' : ''}
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    {x + 1}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

SearchScreen.propTypes = {
  window: PropTypes.func,
};
