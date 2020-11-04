import React from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { Card, Row, Tabs, Button, Col } from "antd";

const VocabCard = (props) => {
  const {boxEngName, boxThaiName ,editButton,removeButton} = props
  return (
    <CardStyled>
      <Row>
        <ColStyled span="8">
        {boxEngName}
          </ColStyled>
        <SubCol span="6">{boxThaiName}</SubCol>
        <TailCol span="10">
          <EditButton type="primary" danger onClick={editButton}>
            Edit
          </EditButton>
          <RemoveButton type="primary" danger onClick={removeButton}>
            Remove
          </RemoveButton>
        </TailCol>
      </Row>
    </CardStyled>
  );
};

export default VocabCard;

const CardStyled = styled(Card)`
  margin-bottom: 15px;
`

const ButtonStyled = styled(Button)`
  border-radius: 5px;
  font-weight: bold;
  font-size: 14px;
  border-color: transparent !important;
  color: #000 !important;
  width: 70px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
`

const EditButton = styled(ButtonStyled)`
  background: linear-gradient(180deg, #FFD387 0%, #FFE43A 100%) !important;
`
const RemoveButton = styled(ButtonStyled)`
  background: linear-gradient(180deg, #FFB382 0%, #F07590 100%) !important;
`

const ColStyled = styled(Col)`
  font-size: 14px;
  overflow: hidden;
  font-weight: 700;
`

const SubCol = styled(ColStyled)`
  display: flex;
  justify-content: center;
`

const TailCol = styled(ColStyled)`
  display: flex;
  justify-content: flex-end;
`