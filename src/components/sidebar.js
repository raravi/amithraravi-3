import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styles from '../styles/sidebar.module.css';

const Sidebar = ({ layout, category }) => {
  const { sidePostsTech, sidePostsPersonal } = useStaticQuery(
    graphql`
    query {
      sidePostsTech: allMarkdownRemark(
        limit: 4,
        filter: {
          frontmatter: {
            categories: {eq: "tech"}
          }
        }
        sort: {
          fields: [frontmatter___date],
          order: DESC
        }
      ) {
        edges {
          node {
            frontmatter {
              title,
              excerpt,
              teaser
            }
            fields {
              slug
            }
          }
        }
      }
      sidePostsPersonal: allMarkdownRemark(
        limit: 4,
        filter: {
          frontmatter: {
            categories: {eq: "personal"}
          }
        }
        sort: {
          fields: [frontmatter___date],
          order: DESC
        }
      ) {
        edges {
          node {
            frontmatter {
              title,
              excerpt,
              teaser
            }
            fields {
              slug
            }
          }
        }
      }
    }
    `,
  );
  const sidePosts = category === 'tech' ? sidePostsPersonal : sidePostsTech;
  const otherCategory = category === 'tech' ? 'personal' : 'tech';

  return (
    <>
      <div className={styles.sidebar_row}>
        <img
          src="/images/amith-bio-300x300.jpg"
          className={styles.bioPic}
          alt="Avatar"
        />
      </div>
      <div className={styles.sidebar_text}>
        <p className={styles.sayHi}>Hi there! Nice to meet you!</p>
        <p className={styles.sayHiText}>
          I&#39;m Amith: former .Net developer, now full time freelancer/blogger. My
          wife and I live in Bengaluru, India. I love a good book, a quiet getaway,
          and a good laugh.
        </p>
      </div>
      <div className="line-red" />
      <div className={styles.sidebar_text}>
        <h5>Let&#39;s Hang Out</h5>
      </div>
      <div className={styles.sidebar_text}>
        <a
          className={styles.socialIcon}
          href="{{site.owner.linkedin.url}}/{{site.owner.linkedin.username}}"
          aria-label="Link to LinkedIn profile of Amith Raravi"
        >
          <svg className={`${styles.icon} ${styles.iconLinkedin}`}>
            <use xlinkHref="#icon-linkedin" />
          </svg>
        </a>
        <a
          className={styles.socialIcon}
          href="{{site.owner.instagram.url}}/{{site.owner.instagram.username}}"
          aria-label="Link to Instagram profile of Amith Raravi"
        >
          <svg className={`${styles.icon} ${styles.iconInstagram}`}>
            <use xlinkHref="#icon-instagram" />
          </svg>
        </a>
        <a
          className={styles.socialIcon}
          href="{{site.owner.github.url}}/{{site.owner.github.username}}"
          aria-label="Link to GitHub profile of Amith Raravi"
        >
          <svg className={`${styles.icon} ${styles.iconGithub}`}>
            <use xlinkHref="#icon-github" />
          </svg>
        </a>
        <a
          className={styles.socialIcon}
          href="{{site.owner.facebook.url}}/{{site.owner.facebook.username}}"
          aria-label="Link to Facebook profile of Amith Raravi"
        >
          <svg className={`${styles.icon} ${styles.iconFacebook}`}>
            <use xlinkHref="#icon-facebook" />
          </svg>
        </a>
      </div>
      <div className={styles.sidebar_text}>
        <a href="mailto:{{site.owner.email}}"><i>contact me</i></a>
      </div>
      <div className="div-20-high" />
      <div className="line-red" />
      {layout === 'article'
      && (
        <>
          <div className={styles.sidebar_text}>
            <h5>
              {'Posts - '}
              {category === 'tech' ? 'Personal' : 'Tech'}
            </h5>
          </div>
          <div className={styles.sidebar_latestPosts}>
            {sidePosts.edges.map(({ node }) => (
              <div>
                <article className={styles.sidebar_tile}>
                  <a
                    href={`/articles/${otherCategory}/${node.fields.slug.slice(12)}`}
                    title={node.frontmatter.title}
                  >
                    <p className={styles.postTeaser}>
                      <img
                        src={`/images/${node.frontmatter.teaser}`}
                        alt="teaser"
                      />
                    </p>
                    <h2 className={styles.postTitle}>{node.frontmatter.title}</h2>
                    <p className={styles.postExcerpt}>{node.frontmatter.excerpt}</p>
                  </a>
                </article>
              </div>
            ))}
          </div>
          <div className="div-10-high" />
          <div className="line-red" />
        </>
      )}
      <div className={styles.sidebar_text}>
        <h5>Blogger Resources</h5>
      </div>
      <div className={styles.sidebar_bloggerResources}>
        <p>
          <a
            href="https://www.amithraravi.com/articles/tech/your-own-website-part-1/"
          >
            ➤ Your own website - Part I
          </a>
          <br />
          <a
            href="https://www.amithraravi.com/articles/tech/your-own-website-part-2/"
          >
            ➤ Your own website - Part II
          </a>
          <br />
          <a href="https://cookieandkate.com/how-to-start-a-blog/">
            ➤ How to Start any Blog
          </a>
          <br />
          <a href="https://www.bloggingbasics101.com/how-do-i-start-a-blog/">
            ➤ Blogging - Beginner’s Guide 2018
          </a>
          <br />
          <a href="https://makeawebsitehub.com/examples-of-blogs/">
            ➤ Examples of Blogs – 2018 Edition
          </a>
        </p>
      </div>
      <div className="line-red" />
    </>
  );
};

Sidebar.propTypes = {
  layout: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default Sidebar;
