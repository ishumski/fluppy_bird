const p = document.querySelector("p");
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

const background = new Image();
const bird = new Image();
const pipeUp = new Image();
const pipeBottom = new Image();

const fly = new Audio();
const score = new Audio();

fly.src = "audio/fly.mp3";
score.src = "audio/score.mp3";

background.src = "image/flappy_bird_bg.png";
bird.src = "image/flappy_bird_bird.png";
pipeUp.src = "image/flappy_bird_pipeUp.png"
pipeBottom.src = "image/flappy_bird_pipeBottom.png"

const gravity = 1.5;
const gap = 85;

let birdX = 0;
let birdY = canvas.height / 2;

let result = 0;

document.addEventListener("keydown", () => {

    birdY = birdY <= 0 ? 50 : birdY - 50;
    fly.play();
})

const pipes = [
    {
        x: canvas.width,
        y: 0,
    }
]

setInterval(() => {
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    context.drawImage(bird, 0, birdY);

    pipes.forEach((pipe) => {
        context.drawImage(pipeUp, pipe.x, pipe.y);
        context.drawImage(pipeBottom, pipe.x, pipe.y + gap + pipeBottom.height);

        pipe.x--;

        if (pipe.x === 125) {
            pipes.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
            })
        }

        if (birdX + bird.width >= pipe.x &&
            birdX <= pipe.x + pipeUp.width &&
            (birdY <= pipe.y + pipeUp.height ||
                birdY + bird.height >= gap + pipeBottom.height)) {
            location.reload();
        }

        if (pipe.x == 15) {
            result++;
            score.play();
        }
    })

    p.innerHTML = `Your result: ${result}`

    birdY = birdY >= canvas.height - 26 ? canvas.height / 2 : birdY + gravity;
}, 12);



