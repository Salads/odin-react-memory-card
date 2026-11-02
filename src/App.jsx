import { useState, useEffect } from 'react'
import './App.css'

import Card from "./components/Card.jsx";

function createCardData(imgSrc, title) {
  return {
    key: crypto.randomUUID(),
    imgSrc: imgSrc,
    title: title,
    hit: false
  };
}

function generateCard(cardData, handleClick) {
  return <Card key={cardData.key} data-key={cardData.key} data={cardData} handleClick={() => handleClick(cardData)}></Card>
}

// NOTE(Salads): Left these out here to avoid a re-render when not needed.
const MAX_CARDS = 8;
let cardsLeft = MAX_CARDS;

function App() {
  
  const [cards, setCards] = useState([]);
  const [curScore, setCurScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  function randomizeCards() {
    const sortedArray = cards.sort((a, b) => Math.random() - 0.5);
    setCards([...sortedArray]);
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://api.deadlock-api.com/v1/assets/heroes");
      const json = await response.json();

      let cardsData = [];
      for(let i = 0; i < MAX_CARDS && i < json.length; i++) {
        let heroData = json[i];
        let images = heroData.images;
        cardsData.push(createCardData(images.icon_hero_card, heroData.name));
      }

      setCards([...cardsData]);
    };

    fetchData().catch(console.error);

  }, []);

  function onCardClick(cardData) {
    if(cardData.hit) { // Game Over, Restart, Update Best Score
      setBestScore(Math.max(curScore, bestScore));
      setCurScore(0);
      randomizeCards();
      cardsLeft = MAX_CARDS;
    }
    else {
      cardData.hit = true;
      cardsLeft--;
      if(cardsLeft === 0) { // Victory
        setBestScore(Math.max(curScore, bestScore));
        setCurScore(0);
      }
      else {
        setCurScore(curScore + 1);
        randomizeCards();
      }
    }
  }

  return (
    <div className='app'>
      <h1>Deadlock Memory Cards</h1>
      <div className='score-container'>
        <p className='score'>Current Score: {curScore}</p>
        <p className='score'>Best Score: {bestScore}</p>
      </div>
      <div className='card-container'>
        {cards.map((elem) => generateCard(elem, onCardClick))}
      </div>
    </div>
  )
}

export default App
