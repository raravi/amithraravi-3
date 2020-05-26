import React from 'react';
import PropTypes from 'prop-types';
import Layout from './layout';
import Sidebar from './sidebar';
import styles from '../styles/gridLayout.module.css';

const GridLayout = ({ children, layout, category }) => (
  <Layout>
    <div className={styles.grid}>
      <div className={styles.mainbar}>
        {children}
      </div>
      <div className={styles.sidebar}>
        <Sidebar layout={layout} category={category} />
      </div>
    </div>
  </Layout>
);

GridLayout.propTypes = {
  children: PropTypes.node.isRequired,
  layout: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default GridLayout;
