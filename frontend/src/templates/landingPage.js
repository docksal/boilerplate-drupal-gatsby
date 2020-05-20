import { graphql } from "gatsby";
import React from "react";
import Paragraph from "../components/paragraphs/Paragraph";
import Layout from "../layouts";
import Container from "../components/container";

const LandingPageTemplate = ({ data }) => (
  <Layout>
    <Container>
      <h1>{data.page.title}</h1>
      {/* Iterate over all components (paragraphs) and delegate display to a Paragraph component. */}
      {data.page.relationships.components.map((paragraph) => (
        <Paragraph key={paragraph.drupal_id} paragraph={paragraph} />
      ))}
    </Container>
  </Layout>
);

export default LandingPageTemplate;

export const query = graphql`
  query($slug: String!) {
    page: nodeLandingPage(fields: { slug: { eq: $slug } }) {
      title
      relationships {
        components: field_components {
          # Here we list all paragraph types accessible for LandingPage.
          ... on paragraph__featured_recipes {
            # We use fragments to describe paragraph data shape to avoid repetition.
            # See src/components/paragraphs/fragments.js
            ...FeaturedRecipes
          }
          ... on paragraph__cta_banner {
            ...CTABanner
          }
        }
      }
    }
  }
`;
