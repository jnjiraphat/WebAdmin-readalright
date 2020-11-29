import React, { useState, useEffect, useRef } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { Row, Col, Button } from "antd";
import axios from "axios";
import styled from "styled-components";
import { Link, useRouteMatch } from 'react-router-dom';
import { Spin } from 'antd';
import firebaseMethod from '../firebase';




//content for edit
const vocabId = [];


const EditVocabBox = () => {
  var email = window.localStorage.getItem("email");
  console.log("get email");
  console.log(email);

  const [title, setTitle] = useState('')
  const [titleMeaning, setTitleMeaning] = useState('')
  const [categoryId, setCategoryId] = useState()
  const [image, setImage] = useState('')
  const [selectImg, setSelectImg] = useState()
  const [word, setWord] = useState([])

  const [loadImage, setLoadImage] = useState(false)
  const [vocabCardID, setVocabCardID] = useState('')
  const refContainer = useRef();

  const handleUpload = (imageTemp) => {
    setLoadImage(true)
    const uploadTask = firebaseMethod.storage.ref(`images/file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fdemo-5bd35bcc-f83b-4f82-8303-9d91b7712057/ImagePicker/${imageTemp.name}`).put(imageTemp);
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
            setSelectImg(url);
            setLoadImage(false)
            console.log("pic url")
            console.log(url)
          });
      }
    );
  };

  const match = useRouteMatch('/edit-vocabbox/:vocabBox_id');
  console.log("voccab box id in edit vocabbox")
  console.log(match.params.vocabBox_id)

  async function editVocabBox() {
    console.log("vocab box ID in editVocabBox")
    console.log(match.params.vocabBox_id)
    const result = await axios.get("https://readalright-backend.khanysorn.me/vocabBox/id/" + match.params.vocabBox_id);
    console.log("result")
    console.log(result.data.reading[0])
    console.log(result.data.reading.length)
    for (let index = 0; index < result.data.reading.length; index++) {
      vocabId.push(result.data.reading[index].vocabCard_id)
      console.log(vocabId[index])
    }
    setTitle(result.data.reading[0].boxEngName)
    setTitleMeaning(result.data.reading[0].boxThaiName)
    setCategoryId(result.data.reading[0].category_id)
    setImage(result.data.reading[0].image)
    setVocabCardID(result.data.reading[0].vocabCard_id)
  }

  async function deleteWord(index) {
    console.log(index)
    const result = await axios.delete("https://readalright-backend.khanysorn.me/admin/deleteVocabCard/" + vocabId[index]);
    alert("This word is deleted.")
    console.log(result.statusText)

  }


  async function putVocabBox(
    title,
    title_meaning,
    category_id,
    image
  ) {
    const response = await axios.put("https://readalright-backend.khanysorn.me/vocabBox/" + match.params.vocabBox_id, {
      boxEngName: title,
      boxThaiName: title_meaning,
      category_id: category_id,
      image: image,
    });
    console.log(response)
  }

  async function putVocabCard(
    vocabCard_id,
    friends,
    vocabBox_id

  ) {
    console.log("function put vocab card")
    console.log(vocabCard_id)
    console.log(friends)

    console.log(friends.length);
    for (let index = 0; index < friends.length; index++) {
      const response = await axios.put("https://readalright-backend.khanysorn.me/vocabCard/" + vocabId[index], {
        engWord: friends[index]["engWord"],
        thaiWord: friends[index]["thaiWord"],
        vocabBox_id: vocabBox_id,
      });
      console.log("round  = " + index)
      console.log(response.statusText)
    }

  }

  // async function editVocabBox() {
  //   console.log("vocab box ID in editVocabBox")
  //   console.log(match.params.vocabBox_id)
  //   const result = await axios.get("https://readalright-backend.khanysorn.me/vocabBox/id/" + match.params.vocabBox_id);
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
  async function getVocabbox() {
    console.log(match.params)
    const response = await axios.get(`https://readalright-backend.khanysorn.me/vocabCard/${match.params.vocabBox_id}`)
    console.log(response.data.reading)
    let data = [];
    response.data.reading.map(item => {
      data.push({ engWord: item.engWord, thaiWord: item.thaiWord })
    })
    console.log(data)
    setWord(data)
  }

  useEffect(() => {
    editVocabBox();
    // eslint-disable-next-line
    getVocabbox()
    // eslint-disable-next-line
  }, []);

 
  const changeCard = (value, type, index) => {
    console.log(value, type, index)
    let data = [...word];
    data[index][type] = value
    console.log(data)
    setWord(data)
  }

  return (
    <Background>
      {email === null ? (
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
          <TopicAdd>Edit Vocab Box</TopicAdd>
        </AreaTopic>
        <RowArea>
          <WhiteArea>
            {title === '' ?
              <center style={{ marginTop: '20vh' }}>
                <Spin />
              </center>
              :
              <div>
                <Formik
                  initialValues={{
                    content: { title: title, title_meaning: titleMeaning, category_id: categoryId, image: image, vocabCard_id: vocabCardID },
                    friends: [...word]
                  }}
                  onSubmit={async (values) => {
                    // let data = JSON.stringify(values, null, 3)
                    const data = {
                      title: title,
                      title_meaning: titleMeaning,
                      category_id: categoryId,
                      image: selectImg ? selectImg : image,
                      vocabCard_id: vocabCardID,
                      friends: [...word]
                    }
                    console.log(data)
                    console.log(data.title_meaning)
                    putVocabBox(
                      data.title,
                      data.title_meaning,
                      data.category_id,
                      data.image
                    );
                    putVocabCard(
                      data.vocabCard_id,
                      data.friends,
                      match.params.vocabBox_id

                    );
                    // await new Promise((r) => setTimeout(r, 500));
                    alert(JSON.stringify("Edit Successful"));
                    // postVocabBox(
                    //   values.content.title,
                    //   values.content.title_meaning,
                    //   values.content.category_id,
                    //   "image test",
                    //   values.friends
                    // );
                    console.log(values)
                    console.log(values.friends);

                    console.log(values.friends.length);
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
                          <TextForm>Vocab Box English Name</TextForm>
                        </Col>
                        <Col span="12">
                          <FieldStyled name="content.title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Col>
                        <Col span="6"></Col>
                      </RowStyled>
                      <RowStyled>
                        <Col span="6">
                          <TextForm>Vocab Box Thai Name</TextForm>
                        </Col>
                        <Col span="12">
                          <Field name="content.title_meaning" value={titleMeaning} onChange={(e) => setTitleMeaning(e.target.value)} />
                        </Col>
                        <Col span="6"></Col>
                      </RowStyled>
                      <RowStyled>
                        <Col span="6">
                          <TextForm>Category</TextForm>
                        </Col>
                        <Col span="12">
                          <Field as="select" name="content.category_id" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                            <option value="9">Action</option>
                            <option value="10">Sport</option>
                            <option value="11">Conjunction</option>
                            <option value="12">Preposition</option>
                            <option value="13">Foodasd</option>
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
                          {loadImage ? <Spin /> : <img src={selectImg ? selectImg : image} alt="header" width={300} height={300} />}
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
                      <FieldArray name="friends">
                        {({ insert, remove, push }) => (
                          <div>
                            {word.length > 0 &&
                              word.map((friend, index) => (

                                <RowStyled key={index}>
                                  <Col span="6">

                                    <TextFormLebel htmlFor={`friends.${index}.engWord`}>
                                    No.{index + 1} | Vocabulary
                                    </TextFormLebel>
                                  </Col>
                                  <Col Span="5">
                                    <FieldStyledMini
                                      name={`friends.${index}.engWord`}
                                      // placeholder="Jane Doe"
                                      onChange={(e) => changeCard(e.target.value, "engWord", index)}

                                      value={friend.engWord}
                                      type="text"
                                    />

                                    <ErrorMessage
                                      name={`friends.${index}.engWord`}
                                      component="div"
                                      className="field-error"
                                    />
                                  </Col>
                                  <Col span="6">

                                    <TextFormLebel htmlFor={`friends.${index}.thaiWord`}>
                                    Meaning
                                    </TextFormLebel>
                                  </Col>
                                  <Col Span="5">
                                    <FieldStyledMini
                                      name={`friends.${index}.thaiWord`}
                                      // placeholder="Jane Doe"
                                      onChange={(e) => changeCard(e.target.value, "thaiWord", index)}
                                      value={friend.thaiWord}
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
                                      onClick={() => deleteWord(index)}
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
                                onClick={() => push({ engWord: "", thaiWord: "" })}
                              >
                                More Words
                            </ButtonStyled>
                            </AreaMoreWord>
                          </div>
                        )}
                      </FieldArray>
                      <AreaMoreWord>
                        <button type="submit">Save</button>
                      </AreaMoreWord>
                      <AreaMoreWord>
                      <Link to="/console">
                        <button>Back</button>
                      </Link>
                      </AreaMoreWord>

                    </FormStyled>
                  )}
                </Formik>
              </div>}
          </WhiteArea>
        </RowArea>
      </Container>
       )} 
    </Background>
  );
}


export default EditVocabBox;

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

const ColSubmit = styled(Col)`
  display: flex;
  justify-content: center;
    align-items:center;
`;

const ButtonStyled = styled(Button)`
  height: 27.6px;
`
const AreaMoreWord = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2%;
  margin-bottom: 2%;
`

const FormStyled = styled(Form)`
  margin-top: 22px;
`