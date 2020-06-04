/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/pageCommentForm.module.css';

const PageCommentForm = ({ path, siteUrl }) => {
  const words = path.split('/');
  const slug = words[words.length - 2];

  return (
    <div id="respond">
      <h4>
        &nbsp;&nbsp;&nbsp;Leave a Comment
        <small>
          <small>
            <a
              rel="nofollow"
              id={styles.cancelCommentReplyLink}
              href={`${path}#respond`}
              style={{ display: 'none' }}
            >
              Cancel reply
            </a>
          </small>
        </small>
      </h4>
      <form
        id={styles.commentForm}
        method="post"
        action="/add-comment.php"
      >
        <fieldset>
          <label htmlFor="comment-form-message">
            <strong>Comment</strong>
            {' '}
            <small>
              (
              <a href="https://kramdown.gettalong.org/quickref.html">
                Markdown
              </a>
              {' is allowed)'}
            </small>
          </label>
          <textarea
            type="text"
            rows="6"
            id="comment-form-message"
            name="message"
            required
            spellCheck="true"
          />
        </fieldset>
        <fieldset>
          <label htmlFor="comment-form-name">
            <strong>Name</strong>
          </label>
          <input
            type="text"
            id="comment-form-name"
            name="name"
            required
            spellCheck="false"
          />
        </fieldset>
        <fieldset>
          <label htmlFor="comment-form-email">
            <strong>Email</strong>
            {' '}
            <small>
              {'(used for '}
              <a href="http://gravatar.com">Gravatar</a>
              {' image)'}
            </small>
          </label>
          <input
            type="email"
            id="comment-form-email"
            name="email"
            required
            spellCheck="false"
          />
        </fieldset>
        <fieldset>
          <label htmlFor="comment-form-url">
            <strong>Website</strong>
            {' '}
            <small>(optional)</small>
          </label>
          <input type="url" id="comment-form-url" name="url" />
        </fieldset>
        <fieldset className="hidden" style={{ display: 'none' }}>
          <input
            type="hidden"
            name="origin"
            value={`${siteUrl}${path}`}
          />
          <input
            type="hidden"
            id="comment-replying-to"
            name="replyingto"
            value="0"
          />
          <input
            type="hidden"
            id="comment-post-slug"
            name="slug"
            value={slug}
          />
          <input type="hidden" id="comment-token" name="token" value="" />
          <label htmlFor="comment-form-location">
            Leave blank if you are a human
          </label>
          <input
            type="text"
            id="comment-form-location"
            name="fields[hidden]"
            autoComplete="off"
          />
        </fieldset>
        <p className="hidden js-notice">
          <span className="js-notice-text" />
        </p>
        <fieldset>
          <button type="submit" id="comment-form-submit" className="btn">
            Submit Comment
          </button>
        </fieldset>
      </form>
    </div>
  );
};

PageCommentForm.propTypes = {
  path: PropTypes.string.isRequired,
  siteUrl: PropTypes.string.isRequired,
};

export default PageCommentForm;
