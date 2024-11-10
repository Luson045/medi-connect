import React, { useEffect, useState } from 'react';

const newelcome = () => {
    const [registrationCount, setRegistrationCount] = useState(0);
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        const counterInterval = setInterval(incrementCounters, 50);
        
        return () => clearInterval(counterInterval); // Cleanup interval on component unmount
    }, []);

    const incrementCounters = () => {
        setRegistrationCount(prevCount => {
            if (prevCount < 500) {
                const newCount = prevCount + Math.floor(Math.random() * 10 + 1);
                return newCount > 500 ? 500 : newCount;
            }
            return prevCount;
        });

        setUserCount(prevCount => {
            if (prevCount < 500) {
                const newCount = prevCount + Math.floor(Math.random() * 15 + 1);
                return newCount > 500 ? 500 : newCount;
            }
            return prevCount;
        });
    };

    useEffect(() => {
        const particleCount = 100;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 10 + 5; // Random size between 5 and 15px
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.backgroundColor = `rgba(255, 255, 255, ${Math.random()})`; // Random opacity
            particle.style.top = `${Math.random() * 100}vh`;
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.animationDelay = `${Math.random() * 2}s`; // Random animation delay
            document.body.appendChild(particle);
        }

        // Cursor tail effect
        const coords = { x: 0, y: 0 };
        const circles = document.querySelectorAll(".circle");
        const colors = ["#ffb56b", "#fdaf69", "#f89d63", "#f59761", "#ef865e", "#ec805d", "#e36e5c", "#df685c", "#d5585c"];

        circles.forEach((circle, index) => {
            circle.x = 0;
            circle.y = 0;
            circle.style.backgroundColor = colors[index % colors.length];
        });

        window.addEventListener("mousemove", (e) => {
            coords.x = e.clientX;
            coords.y = e.clientY;
        });

        const animateCircles = () => {
            let x = coords.x;
            let y = coords.y;

            circles.forEach((circle, index) => {
                circle.style.left = x - 12 + "px";
                circle.style.top = y - 12 + "px";
                circle.style.transform = `scale(${(circles.length - index) / circles.length})`;

                circle.x = x;
                circle.y = y;

                const nextCircle = circles[index + 1] || circles[0];
                x += (nextCircle.x - x) * 0.3;
                y += (nextCircle.y - y) * 0.3;
            });

            requestAnimationFrame(animateCircles);
        };

        animateCircles();
    }, []);

    return (
        <div>
            <style>{`
                body {
                    margin: 0;
                    overflow: hidden;
                    font-family: 'Roboto', sans-serif;
                    color: #fff;
                }

                .background {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(45deg, #ff6b6b, #f7b731, #3bde5c);
                    background-size: 300% 300%;
                    animation: gradientAnimation 15s ease infinite;
                    z-index: -1;
                }

                @keyframes gradientAnimation {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                .particle {
                    position: absolute;
                    border-radius: 50%;
                    pointer-events: none;
                    opacity: 0.7;
                    animation: float 5s infinite ease-in-out;
                    transition: transform 0.3s ease, background-color 0.3s;
                }

                .particle:hover {
                    transform: scale(1.5);
                    background-color: #ff6b6b;
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }

                .welcome-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    text-align: center;
                    position: relative;
                    z-index: 1;
                }

                .welcome-title {
                    font-size: 4rem;
                    opacity: 0;
                    animation: fadeIn 1.5s forwards;
                    animation-delay: 0.5s;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-30px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .welcome-text {
                    font-size: 1.5rem;
                    opacity: 0;
                    animation: fadeIn 1.5s forwards;
                    animation-delay: 1.5s;
                    margin-top: 20px;
                }

                .btn-start {
                    margin-top: 20px;
                    padding: 10px 20px;
                    font-size: 1.2rem;
                    border-radius: 5px;
                    background-color: #3aac53;
                    color: #fff;
                    transition: all 0.3s ease;
                }

                .btn-start:hover {
                    transform: translateY(-5px);
                    background-color: #28a745;
                    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
                }

                .btn-start:focus {
                    outline: none;
                }

                /* Circle styles */
                .circle {
                    height: 24px;
                    width: 24px;
                    border-radius: 50%;
                    background-color: black;
                    position: fixed;
                    top: 0;
                    left: 0;
                    pointer-events: none;
                    z-index: 99999999;
                    transition: transform 0.1s ease-out;
                }

                .counter-container {
                    position: absolute;
                    bottom: 30px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    justify-content: center;
                    background: rgba(0, 0, 0, 0.7);
                    padding: 10px 20px;
                    border-radius: 8px;
                    z-index: 2; /* Ensures counters are on top */
                    color: #fff;
                    font-size: 1.2rem;
                    font-weight: bold;
                }

                .counter {
                    margin: 0 15px;
                    text-align: center;
                }
            `}</style>

<div className="background"></div>
      <div className="welcome-container">
        <h1 className="welcome-title">Welcome to Medi-Connect</h1>
        <p className="welcome-text">Revolutionizing Healthcare Management</p>
        <a href="/pages/Testimonials" className="btn btn-start">
          Explore Medi-Connect
        </a>
      </div>
      <div className="counter-container">
        <div className="counter">
          <div id="registration-count">+{registrationCount}</div>
          <p>Hospitals Onboarded</p>
        </div>
        <div className="counter">
          <div id="user-count">+{hospitalCount}</div>
          <p>Patients Served</p>
        </div>
      </div>
    </div>
  );
};


export default newelcome;
