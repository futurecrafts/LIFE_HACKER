import React from 'react';
import { useNavigate } from "react-router";
import { MDBContainer, MDBNavbar, MDBBtn } from 'mdb-react-ui-kit';
import Container from 'react-bootstrap/Container';
import Alerts from "../components/bootstrap/Alerts"
import Buttons from "../components/bootstrap/Buttons"
import Toasts from "../components/bootstrap/Toasts"
import Cards from '../components/bootstrap/Cards';
import axios from '../utils/axios';

export default function Dashboard() {
  const navigate = useNavigate();

  function HandleLogout() {
    localStorage.clear();
    navigate('/');
  }

  // async function HandleLogout() {
  //   try {
  //     const response = await axios.get('/api/logout');
  //     console.log(response.data);
  //     if (response.status === 200) {
  //         localStorage.clear();
  //         navigate('/');
  //     }
  //   } catch (error) {
  //     if (error.response) {
  //       // The request was made and the server responded with a status code
  //       // that falls out of the range of 2xx
  //       console.log(error.response.data);
  //       console.log(error.response.status);
  //     } else if (error.request) {
  //         // The request was made but no reponse was received
  //         console.log(error.request);
  //     } else {
  //         console.log('Logout Failed')
  //     }
  //     alert('Logout was not successful! please check the console log!')
  //   }
  // }

    return (
      <>
        <MDBNavbar scrolling dark expand="md" fixed="top">
          <MDBContainer fluid className='justify-content-start'>
            {/* <MDBBtn href='/' className='me-1' color='primary' >
              HOME
            </MDBBtn> */}
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
            <Container className="p-3 mb-3 bg-success rounded-3">
              <h1 className="header">
                KEEN on something? 
              </h1>
            </Container>
            <Container className="p-3 mb-1 bg-light rounded-3">
              <Buttons />
              <Toasts />
              <Alerts />
            </Container>
            <Container className="p-3 mb-1 bg-light rounded-3">
              <Cards />
            </Container>
          </Container>
        </div>
      </> 
    );
  }