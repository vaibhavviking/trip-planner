import React, { useState } from 'react';
import dustbin from '../assets/trash-can-solid.svg';
import bulb from '../assets/lightbulb-regular.svg';

const ExpenseCard = ({ description, category, amount, deleteFunc, getTipFunc, ind }) => {
    const [tipActive, setTipActive] = useState(false);

    const imageUrl = `https://source.unsplash.com/random/300x200/?landscape`;

    const activateTip = () => {
        setTipActive(true);
        setTimeout(() => {
            setTipActive(false);
          }, 5000);
    };

    const handleClose = () => {
        setTipActive(false);
    };

    return (
        <>
            <div className="icard" >
                <div className="overlay">
                    <h5>{description}</h5>
                    <h5>Amount: {amount}</h5>
                    <h5>Category: {category}</h5>
                    <div className='tw-flex tw-justify-around tw-mt-3'>
                        <img onClick={() => deleteFunc(ind)} src={dustbin} className='tw-w-8' />
                        <img onClick={activateTip} src={bulb} className='tw-w-8 tw-bg-yellow' />
                    </div>
                </div>
            </div>
            <div className={`popup-container ${tipActive ? 'active' : 'exiting'}`}>
                {tipActive && <TipPopup message={getTipFunc(ind)} onClose={handleClose} />}
            </div>
        </>
        
    );
};

const TipPopup = ({ message, onClose }) => (
    <div className="popup">
        <button className="close-button" onClick={onClose}>&#x2716;</button>
        <p style={{ padding: '10px', fontSize: '15px' }}>
            {message}
        </p>
    </div>
);

export default ExpenseCard;