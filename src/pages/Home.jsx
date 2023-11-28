import React from "react";

import Categories from "../components/Categories";
import SortPopup from "../components/SortPopup";
import PizzaBlock from "../components/PizzaBlock";

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
          <PizzaBlock />
          <PizzaBlock />
          <PizzaBlock />
          <PizzaBlock />
          <PizzaBlock />
          <PizzaBlock />
          <PizzaBlock />
          <PizzaBlock />
        </div>
      </div>
    </div>
  );
}

export default Home;
