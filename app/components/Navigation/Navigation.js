import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes, { objectOf } from 'prop-types';

const Navigation = ({ nav }) => {
  return (
    <nav className="nav-menu" role="navigation">
      <ul className="nav-menu__list">
        {Object.entries(nav).map(([title, link]) => {
          return (
            <li className="nav-menu__list-item" key={link}>
              <Link to={link} className="nav-menu__link">
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Navigation.propTypes = {
  nav: objectOf(PropTypes.string.isRequired),
};

export default Navigation;
