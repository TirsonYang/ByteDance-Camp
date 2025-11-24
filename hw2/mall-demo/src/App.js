import React from 'react';
import Menu from './components/Menu';
import Product from './components/Product';

import { useState } from 'react';

function App() {

  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("default");

  const handleSearch = (term) => {
    setSearchTerm(term);
  }

  const handleSort = (type) => {
    setSortType(type);
  }

  return (
    <div>
      <div>
        <Menu onSearchChange={handleSearch} onSortChange={handleSort} />
      </div>
      <div>
        <Product searchTerm={searchTerm} sortType={sortType} />
      </div>
    </div>
  );
}

export default App;