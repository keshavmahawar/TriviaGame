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
            window.location = 'result.html'
        }
    }
    return{ getNextQuestion, getCurrentQuestion, submitAnswer}
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
            target.style.background = "green"
        }
        else{
            target.style.background = "red"
        }
        setTimeout(setQuestion,1500)
    }
}
function setQuestion(){
        
    var question = quizController.getCurrentQuestion()

    wrapper.textContent = ""
    wrapper.append( createQuizDom(question) )

}
function createQuizDom( question ){
    var mainDiv = document.createElement('div')
    var questionDiv = document.createElement('div')
    questionDiv = question.questionText

    mainDiv.append( questionDiv )
    question.options.forEach(function( element, index ){
        var optionDiv = document.createElement('div')
        optionDiv.textContent = element
        optionDiv.id = index
        optionDiv.className = "option"
        mainDiv.append( optionDiv )
    })
    return mainDiv
}
console.log( quizController )
window.addEventListener('load',function(){
    wrapper = document.querySelector('.wrapper')
    wrapper.addEventListener( 'click', submitOption ) 
    init()
})
