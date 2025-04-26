// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Home from './pages/Home/Home';
import Events from './pages/Events/Events';
import Tickets from './pages/Tickets/Tickets';

const App = () => {
  return (
    <Router>
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={50}
        slidesPerView={1}
      >
        <SwiperSlide><Home /></SwiperSlide>
        <SwiperSlide><Events /></SwiperSlide>
        <SwiperSlide><Tickets /></SwiperSlide>
      </Swiper>
    </Router>
  );
}

export default App;
