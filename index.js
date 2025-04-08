//Have little to no global variables

//Game Controller

// Player Factory Function
function Player(name, mark) {
	let score = 0;

	const updateScore = () => score++;
	const getScore = () => score;
	return {
		name,
		mark,
		updateScore,
		getScore,
	};
}

// Game Board Module
const GameBoard = (() => {
	// variables
	// use an array to create board
	let board = ["", "", "", "", "", "", "", "", ""];
	let player1 = Player("Player 1", "X");
	let player2 = Player("Player 2", "O");
	let move;
	let moves = 0;
	let rounds = 0;
	let currentPlayer = player1;
	let gameStatus = document.querySelector("#game-status");

	//check if they win
	function checkBoard() {
		let winStrikes = [
			["#zero", "#one", "#two"],
			["#three", "#four", "#five"],
			["#six", "#seven", "#eight"],
			["#zero", "#three", "#six"],
			["#one", "#four", "#seven"],
			["#two", "#five", "#eight"],
			["#zero", "#four", "#eight"],
			["#two", "#four", "#six"],
		];
		let winStrike = false;
		for (let i = 0; i < winStrikes.length; i++) {
			// console.log(...winStrikes[i]);
			winStrike = Strike(...winStrikes[i]);

			if (winStrike === true) {
				return i;
			}
		}
		return false;
	}

	function Strike(a, b, c) {
		// console.log(a, b, c);
		let first = document.querySelector(a);
		let second = document.querySelector(b);
		let third = document.querySelector(c);

		if (
			first.innerHTML == "" ||
			second.innerHTML == "" ||
			third.innerHTML == ""
		) {
			return;
		}
		if (
			first.innerHTML === second.innerHTML &&
			second.innerHTML === third.innerHTML
		) {
			// console.log("winner");
			// Draw the strike line
			// console.log(a, b, c);
			return true;
		}
	}

	function Play(move, screenText) {
		//there are only 9 cells, users can make only 9 moves
		//validate input
		// console.log(move);
		if (isNaN(move) || move < 0 || move > 8) {
			alert("Invalid input, please enter a value between 0 and 8");
		}

		move = parseInt(move);

		//	check if board position isn't filled
		if (screenText.innerHTML !== "") {
			// console.log(screenText.innerHTML);
			alert("cell occupied, please choose another");
			return;
		}
		//updateBoard;
		board[move] = currentPlayer.mark;
		updateScreenText(screenText);
		moves++;
		// console.log(moves);

		//check for winner
		if (moves > 4) {
			let strikePosition = checkBoard();
			if (strikePosition) {
				// console.log(`${currentPlayer.name} wins`);
				//update currentPlayer's score
				currentPlayer.updateScore();
				// console.log("Score:" + currentPlayer.getScore());
				//update game status
				updateScoreBoard();
				drawStrikeLine(strikePosition);

				disableBoard();
				setTimeout(() => {
					updateGameStatus(`${currentPlayer.name} wins`);
					hideStrikeLine();
				}, 1000);
				// play next round
				setTimeout(nextRound, 1500);
				// nextRound();
			} else {
				isFilled();
			}
		}
		// change current player
		currentPlayer = currentPlayer == player1 ? player2 : player1;
		//play next round
	}

	(function getMove() {
		let board = document.querySelector("#game-board");
		board.addEventListener("click", handleBoardClick);
	})();

	function handleBoardClick(event) {
		let target = event.target;
		let positionPlayed = "#" + target.id;
		let screenText = document.querySelector(positionPlayed);
		let move;

		// Determine the move based on the clicked cell
		switch (target.id) {
			case "zero": {
				move = 0;
				break;
			}
			case "one": {
				move = 1;
				break;
			}
			case "two": {
				move = 2;
				break;
			}
			case "three": {
				move = 3;
				break;
			}
			case "four": {
				move = 4;
				break;
			}
			case "five": {
				move = 5;
				break;
			}
			case "six": {
				move = 6;
				break;
			}
			case "seven": {
				move = 7;
				break;
			}
			case "eight": {
				move = 8;
				break;
			}
		}

		// Call Play function to process the move
		Play(move, screenText);

		// You may want a func
	}

	function updateScreenText(screenText) {
		screenText.innerHTML = currentPlayer.mark;
	}

	function disableBoard() {
		let board = document.querySelector("#game-board");
		board.removeEventListener("click", handleBoardClick);
	}
	function updateGameStatus(text) {
		let gameStatus = document.querySelector("#game-status");
		gameStatus.textContent = text;
		gameStatus.style.display = "block";
	}

	function updateScoreBoard() {
		console.log(currentPlayer.getScore());

		if (currentPlayer == player1) {
			text = ".score-1";
		} else {
			text = ".score-2";
		}
		let score = document.querySelector(text);
		score.textContent = currentPlayer.getScore();
		// console.log(text);
		// console.log(currentPlayer.getScore());
	}

	function drawStrikeLine(position) {
		//check if combination is row1,row2 ... or a diagonal
		let winStrikes = [
			["#zero", "#one", "#two"],
			["#three", "#four", "#five"],
			["#six", "#seven", "#eight"],
			["#zero", "#three", "#six"],
			["#one", "#four", "#seven"],
			["#two", "#five", "#eight"],
			["#zero", "#four", "#eight"],
			["#two", "#four", "#six"],
		];

		let strikePosition = "";
		let strikeLine = document.querySelector("#strike-line");
		strikeLine.classList.add("strike-row-1");

		//add class to strike line and display it
		switch (position) {
			case 0:
				strikeLine.classList.value = "";
				strikeLine.classList.add("strike-row-1");
				strikeLine.style.display = "block";
				break;

			case 1:
				strikeLine.classList.value = "";
				strikeLine.classList.add("strike-row-2");
				strikeLine.style.display = "block";
				break;

			case 2:
				strikeLine.classList.value = "";
				strikeLine.classList.add("strike-row-3");
				strikeLine.style.display = "block";
				break;

			case 3:
				strikeLine.classList.value = "";
				strikeLine.classList.add("strike-column-1");
				strikeLine.style.display = "block";
				break;

			case 4:
				strikeLine.classList.value = "";
				strikeLine.classList.add("strike-column-2");
				strikeLine.style.display = "block";
				break;

			case 5:
				strikeLine.classList.value = "";
				strikeLine.classList.add("strike-column-3");
				strikeLine.style.display = "block";

				break;
			case 6:
				strikeLine.classList.value = "";
				strikeLine.classList.add("strike-diagonal-1");
				strikeLine.style.display = "block";

				break;

			case 7:
				strikeLine.classList.value = "";
				strikeLine.classList.add("strike-diagonal-2");
				strikeLine.style.display = "block";

				break;
		}
	}

	function isFilled() {
		if (moves === 9) {
			let winMove = checkBoard();

			updateGameStatus("Draw");

			setTimeout(nextRound, 2000);
		}
	}
	function clearBoard() {
		//clear board
		let cells = document.querySelectorAll(".box");
		cells.forEach((cell) => {
			cell.textContent = "";
			cell.addEventListener("click", handleBoardClick);
		});
	}
	function nextRound() {
		updateGameStatus("");
		gameStatus.style.display = "none";
		if (rounds === 3) {
			let text;
			//check for the highest score and declare winner
			if (player1.getScore() > player2.getScore()) {
				text = ` Game Over! ${player1.name} wins`;
			} else if (player1.getScore() < player2.getScore()) {
				text = ` Game Over! ${player2.name} wins`;
			} else {
				text = `Game Over! Draw`;
			}
			updateGameStatus(text);
			//display restart button
			let restartButton = document.querySelector("#restart-btn");
			restartButton.style.display = "block";
			restartButton.addEventListener("click", () => {
				window.location.reload();
			});
			//display restart btn
		} else {
			// console.log("Moves:" + moves);
			rounds++;
			// clear board
			hideStrikeLine();
			clearBoard();
			moves = 0;
			// console.log("Moves:" + moves);
		}
	}

	function hideStrikeLine() {
		const strikeLine = document.querySelector("#strike-line");
		strikeLine.style.display = "none";
	}

	return { checkBoard };
})();

// Start Program
GameBoard.checkBoard();
// GameBoard.Play();

//clg
// console.log(object);
/**
 *
 *
 */
