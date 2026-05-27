import React, { useEffect, useState } from 'react';
import apiClient from '../../api';

const ZCRComponent = () => {
    const [image, setImage] = useState('');

    useEffect(() => {
        const fetchZCRImage = async () => {
            const { data } = await apiClient.get('/api/ok/zcr/');
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
