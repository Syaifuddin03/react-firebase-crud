import React from "react";

export const Button = ({ onClick, title, loading }) => {
  if (loading) {
    return <button className="btn disable">Loading...</button>;
  }
  return (
    <button className="btn" onClick={onClick}>
      {title}
    </button>
  );
};
