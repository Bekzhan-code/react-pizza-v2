import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

import "./scss/app.scss";

function App() {
  const activeCategoryInd = useSelector(
    (state) => state.filter.activeCategoryInd
  );

  const { sortBy } = useSelector((state) => state.filter.sort);

  const [pizzas, setPizzas] = React.useState([]);
  const [isLoadingPizzas, setIsLoadingPizzas] = React.useState(true);

  React.useEffect(() => {
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
