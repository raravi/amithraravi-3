/* eslint-disable jsx-a11y/label-has-associated-control */
/* global document, fetch, FormData */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/pageCommentForm.module.css';

const PageCommentForm = ({ path, siteUrl }) => {
  const words = path.split('/');
  const slug = words[words.length - 2];

  useEffect(() => {
    function showAlert(message) {
      document
        .querySelector(`#${styles.commentForm} .js-notice`)
        .classList.remove('hidden');
      document
        .querySelector(`#${styles.commentForm} .js-notice-text`)
        .innerHTML = message;
    }

    const form = document.getElementById(`${styles.commentForm}`);
    form
      .addEventListener('submit', (event) => {
        event.preventDefault();

        form.classList.add('disabled');
        document.querySelector('#comment-form-submit').textContent = 'Loading...';

        const method = form.getAttribute('method');
        const url = form.getAttribute('action');
        const data = new URLSearchParams(Array.from(new FormData(form))).toString();
        const contentType = 'application/x-www-form-urlencoded';

        fetch(url, {
          method,
          body: data,
          headers: {
            'Content-Type': contentType,
          },
        })
          .then(() => {
            document
              .querySelector('#comment-form-submit')
              .textContent = 'Submitted';
            const noticeElement = document.querySelector(`#${styles.commentForm} .js-notice`);
            noticeElement.classList.remove('notice--danger');
            noticeElement.classList.add('notice--success');
            showAlert(
              '<strong>Thank you!</strong> Your comment will show up here once it has been approved by the moderator.',
            );
          })
          .catch(() => {
            document
              .querySelector('#comment-form-submit')
              .textContent = 'Submit Comment';
            const noticeElement = document.querySelector(`#${styles.commentForm} .js-notice`);
            noticeElement.classList.remove('notice--success');
            noticeElement.classList.add('notice--danger');
            showAlert(
              '<strong>Sorry, there was an error with your submission.</strong> Please make sure all required fields have been completed and try again.',
            );
            form.classList.remove('disabled');
          });

        return false;
      });
  }, []);

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
          <input
            type="hidden"
            id="comment-token"
            name="token"
            value=""
          />
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
