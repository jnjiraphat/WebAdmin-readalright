import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import axios from "axios";
import firebaseMethod from '../firebase';

// const readingId = "";
const AddArticle = () => {
  
  var email = window.localStorage.getItem("email");

  console.log(email);

  const [readingIdD, setReadingIdD] = useState("");
  const [url, setUrl] = useState("");
  const [readingId2, setReadingId2] = useState(0);
  
  // const [categoryId, setCategoryId] = useState(1);
  // const [levelReading, setLevelReading] = useState("A0")
 
  

  async function fetch() {
    const result = await axios("https://readalright-backend.khanysorn.me/reading/last");

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
    const uploadTask =firebaseMethod.storage.ref(`images/file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fdemo-5bd35bcc-f83b-4f82-8303-9d91b7712057/ImagePicker/${imageTemp.name}`).put(imageTemp);
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
    url,
    category_id,
    level_reading
  ) {
    const response = await axios.post("https://readalright-backend.khanysorn.me/reading", {
      title: title,
      content: content,
      image: url,
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
    console.log(readingIdD)
    
  return (
    <Background>
       {email == null ? (
        <Container>
          <CenterArea>
          <span>Please Login First</span>
          <Link to="/">
            <button>Login</button>
          </Link>
          </CenterArea>
        </Container>
      ) : (
      <Container>
        <AreaTopic>
          <TopicAdd>Add Article</TopicAdd>
        </AreaTopic>
        <RowArea>
          <WhiteArea>
            <div>
              <Formik
                initialValues={{
                  content: {
                    title: "",
                    content: "",
                    image: "",
                    category_id: "",
                    level_reading: "",
                  }
                }}
                onSubmit={(values) => {
                  
                  console.log(values.content.category_id)

                  console.log(values);
                  console.log(url);
                  
                  if(values.content.category_id && values.content.level_reading) {
                    postReading(
                      values.content.title,
                      values.content.content,
                      url,
                      values.content.category_id,
                      values.content.level_reading,
                      );
                      alert("Add Successful");
                    } else{
                    alert("Please select All of Field");
                  }
                  // setImage(values.content.image);
                  // same shape as initial values
                }}
              >
                {({ values }) => (
                  <Form>
                    <RowStyled style={{marginTop: "50px"}}>
                      <Col span="6">
                        <TextForm>Title</TextForm>
                      </Col>
                      <Col span="12">
                        <FieldStyled name="content.title" />
                      </Col>
                      <Col span="6"></Col>
                    </RowStyled>
                    <RowStyled>
                      <Col span="6">
                        <TextForm>Content:</TextForm>
                      </Col>
                      <Col span="12">
                        <FieldContent name="content.content" component="textarea" />
                      </Col>
                      <Col span="6"></Col>
                    </RowStyled>
                    <RowStyled>
                      <Col span="6">
                        <TextForm>Image</TextForm>
                      </Col>
                      <Col span="12">
                        <input
                          type="file"
                          name="file"
                          onChange={(event) => {
                            // formProps.setFieldValue(
                            //   "image",
                            //   event.currentTarget.files[0]
                            // );
                            // setImage(event.currentTarget.files[0]);
                            handleUpload(event.currentTarget.files[0])
                          }}
                        />
                      </Col>
                      <Col span="6"></Col>
                    </RowStyled>
                    <RowStyled>
                      <Col span="6">
                        <TextForm>Category</TextForm>
                      </Col>
                      <Col span="12">
                        <Field as="select" name="content.category_id">
                          <option value="0">Select</option>
                          <option value="1">Song</option>
                          <option value="2">Movie</option>
                          <option value="3">Sport</option>
                          <option value="4">Entertainment</option>
                          <option value="5">Health</option>
                          <option value="6">Information Technology</option>
                          <option value="7">Travel</option>
                          <option value="8">Story</option>
                        </Field>
                      </Col>
                      <Col span="6"></Col>
                    </RowStyled>
                    <RowStyled>
                      <Col span="6">
                        <TextForm>Level Reading</TextForm>
                      </Col>
                      <Col span="12">
                        <Field as="select" name="content.level_reading">
                          <option value="0">Select</option>
                          <option value="A0">A0</option>
                          <option value="A1">A1</option>
                          <option value="A2">A2</option>
                          <option value="B1">B1</option>
                        </Field>
                      </Col>
                      <Col span="6"></Col>
                    </RowStyled>
                    <RowStyled>
                      <Col span="6"></Col>
                      <Col span="12"></Col>
                      <ColSubmit span="6">
                        <button type="submit">
                          Save
                      </button>
                        <Link to={`/add-postTest/${readingId2}`}>
                          <button style={{marginLeft: "15px"}}>
                            Create Post Test
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
     )} 
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


const CenterArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`


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
