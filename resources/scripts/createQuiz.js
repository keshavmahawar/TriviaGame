var form
var infoDiv
function fetchQuiz(){
    if( isNaN(this.noQues) || this.noQues > 50 ){
        setInfo('Enter no of questions correctly')
    }
}

function setInfo( info ){
    infoDiv.append( info )
}

function formHandler( callback ){
    event.preventDefault()
    
    var inputs = event.target.querySelectorAll( 'input , select ' )
    inputs = Array.from( inputs ).filter( function(ele){
            return ele.type != 'submit'
        })
    var data = {}    
    
    inputs.forEach( function( input ){
        if( input.name ){        
            data[input.name] = input.value
        }
    })
    console.log(data)
    callback.call( data )
}

window.addEventListener('load',function(){
    form = document.getElementById('quizForm')
    infoDiv = document.getElementById('info')
    form.addEventListener('submit', function(){
        formHandler( fetchQuiz )
    })
})