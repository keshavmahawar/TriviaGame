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
        incrementState()
        return question.correctAnswer
    }

    function currentQuestion(){
        return quiz.questionsList[ quiz.currentQuestionNo ]
    }

    function parseQuestionForUser( ques ){
        return {
                question: ques.text,
                option: ques.options
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
    return{ getNextQuestion, getCurrentQuestion, submitAnswer, checkState}
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
    
}
init()
console.log( quizController.getNextQuestion() )
window.addEventListener('load',function(){
})
