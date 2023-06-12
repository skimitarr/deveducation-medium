import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Form, Input, DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import { doc, updateDoc } from 'firebase/firestore';

import { db } from '../firebase';
import { getRoomsAction } from '../store/sagas';
import { IStateFromStore } from '../components/Interfaces';

export const CheckInBtn = ({ roomId, disabled }: { roomId: string; disabled: boolean }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [newGuest, setNewGuest] = useState('');
  const [newCheckInDate, setNewCheckInDate] = useState('');
  const [form] = Form.useForm();
  const roomsFromStore = useSelector((state: IStateFromStore) => state.accountsRooms.allRooms);

  const changedData = () => {
    const roomIndex = roomsFromStore.findIndex((item) => item.id === roomId);
    if (roomIndex !== -1) {
      const newRoom = {
        ...roomsFromStore[roomIndex],
        guest: newGuest,
        checkInDate: newCheckInDate,
        isCheckedIn: true,
      };
      const newArr = [
        ...roomsFromStore.slice(0, roomIndex),
        newRoom,
        ...roomsFromStore.slice(roomIndex + 1),
      ];
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

  const onChangeGuestName = () => {
    form
      .validateFields()
      .then((values) => {
        setNewGuest(values.username);
      })
      .catch((error) => {
        console.error('Validation failed:', error);
        form.setFields([
          {
            name: 'username',
            errors: ['Invalid guest name'],
          },
        ]);
      });
  };

  const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    setNewCheckInDate(dateString);
  };

  return (
    <>
      <Button type='primary' className='btn-checkin' onClick={showModal} disabled={disabled}>
        Check in
      </Button>
      <Modal
        open={open}
        title='Check in'
        onOk={handleOk}
        onCancel={handleCancel}
        afterClose={() => form.resetFields()}
        footer={[
          <Button key='back' onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key='submit' type='primary' onClick={() => updateDataApi()}>
            Check in
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout='vertical'
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ minWidth: 600 }}
          autoComplete='off'
          className='formLogIn'
        >
          <Form.Item
            label='Please, enter the guest name:'
            name='username'
            style={{ minWidth: 600 }}
            rules={[{ required: true }]}
          >
            <Input placeholder='Guest name' onChange={onChangeGuestName} />
          </Form.Item>
          <Form.Item
            label='Please, enter the approximate date of guest checkout:'
            name='date'
            style={{ minWidth: 1000 }}
          >
            <DatePicker onChange={onChangeDate} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
