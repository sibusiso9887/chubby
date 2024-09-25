import { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import DesktopHeader from '../components/DesktopHeader';
import MobileHeader from '../components/MobileHeader';
import '../HomePage.css';
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Helmet } from "react-helmet-async";
import User from "../components/User";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";

import CircularProgress from '@mui/material/CircularProgress';

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, users: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;



  const navigate = useNavigate();

  const [{ loading, error, users }, dispatch] = useReducer(reducer, {
    users: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        // Fetch users based on gender preference
        const genderPref = userInfo?.gender_pref || ''; // Default to empty string if not set
        const result = await axios.get(`/api/users/by-gender-pref`, {
          params: { genderPref }
        });
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };

    // Fetch data when userInfo changes or on initial render
    fetchData();
  }, [userInfo]);

  useEffect(() => {
    if (!userInfo) {
      // Navigate to '/createprofile' if userInfo.category is falsy and userInfo.gender is 'male'
      navigate('/selectgender');
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    if (userInfo && !userInfo.category && userInfo.gender === 'male') {
      // Navigate to '/createprofile' if userInfo.category is falsy and userInfo.gender is 'male'
      navigate('/createprofile');
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    if (userInfo && !userInfo.category && userInfo.gender === 'female') {
      // Navigate to '/createprofile' if userInfo.category is falsy and userInfo.gender is 'male'
      navigate('/createprofile');
    }
  }, [navigate, userInfo]);

  return (
    <div className='home_page'>
      <Helmet>
        <title>Home</title>
      </Helmet>
      {loading ? (
        <div className='loading' >
        <CircularProgress />
                  </div>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className='home_page_desktop'>
            <DesktopHeader />
            
        
              <div className='home_page_desktop_user_list_bottom_con' >
                {users
                  .filter(user => user.image) // Filter users who have an image
                  .map(user => (
                    <User key={user.slug} user={user} />
                  ))}

              </div>
            </div>
          
          <div className='home_page_mobile'>
            <MobileHeader />
            
              <div className='home_page_mobile_user_list_bottom_con' >
              {users
                  .filter(user => user.image) // Filter users who have an image
                  .map(user => (
                    <User key={user.slug} user={user} />
                  ))}
              </div>
            </div>
        
        </>
      )}
    </div>
  );
}

export default HomeScreen;
