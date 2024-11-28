import React from 'react';
import './TimeField.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function TimeField() {
    const [image, setImage] = useState('');
    const [buttonName, setButtonName] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [isCategoryClick,setCategoryClick]=useState(false)
    const [notCategoryClick,setNotCategoryClick]=useState(true)
    const buttonClick = (e) => {
        const val = e.currentTarget.value;
        setButtonName(val);
    }
    const buttonCategory = (e) => {
        const val = e.currentTarget.value;
        if(isCategoryClick){
            setCategoryClick(false)
        }
        else{
            setCategoryClick(true)
            setImage('');
            setButtonName('')
        }
        

        setCategoryName(val);
    }
    // This useEffect will run whenever buttonName changes
    useEffect(() => {
        const fetchZCRImage = async () => {
            if (buttonName) { // Ensure buttonName is not empty
                const response = await fetch('https://singanlspro-production.up.railway.app/api/'+categoryName+'/' + buttonName + '/'); // Django server URL
                const data = await response.json();
                setImage(data.image);
            }
        };
        setImage(''); // Clear previous image when button changes
        fetchZCRImage();
    }, [buttonName]); // Dependency array includes buttonName

    return (
        <div className="container1">
            <div style={{textAlign:'center',width:'100%'}}><h1>Kategoriyalardan birini tanlang</h1></div>
            <div className="button-container3" >
                
                <button className="btn2 ok" value='ok' onClick={buttonCategory} > OK 👌</button>
                <button className="btn2 qisish" value='qisish' onClick={buttonCategory}> Qo'lni qisish ✊</button>

                <button className="btn2 yoyish" value='yoyish' onClick={buttonCategory}>Qo'lni yoyish 🫴</button>
            </div>
            
            {isCategoryClick ?( <div className="button-image-container1">
            <div style={{display:'block',width:'100%', marginLeft:'70px'}}> <h2 >Vaqt sohasi</h2></div>
            <div className="flex-div">
                <div className="button-column1">
                    <button className="btn1 gssi-btn" value='gplot' onClick={buttonClick}>G</button>
                    <button className="btn1 ssi-btn" value='ssi' onClick={buttonClick}>SSI</button>
                    <button className="btn1 var-btn" value='var' onClick={buttonClick}>VAR</button>
                    <button className="btn1 dasd-btn" value='dasdv' onClick={buttonClick}>DASD</button>
                    <button className="btn1 zcr-btn" value='zcr' onClick={buttonClick}>ZCR</button>
                    <button className="btn1 ssc-btn" value='mav' onClick={buttonClick}>MAV</button>
                </div>

                <div className="image-container1" style={{ padding: '10px', marginLeft: '20px' }}>
                    {image && <img src={image} alt="Zero Crossing Rate" style={{ maxWidth: '100%', maxHeight: '400px' }} />}
                </div>
            </div>
            </div>):<div className="button-column1"></div>}
        </div>
    );
}

export default TimeField;
