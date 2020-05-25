import React from 'react';
import PropTypes from 'prop-types';
import GridLayout from './gridLayout';

const MediaLayout = ({ children }) => (
  <GridLayout>
    {children}
    <hr />
  </GridLayout>
);

MediaLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MediaLayout;
