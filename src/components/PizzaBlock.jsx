import React from "react";

import pizzaImg from "../assets/img/pizzza-img.svg";

function PizzaBlock() {
  return (
    <div className="pizza-block">
      <img src={pizzaImg} alt="pizza" />
      <h3 className="pizza-block__title">Чизбургер-пицца</h3>

      <div className="pizza-block__parameters">
        <ul className="pizza-block__type ">
          <li className="active">тонкое</li>
          <li>традиционное</li>
        </ul>
        <ul className="pizza-block__size ">
          <li className="active">26 см.</li>
          <li>30 см.</li>
          <li>40 см.</li>
        </ul>
      </div>

      <div className="flex--center">
        <span className="pizza-block__price">от 395 ₽</span>
        <button className="btn btn--outline">
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
          Добавить
        </button>
      </div>
    </div>
  );
}

export default PizzaBlock;
