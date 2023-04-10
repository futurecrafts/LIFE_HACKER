import React, { useRef, useState, useEffect } from "react";
import { MDBContainer, MDBNavbar, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "../utils/axios_chat"
import Container from 'react-bootstrap/Container';
import "../css/Chat.css"
import { send, bot, user } from '../assets'

let loadInterval;

export default function Chat() {
  const form = document.querySelector('form');
  const chatContainer = document.querySelector('#chat_container');

  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  function HandleLogout() {
    localStorage.clear();
    navigate('/');
  }

  function loader(element) {
    element.textContent = '';
  
    loadInterval = setInterval(() => {
      element.textContent += '.';
  
      if (element.textContent === '....') {
        element.textContent = '';
      }
    }, 300)
  }
  
  function typeText(element, text) {
    let index = 0;
  
    let interval = setInterval(() => {
      if(index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20)
  }
  
  function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);
  
    return `id-${timestamp}-${hexadecimalString}`;
  }
  
  function chatStripe(isAI, value, uniqueId) {
    return (
      `
        <div class="wrapper ${isAI && 'ai'}">
          <div class="chat">
            <div class="profile">
              <img
                src="${isAI ? bot : user}"
                alt="${isAI ? 'bot' : 'user"'}"
              />
            </div>
            <div class="message" id=${uniqueId}>${value}</div>
          </div>
        </div>
      `
    )
  }

  const handleKeyUp = async (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(prompt);

    //const data = new FormData(form);
    chatContainer.innerHTML += chatStripe(false, prompt);
    // chatContainer.innerHTML += chatStripe(false, data.get('prompt'));
    form.reset();
    const uniqueId = generateUniqueId();
    chatContainer.innerHTML += chatStripe(true, " ", uniqueId);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    const messageDiv = document.getElementById(uniqueId);
    loader(messageDiv);

    const params = new URLSearchParams();
    params.append('prompt', prompt);
    try{
        const response = await axios.post('/api/chat', params);

        clearInterval(loadInterval);
        messageDiv.innerHTML = '';
        console.log(response?.data);

        if (response.status === 200) {
            console.log(response.data);
            const parsedData = response.data.bot.trim();
            //const parsedData = response.data.;
            typeText(messageDiv, parsedData);
        }
    } catch (err) {
        if (err.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(err.response.data);
            console.log(err.response.status);
        } else if (err.request) {
            // The request was made but no reponse was received
            console.log(err.request);
        } else {
            console.log('Chat response Failed')
        }
        messageDiv.innerHTML = "Something went Wrong!!!!!";
        alert('Chat response was not successful! please check the console log!')
    }
  }

  return (
    <>
      <MDBNavbar scrolling dark expand="md" fixed="top">
        <MDBContainer fluid className='justify-content-start'>
          <MDBBtn href='/api/dashboard' className='me-1' color='primary' >
            BACK
          </MDBBtn>
          <MDBBtn href='/api/profile' className='me-1' color='warning' >
            MY
          </MDBBtn>
          <MDBBtn onClick={HandleLogout} className='me-1' color='danger'>
            LOGOUT
          </MDBBtn>
        </MDBContainer>
      </MDBNavbar>
      
      <div className='MainContainer'>
        <Container className="p-5 mb-10">
            <div id="chatApp">
              <div id="chat_container"></div>
              <form id="chatForm" onKeyUp={handleKeyUp}>
                <textarea id="chatTextarea" onChange={(e) => setPrompt(e.target.value)} name="prompt" rows="1" cols="1" placeholder="Ask Me..."></textarea>
                <button onClick={handleSubmit} id="chatButton" type="submit"><img src={send} /></button>
              </form>
          </div>
        </Container>
      </div>
    </> 
  );
}
  