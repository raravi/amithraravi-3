import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as styles from '../../styles/pageComment.module.css';

const PageComment = ({
  index,
  name,
  email,
  url,
  date,
  message,
  slug,
  child,
}) => (
  <article
    id={`comment${index}`}
    className={child === true ? `${styles.comment} ${styles.child}` : `${styles.comment}`}
  >
    <div className={styles.comment_box}>
      <div className={styles.comment_avatar}>
        <img
          src={`https://www.gravatar.com/avatar/${email}?d=mm&s=60`}
          srcSet={`https://www.gravatar.com/avatar/${email}?d=mm&s=120 2x`}
          alt={`${name}`}
        />
      </div>
      <div>
        <h3 className={styles.comment_authorName}>
          {
            url
              ? <a rel="external nofollow" href={url}>{name}</a>
              : <>{ name }</>
          }
        </h3>
        <div className={styles.comment_timestamp}>
          <a
            href={`#comment${index}`}
            title="Permalink to this comment"
          >
            <time dateTime={moment(date * 1000).format()}>
              {moment(date * 1000).format('MMMM Do, YYYY [at] h:mm a')}
            </time>
          </a>
        </div>
      </div>
    </div>
    <div className={styles.comment_content}>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: message }} />
    </div>
    {
      child === false && (
        <div className={styles.comment_reply}>
          <a
            rel="nofollow"
            href={`#comment${index}`}
            data-comment={`comment${index}`}
            data-index={index.slice(1)}
            data-respond="respond"
            data-slug={slug}
          >
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 16 16"
              style={{ enableBackground: 'new 0 0 16 16' }}
              xmlSpace="preserve"
            >
              <path
                className={styles.replyingToIcon}
                d="M11.6,12.8l-1-1l2.7-2.7H5.5C0.2,9.1,0,3.9,0,3.7l0-0.5l1.4,0v0.5c0,0.2,0,4.1,4.1,4.1h7.8L10.6,5l1-1L16,8.4L11.6,12.8z"
              />
            </svg>
            {`  Reply to ${name}`}
          </a>
        </div>
      )
    }
  </article>
);

PageComment.propTypes = {
  index: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  url: PropTypes.string,
  date: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  child: PropTypes.bool.isRequired,
};

PageComment.defaultProps = {
  url: '',
};

export default PageComment;
