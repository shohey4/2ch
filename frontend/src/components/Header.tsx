import React from 'react';
import { HiHome } from 'react-icons/hi';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className="flex mx-2">
      <div className="justify-center items-center">
        <Button
          onClick={handleClick}
          className="bg-gray-200 hover:bg-gray-300 rounded-md cursor-pointer"
        >
          <HiHome className="text-black" size={22} />
        </Button>
      </div>
      <div className="grow flex text-3xl justify-center items-center ">
        Dev channel
      </div>
    </div>
    // <div className="header">
    //   <div className="header__logo">
    //     <Link to="/">Logo</Link>
    //   </div>
    //   <div className="header__menu">
    //     <Link to="/login">Login</Link>
    //     <Link to="/register">Register</Link>
    //   </div>
    // </div>
  );
};

export default Header;
