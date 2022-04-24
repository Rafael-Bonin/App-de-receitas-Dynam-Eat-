import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profile from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import './Header.css';

export default function Header(props) {
  const { title, sb } = props;
  const [searchShow, setSearchShow] = useState(false);
  return (
    <div className="header">
      <div className="itens-header">
        <Link to="/profile">
          <img src={ profile } alt="search icon" data-testid="profile-top-btn" />
        </Link>
        <h2 data-testid="page-title">
          { title }
        </h2>
        { sb
        && (
          <button
            className="search-btn"
            type="button"
            onClick={ () => setSearchShow(!searchShow) }
          >
            <img
              alt="imagem do perfil"
              src={ searchIcon }
              data-testid="search-top-btn"
            />
          </button>
        )}
      </div>
      <div>
        { searchShow && <SearchBar title={ title } /> }
      </div>
    </div>
  );
}

Header.propTypes = {
  title: propTypes.string.isRequired,
  sb: propTypes.bool.isRequired,
};
