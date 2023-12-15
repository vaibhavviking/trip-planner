import React from 'react';
import dustbin from '../assets/trash-can-solid.svg';
import bulb from '../assets/lightbulb-regular.svg';

const ExpenseCard = ({ description, category, amount, deleteFunc, ind }) => {
    const imageUrl = `https://source.unsplash.com/random/300x200/?landscape`;

    return (
        <div className="icard" >
            <div className="overlay">
                <h5>{description}</h5>
                <h5>Amount: {amount}</h5>
                <h5>Category: {category}</h5>
                <div className='tw-flex tw-justify-around tw-mt-3'>
                    <img onClick={() => deleteFunc(ind)} src={dustbin} className='tw-w-8' />
                    <img src={bulb} className='tw-w-8 tw-bg-yellow' />
                </div>
            </div>
        </div>
    );
};

export default ExpenseCard;