import React from "react";

import prettifyName from "../utils/prettyName";

const Filter = (props) => {
  const title = prettifyName(props.name);

  const categories = props.categories.map((el) => {
    return (
      <label key={el.name}>
        <input
          type="checkbox"
          checked={el.active}
          onChange={() => {
            props.update(el);
          }}
        />
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
