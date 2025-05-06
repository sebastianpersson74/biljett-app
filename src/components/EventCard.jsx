import React from 'react';
import './EventCard.css';

const EventCard = ({ event }) => {
    // Dela datum och månad
    const [day, month] = event.when.date.split(' ');
    const monthShort = month.substring(0, 3).toUpperCase(); // Förkorta månad och gör CAPS

    return (
        <div className="event-card">
            <div className="date-box">
                <div className="day">{day}</div>
                <div className="month">{monthShort}</div>
            </div>
            <div className="event-info">
                <h2 className="event-name">{event.name}</h2>
                <p className="event-where">{event.where}</p>
                <div className="event-details">
                    <span className="event-time">{event.when.from} - {event.when.to}</span>
                    <span className="event-price">{event.price} kr</span>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
