import React, { useState, useEffect } from 'react';
import './Events.css';
import EventCard from '../../components/EventCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('https://santosnr6.github.io/Data/events.json')
            .then((response) => response.json())
            .then(data => setEvents(data.events));
    }, []);

    const filteredEvents = events.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="events-container">
            <h1>Events</h1>
            <div className="search-bar">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <input 
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Sök efter event"
                />
            </div>

            <div className="event-list">
                {filteredEvents.map((event, index) => (
                    <Link key={event.id} to={`/tickets/${event.id}`}>
                        <EventCard key={index} event={event} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Events;
