import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const [answer, setAnswer] = useState("");
  const [answerStats,setAnswerStats] = useState(false);
  const [isSubmitted,setIsSubmitted] = useState(false);
  const [loader,setLoader] = useState(false);
  const [texter,setText] = useState("");
  const [question,setQuestion] = useState("Please click on submit to start");
  useEffect(async () => {
    setIsLoading(true);

    try {
      const response = await axios({
        url: `https://jservice.io/api/random`,
      });
      const { data } = response;
      setContent(data);
      setQuestion(content[0].question);
      setIsLoading(false);
    } catch (err) {
      console.log("Some Error occurred" + err);
      setIsLoading(false);
    }
  }, [loader]);

  const onAnswerHandler = (event) => {
    setAnswer(event.target.value);
  }

  const checkHandler = () =>{
    setTimeout(()=>{
      if(!loader ? setLoader(true):setLoader(false));
      if(isSubmitted)setIsSubmitted(false);
      setText("");
      var btn = document.getElementById('submitButton');
      let txtarea = document.querySelector('textarea');
      if(btn){
        btn.addEventListener('click',()=>{
          txtarea.value = '';
        });
      }
      
    },2000);
    if(answer.toLowerCase() === content[0].answer.toLowerCase())
    {
      setIsSubmitted(true);
      setAnswerStats(true);
      setText(`You Won!!!, the Answer is "${content[0].answer}"`);
    }
    else{
      setIsSubmitted(true);
      setAnswerStats(false);
      setText(`InCorrect, the Answer is "${content[0].answer}"`);
    }
    //setLoader(false);
    
  }
  return (
    <main>
      {isLoading ? (<h3>Loading...</h3>):(
      <>
      <h4>Hello! Welcome to Quiz Game</h4>
      <h6>Please Enter your response on below Text Area and click on submit</h6>
      <div></div>
      <p>{question}</p>
      <textarea placeholder="Enter your Answer" onChange = {onAnswerHandler}/>
      <div><button onClick = {checkHandler} id = "submitButton">Submit</button></div>
      {isSubmitted && answerStats ? (<h3>{texter}</h3>):(<h3></h3>)}
      {isSubmitted && !answerStats ? (<h3>{texter}</h3>):(<h3></h3>)}
      </>
      )}  
    </main>
    
  
  );
}

export default App;
