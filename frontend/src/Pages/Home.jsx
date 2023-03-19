import React from 'react'
import Main from '../components/Main'
import Row from '../components/Row'
import requests from '../requests'

const Home = () => {
  return (
    <>
      <Main />
      <Row RowID='1' title='Movies' fetchURL={requests.requestMovies}/>
       {/* <Row RowID='2' title='Shows' fetchURL={requests.requestShows}/> */}
    </>
  )
}

export default Home
