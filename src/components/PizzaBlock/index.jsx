import React from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "../../axios";
import { postItem, fetchCart } from "../../redux/slices/cartSlice";
import { selectIsAuth } from "../../redux/slices/authSlice";

const typeNames = ["тонкое", "традиционное"];
const sizeTypes = [26, 30, 40];

function PizzaBlock({ imageUrl, name, types, sizes, price }) {
  const dispatch = useDispatch();

  const addedCount = useSelector((state) =>
    state.cart.items
      .filter((obj) => obj.name === name)
      .reduce((sum, obj) => {
        return sum + obj.amount;
      }, 0)
  );
  const isAuth = useSelector(selectIsAuth);

  const [activeType, setActiveType] = React.useState(
    types.includes("тонкое") ? 0 : 1
  );
  const [activeSize, setActiveSize] = React.useState(
    sizes.includes(26) ? 0 : 1
  );

  const onClickAdd = async () => {
    if (isAuth) {
      const pizzaObj = {
        imageUrl,
        name,
        price,
        type: typeNames[activeType],
        size: sizeTypes[activeSize],
      };
      dispatch(postItem(pizzaObj));
    } else {
      alert("Вы не авторизованы!");
    }
  };
  return (
    <div className="pizza-block">
      <img className="pizza-block__img" src={imageUrl} alt="pizza" />
      <h3 className="pizza-block__title">{name}</h3>

      <div className="pizza-block__parameters">
        <ul className="pizza-block__type ">
          {typeNames.map((type, index) => (
            <li
              className={`${activeType === index ? "active" : ""} ${
                types.includes(type) ? "" : "disabled"
              }`}
              key={index}
              onClick={() => setActiveType(index)}
            >
              {type}
            </li>
          ))}
        </ul>
        <ul className="pizza-block__size ">
          {sizeTypes.map((size, index) => (
            <li
              className={`${activeSize === index ? "active" : ""} ${
                sizes.includes(size) ? "" : "disabled"
              }`}
              key={index}
              onClick={() => setActiveSize(index)}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>

      <div className="flex--center">
        <span className="pizza-block__price">от {price} ₽</span>
        <button className="btn btn--outline" onClick={onClickAdd}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="#EB5A1E"
            />
          </svg>
          Добавить {addedCount === 0 ? "" : <i>{addedCount}</i>}
        </button>
      </div>
    </div>
  );
}

export default PizzaBlock;
