import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const TermsPage = () => (
  <Layout>
    <SEO title="Terms" />
    <p>Terms</p>
    <Link to="/">Go home</Link>
  </Layout>
);

export default TermsPage;
