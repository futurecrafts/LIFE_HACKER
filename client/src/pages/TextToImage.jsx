import React, { useState } from "react";
import { MDBContainer, MDBNavbar, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router";
import axios from "../utils/axios_sd"
import Container from 'react-bootstrap/Container';
import "../css/Chat.css"

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
    console.log(prompt);

    const params = new URLSearchParams();
    params.append('prompt', prompt);
    params.append('numInfSteps', numInfSteps);
    params.append('guidanceScale', guidanceScale);
    params.append('seed', seed);
    try{
        const response = await axios.post('/api/texttoimage', params);

        console.log(response?.data);

        if (!response.ok){
          setErrorMessage("Ooops! Something went wrong generating the image");
        } else {
            const imageBlob = await response.blob();
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
          <div className="columns is-vcentered">
              <div className="column">
                  <form className="box" onSubmit={handleSubmit}>
                      <h1 className="title has-text-centered is-4">Generate Image with Stable Diffuser</h1>
                      <div className="field">
                          <label className="label">Prompt</label>
                          <div className="control">
                              <input 
                                  type="text" 
                                  placeholder="Enter your prompt to generate the image" 
                                  value={prompt} 
                                  onChange={(e) =>setPrompt(e.target.value)}
                                  className="textarea"
                                  required
                              /> 
                          </div>
                      </div>
                      <div className="field">
                          <label className="label">Seed</label>
                          <div className="control">
                              <input 
                                  type="text" 
                                  placeholder="seed" 
                                  value={seed} 
                                  onChange={(e) =>setSeed(e.target.value)}
                                  className="input"
                              /> 
                          </div>
                      </div>
                      <div className="field">
                          <label className="label">Guidance Scale</label>
                          <div className="control">
                              <input 
                                  type="text" 
                                  placeholder="guidancescale" 
                                  value={guidanceScale} 
                                  onChange={(e) =>setGuidanceScale(e.target.value)}
                                  className="input"
                              /> 
                          </div>
                      </div>
                      <div className="field">
                          <label className="label">Number of Inference Steps - Bigger is Slower, Better Quality</label>
                          <div className="control">
                              <input 
                                  type="text" 
                                  placeholder="Bigger is Slower, Better Quality" 
                                  value={numInfSteps} 
                                  onChange={(e) =>setNumInfSteps(e.target.value)}
                                  className="input"
                              /> 
                          </div>
                      </div>            
                          {/* <ErrorMessage message={errorMessage}/> */}
                      <br /> 
                      <button className="button is-primary" type="submit">Generate Image</button>
                  </form>
              </div>
              <div className="column">
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
              </div>
            </div>
          </Container>
        </div>
    </> 
  );
}
  