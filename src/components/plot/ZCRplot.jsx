import React, { useEffect, useState } from 'react';

const ZCRComponent = () => {
    const [image, setImage] = useState('');

    useEffect(() => {
        const fetchZCRImage = async () => {
            const response = await fetch('https://signalpro-production.up.railway.app/api/zcr/'); // Django server URL
            const data = await response.json();
            setImage(data.image);
        };

        fetchZCRImage();
    }, []);

    return (
        <div>
            <h2>Zero Crossing Rate</h2>
            {image && <img src={image} alt="Zero Crossing Rate" />}
        </div>
    );
};

export default ZCRComponent;
