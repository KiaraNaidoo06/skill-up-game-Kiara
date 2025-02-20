import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GameHistoryService } from '../../services/game-history-service';

@Component({
  selector: 'app-tic-tac-toe', //name of component
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tic-tac-toe.component.html',
  styleUrl: './tic-tac-toe.component.scss'
})

export class TicTacToeComponent { //private variables will have an _ under it
  board: string[] = Array(9).fill('');
  currentPlayer: string = "X";
  winner: string | null = null;
  gameHistory: string[] = [];

  constructor(private gameHistoryService:GameHistoryService){

  }

  resetGame(): void {
    if (this.winner) {
      this.gameHistory.push(this.winner);
    }
    this.board.fill('');
    this.currentPlayer = 'X';
    this.winner = null;
  }
  
  nextPlayer(i: number): void {
    if (!this.board[i] && !this.winner) {
      this.board[i] = this.currentPlayer;
    
      if (this.checkWin() == true) {
      this.winner = this.currentPlayer;
    } else if (this.checkWin() == false) {
      if (this.currentPlayer == "X") {
        this.currentPlayer = "O";
      } else if (this.currentPlayer == "O") {
        this.currentPlayer = "X";
      }
    }
  }
  }

  checkWin(): boolean {
    const winningConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (const [a, b, c] of winningConditions) {
      if (this.board[a] == "X" && this.board[b] == "X" && this.board[c] == "X" || this.board[a] == "O" && this.board[b] == "O" && this.board[c] == "O") {
        this.winner = this.board[a];
        return true; 
      }
    }
    return false;
  }

}

