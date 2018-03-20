import React from 'react';
import { NavLink } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const Nav = () => {
  const burgerClick = () => {
    const mobileLinks = document.getElementById('mobileLinks');
    if (mobileLinks.classList.contains('displayNone')) {
      mobileLinks.classList.remove('displayNone');
      mobileLinks.classList.add('displayBlock');
    } else {
      mobileLinks.classList.remove('displayBlock');
      mobileLinks.classList.add('displayNone');
    }
  };

  return (
    <nav>
      <div className="buttonContainer">
        <div className="normalNav">
          <span className="button"><NavLink exact activeClassName="selected" to="/">Home</NavLink></span>
          <span className="button"><NavLink activeClassName="selected" to="/containers">Containers</NavLink></span>
          <span className="button"><NavLink activeClassName="selected" to="/vessels">Vessels</NavLink></span>
          <span className="button"><NavLink activeClassName="selected" to="/plans">Plans</NavLink></span>
          <span className="button"><NavLink activeClassName="selected" to="/assign_containers">Assign Containers</NavLink></span>
        </div>
        <div className="mobileNav">
          <div className="icon">
            <FontAwesome
              onClick={() => { burgerClick(); }}
              className="burger"
              name="bars"
              size="2x"
            />
          </div>
          <div id="mobileLinks" className="mobileLinks displayNone">
            <NavLink exact activeClassName="selected" to="/"> Home</NavLink>
            <NavLink activeClassName="selected" to="/containers">Containers</NavLink>
            <NavLink activeClassName="selected" to="/vessels">Vessels</NavLink>
            <NavLink activeClassName="selected" to="/plans">Plans</NavLink>
            <NavLink activeClassName="selected" to="/assign_containers">Assign Containers</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
