import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import classnames from 'classnames';
import styles from './index.module.sass';

import ExternalLink from 'components/ExternalLink';

import MenuAccount from './MenuAccount';

import Logo from 'assets/images/icons/notext-logo.png';

const MENU_ITEMS = [
  { link: '/search/teams', title: 'Teams' },
  { link: '/search/axies/1', title: 'Axies' },
  { link: 'http://esports.axie.gg/', title: 'eSports', external: true },
];

class Menu extends Component {
  state = {
    fixed: false,
    hovered: false,
    forceNoHover: false,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const scrollY = window.pageYOffset;
    const { fixed } = this.state;

    if (scrollY > 0 && !fixed) {
      this.setState({ fixed: true });
    } else if (scrollY === 0 && fixed) {
      this.setState({ fixed: false });
    }
  }

  setHovered = (hovered) => {
    this.setState({ hovered });
  }

  setForceNoHover = (e, url) => {
    if (url) {
      e.preventDefault();
      e.stopPropagation();
      this.props.history.push(url);
    }

    this.setState({ forceNoHover: true });
    setTimeout(() => {
      this.setState({ forceNoHover: false });
    }, 1000);
  }

  render() {
    const { fixed, hovered, forceNoHover } = this.state;

    return (
      <nav className={classnames(
        styles.nav,
        {
          [styles.fixed]: fixed,
          [styles.hovered]: hovered,
          [styles.hoveredNo]: forceNoHover,
        },
      )}
      >
        <Link to="/" className={styles.logo}>
          <img alt="Axie.gg logo" src={Logo} />
        </Link>
        <ul className={styles.menuList}>
          {MENU_ITEMS.map(item => (
            <li key={item.link} className={styles.menuItem}>
              {item.external
                ? (
                  <ExternalLink className={styles.menuItemLink} href={item.link}>
                    <span className={styles.menuItemTitle}>{item.title}</span>
                  </ExternalLink>
                ) : (
                  <Link className={styles.menuItemLink} to={item.link}>
                    <span className={styles.menuItemTitle}>{item.title}</span>
                  </Link>
                )}
            </li>
          ))}
        </ul>
        <div className={styles.right}>
          <MenuAccount />
        </div>
      </nav>
    );
  }
}

export default withRouter(Menu);
