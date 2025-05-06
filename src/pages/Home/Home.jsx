
import React from 'react';
import { motion } from 'framer-motion';
import './Home.css';
import logo from '../../assets/logo.svg';

const Home = () => {

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="home-container"
        >
            <img src={logo} alt="Logo" className="home-logo" />
            <h1>Where it's @</h1>
            <p>Ticketing made easy</p>
        </motion.div>
    );
}

export default Home;