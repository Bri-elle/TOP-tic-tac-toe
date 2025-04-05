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
	let player1 = Player("Mark", "X");
	let player2 = Player("Andrew", "O");
	let move;
	let moves = 0;
	let rounds = 0;
	let currentPlayer = player1;

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
				return true;
			}
		}
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
			drawStrikeLine(first, second, third);
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
		}
		//updateBoard;
		board[move] = currentPlayer.mark;
		updateScreenText(screenText);
		moves++;
		// console.log(moves);

		//check for winner
		if (moves > 4) {
			let winner = checkBoard();
			if (winner) {
				// console.log(`${currentPlayer.name} wins`);
				//update currentPlayer's score
				currentPlayer.updateScore();
				// console.log("Score:" + currentPlayer.getScore());
				//update game status
				updateScoreBoard(currentPlayer);
				updateGameStatus(`${currentPlayer.name} wins`);
				disableBoard();
				// drawStrikeLine(winnerCombo);

				// // play next round
				setTimeout(nextRound, 2000);
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
	}
	function updateScoreBoard() {
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

	function drawStrikeLine(cell1, cell2, cell3) {
		const strikeLine = document.querySelector("#strike-line");

		if (!strikeLine) {
			// console.error("Strike line element not found");
			return;
		}

		const firstRect = cell1.getBoundingClientRect();
		// const secondRect = cell2.getBoundingClientRect();
		const thirdRect = cell3.getBoundingClientRect();
		// Calculate the center points of the first and third cells
		const startX = (firstRect.left + firstRect.right) / 2;
		const startY = (firstRect.top + firstRect.bottom) / 2;
		const endX = (thirdRect.left + thirdRect.right) / 2;
		const endY = (thirdRect.top + thirdRect.bottom) / 2;
		// Calculate the angle and length of the line
		const deltaX = endX - startX;
		const deltaY = endY - startY;
		const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
		const length = Math.sqrt(deltaX ** 2 + deltaY ** 2);

		// Adjust the position to center the line
		const centerX = (startX + endX) / 2;
		const centerY = (startY + endY) / 2;

		// Position and style the strike line
		strikeLine.style.width = `${length + 80}px`; // Add extra length for better visibility
		strikeLine.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`; // Center and rotate
		strikeLine.style.left = `${centerX}px`;
		strikeLine.style.top = `${centerY}px`;
		strikeLine.style.display = "block";
	}

	function isFilled() {
		// console.log(moves);
		if (moves == 9) {
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
		if (rounds == 3) {
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
