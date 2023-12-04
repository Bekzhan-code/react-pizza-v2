import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { setActiveCategoryInd } from "../redux/slices/filterSlice";

const categoryNames = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

function Categories() {
  const activeCategoryInd = useSelector(
    (state) => state.filter.activeCategoryInd
  );
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul className="flex text--bold">
        {categoryNames.map((category, index) => (
          <li
            className={index === activeCategoryInd ? "active" : ""}
            key={index}
            onClick={() => dispatch(setActiveCategoryInd(index))}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
