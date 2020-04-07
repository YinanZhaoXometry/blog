import styles from './SideNav.module.css';
import React from 'react'

export default class SideNav extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className={styles.sideNav}>
        <div className={styles.header}>
          <span className={styles.headerTitle}>menu</span>
          <span className={styles.headerButton}>X</span>
        </div>
        <ul className={styles.menu}>
          <li className={styles.menuItem}>Home</li>
          <li className={styles.menuItem}>About</li>
          <li className={styles.menuItem}>Projects</li>
        </ul>
      </div>
    )
  }
}