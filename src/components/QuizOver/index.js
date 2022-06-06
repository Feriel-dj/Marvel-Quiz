import React, {Fragment,useEffect, useState} from 'react'
import {GiTrophyCup} from 'react-icons/gi'
import Loader from '../Loader';
import Modal from '../Modal';
import axios from 'axios';


const QuizOver = React.forwardRef((props, ref) => {

    const {
    levelName,
    score,
    maxQuestion,
    quizLevel,
    percent,
    loadlevelQuestions,
} = props;

const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;
const hash = '296a095701693b0701a1715750bc74a7';

    const [asked, setAsked] = useState([]);
    const [openModal, setOpenModal] = useState(false); //pour le modal
    const [charactersInfos, setCharactersInfos] = useState([]); //pour afficher les infos dans le modal
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setAsked(ref.current)

        if (localStorage.getItem('marvelStorageDate')) {
            const date = localStorage.getItem('marvelStorageDate');
            checkDataAge(date);
        }
    }, [ref]);

    const checkDataAge = date => {
        const today = Date.now();
        const timesDifference = today - date;

        const dayDiffernce = timesDifference / (1000 * 3600 * 24);

        if (dayDiffernce >= 15) {
            localStorage.clear();
            localStorage.setItem('marvelStorageDate', Date.now());
        }


    }

    const showModal = id => {
        setOpenModal(true);

        if (localStorage.getItem(id)) {
            setCharactersInfos(JSON.parse(localStorage.getItem(id)));
            setLoading(false);

        }else{
            axios
        .get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`)
        .then(response => {
            setCharactersInfos(response.data);
            setLoading(false);

            localStorage.setItem(id, JSON.stringify(response.data));
            if (!localStorage.getItem('marvelStorageDate')) {
                localStorage.setItem('marvelStorageDate', Date.now());
            }   
        })
        .catch(err => console.log(err)
        )
        }

    }
    
    const hideModal = () => {
        setOpenModal(false);
        setLoading(true);
    }

    const capitalizeFirstletter = string =>{
        return string.charAt(0).toUpperCase()  + string.slice(1);
    }

    const averageGrade = maxQuestion / 2;

    if (score < averageGrade) {
        setTimeout(() => {
            loadlevelQuestions(quizLevel)
        },2000)
    }
    const decision = score>= averageGrade ? 
    (<Fragment>
        <div className="stepsBtnContainer">
        {
        quizLevel < levelName.length ?
        (
            <Fragment>
                <p className="successMsg">Bravo, passez au niveau suivant!</p>
                <button
                className="btnResult success" onClick={()=>loadlevelQuestions(quizLevel)}>Niveau suivant</button>
            </Fragment>
        ):
        ( <Fragment>
            <p className="successMsg">
            <GiTrophyCup size='50px' />Bravo, Vous etes un expert!</p>
            <button 
            className="btnResult gameOver" onClick={()=>loadlevelQuestions(0)}>Accueil</button>
        </Fragment>)
   }
   </div>
        <div className="percentage">
            <div className="progressPercent"> Réussite: {percent} %</div>
            <div className="progressPercent"> Note: {score}/{maxQuestion} </div>
        </div>
    </Fragment>)
    :
    (<Fragment>
         <div className="stepsBtnContainer">
            <p className="failureMsg">Vous avez echoué!</p>
        </div>
        <div className="percentage">
            <div className="progressPercent"> Réussite: {percent} %</div>
            <div className="progressPercent"> Note: {score}/{maxQuestion} </div>
        </div>
    </Fragment>)
     const questionAnswer = score >=averageGrade ? (
        asked.map(question => {
            return (
                <tr key={question.id}>
                    <td>{question.question}</td>
                    <td>{question.answer}</td>
                    <td>
                        <button className="btnInfo"
                        onClick={() => showModal(question.heroId)}
                        >
                            Infos
                            </button>
                    </td>
                </tr>
            )
        })
    ): (
        <tr>
            <td colSpan="3">
                <Loader 
                loadingMsg={"Pas de réponse!"}
                Styling={{textAlign: 'center', color: 'red'}} />
            </td>
        </tr>
    )
   

const resultInModal = !loading ? 
(
    <Fragment>
    <div className='modalHeader'>
        <h2>{charactersInfos.data.results[0].name}</h2>
    </div>
    <div className='modalBody'>
      <div className='comicImage'>
          <img src={charactersInfos.data.results[0].thumbnail.path+'.'+charactersInfos.data.results[0].thumbnail.extension} 
          alt={charactersInfos.data.results[0]}
          />

          {charactersInfos.attributionText}
      </div>
      <div className='comicDetails'>
          <h3>Description</h3>
          {
              charactersInfos.data.results[0].description ?
              <p>{charactersInfos.data.results[0].description}</p>
              :
              <p>Description indisponible ...</p>
          }
          <h3>Plus d'informations</h3>
          {
               charactersInfos.data.results[0].urls &&
               charactersInfos.data.results[0].urls.map((url, index) => {
                   return <a key={index}
                   href={url.url}
                   target="_blank"
                   rel="noopener noreferrer">
                       {capitalizeFirstletter(url.type)}
                   </a>
               })
          }
          
      </div>
    </div>
    <div className='modalFooter'>
         <button className='modalBtn' onClick={hideModal}>Fermer</button>
    </div>
</Fragment> 

): (
    <Fragment>
    <div className='modalHeader'>
        <h2>Réponse de Marvel ...</h2>
    </div>
<div className='modalBody'>
    <Loader />
</div>

</Fragment> 
)

    return (
        <Fragment>
            {decision}
        
        <hr />
        <p>Les réponses aux questions posées</p>
        <div className="answerContainer">
            <table className="answers">
                <thead>
                    <tr>
                        <th>Question</th>
                        <th>Réponses</th>
                        <th>Infos</th>
                    </tr>
                </thead>
                <tbody>
                
                        {questionAnswer}
                    
                </tbody>
            </table>
        </div>
        <Modal showModal={openModal} hideModal={hideModal} >
          
            { resultInModal }
        </Modal>
        </Fragment>
    )
})
export default React.memo(QuizOver)

