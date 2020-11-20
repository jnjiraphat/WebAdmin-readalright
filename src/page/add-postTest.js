import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import axios from "axios";
import { Button } from "antd";
import {
  BrowserRouter as Router,
  useRouteMatch,
} from 'react-router-dom';

// const readingId = "";
const AddPostTest = () => {
  // const match = useRouteMatch('/add-postTest/:readingId2');
  // console.log("reading id in add post test")
  // console.log(match.params.readingId2)
  
  const [readingId, setReadingIdD] = useState("");

  const [questionBox, setQuestionBox] = useState([])

  const match = useRouteMatch('/add-postTest/:readingId2');
  console.log("reading id in add post test")
  console.log(match.params.readingId2)


  //ตรงนี้เลยมุกตรงนี้ๆๆๆๆ ขอแค่ URL ที่ get มา เดี๋ยวเราไปต่อเองๆๆๆ
  // async function editPostTest() {
  //   console.log("vocab box ID in editVocabBox")
  //   console.log(match.params.vocabBox_id)
  //   const result = await axios.get("http://localhost:3000/vocabBox/id/" + match.params.vocabBox_id);
  //   console.log("result")
  //   console.log(result.data.reading[0])
  //   console.log(result.data.reading.length)
  //   for (let index = 0; index < result.data.reading.length; index++) {
  //     vocabId.push(result.data.reading[index].vocabCard_id)
  //     console.log(vocabId[index])
  //   }
  //   setTitle(result.data.reading[0].boxEngName)
  //   setTitleMeaning(result.data.reading[0].boxThaiName)
  //   setCategoryId(result.data.reading[0].category_id)
  //   setImage(result.data.reading[0].image)
  //   setVocabCardID(result.data.reading[0].vocabCard_id)
  // }


  async function postQuiz(
    question,
    typeOfSuggestion_id,
    isRightChoice,
    choice
  ) {
    const response = await axios.post("http://localhost:3000/quizs", {
      question: question,
      typeOfSuggestion_id: typeOfSuggestion_id,
      reading_id: readingId,
    });
    console.log("quiz", response.data);
    console.log("quizId", response.data.quiz);
    await postChoice(isRightChoice, choice, response.data.quiz);
  }
  async function postChoice(isRightChoice, choice, question_id) {
    const response = await axios.post("http://localhost:3000/choice", {
      isRightChoice: isRightChoice,
      choice: choice,
      optionText: choice,
      value: choice,
      question_id: question_id,
    });
    console.log("choice", response.data);
  }

  return (
    <Background>
      <Container>
        <AreaTopic>
          <TopicAdd>Add PostTest</TopicAdd>
        </AreaTopic>
        <RowArea>
          <WhiteArea>
            <div>
              <h1>Post Test</h1>
              <Formik
                initialValues={{
                  content: [
                    {
                      questionText: "",
                      typeOfSuggestionID: "",
                      option: [
                        {
                          optionText: "",
                          isRightChoice: ""
                        }
                      ]
                    },
                    {
                      questionText: "",
                      typeOfSuggestionID: "",
                      option: [
                        {
                          optionText: "",
                          isRightChoice: ""
                        }
                      ]
                    },
                    {
                      questionText: "",
                      typeOfSuggestionID: "",
                      option: [
                        {
                          optionText: "",
                          isRightChoice: ""
                        }
                      ]
                    },
                  ],
                }}
                onSubmit={(values) => {
                  console.log(values);
                  // postQuiz(
                  //   values.content.question,
                  //   values.content.typeOfSuggestion_id,
                  //   values.content.isRightChoice,
                  //   values.content.choice
                  // );
                  console.log("value");
                    console.log(values.content[0].questionText);
                    // putPostTest(values.content);

                    console.log(values.content[0].options.length);
                    console.log("Q1");
                    var countQ1 = 0;
                    for (
                      let index = 0;
                      index < values.content[0].options.length;
                      index++
                    ) {
                      console.log(
                        values.content[0].options[index].isRightChoice
                      );
                      if (
                        values.content[0].options[index].isRightChoice == "1"
                      ) {
                        countQ1++;
                        console.log("count in if");
                        console.log(countQ1);
                      }
                    }
                    console.log("Q2");
                    var countQ2 = 0;
                    for (
                      let index = 0;
                      index < values.content[1].options.length;
                      index++
                    ) {
                      console.log(
                        values.content[1].options[index].isRightChoice
                      );
                      if (
                        values.content[1].options[index].isRightChoice == "1"
                      ) {
                        countQ2++;
                        console.log("count in if");
                        console.log(countQ2);
                      }
                    }
                    console.log("Q3");
                    var countQ3 = 0;
                    for (
                      let index = 0;
                      index < values.content[2].options.length;
                      index++
                    ) {
                      console.log(
                        values.content[2].options[index].isRightChoice
                      );
                      if (
                        values.content[2].options[index].isRightChoice == "1"
                      ) {
                        countQ3++;
                        console.log("count in if");
                        console.log(countQ3);
                      }
                    }
                    console.log("countQ3");
                    console.log(countQ3);
                    if (countQ1 == 1 && countQ2 == 1 && countQ3 == 1) {
                      console.log("Post in this condition");
                      alert(JSON.stringify(values, null, 0));
                    } else {
                      console.log("not success");
                      alert(
                        JSON.stringify(
                          "Please edit Question1 correct choice just 1"
                        )
                      );
                    }
                }}
              >
                {({ values }) => (
                  <Form>
                    <FieldArray name="content">
                      {({ insert, remove, push }) => (
                        <div>
                          {values.content.length > 0 &&
                            values.content.map((content, index) => (
                              <Col key={index}>
                                <h4>Question no.{index+1}</h4>
                                <div>
                                    <RowStyled>
                                      <Col span="8">
                                        <TextForm>question:</TextForm>
                                      </Col>
                                      <Col span="14">
                                        <FieldContent
                                          name={`content.${index}.questionText`}
                                          component="textarea"
                                        />
                                      </Col>
                                    </RowStyled>
                                    <RowStyled>
                                      <Col span="8">
                                        <TextForm>Choice A:</TextForm>
                                      </Col>
                                      <Col span="14">
                                        <FieldStyled
                                          name={`content.${index}.options.${0}.optionText`}
                                        />
                                      </Col>
                                    </RowStyled>
                                    <RowStyled>
                                      <Col span="8">
                                        <TextForm>isRightChoice:</TextForm>
                                      </Col>
                                      <Col span="14">
                                        <Field
                                          type="radio"
                                          name={`content.${index}.options.${0}.isRightChoice`}
                                          value="1"
                                        />{" "}
                                        Correct
                                        <FieldRadio
                                          type="radio"
                                          name={`content.${index}.options.${0}.isRightChoice`}
                                          value="0"
                                        />{" "}
                                        Wrong
                                        {/* ทำฟังก์ชั่น fi ถ้า 1T ให้เพิ่มข้อมูลว่า 1T 0F */}
                                      </Col>
                                    </RowStyled>
                                    <RowStyled>
                                      <Col span="8">
                                        <TextForm>Choice B:</TextForm>
                                      </Col>
                                      <Col span="14">
                                        <FieldStyled
                                          name={`content.${index}.options.${1}.optionText`}
                                        />
                                      </Col>
                                    </RowStyled>
                                    <RowStyled>
                                      <Col span="8">
                                        <TextForm>isRightChoice:</TextForm>
                                      </Col>
                                      <Col span="14">
                                        <Field
                                          type="radio"
                                          name={`content.${index}.options.${1}.isRightChoice`}
                                          value="1"
                                        />{" "}
                                        Correct
                                        <FieldRadio
                                          type="radio"
                                          name={`content.${index}.options.${1}.isRightChoice`}
                                          value="0"
                                        />{" "}
                                        Wrong
                                        {/* ทำฟังก์ชั่น fi ถ้า 1T ให้เพิ่มข้อมูลว่า 1T 0F */}
                                      </Col>
                                    </RowStyled>
                                    <RowStyled>
                                      <Col span="8">
                                        <TextForm>Choice C:</TextForm>
                                      </Col>
                                      <Col span="14">
                                        <FieldStyled
                                          name={`content.${index}.options.${2}.optionText`}
                                        />
                                      </Col>
                                    </RowStyled>
                                    <RowStyled>
                                      <Col span="8">
                                        <TextForm>isRightChoice:</TextForm>
                                      </Col>
                                      <Col span="14">
                                        <Field
                                          type="radio"
                                          name={`content.${index}.options.${2}.isRightChoice`}
                                          value="1"
                                        />{" "}
                                        Correct
                                        <FieldRadio
                                          type="radio"
                                          name={`content.${index}.options.${2}.isRightChoice`}
                                          value="0"
                                        />{" "}
                                        Wrong
                                        {/* ทำฟังก์ชั่น fi ถ้า 1T ให้เพิ่มข้อมูลว่า 1T 0F */}
                                      </Col>
                                    </RowStyled>
                                    <RowStyled>
                                      <Col span="8">
                                        <TextForm>Choice D:</TextForm>
                                      </Col>
                                      <Col span="14">
                                        <FieldStyled
                                          name={`content.${index}.options.${3}.optionText`}
                                        />
                                      </Col>
                                    </RowStyled>
                                    <RowStyled>
                                      <Col span="8">
                                        <TextForm>isRightChoice:</TextForm>
                                      </Col>
                                      <Col span="14">
                                        <Field
                                          type="radio"
                                          name={`content.${index}.options.${3}.isRightChoice`}
                                          value="1"
                                        />{" "}
                                        Correct
                                        <FieldRadio
                                          type="radio"
                                          name={`content.${index}.options.${3}.isRightChoice`}
                                          value="0"
                                        />{" "}
                                        Wrong
                                        {/* ทำฟังก์ชั่น fi ถ้า 1T ให้เพิ่มข้อมูลว่า 1T 0F */}
                                      </Col>
                                    </RowStyled>
                                    <RowStyled>
                                      <Col span="8">
                                        <TextForm>typeOfSuggestion:</TextForm>
                                      </Col>
                                      <Col span="14">
                                        <FieldStyled
                                          as="select"
                                          name={`content.${index}.typeOfSuggestionID`}
                                        >
                                          <option value="1">Verb</option>
                                          <option value="2">Noun</option>
                                          <option value="3">Adverb</option>
                                        </FieldStyled>
                                      </Col>
                                    </RowStyled>
                                  </div>
                              </Col>
                            ))}
                        
                        </div>
                      )}
                    </FieldArray>

                    <AreaSubmit>
                      <ButtonStyled type="submit">Save</ButtonStyled>
                    <Link to="/">
                      <button>
                        Go to Admin Board
                      </button>
                    </Link>
                    </AreaSubmit>
                  </Form>
                )}
              </Formik>
            </div>
          </WhiteArea>
        </RowArea>
      </Container>
    </Background>
  );
};

