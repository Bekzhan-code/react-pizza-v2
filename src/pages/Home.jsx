import React from "react";

import Categories from "../components/Categories";
import SortPopup from "../components/SortPopup";
import PizzaBlock from "../components/PizzaBlock";
import PizzaBlockSkeleton from "../components/PizzaBlock/Skeleton";

function Home({ pizzas, isLoadingPizzas }) {
  return (
    <div>
      <div className="filter-block flex--center">
        <Categories />
        <SortPopup />
      </div>

      <div className="content">
        <h1>Все пиццы</h1>
        <div className="content__items">
          {isLoadingPizzas
            ? [...Array(8)].map((_, index) => (
                <PizzaBlockSkeleton key={index} />
              ))
            : pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
        </div>
      </div>
    </div>
  );
}

export default Home;
