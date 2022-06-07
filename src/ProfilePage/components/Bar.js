import React from "react";

export default props => (
  <div className="bar">
    <hr />
    Hi I'm a Bar component with the title:
    <h2>{props.followingInfo.previewImg}</h2>
  </div>
);
