import { useState } from "react";
import "./App.css";
import NewsComponent from "./components/newsComponent";
import NavbarComponent from "./components/navbarComponent";

function App() {
  const [searchText, setSearchText] = useState("");

  const handleSearchSubmit = (query) => {
    setSearchText(query);
  };
  return (
    <>
      <NavbarComponent onSearchSubmit={handleSearchSubmit} />
      <NewsComponent searchText={searchText} />
    </>
  );
}

export default App;
