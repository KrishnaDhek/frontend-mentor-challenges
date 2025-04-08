let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#resetBtn');
let newBtn = document.querySelector('#newBtn');
let messageContainer = document.querySelector('.message-container');
let messageStatus = document.querySelector('#message-status');


let turnO = true;

let winPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const disableGame = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}
const enableGame = () => {
  for (let box of boxes) {
      box.disabled = false;
      box.innerText = "";
  }
};
const checkDraw = () =>{
    let draw = true;

    for (let i = 0; i < boxes.length; i++){
        if (boxes[i].innerText === "") {
            draw = false;
            break;
        }
    }

    if (draw) {
        messageStatus.innerText = `It's a draw!`
        messageStatus.classList.remove('hide');
        disableGame();
    }
}

const showWinner = (winner) => {
    messageStatus.innerText = `🎉Congratulations, Winner is ${winner}`
    messageStatus.classList.remove('hide');
    disableGame();

};
const checkWinner = () => {
    for (let pattern of winPosition) {
        // console.log(pattern[0], pattern[1], pattern[2]);
        // console.log(boxes[pattern[0]], boxes[pattern[1]], boxes[pattern[2]]);
        let posA = boxes[pattern[0]].innerText;
        let posB = boxes[pattern[1]].innerText;
        let posC = boxes[pattern[2]].innerText;
        if (posA !== "" && posB != "" && posC != "") {
            if (posA === posB && posB === posC) {
                showWinner(posA);
                return;
            }
        }
    }
    checkDraw();
};

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (turnO) {
            box.innerText = 'O';
            turnO = false;
        } else {
            box.innerText = 'X'
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    })
});

const resetGame = () => {
    turnO = true;
    enableGame();
    messageStatus.classList.add('hide')
};

newBtn.addEventListener('click', () => {
  location.reload();
});

resetBtn.addEventListener('click', resetGame);
