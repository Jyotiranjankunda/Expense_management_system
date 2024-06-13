import { useState, useEffect } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { HOST_URL } from '../utils.js';
import bg from '../../assets/bg.png';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post(`${HOST_URL}/users/register`, values);
      message.success('Registeration Successfull');
      setLoading(false);
      navigate('/login');
    } catch (error) {
      setLoading(false);
      message.error('something went wrong');
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      {loading && <Spinner />}
      <div className='wrapper'>
        <div
          className='register-page d-flex register'
          style={{ width: 'max-content' }}>
          <div className='image'>
            <img src={bg} alt='expense management system' />
          </div>
          <Form layout='vertical' onFinish={submitHandler} className='register-form'>
            <h2>Register</h2>
            <Form.Item label='Name' name='name'>
              <Input />
            </Form.Item>
            <Form.Item label='Email' name='email'>
              <Input type='email' />
            </Form.Item>
            <Form.Item label='Password' name='password'>
              <Input type='password' />
            </Form.Item>
            <div className='d-flex flex-column justify-content-between'>
              <button className='btn btn-primary'>Register</button>
              <Link to='/login' className='alreadyCompleted'>
                Already registered? Click Here to login
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
