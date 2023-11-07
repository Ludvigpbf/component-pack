import React from 'react';
import PropTypes from 'prop-types';


  function Navigation({ activePage, pages, onItemClick }) {
  // Your component logic here
  return (


    <nav className={`navigation ${className}`}>
      <ul>
        {pages.map((page) => (
          <li
            key={page}
            className={page === activePage ? 'active' : ''}
            onClick={() => onItemClick(page)}
          >
            {page}
          </li>
        ))}
      </ul>
    </nav>
  );
}


Navigation.propTypes = {
  activePage: PropTypes.string,
  pages: PropTypes.arrayOf(PropTypes.string),
  onItemClick: PropTypes.func,
};

Navigation.defaultProps = {
  activePage: '',
  pages: [],
  onItemClick: () => {},
};


import React, { useState } from 'react';
import Navigation from 'my-dynamic-nav'; // Import your npm package

function App() {
  const [activePage, setActivePage] = useState('Home');
  const pages = ['Home', 'About', 'Services', 'Contact'];

  const handleItemClick = (page) => {
    setActivePage(page);
  };

  return (
    <div className="App">
      <Navigation className="navigation-horizontal" activePage={activePage} pages={pages} onItemClick={handleItemClick} />
    </div>
  );
}

export default App;
