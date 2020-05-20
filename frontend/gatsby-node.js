const path = require(`path`);

// Create a slug for each Drupal node and set it as a field on the node.
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type.indexOf(`node__`) === 0) {
    // Use path alias if exists, otherwise fallback to /node/[nid] for slug.
    let slug = node.path.alias
      ? node.path.alias
      : `/node/${node.drupal_internal__nid}`;

    // Normalize all paths to end with /.
    slug = slug + "/";

    // Hardcoded /home path for now, but could be easily achieved via siteMetadata.
    // TODO: Define homepage path in siteMetadata.
    if (slug === "/home/") {
      slug = "/";
    }

    // Create a new field on all graphql nodes of type "node__" that
    // will store the slug, this will be used to build page URLs in createPages.
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

function createRecipes(createPage, graphql) {
  return new Promise((resolve, reject) => {
    const recipeTemplate = path.resolve(`src/templates/recipe.js`);
    // Query for recipe nodes to use in creating pages.
    return graphql(
      `
        {
          recipes: allNodeRecipe {
            edges {
              node {
                internalId: drupal_internal__nid
                fields {
                  slug
                }
              }
            }
          }
        }
      `
    ).then((result) => {
      if (result.errors) {
        throw result.errors;
      }

      // Create pages for each recipe.
      result.data.recipes.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: recipeTemplate,
          context: {
            slug: node.fields.slug,
          },
        });
      });

      resolve();
    });
  });
}

function createLandingPages(createPage, graphql) {
  return new Promise((resolve, reject) => {
    const landingPageTemplate = path.resolve(`src/templates/landingPage.js`);
    // Query for recipe nodes to use in creating pages.
    return graphql(
      `
        {
          pages: allNodeLandingPage {
            edges {
              node {
                internalId: drupal_internal__nid
                fields {
                  slug
                }
              }
            }
          }
        }
      `
    ).then((result) => {
      if (result.errors) {
        throw result.errors;
      }

      // Create pages for each recipe.
      result.data.pages.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: landingPageTemplate,
          context: {
            slug: node.fields.slug,
          },
        });
      });

      resolve();
    });
  });
}

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  // For each page type we designate a separate callback that returns a promise.
  // We consider the createPages process done when all page types are done.
  return Promise.all([
    createRecipes(createPage, graphql),
    createLandingPages(createPage, graphql),
  ]);
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    # Entity interface used as common ground for entity reference fields.
    # TODO: Add more common fields.
    interface Entity {
      drupal_id: String! 
      internal: Internal!
    }
    interface DrupalNode {
      path: Path!
    }
    type Path {
      pid: Int
      alias: String
      langcode: String
    }
    type FormattedText {
      value: String
      format: String
      processed: String
      summary: String
    }
    type Link {
      uri: String
      title: String
    }
    # This is an example of Drupal node type.
    type LandingPage implements Node & DrupalNode {
      path: Path!
    }
    # Paragraph types implement Entity to make Paragraph fragment work.
    type paragraph__featured_recipes implements Node & Entity {
      drupal_id: String!
      internal: Internal!
    }
    type paragraph__cta_banner implements Node & Entity {
      drupal_id: String!
      internal: Internal!
      field_title: String
      field_link: Link
      field_description: FormattedText
    }
  `;
  createTypes(typeDefs);
};
