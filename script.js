function gameBoard() {
    let boardArr = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    const drawBoard = () => {
        return `${boardArr[0]}\n${boardArr[1]}\n${boardArr[2]}`;
    }
    return {boardArr, drawBoard};
};

function gamePlayer(name, shape) {
    this.shape = shape.toUpperCase();
    if (typeof this.shape !== "string") {
        this.shape = 'X'
    }
    return {name, shape};
};

function gameObject() {
    return;
};

function checkWin(board) {
    // check all columns, rows, and diagonals
    // break when next string !== prev string
    for (let i = 0; i < 3; i++) {
        // check current row
        let x_row = board[i].filter((item) => item === "X");
        let o_row = board[i].filter((item) => item === "O");

        if (x_row.length === 3)
            return "X";
        else if (o_row.length === 3)
            return "O"

        // check current column
        let col = "";
        for (let j = 0; j < 3; j++) {
            col += board[j][i];
        }
        
        let x_col = (col.match(/X/g) || []).length;
        let o_col = (col.match(/O/g) || []).length;

        if (x_col === 3)
            return "X";
        else if (o_col === 3)
            return "O"
    }

    // check for diagonals
    let diagOne = `${board[0][0]}${board[1][1]}${board[2][2]}`;
    let diagTwo = `${board[0][2]}${board[1][1]}${board[2][0]}`;

    let x_diagOne = (diagOne.match(/X/g) || []).length;
    let o_diagOne = (diagOne.match(/O/g) || []).length;
    let x_diagTwo = (diagTwo.match(/X/g) || []).length;
    let o_diagTwo = (diagTwo.match(/O/g) || []).length;

    if (x_diagOne === 3 || x_diagTwo === 3)
        return "X";
    else if (o_diagOne === 3 || o_diagTwo === 3)
        return "O"

    return "neither";
}

function playGame() {
    const boardMap = {
        1: [0, 0], 2: [0, 1], 3: [0, 2],
        4: [1, 0], 5: [1, 1], 6: [1, 2],
        7: [2, 0], 8: [2, 1], 9: [2, 2],
    }
    const board = gameBoard();
    const playerOne = gamePlayer("one", "X");
    const playerTwo = gamePlayer("two", "O");
    let count = 0;

    while (true) {
        let p1;
        do {
            p1 = prompt(
                `${playerOne.name}'s turn (${playerOne.shape}) [1-9]`
            );
        }
        while (board.boardArr[boardMap[p1][0]][boardMap[p1][1]] !== '');
        
        count++;
        board.boardArr[boardMap[p1][0]][boardMap[p1][1]] = playerOne.shape;
        if (count >= 9) {
            console.log("TIE!")
            break;
        }
        else if (checkWin(board.boardArr) === playerOne.shape) {
            console.log(`Player One Wins! (${playerOne.shape})`)
            break;
        }

        let p2;
        do {
            p2 = prompt(
                `${playerTwo.name}'s turn (${playerTwo.shape}) [1-9]`
            );
        }
        while (board.boardArr[boardMap[p2][0]][boardMap[p2][1]] !== '');

        count++;
        board.boardArr[boardMap[p2][0]][boardMap[p2][1]] = playerTwo.shape;
        if (count >= 9) {
            console.log("TIE!")
            break;
        }
        else if (checkWin(board.boardArr) === playerTwo.shape) {
            console.log(`Player Two Wins! (${playerTwo.shape})`)
            break;
        }

        console.log(board.drawBoard());
    }

    console.log(board.drawBoard());
    // console.log(board.boardArr)
    // console.log(checkWin(board.boardArr))
    
}

playGame();