export default AddPostTest;

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
  padding-top: 3%;
  align-items: center;
`;

const Background = styled.div`
  background: linear-gradient(
    180deg,
    rgba(230, 139, 236, 1) 0%,
    rgba(138, 99, 229, 1) 100%
  );
  min-height: 100vh;
`;

const WhiteArea = styled.div`
  width: 1100px;
  background: #fff;
  padding-right: 15px;
  padding-left: 15px;
  padding-top: 10px;
  padding-bottom: 40px;
  min-height: 500px;
  margin-top: 22px;
  /* display: flex; */
  border-radius: 4px;
`;

const RowArea = styled(Row)`
  /* display: flex; */
  justify-content: center;
`;

const TopicAdd = styled.span`
  font-size: 24px;
  font-weight: bold;
  align-self: center;
`;

const AreaTopic = styled.div`
  display: flex;
  justify-content: center;
`;

const TextForm = styled.span`
  font-weight: bold;
  font-size: 14px;
  margin-left: 30%;
`;
const TextFormLebel = styled.label`
  font-weight: bold;
  font-size: 14px;
  margin-left: 30%;
`;

const RowStyled = styled(Row)`
  margin-bottom: 2%;
`;

const FieldStyled = styled(Field)`
  width: 500px;
`;
const FieldStyledMini = styled(Field)`
  width: 200px;
`;
const FieldContent = styled(FieldStyled)`
  height: 150px;
`;

const ColSubmit = styled(Col)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ButtonStyled = styled(Button)`
  height: 27.6px;
`;
const AreaSubmit = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2%;
  margin-right: 10%;
`;
const AreaMoreWord = styled(AreaSubmit)`
  margin-top: 5%;
`;

const FormStyled = styled(Form)`
  margin-top: 22px;
`;

const FieldRadio = styled(Field)`
  margin-left: 2%;
`