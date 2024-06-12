import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Header = () => {
  const [loginUser, setLoginUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('user');
    message.success('Logout Successfully');
    navigate('/login');
  };

  return (
    <>
      <nav className='navbar navbar-expand-lg bg-body-tertiary d-flex align-items-center navbar'>
        <div className='container-fluid'>
          <Link className='navbar-brand' to='/'>
            Expense Management
          </Link>
          <button
            className='navbar-toggler toggleNavbar'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={logoutHandler}>
            Logout
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
              <li className='nav-item d-flex align-items-center me-4'>
                {loginUser && <UserOutlined className='h-100' />}
                <p className='nav-link h-100 align-self-start d-flex align-items-center m-0'>
                  {loginUser && loginUser.name}
                </p>
              </li>
              <li className='nav-item d-flex align-items-center'>
                <button className='btn btn-primary' onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
