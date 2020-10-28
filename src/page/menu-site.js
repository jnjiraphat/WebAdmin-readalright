import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";

const menuSite = () => {
    return(
        <div>
            <Link to="/add-article">Add Article</Link>
            <Link to="/add-vocabbox">Add Vocab Box</Link>
            {/* <Link to="/login">Login</Link> */}
        </div>
    )
}

export default menuSite;