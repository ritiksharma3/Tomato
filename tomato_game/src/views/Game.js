import React, { useEffect, useState } from 'react'
import { Button, Col, Container, FormControl, Form, FormLabel, Image, Navbar, Row } from 'react-bootstrap';
import Header from './Header';
import life from '../assets/images/life.png'
import axios from 'axios';
import axiosClient from '../axios';
import { useStateContext } from './ContextProvider';
import Swal from 'sweetalert2';
import * as confetti from 'confettis';
import { useTimer } from 'react-timer-hook';
import { Switch } from '@headlessui/react';
// http://marcconrad.com/uob/tomato/api.php
const Game = () => {
  const [urlData, setUrlData] = useState({
    question: '',
    solution: ''
  })
  const [score, setScore] = useState(getScoreFromLocalStorage() || 0);
  const [timerstate, setTimerState] = useState(getTimerState() || 'false');
  const [answer, setAnswer] = useState('');
  const [chances, setChances] = useState(3);
  const [highestScore, setHighestScore] = useState();

  const { setIsLoading } = useStateContext();
  const { showToast } = useStateContext();
  const { userToken, currentUser } = useStateContext();

  function randomNumber(min, max) {
    return Math.random() * (max - min) + min
  }
  //for hearts
  const minHeartCount = 50
  const maxHeartCount = 100

  const minHeartSize = 0.2
  const maxHeartSize = 0.5

  const minHeartDisappear = 50
  const maxHeartDisappear = 70

  //for stars
  const minStarCount = 50
  const maxStarCount = 100

  const minStarSize = 1.7
  const maxStarSize = 2.3

  const minDisappear = 50
  const maxDisappear = 70

  const starColors = ['#FFFC9A', '#FFD655', '#FFC155', '#FF9D55']

  const submitAnswer = () => {
    console.log(answer);
    console.log(urlData.solution.toString());

    if (urlData.solution.toString() === answer) {
      const newScore = score + 1;
      confetti.create({
        x: 0.5,
        y: 0.5,
        count: randomNumber(minStarCount, maxStarCount),
        gravity: -0.001,
        ticks: randomNumber(minDisappear, maxDisappear),
        scale: [
          randomNumber(minStarSize, maxStarSize),
          randomNumber(minStarSize, maxStarSize),
          randomNumber(minStarSize, maxStarSize)
        ],
        speed: 20,
        decay: 0.94,
        spread: 360,
        shapes: ['star'],
        colors: starColors
      })
      setScore(newScore);
      saveScoreToLocalStorage(newScore);
      getUrlData();
      console.log(answer);
      showToast("Hurrrey!! Got the correct answer.", "success");
    }
    else {
      confetti.create({
        x: 0.5,
        y: 0.5,
        count: randomNumber(minHeartCount, maxHeartCount),
        gravity: -0.001,
        ticks: randomNumber(minHeartDisappear, maxHeartDisappear),
        scale: [
          randomNumber(minHeartSize, maxHeartSize),
          randomNumber(minHeartSize, maxHeartSize),
          randomNumber(minHeartSize, maxHeartSize)
        ],
        speed: 20,
        decay: 0.94,
        spread: 360,
        shapes: ['emoji'],
        emojis: ['💔']
      })
      if (chances === 1) {
        Swal.fire({
          title: "GAME OVER !!",
          text: "You have used all of your three lives.",
          icon: "warning",
          backdrop: 'rgba(60,60,60,0.8)',
          confirmButtonText: "Restart the game."
        }).then((result) => {
          if (result.value) {

          }
        }).catch((error) => {
          console.log(error);
        })
        let userID = currentUser.id;
        let item = { userID, score };
        axiosClient.post("/history", item)
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.log(error);
          })
        resetChances();
      } else {
        decrementChances();
        getUrlData();
        showToast("Wrong answer", "error");
      }

    }
  }

  const getHighestScore = () => {
    axiosClient.get(`/history/score/${currentUser.id}`)
      .then((response) => {
        setHighestScore(response.data.data.highest_score);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const getUrlData = () => {
    if (chances === 0) {
      Swal.fire({
        title: "GAME OVER !!",
        text: "You have used all of your three lives.",
        icon: "warning",
        backdrop: 'rgba(60,60,60,0.8)',
        confirmButtonText: "Restart the game."
      }).then((result) => {
        if (result.value) {
          resetChances();
        }
      }).catch((error) => {
        console.log(error);
      })
    } else {
      axios
        .get("https://marcconrad.com/uob/tomato/api.php")
        .then((data) => {
          console.log(data.data);
          setUrlData(data.data);
        })
        .catch((error) => {
          console.log(error)
        });
    }

  };

  useEffect(() => {
    const storedChances = localStorage.getItem('chances');
    getHighestScore();

    const storedTimer = getTimerState();
    if (storedTimer !== null) {
      setTimerState(storedTimer === 'true');
    }

    if (storedChances) {
      setChances(parseInt(storedChances, 10));
    }

    // Initialize the score from localStorage
    const storedScore = getScoreFromLocalStorage();
    if (storedScore !== null) {
      setScore(storedScore);
    }

    if (chances === 0) {
      Swal.fire({
        title: "GAME OVER !!",
        text: "You have used all of your three lives.",
        icon: "warning",
        backdrop: 'rgba(60,60,60,0.8)',
        confirmButtonText: "Restart the game."
      }).then((result) => {
        if (result.value) {
          resetChances();
        }
      }).catch((error) => {
        console.log(error);
      })
    }
    getUrlData();
  }, []);

  const decrementChances = () => {
    if (chances > 0) {
      const newChances = chances - 1;
      setChances(newChances);
      localStorage.setItem('chances', newChances.toString());
    }
  }

  const resetChances = () => {
    setChances(3);
    localStorage.setItem('chances', '3');
    setScore(0);
    localStorage.setItem('score', 0);
    getHighestScore();
  }

  // Set your initial time (in seconds) for the countdown
  const initialTime = 10; // 10 seconds

  // Define the function to be triggered when the countdown reaches zero
  const handleTimeout = () => {
    submitAnswer();
  };

  // Use the useTimer hook to manage the countdown timer
  const {
    seconds,
    minutes,
    restart,
    pause,
    resume,
  } = useTimer({
    expiryTimestamp: new Date().setSeconds(new Date().getSeconds() + 30),
    onExpire: handleTimeout,
  });

  const handleTimerState = () => {
    if (timerstate === true) {
      localStorage.setItem('timer', 'false');
      pause();
      console.log("pause");
    }
    else {
      localStorage.setItem('timer', 'true');
      const time = new Date();
      time.setSeconds(time.getSeconds() + 30);
      restart(time)
      console.log("restart")
    }
    setTimerState(!timerstate);
  }

  function getTimerState() {
    const storedTimer = localStorage.getItem('timer');
    return storedTimer;
  }

  const handleLoading = () => {
    setIsLoading(true);
  }

  // Function to retrieve score from localStorage
  function getScoreFromLocalStorage() {
    const storedScore = localStorage.getItem('score');
    return storedScore ? parseInt(storedScore, 10) : null;
  }

  // Function to save score to localStorage
  function saveScoreToLocalStorage(newScore) {
    localStorage.setItem('score', newScore.toString());
  }

  const chancesArray = new Array(chances).fill(null);
  return (
    <>
      <section className='d-flex justify-content-around m-3'>
        <h4>High Score: {highestScore}</h4>
        <h3>Score: {score}</h3>
        <h4 className='d-flex gap-1'>
          You have:
          {Array.from({ length: chances }).map((_, index) => (
            <Image key={index} src={life} width={30} height={30} />
          ))}
        </h4>
      </section>
      <div className='d-flex justify-content-center gap-2'>
        <h4>Set on the timer to train the brain{' '}</h4>
        <Form.Check
          type="switch"
          id="custom-switch"
          label=""
          checked={timerstate}
          onChange={handleTimerState}
          className={`custom-switch`}
          style={{ fontSize: "1.30rem" }}
        />
      </div>
      {timerstate ?
        <div className='text-center'>
          <h4>
            You have:{' '}
            <span>
              <h2 className='d-inline text-danger'>{minutes}:{seconds}</h2>
            </span>{' '}
            SECONDS!!
          </h4>
        </div>
        :
        <></>
      }
      <h5 className='text-center m-2'>What's the number under the TOMATO!!</h5>
      <Container className='text-center'>
        Current User: {currentUser.name}
        Solution:{urlData.solution}
        Token:{userToken}
        Life:{chances}
        <Image
          width={750}
          height={600}
          className='text-center'
          src={urlData.question}
        // src='https://www.sanfoh.com/uob/tomato/data/t458af6d9ff222d7d0b92e916e7n933.png'
        />
      </Container>
      <Row className='justify-content-center m-5'>
        <Col md="2">
          <input
            className='form-control'
            type='number'
            name='answer'
            placeholder='Enter the number'
            onChange={(e) => setAnswer(e.target.value)}
          />
        </Col>
        <Col md="2" className='d-flex gap-3'>
          <Button onClick={submitAnswer} variant='btn btn-danger'>Submit</Button>
          <Button onClick={resetChances} variant='btn btn-danger'>Restart</Button>
        </Col>
      </Row>
    </>
  )
}

export default Game;
