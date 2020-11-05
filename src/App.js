import React from 'react'
import './App.css';
import MenuSite from './page/menu-site'
import Login from './page/login'
import Index from './page/index'
import AddArticle from './page/add-article'
import { Route, Switch } from 'react-router-dom'
import AddVocabBox from './page/add-vocabbox'

function App() {
  return (
    <div className="container">
        <Route exact path="/" component={Index}/>
        <Route path="/login" component={Login}/>
        <Route path="/menu-site" component={MenuSite} />
        <Route path="/add-article" component={AddArticle} />
        <Route path="/add-vocabBox" component={AddVocabBox} />
    </div>
  );
}

export default App;