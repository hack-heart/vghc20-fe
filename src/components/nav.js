import React from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const Nav = () => (
  <div>
    <AppBar color="primary" position="static">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-around' }}>
        <NavLink to="/" style={{ color: '#ffffff', fontSize: '18px', textDecoration: 'none' }}>HOME</NavLink>
        <a href="https://ghc.anitab.org/attend/"
          style={{ color: '#ffffff', fontSize: '18px', textDecoration: 'none' }}
        >
          VGHC2020
        </a>
        <NavLink to="/results" style={{ color: '#ffffff', fontSize: '18px', textDecoration: 'none' }}>RESULTS</NavLink>
      </Toolbar>
    </AppBar>
  </div>
);

export default Nav;
