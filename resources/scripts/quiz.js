var wrapper
var quizController = function( qu ){
    var quiz = qu
    checkState()
    function getNextQuestion(){
        incrementState()
        return parseQuestionForUser( currentQuestion() )
    }

    function getCurrentQuestion(){
        return parseQuestionForUser( currentQuestion() )
    }

    function submitAnswer( optionNo ){
        var question = currentQuestion()
        question.recordedAnswer = optionNo
        console.log( question )
        incrementState()
        return question.correctAnswer
    }

    function currentQuestion(){
        return quiz.questionsList[ quiz.currentQuestionNo ]
    }

    function parseQuestionForUser( ques ){
        return {
                questionNo: quiz.currentQuestionNo + 1,
                questionText: ques.text,
                options: ques.options
                }
    }

    function incrementState(){
        quiz.currentQuestionNo++
        checkState()
    }

    function checkState(){
        console.log('stateChecked')
        if ( quiz.currentQuestionNo == quiz.totalQuestions ){
            finishQuiz()
            window.location = 'results.html'
        }
    }

    function finishQuiz(){
        var result = {}
        var correctAnswersCount = 0
        quiz.questionsList.forEach( function( question ){
            if( question.correctAnswer == question.recordedAnswer ){
                correctAnswersCount++
            }
        })

        result.correctAnswersCount = correctAnswersCount
        result.totalQuestions = quiz.totalQuestions
        result.submittedOn = Date.now()
        result.percentage = Math.floor( correctAnswersCount / result.totalQuestions * 100 )

        var localResults = localStorage.getItem( 'results' )
        
        if( localResults ){
            localResults = JSON.parse( localResults )
            localResults.resultsList.push( result )
            localResults.bestScore = Math.max( result.percentage , localResults.bestScore )
        }else{
            localResults = {}
            localResults.resultsList = [ result ]
            localResults.bestScore = result.percentage
        }
        localResults.lastQuizQuestions = quiz.questionsList

        console.log( localResults )

        localStorage.setItem('results', JSON.stringify(localResults) )
        localStorage.removeItem('quiz')
    }

    return{ getNextQuestion, getCurrentQuestion, submitAnswer }
}


function init(){
    var storage = localStorage.getItem('quiz')
    document.innerText = "No QUIZ, Redirecting....."
    
    if( !storage ){
        window.location = 'selectQuiz.html'
        return
    }   
    
    console.log( JSON.parse(storage) )
    quizController = quizController( JSON.parse(storage) )
    setQuestion()
    
}

function submitOption(){
    var target = event.target
    if( target.className == "option"){
        var selectedOption = Number( target.id )
        var correctOption = quizController.submitAnswer( selectedOption )
        console.log(selectedOption, correctOption)

        if ( correctOption == selectedOption ){
            target.style.background = "#00ff00aa"
        }
        else{
            var correctOptionDiv = document.getElementById( correctOption )
            correctOptionDiv.style.background = "#00ff00aa"
            target.style.background = "#ff000088"
        }
    
        setTimeout(setQuestion,500)
        wrapper.removeEventListener( 'click', submitOption ) 
    }
    event.stopPropagation()    
}


function setQuestion(){
        
    var question = quizController.getCurrentQuestion()

    wrapper.textContent = ""
    wrapper.append( createQuizDom(question) )
    wrapper.addEventListener( 'click', submitOption ) 
}


function createQuizDom( question ){
    var mainDiv = document.createElement('div')
    var questionDiv = document.createElement('div')
    
    questionDiv.innerHTML = "Q" + question.questionNo +". " + question.questionText
    questionDiv.className = "question"
    
    mainDiv.append( questionDiv )
    question.options.forEach(function( element, index ){
        var optionDiv = document.createElement('div')
        optionDiv.innerHTML = element
        optionDiv.id = index
        optionDiv.className = "option"
        mainDiv.append( optionDiv )
    })
    return mainDiv
}

console.log( quizController )
window.addEventListener('load',function(){
    wrapper = document.querySelector('.wrapper')
    init()
})
