// ==UserScript==
// @name         Memrise Flip Cards
// @namespace    https://github.com/tamueller
// @version      0.1
// @description  Add Flip Cards to All Courses
// @author       Thomas Mueller
// @match        https://www.memrise.com/course/*/garden/*
// @match        https://www.memrise.com/garden/review/*
// @grant        none
// @updateURL    https://github.com/tamueller/memrise-flip-cards/raw/master/memrise-flip-cards.js
// @downloadURL    https://github.com/tamueller/memrise-flip-cards/raw/master/memrise-flip-cards.js
// ==/UserScript==

$(document).ready(function() {

        var g = MEMRISE.garden,
        b = g.boxes;
        b.load = (function() {
        var cached_function = b.load;
        return function() {
            doStuff();
            var result = cached_function.apply(this, arguments);
            return result;
        };
    }());


function doStuff(){
        var flipButton = document.createElement ('flipButton');
        var rightButton = document.createElement ('rightButton');
        var wrongButton = document.createElement ('wrongButton');
        var solution = document.createElement ('solution');

    solution.innerHTML=`
        <div id=\"solution\">
       ???
       </div>
        `;

    document.body.appendChild (solution);

    flipButton.innerHTML=`
        <div class=\"flip\" id="flipButton">
        <a class=\"btn btn-transparent\" title=\"Blaaa\" accesskey=\"k\">
        Flip around 2
           </a>
       </div>
        `;

   rightButton.innerHTML=`
        <div class=\"flip\" id="rightButton">
        <a class=\"btn btn-transparent\" title=\"Blaaa\" accesskey=\"k\">
        Right
           </a>
       </div>
        `;
        wrongButton.innerHTML=`
        <div class=\"flip\" id="wrongButton">
        <a class=\"btn btn-transparent\" title=\"Blaaa\" accesskey=\"k\">
        Wrong
           </a>
       </div>
        `;


    document.body.appendChild (flipButton);
    document.body.appendChild (wrongButton);
    document.body.appendChild (rightButton);

    document.getElementById("flipButton").addEventListener ("click", flip, false);
    document.getElementById("wrongButton").addEventListener ("click", wrong, false);
    document.getElementById("rightButton").addEventListener ("click", right, false);
}

    function flip(){
       // document.getElementById("solution").innerHTML = MEMRISE.garden.box.testData.correct[0];
        MEMRISE.garden.box.$input.input.val(MEMRISE.garden.box.testData.correct[0]);
    }

    function wrong(){
        MEMRISE.garden.box.$input.input.val("wrong answer");
        send();
    }

    function right(){
        MEMRISE.garden.box.$input.input.val(MEMRISE.garden.box.testData.correct[0]);    //if right is clicked before flipped, we still want to get a correct answer
        send();
    }

    function send(){
        MEMRISE.garden.box.check();
    }

});
