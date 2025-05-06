// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home/Home';
import Events from './pages/Events/Events';
import Tickets from './pages/Tickets/Tickets';
import Checkout from './pages/Checkout/Checkout';
import MyTickets from './pages/MyTickets/MyTickets';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/tickets/:eventId" element={<Tickets />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/mytickets" element={<MyTickets />} />
        </Routes>
      </div>

      <nav className="navbar">
        <ul>
          <li><Link to ="/">Home</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/mytickets">Mina Biljetter</Link></li>
        </ul>
      </nav>
    </Router>
  );
}

export default App;
