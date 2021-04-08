import React, { useEffect, useState } from 'react'
import { Card, Divider, Row, Typography, Button, Col, Modal, } from 'antd';
import styled from 'styled-components';
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { PrivateRoute } from '../../components/PrivateRoute';
import { wrapper } from '../../redux/store';
import { AuthToken } from '../../services/authToken';
import { loginSuccess } from '../../redux/actions/auth';
import { getSchoolsSetting } from '../../redux/actions/school';
import { redirectError } from '../../services/redirectService';

import {
  Printer,
  Download,
  Phone,
  Mail,
  MapPin
} from 'react-feather';

const Text = Typography.Text

const Content = styled.div`
  max-width: 700px;
  z-index: 2;
  min-width: 300px;,
  backgroundColor:'#f0f0f0'
`;

const StudentFormPage = (props) =>{
  const {schoolSettings} = props

const savePDF =()=> {
    const printArea = document.getElementById("formStaff");
    html2canvas(printArea, {useCORS:true}).then(canvas => {
      let img = new Image();
      img.src = canvas.toDataURL('image/png');
      img.onload = function () {
        let pdf = new jsPDF("portrait", 'mm', 'a4');
        console.log(img)
        pdf.addImage(img, 10, 0, 190, 200);
        pdf.save('formStaff.pdf');
      }
    })

}

const printPDF =()=> {
  const printArea = document.getElementById("formStaff");
  html2canvas(printArea, {useCORS:true}).then(canvas => {
    let img = new Image();
    img.src = canvas.toDataURL('image/png');
    img.onload = function () {
      let pdf = new jsPDF();
      pdf.addImage(img, 10, 0, 190, 200);
      window.open(pdf.output('bloburi',{ filename: 'formStaff.pdf' }), '_blank')
    }
  })
}

  return (
        <Card 
        title="Print Student  Form"
        bodyStyle={{ padding: '1rem' }}
        extra={
          <div>
            <Button onClick={()=>savePDF()} style={{margin:10}}>
             <Download/> 
           </Button>
           <Button onClick={()=>printPDF()}>
             <Printer/> 
           </Button>
          </div>
        }> 
            <div id="formStaff">
                <Row className="rowForm">
                   <Col span={12}>
                   <img className='banner' src={`${schoolSettings.schoolImageAsBlob}`}/>
                   </Col>
                   <Col span={12}>
                     <div className="description-form">
                       <span className="textForm">  <Phone/> {schoolSettings.phoneNumber}  </span>
                         <span className="textForm"> <Mail/> {schoolSettings.email} </span>
                         <span className="textForm"> <MapPin/> {schoolSettings.address} </span>
                     </div>
                   </Col>
                </Row>
                <Row className=" rowForm flexRow">
                       <span className="textForm labelForm" > Admission Date: (M/D/Y)  </span>
                       <div className="line" > </div>
                </Row>
                <Row className=" rowForm flexRow">
                       <span className="textForm labelForm" > First Name: </span>
                       <div className="line" > </div>
                </Row>
                <Row className=" rowForm flexRow">
                       <span className="textForm labelForm" > Middle Name: (optional) </span>
                       <div className="line" > </div>
                </Row>
                <Row className=" rowForm flexRow">
                       <span className="textForm labelForm" > Surname: </span>
                       <div className="line" > </div>
                </Row>
                <Row className=" rowForm flexRow">
                       <span className="textForm labelForm" > Birth Date: (M/D/Y)  </span>
                       <div className="line" > </div>
                </Row>
                <Row className=" rowForm flexRow">
                       <span className="textForm labelForm" > Sex: </span>
                      <div>
                      <input disabled className="checkbox" type='checkbox'></input>
                      <span className="textForm" style={{marginLeft:10}} > Male  </span>
                      <input disabled className="checkbox"  type='checkbox' style={{marginLeft:40}}></input>
                      <span className="textForm" style={{marginLeft:10}} > Female  </span>
                      </div>
                </Row>
                <Row className=" rowForm flexRow">
                       <span className="textForm labelForm" > State: </span>
                       <div className="line" > </div>
                </Row>
                <Row className=" rowForm flexRow">
                       <span className="textForm labelForm" > Class: </span>
                       <div className="line" > </div>
                </Row>
                <Row className=" rowForm flexRow">
                       <span className="textForm labelForm" > Arm: </span>
                       <div className="line" > </div>
                </Row>
                <Row className=" rowForm flexRow">
                       <span className="textForm labelForm" > Address: </span>
                       <div className="line" > </div>
                </Row>
                <Row className=" rowForm flexRow">
                       <span className="textForm labelForm" > Parent Phone Number: </span>
                       <div className="line" > </div>
                </Row>
                <span className="textForm labelForm" style={{marginLeft:'30%', marginRight:'30%', fontFamily:"Roboto", fontSize:15}} > Generated by Quantum Cude For Plot Schools </span>
                <a className="textForm labelForm" href="http://www.plotSchools.com" style={{marginLeft:'35%', marginRight:'35%', fontFamily:"Roboto", fontSize:13}} > www.plotSchool.com </a> 
            </div>
       </Card>
  )
};


export const getServerSideProps = wrapper.getServerSideProps(
  async (ctx ) => {
    try {
      const store = ctx.store
      let data =  await AuthToken.fromNext(ctx)
      await store.dispatch(loginSuccess(data.decodedToken, data.decodedToken.userType))
      await store.dispatch(getSchoolsSetting(data.decodedToken.school))
      let propStore =  await store.getState()  
      return { props:{  
             schoolSettings: propStore.schools.settings ,

         }   } 
    } catch (error) {
      console.log(error)
        redirectError(ctx)
    }
  }
)


export default StudentFormPage
