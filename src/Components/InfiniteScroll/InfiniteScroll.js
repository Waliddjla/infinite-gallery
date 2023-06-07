import React, {useState, useEffect, useRef} from 'react'
import './InfiniteScroll.css'
import {v4 as uuid4 } from 'uuid'

export default function InfiniteScroll() {

  const handelSearch = e => {
    e.preventDefault()
  }
  const inpref = useRef();

  return (
    <div className = "container">
    <form onSubmit={handelSearch}>

    <label htmlFor="search">Votre Recherche</label>
    <input type="text" id='search' ref={inpref} />
    </form>
    
    </div>
  )
}
