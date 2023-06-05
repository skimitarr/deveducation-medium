import { Card, Col, Row } from 'antd';

import { IRoom, IPropRooms } from '../components/Interfaces';

const MainLayout = (props : IPropRooms) => {
  console.log(props)

  return (
    <main className="main text-center">
      <div className="row">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {props.rooms.map((item: IRoom) => {
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
    </main>
  );
}
export default MainLayout;
