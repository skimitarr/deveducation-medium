import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Carousel } from 'antd';

import { IStateFromStore } from '../components/Interfaces';

const SingleRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const roomsFromStore = useSelector((state: IStateFromStore) => state.some.allRooms);
  const room = roomsFromStore.find((item) => item.id === roomId);
  console.log(room);

  return (
    <main>
      <div className='main__container'>
        <Button type='link' onClick={() => navigate(`/rooms/`)} className='btn-m8'>
          Back Home
        </Button>
        <div className='grid__container'>
          <div className='room__img-container'>
            <Carousel autoplay>
              {room?.gallery.map((i) => {
                return <img src={i} alt='image room' key={i} />;
              })}
            </Carousel>
          </div>
          <div className='room__data-container'>
            <h1 className='room__title'>Room {room?.number}</h1>
            <p className='room__text'>
              <span className='room__text bold-text'>Type: </span>
              {room?.type}
            </p>
            <p className='room__text'>
              <span className='room__text bold-text'>Occupancy: </span>
              {room?.occupancy}
            </p>
            <p className='room__text'>
              <span className='room__text bold-text'>Price: </span>
              {room?.price}$
            </p>
            <p className='room__text'>
              <span className='room__text bold-text'>Guest: </span>
              {room?.guest}
            </p>
          </div>
          <div className='room__features-container'>
            <div className='room__btn-wrapper'>
              <Button type='primary' className='btn-checkin'>
                Check in
              </Button>
              <Button type='primary' className='btn-checkout'>
                Check out
              </Button>
            </div>
            <div>
              <p className='room__subtitle bold-text'>Features:</p>
              {room?.features.map((i) => {
                return (
                  <p key={i} className='room__text'>
                    &#10003; {i}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
        <div className='room__description-container flex'>
          <div className='room__description bold-text mr-10'>Description:</div>
          <p className='room__description'>{room?.description}</p>
        </div>
      </div>
    </main>
  );
};
export default SingleRoom;
