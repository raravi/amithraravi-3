import React from 'react';
import PropTypes from 'prop-types';
import GridLayout from './gridLayout';

const ArticleLayout = ({ children, layout, category }) => (
  <GridLayout layout={layout} category={category}>
    {children}
  </GridLayout>
);

ArticleLayout.propTypes = {
  children: PropTypes.node.isRequired,
  layout: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default ArticleLayout;
