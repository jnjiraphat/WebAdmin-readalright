import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Card, Row, Button, Col } from "antd";
import axios from "axios";


const VocabCard = (props) => {
  const [vocabBox, setVocabBox] = useState([]);

  async function fetch() {
    const result = await axios("https://readalright-backend.khanysorn.me/vocabBoxAndCate");

    setVocabBox(result.data);
    console.log("this is all vocabBox")
    console.log(vocabBox[0])
  }

  async function deleteVocabCard(vocabBox_id) {
    console.log("vocabBox_id eng")
    console.log(vocabBox_id)
    await axios.delete("https://readalright-backend.khanysorn.me/admin/deleteVocabCard/" + vocabBox_id)
      .then(
        (response) => {
          alert("delete vocab card success!");
          console.log(response)
        },
        (error) => {
          console.log(error);
        }
      );
      deleteVocabBox(vocabBox_id)


  }

  async function deleteVocabBox(vocabBox_id) {
    console.log("vocabBox_id in delete vocabbox")
    console.log(vocabBox_id)
    await axios.delete("https://readalright-backend.khanysorn.me/admin/deleteVocabBox/" + vocabBox_id)
      .then(
        (response) => {
          console.log("delete vocabBox success!!!");
          console.log(response)
        },
        (error) => {
          console.log(error);
        }
      );
  }


  async function fetch() {
    const result = await axios("https://readalright-backend.khanysorn.me/vocabBoxAndCate");

    setVocabBox(result.data);
    console.log("this is all vocabBox")
    console.log(vocabBox[0])
  }
  
  useEffect(() => {
    fetch();
    // eslint-disable-next-line
  }, []);

  const { editButton} = props
  return (
    <>
      {vocabBox.map((items) =>
        <CardStyled>
          <Row>
            <ColStyled span="8">
              <ui>

                <li>{items.boxEngName}</li>

              </ui>
            </ColStyled>
            <SubCol span="6">
              <ui>

                <li>{items.boxThaiName}</li>

              </ui>
            </SubCol>
            <TailCol span="10">
              <EditButton type="primary" danger onClick={editButton}>
                <Link to={`/edit-vocabbox/${items.vocabBox_id}`}>Edit</Link>
              </EditButton>
              <RemoveButton type="primary" danger onClick={() => deleteVocabCard(items.vocabBox_id)}>
                Remove
          </RemoveButton>
            </TailCol>
          </Row>
        </CardStyled>
      )}
    </>
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