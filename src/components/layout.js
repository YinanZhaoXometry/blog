import React from "react"
import { Link } from "gatsby"
import Toggle from './Toggle/Toggle'

import { rhythm, scale } from "../utils/typography"

class Layout extends React.Component {
  constructor() {
    super();
    this.state = { theme: null };
  };

  componentDidMount() {
    this.setState({ theme: window.__theme });
    window.__onThemeChange = () => {
      this.setState({ theme: window.__theme });
    };
  }

  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

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
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header
          style={{
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: rhythm(1.5),
          }}
        >
          {header}
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
          Made with by <a href="/">Yinan Zhao</a> | KuHe.io ️© {new Date().getFullYear()}
        </footer>
      </div>
    )
  }
}

export default Layout
