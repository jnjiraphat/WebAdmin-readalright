import React from 'react'
import './App.css';
import MenuSite from './page/menu-site'
import Login from './page/login'
import AddArticle from './page/add-article'
import AddVocabBox from './page/add-vocabbox'
import { Route } from 'react-router-dom'

function App() {
  return (
    <div className="App container">
      <MenuSite/>
        <Route path="/login" component={Login} />
        <Route path="/menu-site" component={MenuSite} />
        <Route path="/add-article" component={AddArticle} />
        <Route path="/add-vocabbox" component={AddVocabBox} />
    </div>
  );
}

export default App;