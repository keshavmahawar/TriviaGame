var wrapper
function displayScore(){
    var results = localStorage.getItem('results')
    var headingDiv = document.createElement('div')
    headingDiv.className = "heading"
    
    if( !results ){
        headingDiv.innerText = "No quiz attempted"
        wrapper.append( headingDiv )
        return
    }

    results = JSON.parse( results )
    var list = results.resultsList
    var lastQuiz = results.lastQuizQuestions
    
    headingDiv.innerText = "Last quiz score : " + list[ list.length - 1 ].percentage +"%"
    wrapper.append( headingDiv )
    
    lastQuiz.forEach( createQuestionDOM )
    
}

function createQuestionDOM(question, index){
    var questionDiv = document.createElement('div')
    var answerDiv = document.createElement('div')
    var answerSpan = document.createElement('span')
    var hr = document.createElement( 'hr' )
    
    questionDiv.className = "question"
    answerDiv.className = "answer"

    questionDiv.innerHTML = "Q" + (index+1) +". " + question.text
    answerSpan.innerHTML = question.options[ question.recordedAnswer ]

    answerDiv.append( "your answer : ", answerSpan )

    wrapper.append( questionDiv , answerDiv )

    if( question.recordedAnswer == question.correctAnswer ){
        answerSpan.className = "green"
    }else{
        var correctAnswerDiv = document.createElement('div')
        var correctAnswerSpan = document.createElement('span')
        correctAnswerSpan.innerHTML = question.options[ question.correctAnswer ]
        correctAnswerDiv.append( "correct answer : ", correctAnswerSpan )
        correctAnswerDiv.className = "answer"

        correctAnswerSpan.className = "green"
        answerSpan.className = "red"
        wrapper.append( correctAnswerDiv )
    }

    wrapper.append( hr )

}

window.addEventListener('load', function(){
    wrapper = document.querySelector('.wrapper')
    displayScore()
})