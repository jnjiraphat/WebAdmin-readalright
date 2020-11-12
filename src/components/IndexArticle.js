import React from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import Icon from "../asset/image/icon.png";
import { Row, Col, Button } from "antd";
import ContentCard from './ArticleCard'

const IndexArticle = () => {
    return(
        <Div>
            <Link to="/add-article">
                <ButtonStyled type="primary" danger>+ New</ButtonStyled>
            </Link>
            <RowStyled>
                <HeadCol span="8">Tilte</HeadCol>
                <SubColCate span="4">Catergory</SubColCate>
                <SubColLevel span="4">Level</SubColLevel>
                <TailCol span="8"></TailCol>
            </RowStyled>
            <ContentCard/>
        </Div>
    )
}
export default IndexArticle;

const RowStyled = styled(Row)`
    margin-bottom: 15px;
`

const Div = styled.div`
margin-left: 36px;
margin-top: 15px;
margin-right: 36px;
`

const ButtonStyled = styled(Button)`
background: linear-gradient(180deg, #7EF192 0%, #2DC897 100%) !important;
border-radius: 5px;
font-weight: bold;
border-color: transparent !important;
color: #000 !important;
width: 200px;
height: 39px;
margin-bottom: 25px;
`

const ColStyled = styled(Col)`
    font-size: 12px;
    font-weight: 700;
`

const HeadCol = styled(ColStyled)`
    padding-left: 24px;
    margin-left: 1px;
`

const SubCol = styled(ColStyled)`
    display: flex;
    justify-content: center;
`

const SubColCate = styled(SubCol)`
    margin-left: 4px;
`
const SubColLevel = styled(SubCol)`
    margin-left: -10px;
`

const TailCol = styled(ColStyled)`
    display: flex;
    justify-content: flex-end;
`