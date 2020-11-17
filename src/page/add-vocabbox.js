import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { storage } from "../firebase";

const initialValues = {
  content: { boxEngName: "", boxThaiName: "", category_id: "", image: "" },
  friends: [
    {
      engWord: "",
      thaiWord: "",
    },
  ],
};

const AddVocabBox = () => {
  const [vocabBoxIdD, setvocabBoxIdD] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");

  const handleUpload = () => {
    const uploadTask = storage
      .ref(
        `images/file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fdemo-5bd35bcc-f83b-4f82-8303-9d91b7712057/ImagePicker/${image.name}`
      )
      .put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref(
            "images/file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fdemo-5bd35bcc-f83b-4f82-8303-9d91b7712057/ImagePicker/"
          )
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            console.log(url);
          });
      }
    );
  };

  async function postVocabBox(
    boxEngName,
    boxThaiName,
    category_id,
    image,
    friends
  ) {
    const response = await axios.post("http://localhost:3000/vocabBox", {
      boxEngName: boxEngName,
      boxThaiName: boxThaiName,
      category_id: category_id,
      image: image,
    });
    console.log("reading", response.data);
    var vocabBoxId = response.data.quiz;
    console.log("this is vocabBox");
    console.log(vocabBoxId);
    // console.log(friends.length);
    setvocabBoxIdD(vocabBoxId);
    if (friends && friends.length) {
      // `theHref` is truthy and has truthy property _length_
      await postVocabCard(response.data.quiz, friends);
    } else {
      console.log(friends)
    }
  }

  // console.log("this is vocabBox 2")
  // console.log(vocabBoxIdD)

  async function postVocabCard(vocabBox_id, friends) {
    console.log("eiei");

    console.log(friends);
    console.log(friends.length);
    for (let index = 0; index < friends.length; index++) {
      const response = await axios.post("http://localhost:3000/vocabCard", {
        engWord: friends[index]["engWord"],
        thaiWord: friends[index]["thaiWord"],
        vocabBox_id: vocabBox_id,
      });
    }
  }

  return (
    <Background>
      <Container>
        <AreaTopic>
          <TopicAdd>Add Vocab Box</TopicAdd>
        </AreaTopic>
        <RowArea>
          <WhiteArea>
            <div>
              <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {
                  await new Promise((r) => setTimeout(r, 500));
                  alert(JSON.stringify(values, null, 2));
                  console.log(values);
                  postVocabBox(
                    values.content.boxEngName,
                    values.content.boxThaiName,
                    url,
                    values.content.category_id,
                    values.friends
                  );
                  console.log(values.friends);
                  // console.log(values.friends.length);
                  // for (let index = 0; index < values.friends.length; index++) {
                  //   postVocabCard(
                  //     values.friends[index].engWord,
                  //     values.friends[index].thaiWord
                  //   )

                  // }
                }}
              >
                {({ values }) => (
                  <FormStyled>
                    <RowStyled>
                      <Col span="6">
                        <TextForm>Title:</TextForm>
                      </Col>
                      <Col span="12">
                        <FieldStyled name="content.boxEngName" />
                      </Col>
                      <Col span="6"></Col>
                    </RowStyled>
                    <RowStyled>
                      <Col span="6">
                        <TextForm>Title Meaning</TextForm>
                      </Col>
                      <Col span="12">
                        <Field name="content.boxThaiName" />
                      </Col>
                      <Col span="6"></Col>
                    </RowStyled>
                    <RowStyled>
                      <Col span="6">
                        <TextForm>Category</TextForm>
                      </Col>
                      <Col span="12">
                        <Field as="select" name="content.category_id">
                          <option value="9">Action</option>
                          <option value="10">Sport</option>
                          <option value="11">Conjunction</option>
                          <option value="12">Preposition</option>
                          <option value="13">Food</option>
                          <option value="14">Feeling</option>
                          <option value="15">House</option>
                          <option value="16">Natural</option>
                          <option value="17">Animal</option>
                          <option value="18">Symptoms&illness</option>
                        </Field>
                      </Col>
                      <Col span="6"></Col>
                    </RowStyled>
                    <RowStyled>
                      <Col span="6">
                        <TextForm>Vocab Box Picture</TextForm>
                      </Col>
                      <Col span="12">
                        <input
                          type="file"
                          name="file"
                          onChange={(event) => {
                            // values.setFieldValue(
                            //   "photo1",
                            //   event.currentTarget.files[0]
                            // );
                            handleUpload(event.currentTarget.files[0])
                          }}
                        />
                      </Col>
                      <Col span="6"></Col>
                    </RowStyled>
                    <FieldArray name="friends">
                      {({ insert, remove, push }) => (
                        <div>
                          {values.friends.length > 0 &&
                            values.friends.map((friend, index) => (
                              <RowStyled key={index}>
                                <Col span="6">
                                  <TextFormLebel
                                    htmlFor={`friends.${index}.engWord`}
                                  >
                                    Vocabulary-{index + 1}
                                  </TextFormLebel>
                                </Col>
                                <Col Span="5">
                                  <FieldStyledMini
                                    name={`friends.${index}.engWord`}
                                    // placeholder="Jane Doe"
                                    type="text"
                                  />

                                  <ErrorMessage
                                    name={`friends.${index}.engWord`}
                                    component="div"
                                    className="field-error"
                                  />
                                </Col>
                                <Col span="6">
                                  <TextFormLebel
                                    htmlFor={`friends.${index}.thaiWord`}
                                  >
                                    Meaning-{index + 1}
                                  </TextFormLebel>
                                </Col>
                                <Col Span="5">
                                  <FieldStyledMini
                                    name={`friends.${index}.thaiWord`}
                                    // placeholder="jane@acme.com"
                                    type="text"
                                  />
                                  <ErrorMessage
                                    name={`friends.${index}.thaiWord`}
                                    component="div"
                                    className="field-error"
                                  />
                                </Col>
                                <ColSubmit span="2">
                                  <ButtonStyled
                                    type="primary"
                                    className="secondary"
                                    onClick={() => remove(index)}
                                    danger
                                  >
                                    X
                                  </ButtonStyled>
                                </ColSubmit>
                              </RowStyled>
                            ))}
                          <AreaMoreWord>
                            <ButtonStyled
                              type="primary"
                              className="secondary"
                              onClick={() =>
                                push({ engWord: "", thaiWord: "" })
                              }
                            >
                              More Words
                            </ButtonStyled>
                          </AreaMoreWord>
                        </div>
                      )}
                    </FieldArray>
                    <AreaSubmit>
                      <button type="submit">
                        Save
                      </button>
                      <Link to="/">
                        <button>
                          Go to Admin Board
                        </button>
                      </Link>
                    </AreaSubmit>
                  </FormStyled>
                )}
              </Formik>
            </div>
          </WhiteArea>
        </RowArea>
      </Container>
    </Background>
  );
};

export default AddVocabBox;

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
  justify-content: center;
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
