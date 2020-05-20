import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import gray from "gray-percentage";
import Img from "gatsby-image";

import Container from "../../../../components/container";
import { rhythm } from "../../../../utils/typography";

export default function FeaturedRecipes() {
  const data = useStaticQuery(graphql`
    query {
      topRecipe: allNodeRecipe(sort: { fields: [created] }, limit: 1) {
        edges {
          node {
            title
            fields {
              slug
            }
            relationships {
              image: field_media_image {
                relationships {
                  file: field_media_image {
                    localFile {
                      childImageSharp {
                        fluid(maxWidth: 740, maxHeight: 555) {
                          ...GatsbyImageSharpFluid
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      nextTwoPromotedRecipes: allNodeRecipe(
        sort: { fields: [created] }
        limit: 2
        skip: 1
      ) {
        edges {
          node {
            title
            fields {
              slug
            }
            relationships {
              category: field_recipe_category {
                name
              }
              image: field_media_image {
                relationships {
                  file: field_media_image {
                    localFile {
                      childImageSharp {
                        fluid(maxWidth: 240, maxHeight: 240) {
                          ...GatsbyImageSharpFluid
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  const topRecipe = data.topRecipe.edges[0].node;
  const nextTwoPromotedRecipes = data.nextTwoPromotedRecipes.edges.map(
    (edge) => edge.node
  );

  const FirstPromoted = ({ recipe }) => (
    <Link
      to={recipe.fields.slug}
      css={{
        display: `block`,
        color: `inherit`,
        border: `1px solid ${gray(80)}`,
        marginBottom: rhythm(1),
        "@media(min-width: 800px)": {
          marginBottom: 0,
          width: `calc(1/2*100% - (1 - 1/2) * ${rhythm(1 / 2)})`,
        },
      }}
    >
      <div
        css={{
          display: `inline-block`,
          padding: `${rhythm(3 / 4)} ${rhythm(1)}`,
        }}
      >
        <h4
          css={{
            fontFamily: `"Josefin Sans", sans-serif`,
            fontWeight: 400,
            margin: 0,
            color: gray(50),
          }}
        >
          Our Recipe Pick
        </h4>
        <h2>{recipe.title}</h2>
      </div>
      <Img
        fluid={
          recipe.relationships.image.relationships.file.localFile
            .childImageSharp.fluid
        }
      />
    </Link>
  );

  const PromotedCard = ({
    recipe,
    square = false,
    columns = 4,
    marginBottom = rhythm(1 / 2),
  }) => (
    <Link
      to={recipe.fields.slug}
      css={{
        color: `inherit`,
        textDecoration: `none`,
        display: `inline-block`,
        border: `1px solid ${gray(80)}`,
        width: `calc(1/${columns}*100% - (1 - 1/${columns}) * ${rhythm(
          1 / 2
        )})`,
        marginBottom,
      }}
    >
      <Img
        fluid={
          recipe.relationships.image.relationships.file.localFile
            .childImageSharp.fluid
        }
      />
      <div
        css={{
          padding: `${rhythm(3 / 4)} ${rhythm(1)}`,
          width:
            recipe.relationships.image.relationships.file.localFile
              .childImageSharp.fluid.width,
          height: square
            ? recipe.relationships.image.relationships.file.localFile
                .childImageSharp.fluid.height
            : undefined,
        }}
      >
        <h4
          css={{
            fontFamily: `"Josefin Sans", sans-serif`,
            fontWeight: 400,
            marginBottom: rhythm(1 / 4),
            color: gray(50),
          }}
        >
          {recipe.relationships.category.name}
        </h4>
        <h3>{recipe.title}</h3>
      </div>
    </Link>
  );

  return (
    <div css={{ overflow: `hidden` }}>
      <Container>
        <div
          css={{
            "@media(min-width: 800px)": {
              display: `flex`,
              justifyContent: `space-between`,
            },
          }}
        >
          <FirstPromoted recipe={topRecipe} />
          {nextTwoPromotedRecipes.map((recipe) => (
            <PromotedCard
              recipe={recipe}
              square={true}
              columns={4}
              marginBottom={0}
              key={recipe.fields.slug}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
