import React from "react";
import financelogo from "../../image/dollar_sign.png";
import climatelogo from "../../image/earth.png";
import sociallogo from "../../image/social.png";
import formlogo from "../../image/post.png";
import { Image } from "semantic-ui-react";

const Logos = (props) => {
  const logo_hash = [
    {
      key: "Finance",
      value: financelogo,
    },
    {
      key: "Climate",
      value: climatelogo,
    },
    {
      key: "Social",
      value: sociallogo,
    },
    {
      key: "Form",
      value: formlogo
    }
  ];

  return (
    <div>
      <Image
        src={logo_hash.find((x) => x.key === props.img_purpose).value}
        alt={logo_hash
          .find((x) => x.key === props.img_purpose)
          .value.match("(?!.*/).+")}
        size={props.icon_details}
        rounded
        centered
      />
    </div>
  );
};

export default Logos;
