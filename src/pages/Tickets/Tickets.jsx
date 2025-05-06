import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Tickets.css';
import { useCartStore } from '../../store/cartStore';

const Tickets = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCartStore();
    const [eventDetails, setEventDetails] = useState(null);
    const [ticketCount, setTicketCount] = useState(1);



    useEffect(() => {
        fetch('https://santosnr6.github.io/Data/events.json')
            .then((response) => response.json())
            .then(data => {
                const event = data.events.find(e => e.id === eventId);
                setEventDetails(event);
            });
    }, [eventId]);

    const increaseTickets = () => {
        setTicketCount(prev => prev + 1);
    };

    const decreaseTickets = () => {
        if (ticketCount > 1) {
            setTicketCount(prev => prev - 1);
        }
    };

    const handleAddToCart = () => {
        if (!eventDetails) return;

        const item = {
            id: eventDetails.id,
            name: eventDetails.name,
            date: eventDetails.when.date,
            time: `${eventDetails.when.from} - ${eventDetails.when.to}`,
            place: eventDetails.where,
            quantity: ticketCount,
            price: eventDetails.price,
        };

        addToCart(item);

        navigate('/checkout');
    };

    const ticketPrice = eventDetails ? eventDetails.price : 0;
    const totalPrice = ticketPrice * ticketCount;

    return (
        <div className="ticket-container">
            {eventDetails ? (
                <>
                    <h1 className="ticket-header">Event</h1>
                    <h2 className="ticket-subheader">You are about to score <br></br>some tickets to</h2>
                    <h3 className="ticket-name">{eventDetails.name}</h3>
                    <p className="ticket-datetime">{eventDetails.when.date} at {eventDetails.when.from} - {eventDetails.when.to}</p>
                    <p className="ticket-location">@ {eventDetails.where}</p>
                    
                    <div className="ticket-controls">
                        <div className="total-price">
                            {totalPrice} sek
                        </div>
                        <div className="ticket-amount-controls">
                            <button className="amount-button" onClick={decreaseTickets}>-</button>
                            <div className="ticket-amount">{ticketCount}</div>
                            <button className="amount-button" onClick={increaseTickets}>+</button>
                        </div>
                    </div>
                    <button className="add-to-cart-button" onClick={handleAddToCart}>
                        Lägg i varukorgen
                    </button>

                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Tickets;
