import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Space, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';

import { TableColoumns, FilterTable, IStateFromStore } from '../components/Interfaces';

const MainLayout = () => {
  const roomsFromStore = useSelector((state: IStateFromStore) => state.accountsRooms.allRooms);
  const navigate = useNavigate();
  const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<IStateFromStore>>({});
  const [dataShow, setDataShow] = useState<TableColoumns[]>([]);

  const data: TableColoumns[] = [];
  function getData() {
    roomsFromStore.forEach((el) => {
      data.push({
        key: el.id,
        number: el.number,
        type: el.type,
        occupancy: el.occupancy,
        price: el.price,
        guest: el.guest,
        link: '',
      });
    });
    return data;
  }

  useEffect(() => {
    const newData = getData();
    setDataShow(newData);
  }, [setDataShow]);

  const onHandleNavigate = (record: TableColoumns) => {
    const room = roomsFromStore.find((item) => item.id === record.key);
    if (room) {
      navigate(`/rooms/${room.id}`);
    }
  };

  const filterType: FilterTable[] = [];
  const filterTypeTemp: string[] = [];
  roomsFromStore.forEach((el) => {
    if (el.type && !filterTypeTemp.includes(el.type)) {
      filterTypeTemp.push(el.type);
    }
  });
  filterTypeTemp.forEach((el: string) => {
    filterType.push({ text: el, value: el });
  });

  const filterOccupancy: FilterTable[] = [];
  const filterOccupancyTemp: number[] = [];
  roomsFromStore.forEach((el) => {
    if (el.occupancy && !filterOccupancyTemp.includes(el.occupancy)) {
      filterOccupancyTemp.push(el.occupancy);
    }
  });
  filterOccupancyTemp.forEach((el: number) => {
    filterOccupancy.push({ text: el, value: el });
  });

  const filterGuest: FilterTable[] = [];
  roomsFromStore.forEach((el) => {
    if (el.guest) {
      filterGuest.push({
        text: el.guest,
        value: el.guest,
      });
    }
  });

  const onChange: TableProps<TableColoumns>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<IStateFromStore>);
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const columns: ColumnsType<TableColoumns> = [
    {
      title: 'Number',
      width: 120,
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Type',
      width: 120,
      dataIndex: 'type',
      key: 'type',
      filters: filterType,
      filteredValue: filteredInfo.type || null,
      onFilter: (value: string | number | boolean, record) =>
        record.type.includes(value.toString()),
    },
    {
      title: 'Occupancy',
      width: 120,
      dataIndex: 'occupancy',
      key: 'occupancy',
      filters: filterOccupancy,
      filteredValue: filteredInfo.occupancy || null,
      onFilter: (value: string | number | boolean, record) => record.occupancy === Number(value),
    },
    {
      title: 'Price',
      width: 120,
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
      sortOrder: sortedInfo.columnKey === 'price' ? sortedInfo.order : null,
      render: (value) => `${value}$`,
    },
    {
      title: 'Guest',
      width: 240,
      dataIndex: 'guest',
      key: 'guest',
      filters: filterGuest,
      filteredValue: filteredInfo.guest || null,
      onFilter: (value: string | number | boolean, record) =>
        record.guest.startsWith(value.toString()),
      filterSearch: true,
    },
    {
      title: '',
      width: '10%',
      dataIndex: 'link',
      render: (_, record) => (
        <Button type='primary' onClick={() => onHandleNavigate(record)}>
          More information
        </Button>
      ),
    },
  ];

  const showFreeRooms = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newData = dataShow.filter((item) => item.guest === '');
      setDataShow(newData);
    } else {
      getData();
      setDataShow(data);
    }
  };

  return (
    <main>
      <div className='main__container'>
        <Space style={{ marginBottom: 16, marginTop: 16 }}>
          <Button type='primary' onClick={clearAll}>
            Clear all filters and sorts
          </Button>
          <input type='checkbox' onChange={(event) => showFreeRooms(event)} />
          Free rooms only
        </Space>
        <Table columns={columns} dataSource={dataShow} onChange={onChange} />
      </div>
    </main>
  );
};
export default MainLayout;
