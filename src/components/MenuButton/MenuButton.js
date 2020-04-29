import React from 'react';
import styles from './MenuButton.module.css';

export default class MenuButton extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.stopPropagation()
    this.props.onClick(e)
  }

  render() {
    return (
      <div className={styles.menuButton} onClick={this.handleClick}>
        {/* <span className={styles.icon}></span> */}
        <span className={styles.text}>Menu</span>
      </div>
    )
  }
}