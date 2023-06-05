import './App.css';
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';

import { IRoom, IAccount, IRoomFromStore } from './components/Interfaces';
import { getRoomsFetch } from './store/SomeSlice';
import Header from "./components/Header";
import LogInAccount from "./pages/LogInAccount";
import MainLayout from "./pages/MainLayout";
import NotFound from "./pages/NotFound";

function App() {
  const [accounts, setAccounts] = useState<{[key: string]: IAccount}>({});
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const dispatch = useDispatch<Dispatch<any>>();
  const showingRoomsFromStore = useSelector((state: IRoomFromStore) => state.some.allRooms);
  const showingAccountsFromStore = useSelector((state: IRoomFromStore) => state.some.allAccounts);

  useEffect(() => {
    if (showingRoomsFromStore.length === 0) {
      dispatch(getRoomsFetch())
    }
  }, [dispatch, showingRoomsFromStore]);

  useEffect(() => {
    if (showingRoomsFromStore.length > 0) {
      setRooms(showingRoomsFromStore);
    }
    if (showingAccountsFromStore) {
      setAccounts(showingAccountsFromStore);
    }
  }, [showingRoomsFromStore]);

  if (showingRoomsFromStore.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route index element={<LogInAccount accounts={accounts}/>} />
      <Route path="/" element={<Header accounts={accounts}/>}>
        <Route path="/main" element={<MainLayout rooms={rooms}/>} />
        {/* <Route path="/articles/:title" element={<DetailPage rooms={rooms}/>} /> */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
export default App;

