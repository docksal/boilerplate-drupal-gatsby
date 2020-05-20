import { graphql } from "gatsby";

// Document all fragments for paragraphs here.
//
// Include this file at least once so that webpack can pick it up, it's important to be picked up by Gatsby
// during build process so Gatsby can process all the fragments.
export const query = graphql`
  # Paragraph fragment is used to define common fields needed by Paragraph component.
  fragment Paragraph on Entity {
    drupal_id
    internal {
      type
    }
  }
  fragment CTABanner on paragraph__cta_banner {
    ...Paragraph
    title: field_title
    description: field_description {
      text: processed
    }
    link: field_link {
      title
      uri
    }
  }

  fragment FeaturedRecipes on paragraph__featured_recipes {
    ...Paragraph
  }
`;
