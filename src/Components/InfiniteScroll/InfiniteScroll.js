import React, {useState, useEffect, useRef} from 'react'
import './InfiniteScroll.css'
import {v4 as uuidv4 } from 'uuid'

export default function InfiniteScroll() {

  const[dataImg, setdataImg] = useState([[], [], []])
  const[pageIndex, setpageIndex] = useState(1)
  const[searchState, setsearchState]= useState('random')
  const[firstCall, setfirstCall] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null);

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
        for(let j = 0; j < 10; j++){
          newFreshState[i].push(imgReceived[index])
          index++;
        }
        
      }
      setdataImg(newFreshState)
      setfirstCall(false)

    })
  }
  console.log(dataImg)



  const searchFetchData = () => {
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
        [],
        [],
        [],
      ]
      let index = 0;
      for (let i = 0; i < 3; i++) {
        for(let j = 0; j < 10; j++){
          newFreshState[i].push(imgReceived[index])
          index++;
        }
        
      }
      setdataImg(newFreshState)

    })
  }
  useEffect(() => {
    if(firstCall) return;
    searchFetchData()

  }, [searchState])



  useEffect(() => {
    infinitefetchData();
  }, [pageIndex])
 
  const handelSearch = e => {
    e.preventDefault()
    setsearchState(inpref.current.value)
    setpageIndex(1)
  }
  const inpref = useRef();

  useEffect(() => {

    window.addEventListener('scroll', infiniteCheck);
    return () => {
      window.removeEventListener('scroll', infiniteCheck)
    }

  }, [])
  
  const infiniteCheck = () => {
    console.log('hello check');
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    if (scrollHeight - scrollTop === clientHeight) {
      console.log('bottom');
      setpageIndex(pageIndex => pageIndex + 1)
    }
  }
  const handleResetPage = () => {
  setpageIndex(1);
  setsearchState('random');
};
const handleImageClick = (img) => {
    setSelectedImage(img);
  };
  const handleCloseModal = () => {
    setSelectedImage(null);
  };


  return (
    <div className = "container">
     {pageIndex > 1 || searchState !== 'random' ? ( // Check if pageIndex is greater than 1
      <div className="return">
        <button onClick={handleResetPage}>Return</button>
      </div>
     ): null}
    <form onSubmit={handelSearch}>

    <label htmlFor="search">Votre Recherche</label>
    <input type="text" id='search' ref={inpref} />
    </form>
    
    <div className="card-list">
      <div>
        {dataImg[0].map(img => {
          return <img key={uuidv4()} src={img} alt='image unsplash' onClick={() => handleImageClick(img)}/>
        })}
      </div>
      <div>
      {dataImg[1].map(img => {
          return <img key={uuidv4()} src={img} alt='image unsplash' onClick={() => handleImageClick(img)}  />
        })}
      </div>
      <div>
      {dataImg[2].map(img => {
          return <img key={uuidv4()} src={img} alt='image unsplash' onClick={() => handleImageClick(img)}/>
        })}
      </div>
    </div>
    {selectedImage && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <img src={selectedImage} alt="Selected Image" className="modal-image" />
          </div>
        </div>
      )}

    
    </div>
  );
}
