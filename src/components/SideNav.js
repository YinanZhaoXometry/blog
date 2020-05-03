import styles from './SideNav.module.css';
import React from 'react'

export default class SideNav extends React.Component {
  constructor() {
    super();
    this.handleCrossClick = this.handleCrossClick.bind(this);
    this.handleContainerClick = this.handleContainerClick.bind(this);
    this.handleClickNav = this.handleClickNav.bind(this);
  }
  handleCrossClick(e) {
    this.props.onClick(e);
  }
  handleContainerClick(e) {
    e.stopPropagation();
  }
  handleClickNav(e) {
    this.props.onClick(e);
    
  }

  render() {
    return (
      <div className={`${styles.sideNav} ${this.props.menuVisible && styles.visible}`} onClick={this.handleContainerClick}>
        <div className={styles.header}>
          <span className={styles.headerTitle}>Menu</span>
          <span className={styles.headerButton} onClick={this.handleCrossClick}></span>
        </div>
        <ul className={styles.menu}>
          <li className={`${styles.menuItem} ${styles.active}`}>Home</li>
          <li className={styles.menuItem} onClick={this.handleClickNav}>About</li>
          <li className={styles.menuItem} onClick={this.handleClickNav}>Projects</li>
        </ul>
      </div>
    )
  }
}