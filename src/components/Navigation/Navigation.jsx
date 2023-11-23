import React from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navigation = ({ nav }) => {
  const { lng } = useParams();

  return (
    <nav className="nav-menu" role="navigation">
      <ul className="nav-menu__list">
        {nav.map(({ title, link }) => {
          return (
            <li className="nav-menu__list-item" key={link}>
              <Link to={`/${lng}${link}`} className="nav-menu__link">
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

// Array of object props
Navigation.propTypes = {
  nav: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ),
};

export default Navigation;
