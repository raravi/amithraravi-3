import React from 'react';
import PropTypes from 'prop-types';
import Layout from './layout';
import Sidebar from './sidebar';
import styles from '../styles/gridLayout.module.css';

const GridLayout = ({ children }) => (
  <Layout>
    <div className={styles.grid}>
      <div className={styles.mainbar}>
        {children}
      </div>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
    </div>
  </Layout>
);

GridLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GridLayout;
