import { Suspense } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { Canvas } from '@react-three/fiber'
import { Space } from "../components/space";

export default function Home() {
  const navigate = useNavigate();

  function HandleSignIn() {
    navigate('/api/login');
  }
  function HandleSignUp() {
    navigate('/api/register');
  }

    return (
      <>
        <TopSectionContainer>
        <Logo>WELCOME</Logo>
        <Slogan>To Infinity and Beyond!</Slogan>
        <Paragraph>
          Hey Howdy Hey, would you look at that!
          DisneyEnchants is hosting a singing
          competition! Hey Buzz, could you come up
          here and give me a hand!
        </Paragraph>
        <div><Button onClick={HandleSignIn}>Sign In</Button><Button onClick={HandleSignUp}>Sign Up</Button></div>
        </TopSectionContainer>
        <Canvas>
          <Suspense fallback={null}>
            <Space />
          </Suspense>
        </Canvas>
      </>
    );

  }

  const TopSectionContainer = styled.div`
  position: absolute;
  width: 100%;
  // height: 100%;
  top: 150px;
  left: 0;
  // background-color: #1756dd32;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 99;
`;

const Logo = styled.h1`
  margin: 0;
  color: #fff;
  font-weight: 800;
  font-size: 80px;
`;

const Slogan = styled.h4`
  margin: 0;
  color: #fff;
  font-weight: 700;
  font-size: 30px;
  margin-top: 10px;
`;

const Paragraph = styled.p`
  margin: 0;
  margin-top: 3em;
  color: #fff;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 500;
  max-width: 30%;
  text-align: center;
`;

const Button = styled.button`
  outline: none;
  border: none;
  background-color: #337ded56;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  border-radius: 8px;
  padding: 8px 2em;
  margin-top: 3em;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 350ms ease-in-out;
  margin-left: 10px;

  &:hover {
    background-color: transparent;
    border: 2px solid #27b927;
  }
`;