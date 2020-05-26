import React from 'react';
import PropTypes from 'prop-types';
import GridLayout from './gridLayout';

const MediaLayout = ({ children, layout }) => (
  <GridLayout layout={layout}>
    {children}
    <hr />
  </GridLayout>
);

MediaLayout.propTypes = {
  children: PropTypes.node.isRequired,
  layout: PropTypes.string.isRequired,
};

export default MediaLayout;
