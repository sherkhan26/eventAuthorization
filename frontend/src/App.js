import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@mui/material/Container';

import { Header, Footer } from './components';
import {
  Home,
  FullPost,
  Registration,
  AddPost,
  Login,
  Main,
  Live,
  Dance,
  Voice,
  National,
  Group,
  Instrument
} from './pages';
import React from 'react';
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';
import background1 from "./image/bg1.jpg"


function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  const flex = {
    flex: 1,
    padding: '20px 0',
    backgroundImage:  `url(${background1})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
  }
  return (
    <>
      <Header />
      <main style={flex}>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Main />}/>
            <Route path="/posts" element={<Home />} />
            <Route path="/live" element={<Live />}/>
            <Route path="/posts/:id" element={<FullPost />} />
            <Route path="/posts/:id/edit" element={<AddPost />} />
            <Route path="/add-post" element={<AddPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/dance" element={<Dance />}/>
            <Route path="/voice" element={<Voice />}/>
            <Route path="/national" element={<National />}/>
            <Route path="/group" element={<Group />}/>
            <Route path="/instrument" element={<Instrument />}/>
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
