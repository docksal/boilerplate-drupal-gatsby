import React from "react";
import PropTypes from "prop-types";
import "./fragments";

import { default as FeaturedRecipes } from "./components/FeaturedRecipes/FeaturedRecipes";
import { default as CTABanner } from "./components/CTABanner/CTABanner";

export default function Paragraph({ paragraph }) {
  try {
    switch (paragraph.internal.type) {
      case "paragraph__featured_recipes":
        return <FeaturedRecipes />;
      case "paragraph__cta_banner":
        return <CTABanner data={paragraph} />;
      default:
        return (
          <div id={`paragraph-${paragraph.drupal_id}`}>
            Please implement a component for paragraph type:{" "}
            {paragraph.internal.type}
            <br />
            Paragraph Drupal ID: {paragraph.drupal_id}
          </div>
        );
    }
  } catch (e) {
    console.log(e);
    return "";
  }
}

Paragraph.propTypes = {
  paragraph: PropTypes.shape({
    drupal_id: PropTypes.string.isRequired,
    internal: PropTypes.shape({
      type: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
