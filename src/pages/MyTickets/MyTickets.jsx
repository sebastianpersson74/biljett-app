import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MyTickets.css';
import ConfettiComponent from '../../components/ConfettiComponent';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const MyTickets = () => {
  const location = useLocation();
  const [showConfetti, setShowConfetti] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const cart = location.state?.cart || JSON.parse(localStorage.getItem('myTickets')) || [];

  const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return '#' + Array.from({ length: 4 }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
  };

  const generateRandomSection = () => `Section ${Math.floor(Math.random() * 10) + 1}`;

  const generateBarcodeBackground = () => {
    let gradient = 'repeating-linear-gradient(90deg, ';
    let position = 0;
    for (let i = 0; i < 30; i++) {
      const isBlack = Math.random() > 0.5;
      const width = Math.floor(Math.random() * 5) + 3;
      gradient += isBlack
        ? `black ${position}px, black ${position + width}px, `
        : `transparent ${position}px, transparent ${position + width}px, `;
      position += width;
    }
    return gradient.slice(0, -2) + ')';
  };

  useEffect(() => {
    const localTickets = JSON.parse(localStorage.getItem('myTickets'));
  
    // Om man kommer från checkout (ny beställning):
    if (location.state?.cart && location.state.cart.length > 0) {
      const shouldShowConfetti = localStorage.getItem('showConfetti');
      if (shouldShowConfetti) {
        setShowConfetti(true);
        localStorage.removeItem('showConfetti');
        setTimeout(() => setShowConfetti(false), 4000);
      }
  
      const groupedTickets = location.state.cart.reduce((groups, ticket) => {
        const eventKey = ticket.name;
        if (!groups[eventKey]) groups[eventKey] = [];
        groups[eventKey].push(ticket);
        return groups;
      }, {});
  
      const eventSettings = {};
      for (const eventName in groupedTickets) {
        eventSettings[eventName] = {
          currentSeat: Math.floor(Math.random() * 90) + 10,
          section: generateRandomSection()
        };
      }
  
      const ticketsWithSeats = Object.entries(groupedTickets).flatMap(([eventName, eventTickets]) =>
        eventTickets.flatMap(ticket =>
          Array.from({ length: ticket.quantity }, () => {
            const seatNumber = eventSettings[eventName].currentSeat++;
            return {
              ...ticket,
              section: eventSettings[eventName].section,
              seat: `Seat ${seatNumber}`,
              code: generateRandomCode(),
              barcodeBackground: generateBarcodeBackground()
            };
          })
        )
      );
  
      setTickets(ticketsWithSeats);
      localStorage.setItem('myTickets', JSON.stringify(ticketsWithSeats));
      setLoading(false);
    }
    // Om det redan finns biljetter i localStorage (t.ex. vid refresh)
    else if (localTickets && localTickets.length > 0) {
      setTickets(localTickets);
      setLoading(false);
    }
    // Om inget finns
    else {
      setLoading(false);
    }
  }, [location.state]);
  

  return (
    <div className="my-tickets-container">
      <ConfettiComponent showConfetti={showConfetti} />
      <h1>Mina Biljetter</h1>

      {loading ? (
        <p>Hämtar biljetter...</p>
      ) : (
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          grabCursor={true}
          pagination={{ clickable: true }}

          className="ticket-swiper"
        >
          {tickets.map((ticket, index) => {
            const { name, place, date, time, section, seat, code, barcodeBackground } = ticket;
            return (
              <SwiperSlide key={index}>
                <div className="ticket">
                  <div className="ticket-section what-section">
                    <h2>WHAT</h2>
                    <h3>{name}</h3>
                  </div>
                  <div className="ticket-section where-section">
                    <h2>WHERE</h2>
                    <p>{place}</p>
                  </div>
                  <div className="ticket-section when-from-to-section">
                    <div className="when-section">
                      <h2>WHEN</h2>
                      <p>{date}</p>
                    </div>
                    <div className="from-section">
                      <h2>FROM</h2>
                      <p>{time?.split(' - ')[0]}</p>
                    </div>
                    <div className="to-section">
                      <h2>TO</h2>
                      <p>{time?.split(' - ')[1]}</p>
                    </div>
                  </div>
                  <div className="ticket-section info-section">
                    <h2>INFO</h2>
                    <p>{section} - {seat}</p>
                  </div>
                  <div className="ticket-section barcode-section">
                    <div className="barcode" style={{ backgroundImage: barcodeBackground }}></div>
                  </div>
                  <div className="ticket-section code-section">
                    <p>{code}</p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
};

export default MyTickets;
