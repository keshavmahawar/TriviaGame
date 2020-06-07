window.addEventListener('load', function(){
    var wrapper = document.querySelector('.wrapper')
    var results = localStorage.getItem('results')
    if( results ){
        results = JSON.parse( results )
        var headingDiv = document.createElement('div')
        headingDiv.className = "best-score"
        headingDiv.innerText = "Best Score: " + results.bestScore + "%"
        wrapper.append( headingDiv )
        var playButton = document.querySelector('.play-button')
        playButton.innerText = "Beat That Score !!"
    }
})