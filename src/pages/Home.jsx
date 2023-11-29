import React from "react";

import Categories from "../components/Categories";
import SortPopup from "../components/SortPopup";
import PizzaBlock from "../components/PizzaBlock";

import pizzas from "../assets/pizzas.json";

function Home() {
  return (
    <div>
      <div className="filter-block flex--center">
        <Categories />
        <SortPopup />
      </div>

      <div className="content">
        <h1>Все пиццы</h1>
        <div className="content__items">
          {pizzas.map((obj) => (
            <PizzaBlock
              key={obj.id}
              imageUrl={obj.imageUrl}
              name={obj.name}
              types={obj.types}
              sizes={obj.sizes}
              price={obj.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
