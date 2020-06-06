var quizController = function(){
    var quiz = this
    function nextQuestion(){
        return quiz.questions[ ++quiz.currentQuestion]
    }
    return{nextQuestion}
}
function init(){
    var storage = localStorage.getItem('quiz')
    document.innerText = "No QUIZ Redirecting....."
    console.log( storage )
    if( !storage ){
        window.location = 'selectQuiz.html'
        return
    }   
    
    quizController = quizController.bind( JSON.parse(storage) )
    
}
init()
window.addEventListener('load',function(){
})
