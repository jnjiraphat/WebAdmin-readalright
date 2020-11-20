import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import { Route, Link } from "react-router-dom";
import { Row, Col } from "antd";
import axios from "axios";
import AddPostTest from './add-postTest'
import firebaseMethod from '../firebase';
import {
  BrowserRouter as Router,
  useRouteMatch,
} from 'react-router-dom';


// const readingId = "";
const AddArticle = () => {
  const [person, setPerson] = useState([]);
  const [readingIdD, setReadingIdD] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("")
  const [readingId2, setReadingId2] = useState(0)

 
  

  async function fetch() {
    const result = await axios("http://localhost:3000/reading/last");

    // setReadingIdD(result.data.reading[0].reading_id);
    console.log(result.data.reading[0].reading_id)
    var number = parseInt(result.data.reading[0].reading_id)
    var count = number + 1
    console.log(count)
    setReadingId2(count)


  }
  // function navigate(readingId2) {
  //   history.pushState("/add-postTest/" + readingId2)
  // }
  useEffect(() => {
    fetch();
  }, []);
  const handleUpload = (imageTemp) => {
    const uploadTask =firebaseMethod.storage.ref(`images/file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fdemo-5bd35bcc-f83b-4f82-8303-9d91b7712057/ImagePicker/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
      },
      error => {
        console.log(error);
      },
      () => {
        firebaseMethod.storage
          .ref("images/file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fdemo-5bd35bcc-f83b-4f82-8303-9d91b7712057/ImagePicker/")
          .child(imageTemp.name)
          .getDownloadURL()
          .then(url => {
            setUrl(url);
            console.log("pic url")
            console.log(url)
          });
      }
    );
  };

  // async function fetch() {
  //   const result = await axios("https://jsonplaceholder.typicode.com/users");

  //   setPerson(result.data);
  // console.log(person)
  // }
  // useEffect(() => {
  //   fetch();
  // });

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
    // console.log("reading", response.data.quiz);
    // readingId = response.data.quiz;
    // setReadingId(response.data.quiz)
    // if (readingId != "") {
    //   console.log(readingId)
    // }
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
          <TopicAdd>Add Article</TopicAdd>
        </AreaTopic>
        <RowArea>
          <WhiteArea>
            <div>
              <h1>Article</h1>
              <Formik
                initialValues={{
                  content: {
                    title: "",
                    content: "",
                    image:"",
                    category_id: "1",
                    level_reading: "A1",
                  }
                }}
                onSubmit={(values) => {

                  console.log(values);
                  postReading(
                    values.content.title,
                    values.content.content,
                    url,
                    values.content.category_id,
                    values.content.level_reading,
                  );
                  // setImage(values.content.image);
                  // same shape as initial values
                }}
              >
                {(formProps) => (
                  <Form>
                    <RowStyled>
                      <Col span="6">
                        <TextForm>Title:</TextForm>
                      </Col>
                      <Col span="12">
                        <FieldStyled name="content.title" />
                      </Col>
                      <Col span="6"></Col>
                    </RowStyled>
                    <RowStyled>
                      <Col span="6">
                        <TextForm>content:</TextForm>
                      </Col>
                      <Col span="12">
                        <FieldContent name="content.content" component="textarea" />
                      </Col>
                      <Col span="6"></Col>
                    </RowStyled>
                    <RowStyled>
                      <Col span="6">
                        <TextForm>photo:</TextForm>
                      </Col>
                      <Col span="12">
                        <input
                          type="file"
                          name="file"
                          onChange={(event) => {
                            formProps.setFieldValue(
                              "image",
                              event.currentTarget.files[0]
                            );
                            // setImage(event.currentTarget.files[0]);
                            handleUpload(event.currentTarget.files[0])
                          }}
                        />
                      </Col>
                      <Col span="6"></Col>
                    </RowStyled>
                    <RowStyled>
                      <Col span="6">
                        <TextForm>category_id:</TextForm>
                      </Col>
                      <Col span="12">
                        <FieldStyled as="select" name="content.category_id">
                          <option value="1">Song</option>
                          <option value="2">Movie</option>
                          <option value="3">Sport</option>
                          <option value="4">Entertainment</option>
                          <option value="5">Health</option>
                          <option value="6">Information Technology</option>
                          <option value="7">Travel</option>
                          <option value="8">Story</option>
                        </FieldStyled>
                      </Col>
                      <Col span="6"></Col>
                    </RowStyled>
                    <RowStyled>
                      <Col span="6">
                        <TextForm>level_reading:</TextForm>
                      </Col>
                      <Col span="12">
                        <FieldStyled as="select" name="content.level_reading">
                          <option value="A0">A0</option>
                          <option value="A1">A1</option>
                          <option value="A2">A2</option>
                          <option value="B1">B1</option>
                        </FieldStyled>
                      </Col>
                      <Col span="6"></Col>
                    </RowStyled>
                    <RowStyled>
                      <Col span="6"></Col>
                      <Col span="12"></Col>
                      <ColSubmit span="6">

                        {/* <Link to={`/add-postTest/${readingId2}`}>
                          <button type="submit">
                            Submit
                      </button>
                        </Link> */}

                        <button type="submit">
                          Save
                      </button>
                        <Link to={`/add-postTest/${readingId2}`}>
                          <button>
                            next
                          </button>
                        </Link>

                        {/* <button type="submit">                         
                          <Link to={`/add-postTest/${readingId2}`}>
                            Next
                         </Link>
                        </button> */}
                      </ColSubmit>
                    </RowStyled>

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

export default AddArticle;

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

const RowStyled = styled(Row)`
  margin-bottom: 2%;
`;

const FieldStyled = styled(Field)`
  width: 500px;
`;
const FieldContent = styled(FieldStyled)`
  height: 150px;
`;

const ColSubmit = styled(Col)`
  display: flex;
  justify-content: center;
`;
