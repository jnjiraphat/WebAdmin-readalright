import React from 'react'
import styled from 'styled-components'
import { Link, NavLink } from "react-router-dom";
import Icon from '../asset/image/icon.png'
import { Row, Col, Button } from 'antd'
import IndexArea from '../components/IndexArea'
import { useRouteMatch } from "react-router-dom";

const menuSite = () => {
    // const match = useRouteMatch('/index');
    // const match = useRouteMatch(`/index`);
    return(
        <Background>
            <Container>
                <Row>
                    <Col span="4" style={{display:"flex",justifyContent:"center"}}>
                        <img src={Icon} width={80} height={80}/>
                    </Col>
                    <Col span="10" style={{display:"flex",alignItems:"center"}}>
                        <Topic>Admin</Topic>
                    </Col>
                    <Col span="8" style={{display:"flex",alignItems:"center", justifyContent:"flex-end"}}>
                        <Topic>Jenny</Topic>
                        <ButtonLogout type="primary" danger>Logout</ButtonLogout>
                    </Col>
                </Row>
                <IndexArea/>
            </Container>
        </Background>
    )
}

export default menuSite;

const Container = styled.div`
    margin-left: auto;
    margin-right: auto;
    max-width: 1200px;
    padding-top: 3%;
    align-items: center;
`
const Background = styled.div`
    background: linear-gradient(180deg, rgba(230,139,236,1) 0%, rgba(138,99,229,1) 100%);
    min-height: 100vh;
`

const Topic = styled.span`
    font-size: 24px;
    font-weight: bold;
`

const ButtonLogout = styled(Button)`
    background: #F66181 !important;
    border-color: #F66181 !important;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 5px;
    width: 200px;
    height: 39px;
    margin-left: 5%;
    color: #000 !important;
    font-weight: bold;
`
