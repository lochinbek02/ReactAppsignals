import React from 'react';
import './TimeField.css';
import './Preprocess.css';
import { useState, useEffect } from 'react';
import apiClient from '../../api';
function Preprocess() {
  const [image, setImage] = useState('');
    const [buttonName, setButtonName] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [isCategoryClick,setCategoryClick]=useState(false)
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
            setCategoryClick(true);
            setImage('');
            setButtonName('')
        }


        setCategoryName(val);
    }
    // This useEffect will run whenever buttonName changes
    useEffect(() => {
      const fetchZCRImage = async () => {
        if (buttonName && categoryName) {
          const { data } = await apiClient.get(`/api/${categoryName}/${buttonName}/`);
          setImage(data.image);
        }
      };
      setImage(''); // Clear previous image when button changes
      fetchZCRImage();
    }, [buttonName, categoryName]);
    return (
        
        <div className="container1">
            <div style={{textAlign:'center',width:'100%'}}>
              <h1>Preprocess</h1>
              <br />
              <h1>Kategoriyalardan birini tanlang</h1></div>
            <div className="button-container3" >
                
                <button className="btn2 ok" value='ok' onClick={buttonCategory} > OK 👌</button>
                <button className="btn2 qisish" value='qisish' onClick={buttonCategory}> Qo'lni qisish ✊</button>

                <button className="btn2 yoyish" value='yoyish' onClick={buttonCategory}>Qo'lni yoyish 🫴</button>
            </div>
            
            {isCategoryClick ?( <div className="button-image-container1">
           
            <div className="preprocessing-container1">

              <button className="btn scaling-btn" value="scaling" onClick={buttonClick}>Scaling</button>
              <button className="btn filtering-btn" value="filtering" onClick={buttonClick}>Filtering</button>
              </div>

                <div className="image-container1" style={{ padding: '10px', marginLeft: '20px' }}>
                {image && (
                  <img
                    src={`data:image/png;base64,${image}`}
                    alt=""
                    style={{ maxWidth: '100%', maxHeight: '400px' }}
                  />
                )}
                </div>
            </div>):<div className="button-column1"></div>}
        </div>
        
      
      
    );
  }
  
  export default Preprocess;
  