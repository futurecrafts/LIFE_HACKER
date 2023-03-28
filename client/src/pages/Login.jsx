import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from '../utils/axios';

import styled from "styled-components";
import Button from "../components/styled/Button";
import Icon from "../components/styled/Icon";
import Input from "../components/styled/Input"; 
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);
        const params = new URLSearchParams();
        params.append('Email', email);
        params.append('Password', pass);
        try{
            const response = await axios.post('/api/login', params);
            console.log(response?.data);
            if (response.status === 200) {
                localStorage.clear();
                localStorage.setItem('user', response.data.Username);
                localStorage.setItem('token', response.data.Token);
                // localstorage.setItem('json', JSON.stringify({'user': .. , 'token': ..}))
                // localStorage.setItem('user', JSON.stringify(user));
                // JSON.parse(localstorage.getItem('json'))
                // JSON.parse(localstorage.getItem('user'))
                navigate('/api/dashboard');
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
                console.log('Login Failed')
            }
            alert('Login was not successful! please check the console log!')
        }
    }

    function HandleSignUp() {
      navigate('/api/register');
    }
    
    return (
      <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <MainContainer>
                <WelcomeText>Welcome to Sign In</WelcomeText>
                <InputContainer>
                <Input type="email" value={email} id="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <Input type="password" value={pass} id="password" onChange={(e) => setPass(e.target.value)} placeholder="Password" />
                </InputContainer>
                <ButtonContainer>
                <Button onClick={handleSubmit} content="Sign In" />
                </ButtonContainer>
                <HorizontalRule />
                <LoginWith>OR SIGN UP WITH</LoginWith>
                <ButtonContainer>
                <Button onClick={HandleSignUp} content="Sign Up" />
                </ButtonContainer>
                <IconsContainer>
                <Icon color={FacebookBackground}>
                    <FaFacebookF />
                </Icon>
                <Icon color={InstagramBackground}>
                    <FaInstagram />
                </Icon>
                <Icon color={TwitterBackground}>
                    <FaTwitter />
                </Icon>
                </IconsContainer>
                <ForgotPassword>Forgot Password ?</ForgotPassword>
            </MainContainer>
          </div>
        </div>
    );
}

const FacebookBackground =
    "linear-gradient(to right, #0546A0 0%, #0546A0 40%, #663FB6 100%)";
const InstagramBackground =
  "linear-gradient(to right, #A12AC4 0%, #ED586C 40%, #F0A853 100%)";
const TwitterBackground =
  "linear-gradient(to right, #56C1E1 0%, #35A9CE 50%)";

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 80vh;
  width: 30vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 90vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 90vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 90vh;
  }
  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 80vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;
    height: 50vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 30vw;
    height: 80vh;
  }
`;

const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginWith = styled.h5`
  cursor: pointer;
`;

const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  background-color: #ebd0d0;
  margin: 1.5rem 0 1rem 0;
  backdrop-filter: blur(25px);
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 2rem 0 3rem 0;
  width: 80%;
`;

const ForgotPassword = styled.h4`
  cursor: pointer;
`;