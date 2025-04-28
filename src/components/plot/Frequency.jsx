import Navbar from "../navbar/Navbar";
import React, { useState, useEffect } from 'react';
import './TimeField.css';
import './Preprocess.css';

function Frequency() {
  const [image, setImage] = useState('');
  const [buttonName, setButtonName] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [isCategoryClick, setCategoryClick] = useState(false);
  const [isButtonClick, setButtonClick] = useState(false);

  const buttonClick = (e) => {
    const val = e.currentTarget.value;

    // Agar FFT tugmasi bosilgan bo'lsa
    if (val === 'Fourier') {
      // Agar isButtonClick true bo'lsa, grafikni yashirish
      if (isButtonClick) {
        setButtonClick(false);
        setButtonName('')
      } else {
        setButtonClick(true);
        setButtonName(val); // FFT tugmasini bosganini saqlash
      }
    }
  }

  const buttonCategory = (e) => {
    const val = e.currentTarget.value;
    setCategoryClick(!isCategoryClick);
    if (!isCategoryClick) {
      setCategoryName(val);
      setImage(''); // Tanlangan kategoriya o'zgarganda grafikni tozalash
    } else {
      setCategoryName('');
    }
  }

  // useEffect will run whenever buttonName or categoryName changes
  useEffect(() => {
    const fetchZCRImage = async () => {
      if (buttonName && categoryName) { // Faqat buttonName va categoryName mavjud bo'lsa
        const response = await fetch(`https://signalpro-production.up.railway.app/api/${categoryName}/${buttonName}/`);
        const data = await response.json();
        setImage(data.image); // Rasm ma'lumotlarini olish
      }
    };
    fetchZCRImage();
  }, [buttonName, categoryName]);

  return (
    <div className="container1">
      <div style={{ textAlign: 'center', width: '100%' }}>
        <h1>Chastota sohasi</h1>
        <br />
        <h1>Kategoriyalardan birini tanlang</h1>
      </div>
      <div className="button-container3">
        <button className="btn2 ok" value='ok' onClick={buttonCategory}> OK 👌</button>
        <button className="btn2 qisish" value='qisish' onClick={buttonCategory}> Qo'lni qisish ✊</button>
        <button className="btn2 yoyish" value='yoyish' onClick={buttonCategory}>Qo'lni yoyish 🫴</button>
      </div>

      {isCategoryClick && (
        <div className="button-image-container1">
          <div className="preprocessing-container1">
            <button className="btn1 gssi-btn" value="Fourier" onClick={buttonClick}>FFT</button>
          </div>

          <div className="image-container1" style={{ padding: '10px', marginLeft: '20px' }}>
            {isButtonClick && image && ( // Faqat isButtonClick true bo'lsa va image mavjud bo'lsa ko'rsatish
              <img
                src={`data:image/png;base64,${image}`}
                alt=""
                style={{ maxWidth: '100%', maxHeight: '400px' }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Frequency;
