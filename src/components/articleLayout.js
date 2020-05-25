import React from 'react';
import PropTypes from 'prop-types';
import GridLayout from './gridLayout';

const ArticleLayout = ({ children }) => (
  <GridLayout>
    {children}
  </GridLayout>
);

ArticleLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ArticleLayout;
