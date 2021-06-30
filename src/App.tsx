import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Main from './pages/Main';
import Navbar from './components/Navbar';
import Operators from './pages/Operators';
import OperatorDetail from './pages/OperatorDetail';

function App() {
  return (
    <BrowserRouter>
        <Navbar />
      <div className="flex flex-col justify-center items-center text-white bg-gradient-to-br bg-black">
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/operators">
          <Operators />
        </Route>
        <Route exact path="/operator/:charId">
          <OperatorDetail />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
