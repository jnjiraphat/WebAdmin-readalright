import React, { useState, useEffect,useRef } from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import { Route, Link } from "react-router-dom";
import { Row, Col } from "antd";
import axios from "axios";
import AddPostTest from './add-postTest'
import {
  BrowserRouter as Router,
  useRouteMatch,
} from 'react-router-dom';
import { Spin } from 'antd';
import { storage } from "../firebase/index";

// const readingId = "";
const EditArticle = () => {
  const match = useRouteMatch('/edit-article/:readingId');
  console.log("reading id in edit article")
  console.log(match.params.readingId)

  const [readingIdD, setReadingIdD] = useState("");

  //content for edit
  // const [oldTitle, setOldTitle] = useState("");
  // const [oldContent, setOldContent] = useState("");
  // const [oldImage, setOldImage] = useState("");
  // const [oldCate, setOldCate] = useState("");
  // const [oldLevel, setOldLevel] = useState("");

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [categoryId, setCategoryId] = useState()
  const [image, setImage] = useState('')
  const [selectImg, setSelectImg] = useState()
  const [levelReading, setLevelReading] = useState('')
  const [loadImage, setLoadImage] = useState(false)
  const refContainer = useRef();
  
  
  const handleUpload = (imageTemp) => {
    setLoadImage(true)
    const uploadTask = storage.ref(`images/file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fdemo-5bd35bcc-f83b-4f82-8303-9d91b7712057/ImagePicker/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images/file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fdemo-5bd35bcc-f83b-4f82-8303-9d91b7712057/ImagePicker/")
          .child(imageTemp.name)
          .getDownloadURL()
          .then(url => {
            setSelectImg(url);
            setLoadImage(false)
            console.log("pic url")
            console.log(url)
          });
      }
    );
  };
  

  

  async function editContent() {
    console.log("reading ID in editContent")
    console.log(match.params.readingId)
    const result = await axios("http://localhost:3000/reading/readingId/" + match.params.readingId);
    console.log("result")
    console.log(result.data.reading[0]) 
    setTitle(result.data.reading[0].title)
    setContent(result.data.reading[0].content)
    setImage(result.data.reading[0].image)
    setCategoryId(result.data.reading[0].category_id)
    setLevelReading(result.data.reading[0].level_reading)
    console.log(result.data.reading[0].image)
  }

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

  useEffect(() => {
    editContent();
    // fetch();
  }, []);
  // async function postQuiz(
  //   question,
  //   typeOfSuggestion_id,
  //   isRightChoice,
  //   choice
  // ) {
  //   const response = await axios.post("http://localhost:3000/quizs", {
  //     question: question,
  //     typeOfSuggestion_id: typeOfSuggestion_id,
  //     // reading_id: readingIdD,
  //   });
  //   console.log("quiz", response.data);
  //   console.log("quizId", response.data.quiz);
  //   await postChoice(isRightChoice, choice, response.data.quiz);
  // }
  // async function postChoice(isRightChoice, choice, question_id) {
  //   const response = await axios.post("http://localhost:3000/choice", {
  //     isRightChoice: isRightChoice,
  //     choice: choice,
  //     optionText: choice,
  //     value: choice,
  //     question_id: question_id,
  //   });
  //   console.log("choice", response.data);
  // }

  return (
    <Background>
      <Container>
        <AreaTopic>
          <TopicAdd>Edit Content Article</TopicAdd>
        </AreaTopic>
        <RowArea>
          <WhiteArea>
          {title === '' ?
              <center style={{ marginTop: '20vh' }}>
                <Spin />
              </center>
              :
            <div>
              <h1>Article</h1>
              <Formik
                initialValues={{
                  content: {
                    title: title,
                    content: content,
                    image: image,
                    category_id: categoryId,
                    level_reading: levelReading
                  }
                }}
                onSubmit={ async (values) => {
                  

                  const data = {
                    title: title,
                    content: content,
                    image: image,
                    category_id: categoryId,
                    level_reading: levelReading
                  }

                  console.log(data);

                  postReading(
                    data.title,
                    data.content,
                    data.image,
                    data.category_id,
                    data.level_reading,
                  );

                  // same shape as initial values
                }}
              >
                {({values}) => (
                  <Form>
                    <RowStyled>
                      <Col span="6">
                        <TextForm>Title:</TextForm>
                      </Col>
                      <Col span="12">
                        <FieldStyled name="content.title" value={title} onChange={(e) => setTitle(e.target.value)} />
                      </Col>
                      <Col span="6"></Col>
                    </RowStyled>
                    <RowStyled>
                      <Col span="6">
                        <TextForm>Content:</TextForm>
                      </Col>
                      <Col span="12">
                        <FieldContent name="content.content" value={content} component="textarea" onChange={(e) => setContent(e.target.value)}/>
                      </Col>
                      <Col span="6"></Col>
                    </RowStyled>
                    <RowStyled>
                      <Col span="6">
                        <TextForm>Image:</TextForm>
                      </Col>
                      <Col span="12">
                      {loadImage ? <Spin /> : <img src={selectImg ? selectImg : image} alt="image" width={300} height={300} />}
                          <input
                            type="file"
                            name="file"
                            style={{ display: 'none' }}
                            ref={refContainer}
                            onChange={(event) => {
                              // console.log(URL.createObjectURL(event.target.files[0]))
                              // setSelectImg(URL.createObjectURL(event.target.files[0]))
                              handleUpload(event.currentTarget.files[0])
                              // values.setFieldValue(
                              //   "photo1",
                              //   event.currentTarget.files[0]
                              // );
                            }}
                          />
                          <br></br>
                          <button onClick={() => refContainer.current.click()} type="button">Edit</button>
                      </Col>
                      <Col span="6"></Col>
                    </RowStyled>
                    <RowStyled>
                      <Col span="6">
                        <TextForm>Category:</TextForm>
                      </Col>
                      <Col span="12">
                        <FieldStyled as="select" name="content.category_id" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
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
                        <TextForm>Level Reading:</TextForm>
                      </Col>
                      <Col span="12">
                        <FieldStyled as="select" name="content.level_reading" value={levelReading} onChange={(e) => setLevelReading(e.target.value)}>
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
                          <button type="submit">Save</button>
                        <Link to={"/"}>
                          <button>
                          Go to Admin Board
                          </button>
                        </Link>
                      </ColSubmit>
                    </RowStyled>
                    
                  </Form>
                )}
              </Formik>
            </div>
}
          </WhiteArea>
        </RowArea>
      </Container>
    </Background>
  );
};

export default EditArticle;

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
