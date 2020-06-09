/* global document */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import PageComment from './pageComment';
import PageCommentForm from './pageCommentForm';
import styles from '../../styles/pageComments.module.css';
import stylesComment from '../../styles/pageComment.module.css';
import stylesCommentForm from '../../styles/pageCommentForm.module.css';

/**
 * 'Comment Reply' to each comment.
 * This script moves the Add Comment section to the position below the appropriate comment.
 * Modified from Wordpress https://core.svn.wordpress.org/trunk/wp-includes/js/comment-reply.js
 * Released under the GNU General Public License - https://wordpress.org/about/gpl/
 */
const addComment = {
  moveForm(commId, parentId, respondId, postId) {
    let div;
    const t = this;
    const comm = t.I(commId);
    const respond = t.I(respondId);
    const cancel = t.I(stylesCommentForm.cancelCommentReplyLink);
    const parent = t.I('comment-replying-to');
    const post = t.I('comment-post-slug');
    const commentForm = respond.getElementsByTagName('form')[0];

    if (!comm || !respond || !cancel || !parent || !commentForm) {
      // Moveform: Error 1 - return
      return false;
    }

    t.respondId = respondId;

    if (!t.I('sm-temp-form-div')) {
      div = document.createElement('div');
      div.id = 'sm-temp-form-div';
      div.style.display = 'none';
      respond.parentNode.insertBefore(div, respond);
    }

    comm.parentNode.insertBefore(respond, comm.nextSibling);
    if (post && postId) {
      post.value = postId;
    }
    parent.value = parentId;
    cancel.style.display = '';

    // eslint-disable-next-line func-names
    cancel.onclick = function () {
      const tInner = addComment;
      const temp = tInner.I('sm-temp-form-div');
      const respondInner = tInner.I(tInner.respondId);

      if (!temp || !respondInner) {
        // Cancel: Error 2 - return
        return false;
      }

      tInner.I('comment-replying-to').value = '0';
      temp.parentNode.insertBefore(respondInner, temp);
      temp.parentNode.removeChild(temp);
      this.style.display = 'none';
      this.onclick = null;
      // Cancel: Success - return
      return false;
    };

    // Set initial focus to the first form focusable element.
    document.getElementById('comment-form-message').focus();

    // Return false so that the page is not redirected to HREF.
    // Moveform: Success - return
    return false;
  },

  I(id) {
    return document.getElementById(id);
  },
};

const PageComments = ({ comments, path, siteUrl }) => {
  const pageComments = [];
  const pageSlug = path.split('/')[3];
  comments.nodes.forEach((node) => {
    const commentSlug = node.fields.slug.split('/')[1];
    if (commentSlug === pageSlug) {
      pageComments.push(JSON.parse(JSON.stringify(node)));
    }
  });
  const pageCommentsSorted = [];
  if (pageComments) {
    for (let i = 0; i < pageComments.length; i += 1) {
      const comment = pageComments[i];
      if (comment.frontmatter.replying_to !== '0') {
        break;
      }
      const commentToBePushed = JSON.parse(JSON.stringify(comment));
      commentToBePushed.index = `-${i + 1}`;
      pageCommentsSorted.push(commentToBePushed);
      for (let j = i + 1, childIndex = 1; j < pageComments.length; j += 1) {
        const childComment = pageComments[j];
        if (childComment.frontmatter.replying_to === `${i + 1}`) {
          const childCommentToBePushed = JSON.parse(JSON.stringify(childComment));
          childCommentToBePushed.index = `${commentToBePushed.index}-${childIndex}`;
          pageCommentsSorted.push(childCommentToBePushed);
          childIndex += 1;
        }
      }
    }
  }

  useEffect(() => {
    const commentsWithReplies = document.getElementsByClassName(`${stylesComment.comment_reply}`);
    Array.prototype.forEach.call(commentsWithReplies, (comment) => {
      comment.addEventListener('click', () => {
        const aTag = comment.getElementsByTagName('A')[0];
        addComment.moveForm(
          aTag.dataset.comment,
          aTag.dataset.index,
          aTag.dataset.respond,
          aTag.dataset.slug,
        );
      });
    });
  }, []);

  return (
    <section>
      {
        pageCommentsSorted.length > 0 && (
          <div>
            <h4 className={styles.comments_header}>
              {`${pageCommentsSorted.length} Comment(s)`}
            </h4>
            {
              pageCommentsSorted.map((comment) => {
                if (comment.frontmatter.replying_to === '0') {
                  return (
                    <div key={comment.index}>
                      <PageComment
                        index={comment.index}
                        name={comment.frontmatter.name}
                        email={comment.frontmatter.email}
                        url={comment.frontmatter.url}
                        date={comment.frontmatter.date_created}
                        message={comment.html}
                        slug={pageSlug}
                        child={false}
                      />
                    </div>
                  );
                }
                return (
                  <div key={comment.index}>
                    <PageComment
                      index={comment.index}
                      name={comment.frontmatter.name}
                      email={comment.frontmatter.email}
                      url={comment.frontmatter.url}
                      date={comment.frontmatter.date_created}
                      message={comment.html}
                      slug={pageSlug}
                      child
                    />
                  </div>
                );
              })
            }
          </div>
        )
      }
      <PageCommentForm path={path} siteUrl={siteUrl} />
    </section>
  );
};

PageComments.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  comments: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  siteUrl: PropTypes.string.isRequired,
};

export default PageComments;
