import React from "react";
import styled from "styled-components";
import Button from "../components/styled/Button";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();

  function HandleSignIn() {
    navigate('/api/login');
  }
  function HandleSignUp() {
    navigate('/api/register');
  }

    return (
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <MainContainer>
                <WelcomeText>Welcome</WelcomeText>
                <ButtonContainer>
                <Button onClick={HandleSignIn} content="Sign In" />
                </ButtonContainer>
                <HorizontalRule />
                <LoginWith>OR SIGN UP WITH</LoginWith>
                <ButtonContainer>
                <Button onClick={HandleSignUp} content="Sign Up" />
                </ButtonContainer>
            </MainContainer>
          </div>
        </div>
    );

  }

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