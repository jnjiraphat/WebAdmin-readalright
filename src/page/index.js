import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";
import Icon from '../asset/image/icon.png'
import { Row, Col, Button } from 'antd'

const menuSite = () => {
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
                        <Button type="primary" danger>Logout</Button>
                    </Col>
                </Row>
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
`
const Background = styled.div`
    background: linear-gradient(180deg, rgba(230,139,236,1) 0%, rgba(138,99,229,1) 100%);
    min-height: 100vh;
`

const Topic = styled.span`
    font-size: 24px;
    font-weight: bold;
`
