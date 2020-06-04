import React from 'react';
import PropTypes from 'prop-types';
import PageComment from './pageComment';
import PageCommentForm from './pageCommentForm';
import styles from '../../styles/pageComments.module.css';

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

  return (
    <section>
      {
        pageCommentsSorted && (
          <div>
            <h4 className={styles.comments_header}>
              {`${pageCommentsSorted.length} Comment(s)`}
            </h4>
            <div className="div-5-high" />
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
