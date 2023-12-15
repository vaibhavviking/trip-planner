import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Popup = () => {
    const [notification, setNotification] = useState(null);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const showNotification = (data) => {
            setNotification(data);
            setIsActive(true);
            setTimeout(() => {
              setNotification(null);
              setIsActive(false);
            }, 10000);
        };

        const scheduleNotifications = () => {
            setInterval(async () => {
                try {
                    const response = await axios.get('https://nipuntopno.pythonanywhere.com/api/fetch-hotspot');
                    showNotification(response.data);
                } catch (error) {
                    console.error('Error fetching notifications:', error);
                }
            }, 1 * 30 * 1000);
        };

        scheduleNotifications();

        return () => {
            clearInterval(scheduleNotifications);
        };
    }, []);

    const handleClose = () => {
        setNotification(null);
        setIsActive(false);
    };

    return (
        <div className={`popup-container ${isActive ? 'active' : 'exiting'}`}>
            {notification && <PopupComponent data={notification} onClose={handleClose} />}
        </div>
    );
};

const PopupComponent = ({ data, onClose }) => (
    <div className="popup">
        <button className="close-button" onClick={onClose}>&#x2716;</button>
        <p style={{ padding: '10px', fontSize: '17px' }}>
            <span style={{ fontWeight: 'bold', fontSize: '30px' }}>Hotspot near you!<br></br></span>
            <a href={data['map']} target="_blank">
                <span style={{ fontWeight: 'bold', fontSize: '20px' }}>{data['name']}<br></br></span>
            </a>
            {data['desc']}
        </p>
    </div>
  );

export default Popup;