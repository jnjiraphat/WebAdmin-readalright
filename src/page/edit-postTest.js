import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import axios from "axios";
import { Button } from "antd";
import { BrowserRouter as Router, useRouteMatch } from "react-router-dom";

// const readingId = "";
const EditPostTest = () => {
  const [oldQuestion, setOldQuestion] = useState("");
  const [oldtypeOfSuggestionId, setOldtypeOfSuggestionId] = useState("");
  const [oldIsRightChoice, setOldIsRightChoice] = useState("");
  const [oldChoice, setOldChoice] = useState("");

  const [dataArrayQuizChallenge, setdataArrayQuizChallenge] = useState([]);
  const match = useRouteMatch(`/edit-postTest/:reading_id`);
  console.log("reading id in edit post test");
  console.log(match.params.reading_id);

  const [quizData, setQuizData] = useState([]);
  const [quiz, setQuiz] = useState([]);

  const fetchAPI = async (dataArrayQuizChallenge) => {
    var dataArrayQuiz = [];
    for (let index = 0; index < dataArrayQuizChallenge[0].length; index++) {
      await axios
        .get(
          "http://localhost:3000/quiz/" +
            dataArrayQuizChallenge[0][index].question_id
        )
        .then(
          (response) => {
            console.log(response.data);
            dataArrayQuiz.push(response.data);
            console.log("typeOfSuggestion_id")
            // console.log(response.data.quiz[0].typeOfSuggestion_id);
            console.log(dataArrayQuiz.length);
          },
          (error) => {
            console.log(error);
          }
        );
    }
    setQuizData(dataArrayQuiz);
    console.log("quizData");
    console.log(quizData);
    getQuiz(quizData);
    console.log("Quiz");
    console.log(quiz);
  };

  const getQuiz = (quizData) => {
    let data = [];
    quizData.map((item) => {
      data.push({
        questionText: item.questionText,
        option: item.options,
      });
    });
    console.log("SetQuiz");
    console.log(data);
    setQuiz(data);
  };

  const fetchApiChallenge = async () => {
    var temp = [];

    if (match.params.reading_id != null) {
      await axios
        .get("http://localhost:3000/quizInContent/" + match.params.reading_id)
        .then(
          (response) => {
            console.log("fetch api challenge");
            console.log(response.data.quiz);
            temp.push(response.data.quiz);
            console.log(temp.length);
          },
          (error) => {
            console.log(error);
          }
        );
      setdataArrayQuizChallenge(temp);
      console.log("data array quiz chal");
      console.log(dataArrayQuizChallenge);
      fetchAPI(temp);
    } else {
    }
  };

  const [readingIdD, setReadingIdD] = useState("");

  useEffect(() => {
    fetchApiChallenge();
  }, []);

  async function postReading(
    title,
    content,
    image,
    category_id,
    level_reading
  ) {
    const response = await axios.post("http://localhost:3000/reading", {
      title: title,
      content: content,
      image: image,
      category_id: category_id,
      level_reading: level_reading,
    });
    console.log("reading", response.data);
    var readingId = response.data.quiz;
    console.log(readingId);
    setReadingIdD(readingId);
  }

  async function postQuiz(
    question,
    typeOfSuggestion_id,
    isRightChoice,
    choice
  ) {
    const response = await axios.post("http://localhost:3000/quizs", {
      question: question,
      typeOfSuggestion_id: typeOfSuggestion_id,
      reading_id: readingIdD,
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
          <TopicAdd>Edit PostTest</TopicAdd>
        </AreaTopic>
        <RowArea>
          <WhiteArea>
            <div>
              <h1>Post Test</h1>
             {quizData.length >  0 ?  <Formik
                initialValues={{
						content : [...quizData]
                }}
                onSubmit={(values) => {
						console.log(values);
						alert(JSON.stringify(values , null , 0))
                }}
              >
                {({ values }) => (
                  <Form>
                    <FieldArray name="content">
                      {({ insert, remove, push }) => (
                        <div>
                          {quizData.length > 0 &&
                            quizData.map((content, index) => (
                              <Col key={index}>
                                <h4>Question no.{index + 1}</h4>
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
                                      <TextForm>Choice D:</TextForm>
                                    </Col>
                                    <Col span="14">
                                      <FieldStyled
                                        name={`content.${index}.options.${3}.optionText`}
                                      />
                                    </Col>
                                  </RowStyled>

                                  {/* <RowStyled>
                                    <Col span="8">
                                      <TextForm>Choice A:</TextForm>
                                    </Col>
                                    <Col span="14">
                                      <FieldStyled
                                        name={`content.${index}.choice.${0}.optionText`}
                                        // onChange={(e) =>
                                        //   changeCard(
                                        //     e.target.value,
                                        //     "option",
                                        //     "optionText",
                                        //     index,
                                        //     0
                                        //   )
                                        // }
                                        // value={content.choice.optionText}
                                      />
                                    </Col>
                                  </RowStyled>
                                  <RowStyled>
                                    <Col span="8">
                                      <TextForm>Choice B:</TextForm>
                                    </Col>
                                    <Col span="14">
                                      <FieldStyled
                                        name={`content.${index}.choice.${1}.optionText`}
                                        // onChange={(e) =>
                                        //   changeCard(
                                        //     e.target.value,
                                        //     "option",
                                        //     "optionText",
                                        //     index,
                                        //     1
                                        //   )
                                        // }
                                        // value={content.choice[1].optionText}
                                      />
                                    </Col>
                                  </RowStyled>
                                  <RowStyled>
                                    <Col span="8">
                                      <TextForm>Choice C:</TextForm>
                                    </Col>
                                    <Col span="14">
                                      <FieldStyled
                                        name={`content.${index}.choice.${2}.optionText`}
                                        // onChange={(e) =>
                                        //   changeCard(
                                        //     e.target.value,
                                        //     "option",
                                        //     "optionText",
                                        //     index,
                                        //     2
                                        //   )
                                        // }
                                        // value={content.choice[2].optionText}
                                      />
                                    </Col>
                                  </RowStyled>
                                  <RowStyled>
                                    <Col span="8">
                                      <TextForm>Choice D:</TextForm>
                                    </Col>
                                    <Col span="14">
                                      <FieldStyled
                                        name={`content.${index}.choice.${3}.optionText`}
                                        // onChange={(e) =>
                                        //   changeCard(
                                        //     e.target.value,
                                        //     "option",
                                        //     "optionText",
                                        //     index,
                                        //     3
                                        //   )
                                        // }
                                        // value={content.choice[3].optionText}
                                      />
                                    </Col>
                                  </RowStyled> */}
                                  <RowStyled>
                                    <Col span="8">
                                      <TextForm>typeOfSuggestion:</TextForm>
                                    </Col>
                                    <Col span="14">
                                      <FieldStyled
                                        as="select"
                                        name={`content.${index}.typeOfSuggestion_id`}
                                      >
                                        <option value="1">Verb</option>
                                        <option value="2">Noun</option>
                                      </FieldStyled>
                                    </Col>
                                  </RowStyled>
                                  {/* <RowStyled>
                                    <Col span="8">
                                      <TextForm>Correct choice:</TextForm>
                                    </Col>
                                    <Col span="14">
                                      <Field
                                        type="radio"
                                        name={`content.${index}.corectChoice`}
                                        value="a"
                                      />{" "}
                                      A
                                      <Field
                                        type="radio"
                                        name={`content.${index}.corectChoice`}
                                        value="b"
                                      />{" "}
                                      B
                                      <Field
                                        type="radio"
                                        name={`content.${index}.corectChoice`}
                                        value="c"
                                      />{" "}
                                      C
                                      <FieldRadio
                                        type="radio"
                                        name={`content.${index}.corectChoice`}
                                        value="d"
                                      />{" "}
                                      D
                                      ทำฟังก์ชั่น fi ถ้า 1T ให้เพิ่มข้อมูลว่า 1T 0F
                                    </Col>
                                  </RowStyled> */}

                                  {/* <RowStyled>
                                  <Col span="8">
                                    <TextForm>choice:</TextForm>
                                  </Col>
                                  <Col span="12">
                                    <FieldStyled
                                      name={`content.${index}.choice`}
                                    />
                                  </Col>
                                </RowStyled> */}
                                  {/* <Col span="6">
                                  
                                  <TextFormLebel htmlFor={`content.${index}.question`}>
                                    question-{index+1}
                                  </TextFormLebel>
                                  </Col>
                                <Col Span="5">
                                  <FieldStyledMini
                                    name={`content.${index}.question`}
                                    // placeholder="Jane Doe"
                                    type="text"
                                  />
                                  
                                  <ErrorMessage
                                    name={`content.${index}.question`}
                                    component="div"
                                    className="field-error"
                                  />
                                </Col> */}
                                  {/* <RowStyled>
                                <Col span="8">
                                    
                                  </Col>
                                  
                                <ColSubmit span="12"> */}
                                  <AreaMoreWord>
                                    <ButtonStyled
                                      type="primary"
                                      className="secondary"
                                      onClick={() => remove(index)}
                                      danger
                                    >
                                      Remove Question
                                    </ButtonStyled>
                                  </AreaMoreWord>
                                </div>
                              </Col>
                            ))}
                          <AreaSubmit>
                            <ButtonStyled
                              type="primary"
                              className="secondary"
                              onClick={() =>
                                push({
                                  question: "",
                                  typeOfSuggestion_id: "",
                                  isRightChoice: "",
                                  choice: "",
                                })
                              }
                            >
                              More Questions
                            </ButtonStyled>
                          </AreaSubmit>
                        </div>
                      )}
                    </FieldArray>
						  <AreaSubmit>
						  	<button type="submit">Submit</button>
						  </AreaSubmit>
                  </Form>
                )}
              </Formik>  : null}
            </div>
          </WhiteArea>
        </RowArea>
      </Container>
    </Background>
  );
};

export default EditPostTest;

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
`;
