import React from "react";
import constants from "../../../../utils/constants";
import Container from "../../../../components/container";
import { rhythm } from "../../../../utils/typography";
import gray from "gray-percentage";

export default function CTABanner({ data: { title, description, link } }) {
  return (
    <div
      css={{
        background: constants.darkYellow,
      }}
    >
      <Container
        css={{
          paddingLeft: rhythm(4),
        }}
      >
        <div css={{ maxWidth: rhythm(15) }}>
          <h2>{title}</h2>
          <div dangerouslySetInnerHTML={{ __html: description.text }} />
          <button
            css={{
              background: constants.darkGray,
              color: gray(75, 0, true),
              padding: `${rhythm(1 / 3)} ${rhythm(2 / 3)}`,
              lineHeight: 1.3,
              cursor: `pointer`,
            }}
          >
            {link.title}
          </button>
        </div>
      </Container>
    </div>
  );
}
