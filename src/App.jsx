import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './paginas/Home';
import Cadastro_cliente from './paginas/Cadastro_cliente';
import Cadastro_produto from './paginas/Cadastro_produto';

import Carrinho from './paginas/Carrinho';

import Sobre from './paginas/Sobre';

function App() {
  return (
    <>
      <Routes>
          <Route path='/' element={<Layout><Home/></Layout>} />
          <Route path='/cadastro_cliente' element={<Layout><Cadastro_cliente/></Layout>} />
          <Route path='/cadastro_produto' element={<Layout><Cadastro_produto/></Layout>} />          
          <Route path='/carrinho' element={<Layout><Carrinho/></Layout>} />
          <Route path='/sobre' element={<Layout><Sobre/></Layout>} />
          

      </Routes>     
    </>
  );
}
export default App;
