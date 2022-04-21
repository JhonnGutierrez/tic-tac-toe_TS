const onePlayerScore = document.querySelector('#firstPlayerScore')
const twoPlayerScore = document.querySelector('#secondPlayerScore')
const ticTacToeBoxes = document.querySelectorAll('.box')
const winScreen = document.querySelector('#winnerMessage')
const winScreenPlayer = document.querySelector('#winnerMessage span:first-child')
const playerStartContainer = document.querySelector('#playerStart-container')
const playerStart = document.querySelector('#playerStart')
// llamamos los elementos del HTML

class Player {
    htmlScore: Element | null
    sign: string
    name: string

    constructor (htmlScore: Element | null, name: string, sign: string) {
        this.htmlScore = htmlScore
        this.sign = sign
        this.name = name
    }

    score: number = 0
    myBoxes: string[] = []
}
// creo una clase para los jugadores para hacer mas facil su mantenimiento

const player1 = new Player(onePlayerScore, "player 1", "x")
const player2 = new Player(twoPlayerScore, "player 2", "o")
//instancio ambos jugadores y les asigno su signo

let turnOf: Player //esta variable nos ayudara a determinar de quien es el turno

function randomTurnOf () {
    const random: number = Math.random()
    if (random < 0.5) {
        turnOf = player1
    } else {
        turnOf = player2
    }

    if(playerStart !== null){
        playerStart.innerHTML = turnOf.name
    }

    if (playerStartContainer !== null) {
        playerStartContainer.classList.value = ''
    }
}
randomTurnOf() //en cada partida el jugador q inicia la partida sera elegido al azar

function changeTurn (): void {
    if (turnOf === player1) {
        turnOf = player2
    } else {
        turnOf = player1
    }
}

function updateScore () {
    if (player1.htmlScore !== null && player2.htmlScore !== null) {
        player1.htmlScore.innerHTML = String(player1.score) 
        player2.htmlScore.innerHTML = String(player2.score) 
    } else {
        console.error("player1.htmlScore.innerHTML player2.htmlScore and is NULL")
    }
}

function addScore (player: Player) {
    player.score++
    updateScore()
}

function activateWinnerScreen (player: Player | string) {
    if (winScreen !== null && winScreenPlayer !== null) {
        if (player instanceof Player) {
            winScreenPlayer.innerHTML = player.name
        } else {
            winScreenPlayer.innerHTML = player
        }
        winScreen.classList.value = 'visible'
    }
}

function desactivateWinnerScreen () {
    if (winScreen !== null && winScreenPlayer !== null) {
        winScreen.classList.value = ''
    }
    reset()
}

function win () {
    activateWinnerScreen(turnOf);
    addScore(turnOf)
}

function winCheck (turnOf: Player) {
    function checking (box1: string, box2: string, box3: string): boolean {
        if (
        turnOf.myBoxes.includes(box1) && 
        turnOf.myBoxes.includes(box2) && 
        turnOf.myBoxes.includes(box3)) {
            return true
        } else return false
    }

    if (
    checking ('box1', 'box2', 'box3') || 
    checking ('box4', 'box5', 'box6') || 
    checking ('box7', 'box8', 'box9') || 
    checking ('box1', 'box4', 'box7') || 
    checking ('box2', 'box5', 'box8') || 
    checking ('box3', 'box6', 'box9') || 
    checking ('box1', 'box5', 'box9') || 
    checking ('box7', 'box5', 'box3') ) {
        win()
        console.log("WINNER!!")
    } else if (player1.myBoxes.length + player2.myBoxes.length >= 9) {
        activateWinnerScreen('nobody');
    } else changeTurn()
}

function move (this: Element | any) {
    if (this.isActive) {
        this.isActive = false
        this.innerHTML = turnOf.sign
        this.classList += ' disable'
        turnOf.myBoxes.push(this.id)
        winCheck(turnOf)
        if (playerStartContainer !== null) {
            playerStartContainer.classList.value = 'invisible'
        }
    }
} //esta sera la funcion q se activara al presionar cada casilla

function reset () {
    player1.myBoxes = []
    player2.myBoxes = []
    updateScore()
    ticTacToeBoxes.forEach((element: any) => {
        element.innerHTML = ''
        element.isActive = true
        element.classList ='box'
    })
    randomTurnOf()
}
function resetGame () {
    player1.score = 0
    player2.score = 0
    player1.myBoxes = []
    player2.myBoxes = []
    updateScore()
    ticTacToeBoxes.forEach((element: any) => {
        element.innerHTML = ''
        element.isActive = true
        element.classList ='box'
    })
    randomTurnOf()
}

ticTacToeBoxes.forEach((element: any) => {
    element.onclick = move
    element.isActive = true
}) // asigno la funcion a cada una de las casillas