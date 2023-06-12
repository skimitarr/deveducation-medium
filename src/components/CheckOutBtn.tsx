import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal } from 'antd';
import { doc, updateDoc } from 'firebase/firestore';

import { db } from '../firebase';
import { getRoomsAction } from '../store/sagas';
import { IStateFromStore } from '../components/Interfaces';

export const CheckOutBtn = ({ roomId, disabled }: { roomId: string; disabled: boolean }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const roomsFromStore = useSelector((state: IStateFromStore) => state.accountsRooms.allRooms);
  const room = roomsFromStore.find((item) => item.id === roomId);

  const changedData = () => {
    const roomIndex = roomsFromStore.findIndex((item) => item.id === roomId);
    if (roomIndex !== -1) {
      const newRoom = {
        ...roomsFromStore[roomIndex],
        guest: '',
        checkInDate: null,
        isCheckedIn: false,
      };
      const newArr = [
        ...roomsFromStore.slice(0, roomIndex),
        newRoom,
        ...roomsFromStore.slice(roomIndex + 1),
      ];
      console.log(newArr);
      return newArr;
    } else {
      console.error('Элемент не найден');
    }
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const updateDataApi = async () => {
    try {
      const newData = changedData();
      const dataRooms = doc(db, 'deveducation-medium', 'myId');
      await updateDoc(dataRooms, {
        Rooms: newData,
      });
      dispatch(getRoomsAction());
      handleOk();
    } catch (error) {
      console.error('An error occurred during data update:', error);
    }
  };

  return (
    <>
      <Button type='primary' className='btn-checkin' onClick={showModal} disabled={disabled}>
        Check out
      </Button>
      <Modal
        open={open}
        title='Check Out'
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key='back' onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key='submit' type='primary' onClick={() => updateDataApi()}>
            Confirm
          </Button>,
        ]}
      >
        <p>Do you confirm the check-out Room {room?.number}?</p>
      </Modal>
    </>
  );
};
