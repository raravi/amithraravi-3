/* eslint-disable react/no-danger */
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import styles from '../styles/index.module.css';

const IndexPage = () => {
  const { site, contentgrid } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
            email
            facebook {
              url
              username
            }
            github {
              url
              username
            }
            instagram {
              url
              username
            }
            linkedin {
              url
              username
            }
          }
        }
        contentgrid: allContentgridYaml {
          nodes {
            title
            excerpt
          }
        }
      }
    `,
  );

  return (
    <Layout>
      <SEO title="Home" />
      <div className={styles.mainBox}>
        <div className={`${styles.mainBox_row} ${styles.mainBox_row___forward}`}>
          <div
            className={`${styles.mainBox_col} ${styles.mainBox_image}`}
            style={{ backgroundImage: 'url(/images/dotnet-700x350.jpg)' }}
          >
            <div className={styles.mainBox_gridTitle}>
              <h1>{contentgrid.nodes[0].title}</h1>
            </div>
          </div>
          <div className={styles.mainBox_col}>
            <div
              className={styles.mainBox_gridContent}
              dangerouslySetInnerHTML={{ __html: contentgrid.nodes[0].excerpt }}
            />
          </div>
        </div>
        <div className={`${styles.mainBox_row} ${styles.mainBox_row___reverse}`}>
          <div
            className={`${styles.mainBox_col} ${styles.mainBox_image}`}
            style={{ backgroundImage: 'url(/images/website-design-700x350.jpg)' }}
          >
            <div className={styles.mainBox_gridTitle}>
              <h1>{ contentgrid.nodes[1].title }</h1>
            </div>
          </div>
          <div className={styles.mainBox_col}>
            <div
              className={styles.mainBox_gridContent}
              dangerouslySetInnerHTML={{ __html: contentgrid.nodes[1].excerpt }}
            />
          </div>
        </div>
        <div className={`${styles.mainBox_row} ${styles.mainBox_row___forward}`}>
          <div
            className={`${styles.mainBox_col} ${styles.mainBox_image}`}
            style={{ backgroundImage: 'url(/images/web-designer-700x350.jpg)' }}
          >
            <div className={styles.mainBox_gridTitle}>
              <h1>{ contentgrid.nodes[2].title }</h1>
            </div>
          </div>
          <div className={styles.mainBox_col}>
            <div
              className={styles.mainBox_gridContent}
              dangerouslySetInnerHTML={{ __html: contentgrid.nodes[2].excerpt }}
            />
          </div>
        </div>
        <div className={`${styles.mainBox_row} ${styles.mainBox_row___reverse}`}>
          <div
            className={`${styles.mainBox_col} ${styles.mainBox_image}`}
            style={{ backgroundImage: 'url(/images/writer-700x350.jpg)' }}
          >
            <div className={styles.mainBox_gridTitle}>
              <h1>{ contentgrid.nodes[3].title }</h1>
            </div>
          </div>
          <div className={styles.mainBox_col}>
            <div
              className={styles.mainBox_gridContent}
              dangerouslySetInnerHTML={{ __html: contentgrid.nodes[3].excerpt }}
            />
          </div>
        </div>
        <div className={`${styles.mainBox_row} ${styles.mainBox_row___forward}`}>
          <div
            className={`${styles.mainBox_col} ${styles.mainBox_image}`}
            style={{ backgroundImage: 'url(/images/editor-700x350.jpg)' }}
          >
            <div className={styles.mainBox_gridTitle}>
              <h1>{ contentgrid.nodes[4].title }</h1>
            </div>
          </div>
          <div className={styles.mainBox_col}>
            <div
              className={styles.mainBox_gridContent}
              dangerouslySetInnerHTML={{ __html: contentgrid.nodes[4].excerpt }}
            />
          </div>
        </div>
      </div>

      <div className={styles.mainAboutMe}>
        <div className={styles.mainAboutMe_col}>
          <img
            src={`${site.siteMetadata.siteUrl}/images/amith-bio-300x300.jpg`}
            className={styles.mainAboutMe_bioPic}
            alt="Avatar"
          />
        </div>
        <div className={styles.mainAboutMe_col}>
          <div className={styles.mainAboutMe_text}>
            <p className={styles.mainAboutMe_sayHi}>Hi there! Nice to meet you!</p>
            <p className={styles.mainAboutMe_sayHiText}>
              I&#39;m Amith: former .Net developer, now full time freelancer/blogger. My
              wife and I live in Bengaluru, India. I love a good book, a quiet
              getaway, and a good laugh.
            </p>
          </div>
        </div>
        <div className={styles.mainAboutMe_col}>
          <div className={styles.mainAboutMe_text}>
            <h5>Let&#39;s Hang Out</h5>
          </div>
          <div className={styles.mainAboutMe_text}>
            <a
              className={styles.mainAboutMe_socialIcon}
              href={`${site.siteMetadata.linkedin.url}/${site.siteMetadata.linkedin.username}`}
              aria-label="Link to LinkedIn profile of Amith Raravi"
            >
              <svg className={`${styles.mainAboutMe_icon} ${styles.mainAboutMe_iconLinkedin}`}>
                <use xlinkHref="#icon-linkedin" />
              </svg>
            </a>
            <a
              className={styles.mainAboutMe_socialIcon}
              href={`${site.siteMetadata.instagram.url}/${site.siteMetadata.instagram.username}`}
              aria-label="Link to Instagram profile of Amith Raravi"
            >
              <svg className={`${styles.mainAboutMe_icon} ${styles.mainAboutMe_iconInstagram}`}>
                <use xlinkHref="#icon-instagram" />
              </svg>
            </a>
            <a
              className={styles.mainAboutMe_socialIcon}
              href={`${site.siteMetadata.github.url}/${site.siteMetadata.github.username}`}
              aria-label="Link to GitHub profile of Amith Raravi"
            >
              <svg className={`${styles.mainAboutMe_icon} ${styles.mainAboutMe_iconGithub}`}>
                <use xlinkHref="#icon-github" />
              </svg>
            </a>
            <a
              className={styles.mainAboutMe_socialIcon}
              href={`${site.siteMetadata.facebook.url}/${site.siteMetadata.facebook.username}`}
              aria-label="Link to Facebook profile of Amith Raravi"
            >
              <svg className={`${styles.mainAboutMe_icon} ${styles.mainAboutMe_iconFacebook}`}>
                <use xlinkHref="#icon-facebook" />
              </svg>
            </a>
          </div>
          <div className={`${styles.mainAboutMe_text} ${styles.mainAboutMe_textContactMe}`}>
            <a href={`mailto:${site.siteMetadata.email}`}><i>contact me</i></a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
