import { useState, useEffect } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { HOST_URL } from '../utils';
import bg from '../../assets/bg.png';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${HOST_URL}/users/login`, values);
      setLoading(false);
      message.success('login success');
      localStorage.setItem('user', JSON.stringify({ ...data.user, password: '' }));
      navigate('/');
    } catch (error) {
      setLoading(false);
      message.error('Invalid credentials');
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
        <div className='register-page d-flex register login'>
          <div className='image'>
            <img src={bg} alt='expense management system' />
          </div>
          <Form layout='vertical' onFinish={submitHandler}>
            <h1>Login Form</h1>
            <Form.Item label='Email' name='email'>
              <Input type='email' />
            </Form.Item>
            <Form.Item label='Password' name='password'>
              <Input type='password' />
            </Form.Item>
            <div className='d-flex flex-column justify-content-between'>
              <button className='btn btn-primary'>Login</button>
              <Link to='/register' className='alreadyCompleted'>
                Not a user? Click here to register
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
