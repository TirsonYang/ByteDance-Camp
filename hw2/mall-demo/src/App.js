import Menu from './components/Menu';
import Product from './components/Product';

import { useState } from 'react';

function App() {

  const [searchTerm,setSearchTerm]=useState("");

  const handleSearch = (term)=>{
    setSearchTerm(term);
  }

  return (
    <div>
      <div>
        <Menu onSearchChange={handleSearch}/>
      </div>
      <div>
        <Product searchTerm={searchTerm} />
      </div>
    </div>
  );
}

export default App;
