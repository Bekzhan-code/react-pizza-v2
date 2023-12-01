import React from "react";
import ContentLoader from "react-content-loader";

const PizzaBlockSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={490}
    viewBox="0 0 280 490"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="290" rx="0" ry="0" width="280" height="23" />
    <circle cx="137" cy="137" r="137" />
    <rect x="0" y="330" rx="10" ry="10" width="280" height="95" />
    <rect x="0" y="445" rx="10" ry="10" width="88" height="27" />
    <rect x="121" y="437" rx="30" ry="30" width="160" height="48" />
  </ContentLoader>
);

export default PizzaBlockSkeleton;
