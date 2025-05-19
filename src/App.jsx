import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AppProvider } from './contexto/contexto';
import './App.css'

import { supabase } from "./supabase";
import Menu from './Componentes/menu';
import Aleatorios from './Componentes/aleatorios';
import Lista from './Componentes/lista';
import Capturados from './Componentes/capturados';
import Favoritos from './Componentes/favoritos';
import Usuario from './Componentes/usuarios';
import Pokemon from './Componentes/pokemon';
import Login from './Componentes/login'; 
import Registro from './Componentes/registro'; 
import Administrador from './Componentes/administrador';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  const onLogin = (usuarioData) => {
    setUsuario(usuarioData);
  };

  useEffect(() => {
    async function verificarSesion() {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error("Error al obtener la sesión:", sessionError);
        setCargando(false);
        return;
      }

      if (session?.user) {
        // Obtener los datos del usuario de la tabla "usuario"
        const { data: usuarioData, error: usuarioDataError } = await supabase
          .from("usuario")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (usuarioDataError) {
          console.error("Error al obtener los datos del usuario:", usuarioDataError);
          setCargando(false);
          return;
        }

        setUsuario(usuarioData || null); // Usar los datos de la tabla "usuario"
      } else {
        setUsuario(null);
      }
      setCargando(false);
    }

    verificarSesion();
  }, []); // Asegúrate de que el array de dependencias esté vacío si solo quieres ejecutar esto una vez

  return (
    <AppProvider>
      <Router>
        {usuario && <Menu />}
        <Routes>
          <Route path="/" element={usuario ? <Lista /> : <Navigate to="/login" />} />
          <Route path="/usuarios" element={usuario ? <Usuario /> : <Navigate to="/login" />} />
          <Route path="/aleatorios" element={usuario ? <Aleatorios /> : <Navigate to="/login" />} />
          <Route path="/capturados" element={usuario ? <Capturados /> : <Navigate to="/login" />} />
          <Route path="/favoritos" element={usuario ? <Favoritos /> : <Navigate to="/login" />} />
          <Route path="/pokemon/:name" element={usuario ? <Pokemon /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={onLogin} />} />
          <Route path="/registro" element={<Registro />} />
            <Route path="/administrador" element={<Administrador/>} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;