import React from "react";

import prettifyName from "../utils/prettyName";

const Filter = (props) => {
  const title = prettifyName(props.name);

  const categories = props.categories.map((el) => {
    const activeClass = el.active ? "active" : "";
    return (
      <label key={el.name} className={activeClass}>
        <input
          type="checkbox"
          checked={el.active}
          disabled={!el.enabled}
          onChange={() => {
            props.update(el);
          }}
        />
        {el.name}
      </label>
    );
  });

  return (
    <div className="filter">
      <h3>{title}</h3>
      {categories}
    </div>
  );
};

export default Filter;
