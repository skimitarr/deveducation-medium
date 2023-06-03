import './App.css';
import { Card, Col, Row } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit';

import { IRoom, IAccount, IRoomFromStore } from './components/Interfaces';
import { getRoomsFetch } from './store/SomeSlice'

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

  const arrOFAccounts = Object.values(accounts)
  // const arrOFAccounts: IAccount[] = Object.values(accounts)
  // console.log(arrOFAccounts)


  return (
    <main className="main text-center">
      <div className="row">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {rooms.map((item: IRoom) => {
            return (
             <Col className="gutter-row" span={8} key={item.id}>
              <div>
                <Card bordered={false} style={{ width: 300 }} className='myCard'>
                  {/* <img src={item.gallery[0]} alt={item.title} /> */}
                  <h2>{item.number}</h2>
                </Card>
              </div>
            </Col>
          ) }
          )}
        </Row>
      </div>
      {arrOFAccounts.map((item: any) => {
        return (
          <div key={item.password}>
            <img src={item.image} alt={item.image} />
            <h2>{item.password}</h2>
          </div>
        ) }
      )}
    </main>
  )
}
export default App;

