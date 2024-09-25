import React, { useContext, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import LoadingBox from '../components/LoadingBox';
import axios from 'axios';
import '../UploadImages.css';

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return { ...state, loadingUpload: false, errorUpload: '' };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
};

export default function UploadBanner() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [banner, setBanner] = useState(userInfo.banner || '');
  const [tags, setTags] = useState(userInfo.tags || []);
  const [newTag, setNewTag] = useState('');
  const [{ loadingUpload }, dispatch] = useReducer(reducer, {
    loadingUpload: false,
    errorUpload: '',
  });

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    
    if (!file) {
      toast.error('Please select a file to upload.');
      return;
    }
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file.');
      return;
    }
    
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);

    try {
      dispatch({ type: 'UPLOAD_REQUEST' });

      const { data } = await axios.post('/api/upload', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      dispatch({ type: 'UPLOAD_SUCCESS' });
      setBanner(data.secure_url);

      toast.success('Image uploaded successfully. Click Update to apply it.');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };

  const addTagHandler = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTagHandler = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        '/api/users/profile',
        { banner, tags },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Profile updated successfully');
      navigate('/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div className="upload_image_page">
      <Helmet>
        <title>User Banner</title>
      </Helmet>

      <div className='upload_image_page_top'>
        <img src='/logo.png' className='upload_image_page_top_logo' alt='Logo' />
      </div>

      
      <div className='upload_image_page_bottom'>
        <Form className='upload_image_form' onSubmit={submitHandler}>
          <div className='upload_image_page_form_top'>
            <span>Update Profile Banner</span>
          </div>

          <div className='upload_image_page_form_center'>
            <Form.Group className="upload_image_page_form_form_input_container" controlId="imageFile">
              <Form.Label className='upload_image_page_form_form_input_container_label' >Upload Image</Form.Label>
              <Form.Control type="file" onChange={uploadFileHandler} />
              {loadingUpload && <LoadingBox />}
            </Form.Group>

            <Form.Group className="upload_image_page_form_form_input_container" controlId="image">
              <Form.Label className='upload_image_page_form_form_input_container_label' >Image URL</Form.Label>
              <Form.Control
                value={banner}
                onChange={(e) => setBanner(e.target.value)}
                required
                placeholder="Enter image URL"
              />
            </Form.Group>

           
          </div>

          <div className='upload_image_page_form_bottom'>
            <Button className='upload_image_page_form_bottom_btn' type="submit">Update Banner</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
