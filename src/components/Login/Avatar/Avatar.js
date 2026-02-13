import React from "react";

import "./Avatar.scss";

export const Avatar = ({ photoURL, username }) => {
  return (
    <span className="inline-block h-8 w-8 cursor-pointer overflow-hidden rounded-full">
      <img
        src={photoURL}
        alt={username || ""}
        className="w-full object-cover"
      />
    </span>
  );
};
