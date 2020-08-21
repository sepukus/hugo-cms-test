import React from "react";

import prettifyName from "../Utils/prettyName";

const Filter = (props) => {
  const title = prettifyName(props.name);

  const categories = props.categories.map((el) => {
    let labelClass = "";
    labelClass += el.active ? "active" : "";
    labelClass += el.enabled ? "" : " disabled";
    labelClass = labelClass.trim();

    const name = prettifyName(el.name);
    return (
      <label key={el.name} className={labelClass}>
        <input
          type="checkbox"
          checked={el.active}
          disabled={!el.enabled}
          onChange={() => {
            props.update(el);
          }}
        />
        {name}
      </label>
    );
  });

  return (
    <li className="filter">
      <button className="uk-accordion-title">
        <h3>{title}</h3>
      </button>
      <div className="uk-accordion-content">{categories}</div>
    </li>
  );
};

export default Filter;
