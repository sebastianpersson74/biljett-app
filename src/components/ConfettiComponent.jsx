

import React from 'react';
import Confetti from 'react-confetti';

const ConfettiComponent = ({ showConfetti }) => {
    if (!showConfetti) return null;

    return (
        showConfetti && (
            <Confetti  
                width={window.innerWidth} 
                height={window.innerHeight}
            />
        )
    );
};

export default ConfettiComponent;