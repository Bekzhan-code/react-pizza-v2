import React from "react";
import { Routes, Route } from "react-router-dom";

import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

export const CategoryContext = React.createContext();
export const SortByContext = React.createContext();

function App() {
  const [activeCatIndex, setActiveCatIndex] = React.useState(0);
  const categoryContextObj = { activeCatIndex, setActiveCatIndex };

  const [isVisible, setIsVisible] = React.useState(false);
  const [activeSortBy, setActiveSortBy] = React.useState(0);

  let sortBy;
  if (activeSortBy === 0) sortBy = "rating";
  else if (activeSortBy === 1) sortBy = "price";
  else sortBy = "name";

  const onClickSortBy = (index) => {
    setActiveSortBy(index);
    setIsVisible(false);
  };

  const sortByContextObj = {
    activeSortBy,
    isVisible,
    onClickSortBy,
    setIsVisible,
  };

  const [pizzas, setPizzas] = React.useState([]);
  const [isLoadingPizzas, setIsLoadingPizzas] = React.useState(true);

  React.useEffect(() => {
    fetch(
      `https://656852f29927836bd9748b19.mockapi.io/items?category=${
        activeCatIndex > 0 ? activeCatIndex : ""
      }&sortBy=${sortBy}`
    )
      .then((res) => res.json())
      .then((arr) => {
        setPizzas(arr);
        setIsLoadingPizzas(false);
      });
  }, [activeCatIndex, activeSortBy]);

  return (
    <div className="App">
      <CategoryContext.Provider value={categoryContextObj}>
        <SortByContext.Provider value={sortByContextObj}>
          <Header />

          <div className="container">
            <Routes>
              <Route
                path="/"
                element={
                  <Home pizzas={pizzas} isLoadingPizzas={isLoadingPizzas} />
                }
              />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </SortByContext.Provider>
      </CategoryContext.Provider>
    </div>
  );
}

export default App;
