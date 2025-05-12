import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider } from './contexto/contexto';
import './App.css'

import Aleatorios from './Componentes/aleatorios'
import  Capturados from './Componentes/capturados'  
import Favoritos from './Componentes/favoritos'
import Lista from './Componentes/lista' 
import Pokemon from './Componentes/pokemon'
import Usuario from './Componentes/usuarios'
import Menu from './Componentes/menu';

function App() {

  return (
    <AppProvider>
    <Router>
<Menu />
<Routes>
  <Route path="/" element={<Lista />} />
  <Route path="/usuarios" element={<Usuario />} />
  <Route path="/aleatorios" element={<Aleatorios />} />
  <Route path="/capturados" element={<Capturados />} />
  <Route path="/favoritos" element={<Favoritos />} />
  <Route path="/pokemon/:name" element={<Pokemon />} />
</Routes>
</Router>
 </AppProvider>
  )
}

export default App
