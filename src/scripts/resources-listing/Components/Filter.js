import React from "react";

const Filter = (props) => {
  const title =
    props.name.charAt(0).toUpperCase() + props.name.slice(1).replace("_", " ");

  const categories = props.categories.map((el) => {
    return (
      <label key={el.name}>
        <input type="checkbox" />
        {el.name} ({el.count})
      </label>
    );
  });

  return (
    <div>
      <h3>{title}</h3>
      {categories}
    </div>
  );
};

export default Filter;
