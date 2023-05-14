import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBRipple, MDBRow, MDBCol } from 'mdb-react-ui-kit';

export default function Cards() {
    return (
        <MDBRow className='row-cols-1 row-cols-md-2 g-4'>
            <MDBCol>
                <MDBCard>
                    <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                    <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/111.webp' fluid alt='...' />
                    <a>
                        <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                    </a>
                    </MDBRipple>
                    <MDBCardBody>
                    <MDBCardTitle>Chat</MDBCardTitle>
                    <MDBCardText>
                        You can ask anything with this Chat bot.
                    </MDBCardText>
                    <MDBBtn href='/api/chat'>Start Chat</MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
            <MDBCol>
                <MDBCard>
                <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                    <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/111.webp' fluid alt='...' />
                    <a>
                    <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                    </a>
                </MDBRipple>
                <MDBCardBody>
                    <MDBCardTitle>TextToImage</MDBCardTitle>
                    <MDBCardText>
                    You can Text to Image.
                    </MDBCardText>
                    <MDBBtn href='/api/texttoimage'>Generate Image</MDBBtn>
                </MDBCardBody>
                </MDBCard>
            </MDBCol>
            <MDBCol>
                <MDBCard>
                    <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                    <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/111.webp' fluid alt='...' />
                    <a>
                        <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                    </a>
                    </MDBRipple>
                    <MDBCardBody>
                    <MDBCardTitle>AI Image</MDBCardTitle>
                    <MDBCardText>
                        You can generate AI Image.
                    </MDBCardText>
                    <MDBBtn href='/api/aiimage'>Generate Image</MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
            <MDBCol>
                <MDBCard>
                    <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                    <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/111.webp' fluid alt='...' />
                    <a>
                        <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                    </a>
                    </MDBRipple>
                    <MDBCardBody>
                    <MDBCardTitle>3D Space</MDBCardTitle>
                    <MDBCardText>
                        You can explorer how 3d space looks like.
                    </MDBCardText>
                    <MDBBtn href='/api/skybox'>Enter 3D Space</MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
            <MDBCol>
                <MDBCard>
                    <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                    <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/111.webp' fluid alt='...' />
                    <a>
                        <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                    </a>
                    </MDBRipple>
                    <MDBCardBody>
                    <MDBCardTitle>3D Space Portal</MDBCardTitle>
                    <MDBCardText>
                        You can explorer how 3d space looks like with Portal.
                    </MDBCardText>
                    <MDBBtn href='/api/skyboxportal'>Enter 3D Space Portal</MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </MDBRow>
    );
}