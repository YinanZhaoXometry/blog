import React from "react"
import { Link } from "gatsby"
import Toggle from './Toggle/Toggle'
import SideNav from './SideNav/SideNav'
import MenuButton from './MenuButton/MenuButton'

import { rhythm, scale } from "../utils/typography"
import styles from './layout.module.css'

class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      theme: null,
      menuVisible: false,
      layoutWrapper: null
    };
  };

  componentDidMount() {
    this.setState({
      theme: window.__theme,
      layoutWrapper: document.getElementById('gatsby-focus-wrapper')
    });
    window.__onThemeChange = () => {
      this.setState({ theme: window.__theme });
    };
  }

  renderHeader() {
    const { location, title } = this.props
    let header;
    const rootPath = `${__PATH_PREFIX__}/`
    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginTop: 0,
            marginBottom: 0
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
            marginBottom: 0
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return header
  }

  handleMenuButtonClick() {
    this.setState({ menuVisible: true })
    this.state.layoutWrapper.style.paddingRight = '200px'
  }
  
  handleSideNavClick() {
    this.setState({ menuVisible: false })
    this.state.layoutWrapper.style.paddingRight = '0'
  }

  render() {
    const { children } = this.props
    return (
      <div
        className={`${styles.layout}`}
        style={{
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <MenuButton onClick={() => this.handleMenuButtonClick()} />
        <SideNav onClick={() => this.handleSideNavClick()} menuVisible={this.state.menuVisible} />
        <header
          style={{
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: rhythm(1.5),
          }}
        >
          {this.renderHeader()}
          {this.state.theme === null ? (
            <div style={{ height: '24px' }}></div>
          ) : (
            <Toggle
              checked={this.state.theme === 'dark'}
              onChange={e =>
                window.__setPreferredTheme(
                  e.target.checked ? 'dark' : 'light'
                )
              }
            />
          )}
        </header>
        <main>{children}</main>
        <footer>
          Made by <a href="/">Yinan Zhao</a> | KuHe.io ️© {new Date().getFullYear()}
        </footer>
      </div>
    )
  }
}

export default Layout
