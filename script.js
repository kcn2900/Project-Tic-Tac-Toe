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

    const resetBoard = () => {
        boardArr = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]
    }

    // try to return a list of squares that made the win possible
    // probably need if statements and static list
    // could just return a list of numbers to later convert to rows/cols
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

    return {getSquare, printBoard, setSquare, checkWin, resetBoard};
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

    const resetDisplay = () => {
        // let index = 1;
        // squareArr.forEach((square) => {
        //     console.log(square);
        //     square.fill(index);
        //     index++;
        // })
        let index = 1;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                squareArr[i][j].fill(index);
                index++;
            }
        }
    };

    return {drawSquare, getSquare, resetDisplay};
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
    const page = document.querySelector("body");
    const grid = document.querySelector(".board");
    const start = document.querySelector(".startBtn");
    const reset = document.createElement("button");
    const results = document.createElement("div");
    const boardMap = {
        1: [0, 0], 2: [0, 1], 3: [0, 2],
        4: [1, 0], 5: [1, 1], 6: [1, 2],
        7: [2, 0], 8: [2, 1], 9: [2, 2],
    }
    const board = gameBoard();
    const display = squareBoard(board);
    let playerOne, playerTwo;
    let player_turn = 0;
    let count = 0;
    let item;

    start.addEventListener('click', () => {
        startGame();
    });

    page.appendChild(reset);
    reset.className = "resetBtn";
    reset.textContent = "Reset";
    reset.style.visibility = "hidden";
    reset.addEventListener('click', resetGame);

    function resetGame() {
        player_turn = 0;

        start.style.visibility = "visible";
        reset.style.visibility = "hidden";
        page.removeChild(results);

        grid.removeEventListener('click', gameRun);
        display.resetDisplay();
        board.resetBoard();
        count = 0;
    };

    function startGame() {
        let name1 = prompt("Name of first player (X):");
        let name2 = prompt("Name of second player (O):");
        while (name1 === name2) {
            name2 = prompt("[Different from first player]"
                + " Name of second player (O)");
        }

        playerOne = gamePlayer(name1, "X");
        playerTwo = gamePlayer(name2, "O");

        grid.addEventListener('click', gameRun);
        start.style.visibility = "hidden";
        reset.style.visibility = "visible";
    }

    function gameRun(e) {
        const index = +e.target.id;

        if (board.getSquare(...boardMap[index]) === '') {
            if (player_turn === 0) {
                item = playerOne.shape;
                player_turn++;
            }
            else {
                item = playerTwo.shape;
                player_turn--;
            }
            display.drawSquare(...boardMap[index], item);
        }
        else
            return;

        console.log(board.printBoard());
        count++;

        if (count >= 9) {
            console.log("TIE!");
            displayResult("tie");
        }
        else if (board.checkWin() === playerOne.shape) {
            console.log(`Player One Wins! (${playerOne.shape})`);
            displayResult(playerOne.name);
        }
        else if (board.checkWin() === playerTwo.shape) {
            console.log(`Player Two Wins! (${playerTwo.shape})`);
            displayResult(playerTwo.name);
        }

        if (count >= 9 || board.checkWin() !== "neither") {
            grid.removeEventListener('click', gameRun);
            return;
        }
    };

    function displayResult(name) {
        page.appendChild(results);

        if (name === "tie")
            results.textContent = "DRAW: Neither players win."
        else
            results.textContent = `Player ${name} Wins!`;
    }

    displayResult("test");
}

playGame();
