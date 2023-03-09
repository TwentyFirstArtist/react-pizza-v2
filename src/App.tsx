import { Routes, Route } from "react-router-dom";
import React, { Suspense } from 'react';

import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';

const Card = React.lazy(() => import(/*webpackChunkName: "Card"*/ './pages/Card'))
const NotFound = React.lazy(() => import(/*webpackChunkName: "NotFound"*/'./pages/NotFound'))

function App() {

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/card' element={
            <Suspense fallback={<>Йде загрузка</>} >
              <Card />
            </Suspense>
          } />
          <Route path='/*' element={
            <Suspense fallback={<>Йде загрузка</>} >
              <NotFound />
            </Suspense>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;