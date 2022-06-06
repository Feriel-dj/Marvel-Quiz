import React, {Component, Fragment} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { QuizMarvel } from '../QuizMarvel';
import QuizOver from '../QuizOver';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import { FaChevronRight } from 'react-icons/fa';



toast.configure();
const initialState = {
  quizLevel: 0,
  maxQuestion: 10,
  storedQuestion: [],
  question: null,
  options: [],
  idQuestion: 0,
  btnDisabled: true,
  userAnswer: null,
  score: 0,
  showWelcomeMsg: false,
  quizEnd: false,
  percent: null

}
const levelName = ['debutant', 'confirme', 'expert'];


class Quiz extends Component {

  constructor(props) {
    super(props)
  
    this.state = initialState ;
    this. storedDataRef = React.createRef();
  }
  

  loadQuestions = quizz => {
    const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];
      if (fetchedArrayQuiz.length >=10) {
        this.storedDataRef.current =fetchedArrayQuiz;
      const newArray =  fetchedArrayQuiz.map( ({answer, ...keepRest}) => keepRest);
      this.setState({ storedQuestion: newArray })
      }
  }
  componentDidMount() {
    this.loadQuestions(levelName[this.state.quizLevel]);
  }

  showToastMsg = pseudo => {
    if (! this.state.showWelcomeMsg) {
      this.setState({ showWelcomeMsg: true })

    toast.warn(`Bienvenue ${pseudo}, et bonne chance!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      bodyClassName: "toastify-color",
      
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {

    const {
      maxQuestion,
      storedQuestion,
      idQuestion,
      score,
      quizEnd,
    }= this.state;

    if ((storedQuestion !== prevState.storedQuestion) && storedQuestion.length)  {
      this.setState({
        question: storedQuestion[idQuestion].question,
        options: storedQuestion[idQuestion].options
      })
    }

    
    if ((idQuestion !== prevState.idQuestion) && storedQuestion.length) {
      this.setState({
        question: storedQuestion[idQuestion].question,
        options: storedQuestion[idQuestion].options,
        userAnswer: null,
        btnDisabled: true
      })
    }

    if (quizEnd !== prevState.quizEnd) {
      const gradepercent = this.getPercentage(maxQuestion, score);

      this.gameOver(gradepercent);
    }
    if (this.props.Userdata.pseudo !== prevProps.Userdata.pseudo) {
      this.showToastMsg(this.props.Userdata.pseudo)
      
    }
  }
  submitAnswer = selectedAnswer => {
    this.setState({
      userAnswer: selectedAnswer,
      btnDisabled: false
    })
  }

  nextQuestion = () => {//si on est arriver à la derniér question on invoque la méthode gameover
    if (this.state.idQuestion === this.state.maxQuestion - 1) {
     
      this.setState({ quizEnd: true })
    } else {
      this.setState(prevState => ({ idQuestion: prevState.idQuestion + 1  }))
    }


    const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;
    if (this.state.userAnswer === goodAnswer) {
      this.setState(prevState => ({score: prevState.score +1 }))
      
      toast.success('Bravo + 1!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        bodyClassName: "toastify-color",
        }); 
    } else {
      toast.error('Vous avez raté cette question!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        bodyClassName: "toastify-color",
        });
    }
  }

  getPercentage = (maxQuest, ourScore) => (ourScore / maxQuest) * 100; // pour calculer le percentage

   gameOver = percent => {
     const gradepercent = this.getPercentage(this.state.maxQuestion, this.state.score);

     if (percent >= 50) {
       this.setState({
        quizLevel: this.state.quizLevel + 1,
        percent
       })
     } else {
      this.setState({ percent})
     }
  }

  loadlevelQuestions = param => {
    this.setState({...initialState, quizLevel: param})
    this.loadQuestions(levelName[param]);
  }

 
  render(){
  
    const {
    quizLevel,
    maxQuestion,
    question,
    options,
    idQuestion,
    btnDisabled,
    userAnswer,
    score,
    quizEnd,
    percent,
    }= this.state;
    const dispalyOption = options.map((option, index) => {
      return (
      <p key={index} className={`answerOptions ${userAnswer === option ? ' selected' : null}`} 
      onClick={() => this.submitAnswer(option)}>
        <FaChevronRight /> {option}
        </p>
      )
    })

    return quizEnd ? 
    (
      <QuizOver
       ref={this.storedDataRef} 
       levelName={levelName}
       score={score}
       maxQuestion={maxQuestion}
       quizLevel={quizLevel}
       percent={percent}
       loadlevelQuestions={this.loadlevelQuestions}
       />
    ) : 
    (
      <Fragment>
        {/*<h2>Pseudo: {pseudo} </h2>*/}
        <Levels
        levelName={levelName}
        quizLevel={quizLevel}
        />
        <ProgressBar
        idQuestion={idQuestion} 
        maxQuestion={maxQuestion}/>
        <h2> {question}</h2>
       {dispalyOption}
        <button disabled={btnDisabled} className='btnSubmit'
        onClick={this.nextQuestion}
        >
          {idQuestion < maxQuestion  -1 ? "Suivant" : "Terminer"}
          </button>
      </Fragment>

    )
   
    }
 
}

export default Quiz
