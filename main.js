let score = 0;
let cross = true;

document.onkeydown = function(e) {
    handleKeyPress(e.keyCode);
};

document.getElementById("left").addEventListener("click", function() {
    handleKeyPress(37);
});

document.getElementById("top").addEventListener("click", function() {
    handleKeyPress(38);
});

document.getElementById("right").addEventListener("click", function() {
    handleKeyPress(39);
});

function handleKeyPress(keyCode) {
    if (keyCode === 38) {
        let dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 600);
    }
    if (keyCode === 39) {
        let dino = document.querySelector('.dino');
        let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dx + 120 + "px";
    }
    if (keyCode === 37) {
        let dino = document.querySelector('.dino');
        let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dx - 120 + "px";
    }
}

setInterval(() => {
    let gameOver = false;
    let dino = document.querySelector('.dino');
    let rock = document.querySelector(".rock");

    let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    let dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    let rx = parseInt(window.getComputedStyle(rock, null).getPropertyValue('left'));
    let ry = parseInt(window.getComputedStyle(rock, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - rx);
    offsetY = Math.abs(dy - ry);
    if (offsetX < 60 && offsetY < 60) {
        gameOver = true;
    } else if (offsetX < 150 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);

        setTimeout(() => {
            aniDuration = parseFloat(window.getComputedStyle(rock, null).getPropertyValue('animation-duration'));
            newDur = aniDuration - 0.1;
            if (newDur < 2.3) {
                newDur = 2.3;
            }
            // console.log(newDur);
            rock.style.animationDuration = newDur + 's';
        }, 500);
    }

    if (gameOver) {
        // console.log("Game Over");
        rock.classList.remove("animateRock");
        document.querySelector(".gameover").classList.remove("hidden");
    }
}, 100);

function updateScore(score) {
    document.querySelector(".score").innerText = `Score: ${score}`;
}