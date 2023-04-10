import React, { useState } from "react";
import { MDBContainer, MDBNavbar, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router";
import axios from "../utils/axios_sd"
import Container from 'react-bootstrap/Container';
import "../css/Chat.css"
import styled from "styled-components";
import Button from "../components/styled/Button";
import Input from "../components/styled/Input"; 

export default function TextToImage() {

  const [prompt, setPrompt] = useState('');
  const [seed, setSeed] = useState(42);
  const [guidanceScale, setGuidanceScale] = useState(7.5);
  const [numInfSteps, setNumInfSteps] = useState(10);
  const [errorMessage, setErrorMessage] = useState("");
  const [img, setImg] = useState(null);
  const [promptImg, setPromptImg] = useState(null);
  const [loadingImg, setLoadingImg] = useState(false);
  const navigate = useNavigate();

  const cleanFormData = () => {
    setPrompt("");
    setSeed(42);
    setGuidanceScale(7.5);
    setNumInfSteps(5);
    setLoadingImg(false);
    setErrorMessage("");
  }

  function HandleLogout() {
    localStorage.clear();
    navigate('/');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setImg(null);
    setPromptImg(null);

    const jsonData = JSON.stringify(
      { 
        "prompt": prompt,
        "numInfSteps": numInfSteps,
        "guidanceScale": guidanceScale,
        "seed": seed 
      }
    );

    console.log(prompt);
    console.log(numInfSteps);
    console.log(guidanceScale);
    console.log(seed);

    try{
        const response = await axios.post('/api/texttoimage', jsonData, {
          headers: {
            'Content-Type': 'application/json'
          },
          responseType: "blob"
        });

        console.log('response received');
        console.log(response?.data);

        if (!response.status === 200){
          setErrorMessage("Ooops! Something went wrong generating the image");
        } else {
            console.log('response received2');
            const imageBlob = await response.data;
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setImg(imageObjectURL);
            setPromptImg(prompt);
            cleanFormData();
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
            console.log('TextToImage response Failed')
        }
        alert('TextToImage response was not successful! please check the console log!')
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
          <form className="box" onSubmit={handleSubmit}>
              <WelcomeText>Generate Image with Stable Diffusion</WelcomeText>
              <InputContainer>
              <label className="label">Prompt</label>
                <Input 
                    type="text" 
                    placeholder="Enter your prompt to generate the image" 
                    value={prompt} 
                    onChange={(e) =>setPrompt(e.target.value)}
                    className="textarea"
                    required
                /> 
                <label className="label">Number of Inference Steps - Bigger is Slower, Better Quality</label>
                <Input 
                    type="text" 
                    placeholder="Bigger is Slower, Better Quality" 
                    value={numInfSteps} 
                    onChange={(e) =>setNumInfSteps(e.target.value)}
                    className="input"
                /> 
                <label className="label">Guidance Scale</label>
                <Input 
                    type="text" 
                    placeholder="guidancescale" 
                    value={guidanceScale} 
                    onChange={(e) =>setGuidanceScale(e.target.value)}
                    className="input"
                /> 
                <label className="label">Seed</label>
                <Input 
                    type="text" 
                    placeholder="seed" 
                    value={seed} 
                    onChange={(e) =>setSeed(e.target.value)}
                    className="input"
                /> 
              </InputContainer>         
                  {/* <ErrorMessage message={errorMessage}/> */}
              <br /> 
              <Button onClick={handleSubmit} content="Generate Image" />
          </form>
              
          <Container className="p-5 mb-10">
            { img ? ( 
              <figure>
                  <img src={img} alt="genimage" />
                  <figcaption>{promptImg}</figcaption>
              </figure> ) 
                  : <></>
            }
            { loadingImg ? (
                <progress className="progress is-small is-primary" max="100">Loading</progress>
              ) : <></>
            }
          </Container>
        </Container>
      </div>
    </> 
  );
}

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
  