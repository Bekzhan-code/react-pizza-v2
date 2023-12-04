import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";

import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { setFilters } from "./redux/slices/filterSlice";

import "./scss/app.scss";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const activeCategoryInd = useSelector(
    (state) => state.filter.activeCategoryInd
  );

  const { sortBy } = useSelector((state) => state.filter.sort);

  const [pizzas, setPizzas] = React.useState([]);
  const [isLoadingPizzas, setIsLoadingPizzas] = React.useState(true);

  function fetchPizzas() {
    setIsLoadingPizzas(true);
    fetch(
      `https://656852f29927836bd9748b19.mockapi.io/items?category=${
        activeCategoryInd > 0 ? activeCategoryInd : ""
      }&sortBy=${sortBy}`
    )
      .then((res) => res.json())
      .then((arr) => {
        setPizzas(arr);
        setIsLoadingPizzas(false);
      });
  }

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      dispatch(setFilters(params));

      isSearch.current = true;

      console.log(window.location.search);
      console.log("set filters useEffect, no variables");
    }
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
      console.log("fetching pizzas useEffect, category and sort indexes");
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

      console.log(
        "changing url parameters useEffect, category and sort indexes"
      );
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
            element={<Home pizzas={pizzas} isLoadingPizzas={isLoadingPizzas} />}
          />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
