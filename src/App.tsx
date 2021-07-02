import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { BeatLoader } from 'react-spinners'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Navbar from './components/Navbar';
import Content from './Content';

function App() {
  return (
    <BrowserRouter>
        <Navbar />
      <div className="text-white" style={{ backgroundColor: '#242221'}}>
        <Suspense fallback={<div className="h-screen w-screen container py-8 flex justify-center">
                <BeatLoader color="#FFFFFF"/>
            </div>}>
          <Content />
        </Suspense>        
      </div>
    </BrowserRouter>
  );
}

export default App;
