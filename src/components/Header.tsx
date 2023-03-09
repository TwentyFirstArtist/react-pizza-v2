import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import LogoSVG from '../assets/img/pizza-logo.svg';
import { clearURL } from '../redux/slicers/filterSlice';
import HeaderCardIcon from './HeaderCardIcon';
import Search from './search/Search';


const Header: React.FC = () => {

  const dispatch = useDispatch()

  const location = useLocation()

  return (
    <div className="header">
      <div className="container">
        <Link to='/' onClick={() => dispatch(clearURL())}>
          <div className="header__logo">
            <img width="38" src={LogoSVG} alt="Pizza logo" />
            <div>
              <h1>ПІЦЕРІЯ</h1>
              <p>смак галактичного маштабу</p>
            </div>
          </div>
        </Link>
        {
          location.pathname !== '/card'
            ? <Search />
            : null
        }
        {
          location.pathname !== '/card'
            ? <HeaderCardIcon />
            : null
        }
      </div>
    </div>
  );
}

export default Header;