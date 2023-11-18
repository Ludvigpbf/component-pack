// Navigation.js
import React from 'react';
import PropTypes from 'prop-types';
import './Navigation.scss'; // Import your SCSS file

function Navigation({
  activePage,
  pages,
  setActivePage,
  customClass,
  ulProps,
  activeStyle,
  activeClass,
  icon,
  openInNewTab,
  dropdownStyle,
  dropdownClass,
  animateDropdown,
  animationConfigDropdown,
  renderItem,
  customLiElement, // Custom <li> element
  customUlElement, // Custom <ul> element
  ...customProps // Additional custom props
}) {
  return (
    <nav className={`navigation ${customClass}`} {...customProps}>
      {customUlElement ? (
        // If custom <ul> is provided, use it
        React.cloneElement(customUlElement, { className: `navigation ${customClass}` })
      ) : (
        // Otherwise, use the default <ul> with ulProps
        <ul {...ulProps}>
          {pages.map((page) => (
            <li
              key={page.title || page}
              className={`navigation-title ${page.title ? 'dropdown' : ''} ${
                page.title && page.title === activePage ? activeClass || 'active' : ''
              }`}
              onClick={() => (page.title ? null : setActivePage(page))}
            >
              {customLiElement ? (
                // If custom <li> is provided, use it
                React.cloneElement(customLiElement(page, activePage === page.title), {
                  className: `navigation-title ${page.title ? 'dropdown' : ''} ${
                    page.title && page.title === activePage ? activeClass || 'active' : ''
                  }`,
                })
              ) : (
                // Otherwise, use the default content
                <>
                  {icon && <img src={icon} alt="Icon" />}
                  <span>{page.title || page}</span>
                </>
              )}

              {page.title && (
                <ul
                  className={`dropdown-content ${dropdownClass || ''}`}
                  style={dropdownStyle}
                  hidden={!animateDropdown && page.title !== activePage}
                >
                  {page.items.map((item) => (
                    <li
                      key={item}
                      onClick={() => setActivePage(item)}
                      className={item === activePage ? 'active' : ''}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

Navigation.propTypes = {
  activePage: PropTypes.string,
  pages: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(PropTypes.string).isRequired,
      }),
    ])
  ),
  setActivePage: PropTypes.func,
  customClass: PropTypes.string,
  ulProps: PropTypes.object,
  activeStyle: PropTypes.object,
  activeClass: PropTypes.string,
  icon: PropTypes.string,
  openInNewTab: PropTypes.bool,
  dropdownStyle: PropTypes.object,
  dropdownClass: PropTypes.string,
  animateDropdown: PropTypes.bool,
  animationConfigDropdown: PropTypes.object,
  renderItem: PropTypes.func,
  customLiElement: PropTypes.func,
  customUlElement: PropTypes.element,
  ...customProps, // Include customProps in propTypes
};

Navigation.defaultProps = {
  activePage: '',
  pages: [],
  setActivePage: () => {},
  customClass: '',
  ulProps: {},
  activeStyle: {},
  activeClass: 'active',
  icon: '',
  openInNewTab: false,
  dropdownStyle: {},
  dropdownClass: '',
  animateDropdown: false,
  animationConfigDropdown: {},
  renderItem: null,
  customLiElement: null,
  customUlElement: null,
};

export default Navigation;
