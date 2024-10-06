const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; 
const inputInitHeight = chatInput.scrollHeight;


let API_KEY = ''; // Your API key here
let API_URL = '';
let intents=[];

const loadConfig = async () => {
  try {
    const response = await fetch('config.json');
    const config = await response.json();
    API_KEY = config.apiKey;
    API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;
  } catch (error) {
    console.error('Error loading config:', error);
  }
};
const loadintents = async () => {
    try {
      const response = await fetch('./training-bot/intents.json');
      intents = await response.json();
      console.log('Training data loaded:', intents);
    } catch (error) {
      console.error('Error loading training data:', error);
    }
  };
  const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; 
  }
  
