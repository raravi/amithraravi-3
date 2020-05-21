import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const ArticlesPage = () => (
  <Layout>
    <SEO title="Articles" />
    <p>Articles</p>
    <Link to="/">Go home</Link>
  </Layout>
);

export default ArticlesPage;
