import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import qs from "qs";

import Categories from "../components/Categories";
import SortPopup from "../components/SortPopup";
import PizzaBlock from "../components/PizzaBlock";
import PizzaBlockSkeleton from "../components/PizzaBlock/Skeleton";
import { setFilters } from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzaSlice";
import { clearCart, fetchCart } from "../redux/slices/cartSlice";
import { selectIsAuth } from "../redux/slices/authSlice";

function Home() {
  const dispatch = useDispatch();
  const activeCategoryInd = useSelector(
    (state) => state.filter.activeCategoryInd
  );
  const { sortBy } = useSelector((state) => state.filter.sort);
  const { items, status } = useSelector((state) => state.pizza);

  const isAuth = useSelector(selectIsAuth);

  const navigate = useNavigate();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      dispatch(setFilters(params));

      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      dispatch(fetchPizzas({ activeCategoryInd, sortBy }));
      if (isAuth) dispatch(fetchCart());
      else dispatch(clearCart());
    }
    isSearch.current = false;
  }, [activeCategoryInd, sortBy]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortBy,
        activeCategoryInd,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [activeCategoryInd, sortBy]);

  return (
    <div>
      <div className="filter-block flex--center">
        <Categories />
        <SortPopup />
      </div>

      <div className="content">
        <h1>Все пиццы</h1>
        <div className="content__items">
          {status === "loading"
            ? [...Array(8)].map((_, index) => (
                <PizzaBlockSkeleton key={index} />
              ))
            : items.map((obj) => <PizzaBlock key={obj._id} {...obj} />)}
        </div>
      </div>
    </div>
  );
}

export default Home;
