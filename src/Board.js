import React from 'react';
import Field from './Field.js';
import CapturedFigures from './CapturedFigures.js';
import allowedMoves from './moves.js';
import {enemyFigures, isPlayersFigure, copyFigures} from './utils.js';

class Board extends React.Component {

  constructor(props) {
    super(props);
    
    var figures = [
      [13, 14, 15, 11, 12, 15, 14, 13],
      [16, 16, 16, 16, 16, 16, 16, 16],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [26, 26, 26, 26, 26, 26, 26, 26],
      [23, 24, 25, 21, 22, 25, 24, 23]
    ]

    var circles = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
    
    this.state = {
      figures: figures,
      circles: circles,
      selectedFigure: {
        row: undefined,
        col: undefined,
      },
      rotate: false,
      currentPlayerWhite: true,
      capturedFiguresWhite: [],
      capturedFiguresBlack: [],
    };
  };

  showPossibleMoves(position, figures) {
    // A path is a collection of multiple theoretically possible moves in one direction of the current figure. If one move of a path is not allowed, all subsequent
    // moves aren't allowed, too.
    var moves = allowedMoves(position, copyFigures(figures), enemyFigures(this.state.currentPlayerWhite));
    var circles = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ];

    moves.forEach((move) => {
      circles[move.row][move.col] = 1;
    });
    this.setState({circles: circles});
  };

  hidePossibleMoves() {
    var circles = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]

    this.setState({
      circles: circles,
    })
  };

  captureFigure(figure) {
    if (this.state.currentPlayerWhite) {
      this.setState({
        capturedFiguresBlack: this.state.capturedFiguresBlack.concat(figure),
      })
    } else {
      this.setState({
        capturedFiguresWhite: this.state.capturedFiguresWhite.concat(figure),
      })
    }
  };

  moveSelectedFigure(row, col) {
    var figures = copyFigures(this.state.figures);

    var currentFigure = figures[row][col];
    var selectedFigure = this.state.selectedFigure;
    var enemies = enemyFigures(this.state.currentPlayerWhite);

    if (enemies.includes(currentFigure)) {
      this.captureFigure(currentFigure);
    }

    figures[row][col] = figures[selectedFigure.row][selectedFigure.col];
    figures[selectedFigure.row][selectedFigure.col] = 0;
    this.setState({
      figures: figures,
      selectedFigure: {
        row: undefined,
        col: undefined,
      }
    })
    this.hidePossibleMoves();
  };

  handleClick(row, col) {
    var circle = this.state.circles[row][col];
    var position = {
      row: row,
      col: col
    };

    if (circle === 1) {
      this.moveSelectedFigure(row, col);
      this.setState({
        currentPlayerWhite: !this.state.currentPlayerWhite,
      });
    } else {
      var figure = this.state.figures[row][col];
      if (isPlayersFigure(figure, this.state.currentPlayerWhite)) {
        this.setState({
          selectedFigure: {
            row: row,
            col: col,
          }
        }, () => {
          this.showPossibleMoves(position, copyFigures(this.state.figures));
        });
      } else {
        this.hidePossibleMoves();
      }
    };
  };
  
  render() {
    var row_numbers = [...Array(8).keys()];
    var rows = row_numbers.map(row => {
      var col_numbers = [...Array(8).keys()];
      var cols = col_numbers.map(col => {
        return(
          <Field 
            key={row + "_" + col}
            row={row} 
            col={col} 
            figure ={this.state.figures[row][col]}
            selectedFigure = {this.state.selectedFigure}
            circle = {this.state.circles[row][col]}
            onClick = {() => this.handleClick(row, col)}
            rotate = {this.state.rotate}
          />
        );
      });
      return(
        <ul className="board-row" key={row}>
          {cols}
        </ul>
      );
    });

    var boardSize = {
      height: this.props.size.board,
      width: this.props.size.board
    };

    var capturedSize = {
      height: this.props.size.capturedHeight, 
      width: this.props.size.capturedWidth
    };

    return(
      <div className="game-area" style={this.props.gameareaStyle}>
        <div className="captured-white" style={capturedSize}>
          <CapturedFigures 
            figures={this.state.capturedFiguresWhite} 
            size={capturedSize}
          />
        </div>
        <div className="board" style={boardSize}>{rows}</div>
        <div className="captured-black" style={capturedSize}>
          <CapturedFigures
            figures={this.state.capturedFiguresBlack} 
            size={capturedSize}
          />
        </div>
      </div>
    );
  }
}

export default Board;