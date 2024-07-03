function gameBoard() {
    let boardArr = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    const setSquare = (row, col, item) => {
        boardArr[row][col] = item;
    }

    const getSquare = (row, col) => {
        return boardArr[row][col];
    }

    const printBoard = () => {
        return `${boardArr[0]}\n${boardArr[1]}\n${boardArr[2]}`;
    }

    const checkWin = () => {
        // check all columns, rows, and diagonals
        for (let i = 0; i < 3; i++) {
            // check current row
            let x_row = boardArr[i].filter((item) => item === "X");
            let o_row = boardArr[i].filter((item) => item === "O");
    
            if (x_row.length === 3)
                return "X";
            else if (o_row.length === 3)
                return "O"
    
            // check current column
            let col = "";
            for (let j = 0; j < 3; j++) {
                col += boardArr[j][i];
            }
            
            let x_col = (col.match(/X/g) || []).length;
            let o_col = (col.match(/O/g) || []).length;
    
            if (x_col === 3)
                return "X";
            else if (o_col === 3)
                return "O"
        }
    
        // check for diagonals
        let diagOne = `${boardArr[0][0]}${boardArr[1][1]}${boardArr[2][2]}`;
        let diagTwo = `${boardArr[0][2]}${boardArr[1][1]}${boardArr[2][0]}`;
    
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

    return {getSquare, printBoard, setSquare, checkWin};
};

function gamePlayer(name, shape) {
    this.shape = shape.toUpperCase();
    if (typeof this.shape !== "string") {
        this.shape = 'X'
    }
    return {name, shape};
};

function squareBoard(board) {
    const squareArr = [
        [squareObject(1), squareObject(2), squareObject(3)],
        [squareObject(4), squareObject(5), squareObject(6)],
        [squareObject(7), squareObject(8), squareObject(9)]
    ];

    const drawSquare = (row, col, item) => {
        board.setSquare(row, col, item);
        squareArr[row][col].fill(item);
    };

    const getSquare = (row, col) => {
        squareArr[row][col];
    };

    return {drawSquare, getSquare};
}

function squareObject(index) {
    const board = document.querySelector(".board")
    const square = document.createElement("button");
    square.className = "square";
    square.id = index;

    board.appendChild(square);

    if (!isNaN(+index))
        square.textContent = index;

    const fill = (shape) => {
        square.textContent = `${shape}`;
    }

    return {index, square, fill};
};

function playGame() {
    const grid = document.querySelector(".board");
    let player_turn = 0;

    const boardMap = {
        1: [0, 0], 2: [0, 1], 3: [0, 2],
        4: [1, 0], 5: [1, 1], 6: [1, 2],
        7: [2, 0], 8: [2, 1], 9: [2, 2],
    }
    const board = gameBoard();
    const playerOne = gamePlayer("one", "X");
    const playerTwo = gamePlayer("two", "O");
    let count = 0;
    let stopGame = false;

    const display = squareBoard(board);

    grid.addEventListener('click', (e) => {
        const index = +e.target.id;

        let item;
        if (player_turn === 0) {
            item = 'X';
            player_turn = 1;
        }
        else {
            item = 'O';
            player_turn = 0;
        }

        if (count >= 9) {
            console.log("TIE!");
            stopGame = true;
        }
        else if (board.checkWin() === playerOne.shape) {
            console.log(`Player One Wins! (${playerOne.shape})`);
            stopGame = true;
        }
        else if (board.checkWin() === playerTwo.shape) {
            console.log(`Player Two Wins! (${playerTwo.shape})`);
            stopGame = true;
        }

        if (!stopGame)
            display.drawSquare(...boardMap[index], item);

        console.log(board.printBoard());
        count++;
    });

    // while (true) {
    //     let p1;
    //     do {
    //         p1 = prompt(
    //             `${playerOne.name}'s turn (${playerOne.shape}) [1-9]`
    //         );
    //     }
    //     while (board.getSquare(...boardMap[p1]) !== '');
        
    //     count++;
    //     board.setSquare(...boardMap[p1], playerOne.shape);
    //     if (count >= 9) {
    //         console.log("TIE!")
    //         break;
    //     }
    //     else if (board.checkWin() === playerOne.shape) {
    //         console.log(`Player One Wins! (${playerOne.shape})`)
    //         break;
    //     }

    //     let p2;
    //     do {
    //         p2 = prompt(
    //             `${playerTwo.name}'s turn (${playerTwo.shape}) [1-9]`
    //         );
    //     }
    //     while (board.getSquare(...boardMap[p2]) !== '');

    //     count++;
    //     board.setSquare(...boardMap[p2], playerTwo.shape);
    //     if (count >= 9) {
    //         console.log("TIE!")
    //         break;
    //     }
    //     else if (board.checkWin() === playerTwo.shape) {
    //         console.log(`Player Two Wins! (${playerTwo.shape})`)
    //         break;
    //     }

    //     console.log(board.printBoard());
    // }

}

playGame();
