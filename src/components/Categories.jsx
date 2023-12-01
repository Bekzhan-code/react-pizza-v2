import React from "react";

import { CategoryContext } from "../App";

function Categories() {
  const { activeCatIndex, setActiveCatIndex } =
    React.useContext(CategoryContext);

  const categoryNames = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  return (
    <div className="categories">
      <ul className="flex text--bold">
        {categoryNames.map((category, index) => (
          <li
            className={index === activeCatIndex ? "active" : ""}
            key={index}
            onClick={() => setActiveCatIndex(index)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
