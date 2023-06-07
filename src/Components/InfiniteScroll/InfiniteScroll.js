import React, {useState, useEffect, useRef} from 'react'
import './InfiniteScroll.css'
import {v4 as uuidv4 } from 'uuid'

export default function InfiniteScroll() {

  const[dataImg, setdataImg] = useState([[], [], []])
  const[pageIndex, setpageIndex] = useState(1)
  const[searchState, setsearchState]= useState('random')

  const infinitefetchData = () => {
    fetch(`https://api.unsplash.com/search/collections?page=${pageIndex}&per_page=30&query=${searchState}
    &client_id=1Pib4UFXj_Zkns-OlxPQfDQ-7fVIrWbuKF8tW1HAAdA`)
    .then(response => {
      return response.json()
    })
    .then((data) => { 
      console.log(data);
      const imgReceived = [];
      data.results.forEach((resulat) => {
        resulat.preview_photos.forEach((img) => {
          imgReceived.push(img.urls.regular)

        })
      })
      const newFreshState = [
        [...dataImg[0]],
        [...dataImg[1]],
        [...dataImg[2]],
      ]
      let index = 0;
      for (let i = 0; i < 3; i++) {
        for(let j=0; j < 10; j++){
          newFreshState[i].push(imgReceived[index])
          index++;
        }
        
      }
      setdataImg(newFreshState)

    })
  }
  console.log(dataImg)

  useEffect(() => {
    infinitefetchData();
  }, [])
 
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
    <div className="card-list">
      <div>
        {dataImg[0].map(img => {
          return <img key={uuidv4()} src={img} alt='image unsplash'/>
        })}
      </div>
      <div>
      {dataImg[1].map(img => {
          return <img key={uuidv4()} src={img} alt='image unsplash'  />
        })}
      </div>
      <div>
      {dataImg[2].map(img => {
          return <img key={uuidv4()} src={img} alt='image unsplash'/>
        })}
      </div>
    </div>
    
    </div>
  )
}
