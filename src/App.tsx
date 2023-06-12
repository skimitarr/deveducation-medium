import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IStateFromStore } from './components/Interfaces';
import { getRoomsAction } from './store/sagas';
import Header from './components/Header';
import LogInAccount from './pages/LogInAccount';
import MainLayout from './pages/MainLayout';
import SingleRoom from './pages/SingleRoom';
import NotFound from './pages/NotFound';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const roomsFromStore = useSelector((state: IStateFromStore) => state.accountsRooms.allRooms);

  useEffect(() => {
    if (!localStorage.user && !sessionStorage.user) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    if (roomsFromStore.length === 0) {
      dispatch(getRoomsAction());
    }
  }, [dispatch, roomsFromStore]);

  if (roomsFromStore.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path='/login' element={<LogInAccount />} />
      <Route path='/' element={<Header />}>
        <Route path='/rooms' element={<MainLayout />} />
        <Route path='/rooms/:roomId' element={<SingleRoom />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}
export default App;
