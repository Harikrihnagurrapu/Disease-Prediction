import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../assets/styles/sidebar.css';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <h2>Disease Prediction</h2>
      <ul>
        <li>
          <NavLink to="/predict/liver" activeClassName="active">
            Liver Disease
          </NavLink>
        </li>
        <li>
          <NavLink to="/predict/heart" activeClassName="active">
            Heart Disease
          </NavLink>
        </li>
        <li>
          <NavLink to="/predict/kidney" activeClassName="active">
            Kidney Disease
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;