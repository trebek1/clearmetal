import PropTypes from 'prop-types';
import React from 'react';
import Nav from './Nav';

const App = props => (
  <div>
    <Nav />
    { props.children }
  </div>

);
App.propTypes = {
  children: PropTypes.node.isRequired,
};
export default App;
