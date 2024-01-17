const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        time: document.querySelector("#time"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
    },
    values: {
        gameVelocity: 1000,// Tempo em ms.
        hitPosition: 0,
        result: 0,
        lives: 3,
        endGame: false,
        currentTime: 60,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimeId: setInterval(countDown, 1000),
    },
}

function countDown() {
    state.values.currentTime--;
    state.view.time.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        endGame();
    }
}

function endGame() {
    state.values.endGame = true;
    clearInterval(state.actions.countDownTimeId);
    clearInterval(state.actions.timerId);

    alert(`
Parabéns!
O seu resultado foi:
${state.values.result}
`);
}
function gameOver() {
    state.values.endGame = true;
    clearInterval(state.actions.countDownTimeId);
    clearInterval(state.actions.timerId);

    alert(`
Game Over!
O seu resultado foi:
${state.values.result}
`);
}

function playSound(audioName) {
    let audio = new Audio(`./src/sounds/${audioName}`);
    audio.volume = 0.2;
    audio.play();
}

/**
 * Limpa e redefine uma nova posição para o enemy.
 */
function randomSquare() {
    // Limpa a classe enemy do painel
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    })

    let randomSquare;
    do {
        let randomNumber = Math.floor(Math.random() * 15);
        randomSquare = state.view.squares[randomNumber];
    } while (state.values.hitPosition === randomSquare.id);
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}


/**
 * Listener para detectar as batidas do painel.
 */
function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener('mousedown', () => {
            if (!state.values.endGame) {
                if (square.id === state.values.hitPosition) {
                    playSound('hit.m4a');
                    state.values.result++;
                    state.view.score.textContent = state.values.result;
                } else {

                    playSound('lose.wav');
                    state.values.lives--;
                    state.view.lives.textContent = state.values.lives;
                    if (state.values.lives === 0) {
                        setTimeout(gameOver, 500);
                    }
                }

            }



        })
    })
}

/**
 * Inicializa as variáveis do jogo.
 */
function init() {
    addListenerHitBox();
}

init();