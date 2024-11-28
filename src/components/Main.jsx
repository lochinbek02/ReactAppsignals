import React from 'react';
import './Main.css';
import Footer from './footer/Footer';

function Main() {
    return (
        <div>
            <div className="containermain">
                <div className="textMain">
                    <h1>EMG Signallari Haqida</h1>
                </div>
                <div className="pMain">
                    <p>
                        <strong>EMG (Electromyography)</strong> signali mushaklarning elektr faoliyatini o'lchaydigan bioelektrik signal hisoblanadi. Ushbu signal mushak tolalarining qisqarishi yoki faoliyati vaqtida nerv impulslariga javob sifatida hosil bo‘ladi.
                    </p>
                    <p>
                        EMG signallari tibbiyot, sport va ilmiy tadqiqotlar uchun muhim ahamiyatga ega:
                    </p>
                    <ul>
                        <li><strong>Tibbiyot:</strong> EMG signallari orqali mushak kasalliklari va asab tizimi faoliyatini baholash mumkin.</li>
                        <li><strong>Sport:</strong> Mushak kuchini va chidamliligini tahlil qilish orqali sportchilarning mashg'ulot samaradorligini oshirishga yordam beradi.</li>
                        <li><strong>Robototexnika:</strong> EMG signallari yordamida protezlarni boshqarish uchun ishlatiladi.</li>
                    </ul>
                </div>
                <div className="images">
                    <img
                        src="https://www.handtherapyacademy.com/wp-content/uploads/2021/11/Screenshot-2021-11-28-at-12.57.30-PM-600x255.png"
                        alt="Mushak Signali"
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Main;
