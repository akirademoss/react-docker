import React from "react";
import Bar from "./components/Bar";
import Foo from "./components/Foo";
const Components = {
    foo: Foo,
    '' : Bar
  };
export default followingInfo => {
  if (typeof Components[followingInfo.name] !== "undefined") {
    return React.createElement(Bar, {
      key: followingInfo.previewImgKey,
      followingInfo: followingInfo
    });
  }
  return React.createElement(
    () => <div>The component {followingInfo.name} has not been created yet.</div>,
    { key: followingInfo.previewImgKey }
  );
};
