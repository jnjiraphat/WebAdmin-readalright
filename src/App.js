import React from 'react'
import './App.css';
import MenuSite from './page/menu-site'
import Login from './page/login'
import Index from './page/index'
import AddArticle from './page/add-article'
import { Route } from 'react-router-dom'
import AddVocabBox from './page/add-vocabbox'
import EditVocabBox from './page/edit-vocabbox'
import AddPostTest from './page/add-postTest';
import EditArticle from './page/edit-article'
import EditPostTest from './page/edit-postTest'

function App() {
  return (
    <div className="container">
        <Route exact path="/" component={Login}/>
        <Route exact path="/console" component={Index}/>
        <Route path="/menu-site" component={MenuSite} />
        <Route path="/add-article" component={AddArticle} />
        <Route path="/add-vocabBox" component={AddVocabBox} />
        <Route path="/edit-vocabBox" component={EditVocabBox} />
        <Route path="/add-postTest" component={AddPostTest} />
        <Route path="/edit-article" component={EditArticle} />
        <Route path="/edit-postTest" component={EditPostTest} />
    </div>
  );
}

export default App;