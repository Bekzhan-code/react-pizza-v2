import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";

import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { setFilters } from "./redux/slices/filterSlice";
import { fetchPizzas } from "./redux/slices/pizzaSlice";

import "./scss/app.scss";

function App() {
  const dispatch = useDispatch();
  const activeCategoryInd = useSelector(
    (state) => state.filter.activeCategoryInd
  );
  const { sortBy } = useSelector((state) => state.filter.sort);
  const { items, status } = useSelector((state) => state.pizza);

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
      dispatch(fetchPizzas(activeCategoryInd, sortBy));
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
    <div className="App">
      <Header />

      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                pizzas={items}
                isLoadingPizzas={status === "loading" ? true : false}
              />
            }
          />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
