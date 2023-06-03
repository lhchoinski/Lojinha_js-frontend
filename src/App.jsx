import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './paginas/Home';
import Cadastros from './paginas/Cadastros';
import Atitudes from './paginas/Atitudes';
import Carrinho from './paginas/Carrinho';

import Sobre from './paginas/Sobre';

function App() {
  return (
    <>
      <Routes>
          <Route path='/' element={<Layout><Home/></Layout>} />
          <Route path='/cadastros' element={<Layout><Cadastros/></Layout>} />   
          <Route path='/produtos' element={<Layout><Atitudes/></Layout>} />        
          <Route path='/carrinho' element={<Layout><Carrinho/></Layout>} />
          <Route path='/sobre' element={<Layout><Sobre/></Layout>} />
          

      </Routes>     
    </>
  );
}
export default App;
