/*
 *  Game: Tic-Tac-Toe 
 *  Preset: app.js
 *  Version: 1.0
 *  Author: DevDJ
 */
;(function(){

	const createPlayer = (name, marker) => {
		return {name, marker};
	}
	
	const gameBoard = (() => {
		let board = [];
		
		for(i = 0; i < 9; i++){
			board.push('');
		}
		function clearBoard(){
			if(this.board.length !== 0){
				this.board.length = 0;
			}
			for(i = 0; i < 9; i++){
				this.board.push('');
			}
		}

		let squares = $('.gameboard');
		squares.children().each((index, square) => {
			$(square).on("click", () => {		
				if(game.winnerDeclared === false){
					$(square).addClass(game.activePlayer.marker);
					$(square).attr('data', game.activePlayer.marker);
					board[index] = game.activePlayer.marker;
					$(square).css('pointer-events', 'none');
					game.remainingSpots -= 1;
					game.checkWinner();
					if(game.remainingSpots > 0){
						game.alertNextPlayer();
						game.nextPlayer();
					}else if(game.remainingSpots == 0 && game.winnerDeclared === false){
						game.declareTie();
					}
				}
			});
		});
		
		$('.btn-game').on("click", () => {
			game.resetGame();
		});
		
		$('.btn-clear').on("click", () => {
			game.clearScoreboard();
		});
		
		return {
			board,
			squares,
			clearBoard
		};
	})();	
	
	const game = (() => {
		const playerOne = createPlayer('Player 1', 'circle');
		const playerTwo = createPlayer('Player 2', 'times');
		let activePlayer = playerOne;
		let winnerDeclared = false;
		let remainingSpots = 9;
		let subtext = $('.subtext');
		let playerName = $('.player-name');
		let winPlayerOneCount = 0;
		let winPlayerTwoCount = 0;
		let restart = $('.btn-game');
		let gameName = "Tic Tac Toe";

		const winningAxes = [
			[0,1,2],
			[3,4,5],
			[6,7,8],
			[0,3,6],
			[1,4,7],
			[2,5,8],
			[0,4,8],
			[2,4,6],
		];

		function checkWinner(){
			$(winningAxes).each((index, item) => {
				if(gameBoard.board[item[0]] === this.activePlayer.marker && gameBoard.board[item[1]] === this.activePlayer.marker && gameBoard.board[item[2]] === this.activePlayer.marker){
					$(subtext).html(`<b>${this.activePlayer.name} wins!</b>`);
					ddLogsManager.createLog(this.gameName, `${this.activePlayer.name} wins!`);
					if(this.activePlayer === playerOne){
						this.winPlayerOneCount = ++winPlayerOneCount;
						$('.score.playerOne').text(this.winPlayerOneCount);
					}else{
						this.winPlayerTwoCount = ++winPlayerTwoCount;
						$('.score.playerTwo').text(this.winPlayerTwoCount);
					}
					ddLogsManager.createLog(this.gameName, `${this.activePlayer.name} win count successfully updated!`);
					this.winnerDeclared = true;
					return false;
				} 
			})
		}

		function alertNextPlayer(){
			this.playerName = $('.player-name');
			this.activePlayer === playerOne ? $(this.playerName).text('Player 2') : $(this.playerName).text('Player 1');
		}

		function nextPlayer(){
			if(this.winnerDeclared === false){
				this.activePlayer === playerOne ? this.activePlayer = playerTwo : this.activePlayer = playerOne;
				ddLogsManager.createLog(this.gameName, `${this.activePlayer.name} turn.`);
			}
		}

		function declareTie(){
			$(subtext).html("<b>Tie game!</b>");
		}
		
		function resetGame(){
			gameBoard.squares.children().each((index, square) => {		
				$(square).removeClass('circle times');
				$(square).removeAttr('data');
				$(square).removeAttr('style');
			});
			gameBoard.clearBoard();
			this.remainingSpots = 9;
			this.winnerDeclared = false;
			this.activePlayer = playerOne;
			$(subtext).html('<span class="player-name">Player 1</span>, make your move.');
			ddLogsManager.createLog(this.gameName, "Game successfully Restarted!");
		}
		
		function clearScoreboard(){
			this.winPlayerOneCount = 0;
			this.winPlayerTwoCount = 0;
			$('.score.playerOne, .score.playerTwo').text('0');
			ddLogsManager.createLog(this.gameName, "Scoreboard successfully Cleared!");
		}
		
		return {
			activePlayer,
			remainingSpots,
			checkWinner,
			alertNextPlayer,
			nextPlayer,
			gameName,
			playerName,
			declareTie,
			winnerDeclared,
			resetGame,
			clearScoreboard
		};
	})();
	
	const ddCore = (() => {
		var that = [];
		
		that.init = function(){
			//const ddLogsManager = new ddLogsManager();
			//console.log('Core');
		}
		
		return that;
	})();
	
	ddCore.init();
	
	const ddLogsManager = (() => {

		function createLog(game, message, time = 0){
			const now = new Date();
			let hours = (now.getHours() < 10) ? `0${now.getHours()}` : `${now.getHours()}`;
			let minutes = (now.getMinutes() < 10) ? `0${now.getMinutes()}` : `${now.getMinutes()}`;
			let seconds = (now.getSeconds() < 10) ? `0${now.getSeconds()}` : `${now.getSeconds()}`;
			let dateTime = `${hours}:${minutes}:${seconds} ${now.getDate()}.${now.getMonth()+1}.${now.getFullYear()}`;
			
			setTimeout(() => {
				console.log(`${dateTime} | [ddLogsManager] Game: ${game}, Message: ${message}`);
			}, time);
		}
		
		function clearLogs(){
			const now = new Date();
			let hours = (now.getHours() < 10) ? `0${now.getHours()}` : `${now.getHours()}`;
			let minutes = (now.getMinutes() < 10) ? `0${now.getMinutes()}` : `${now.getMinutes()}`;
			let seconds = (now.getSeconds() < 10) ? `0${now.getSeconds()}` : `${now.getSeconds()}`;
			let dateTime = `${hours}:${minutes}:${seconds} ${now.getDate()}.${now.getMonth()+1}.${now.getFullYear()}`;
			
			console.clear();
			console.log(`${this.getDateTime()} | [ddLogsManager] Console successfully Cleared!`);
		}
		
		return {
			createLog,
			clearLogs
		};
	})();
	
	ddLogsManager.createLog(game.gameName, "Booting ddCore...");
	ddLogsManager.createLog(game.gameName, "Loading ddCore...", 100);
	ddLogsManager.createLog(game.gameName, "Initializing ddCore...", 200);
	ddLogsManager.createLog(game.gameName, "Including Game Modules...", 300);
	ddLogsManager.createLog(game.gameName, "Loading Game Modules...", 400);
	ddLogsManager.createLog(game.gameName, "Loading Game...", 500);
	ddLogsManager.createLog(game.gameName, "Initializing Game...", 600);
	ddLogsManager.createLog(game.gameName, "Game successfully Loaded!", 700);

})();