/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

const Alert = (props) => {
  const { title, content } = props;

  return (
    <div>
      {title && <div>{title}</div>}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

Alert.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string.isRequired,
};

Alert.defaultProps = {
  title: 'Alert',
};

export default Alert;
