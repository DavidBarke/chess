import getPaths from './paths.js';
import {copyFigures} from './utils.js';

function applyMove(position, move, figures) {
	figures[move.row][move.col] = figures[position.row][position.col];
	figures[position.row][position.col] = 0;
};

function enemyFiguresPositions(figures, enemyFigures) {
	// Returns all positions of enemy figures in an array
    var positions = [];

    figures.forEach((row, rowIndex, array) => {
      row.forEach((col, colIndex, array) => {
        if (enemyFigures.includes(col)) {
          positions = positions.concat([{
            row: rowIndex,
            col: colIndex
          }]);
        }
      });
    });

    return(positions);
};

function isAllowed(move, figures, enemyFigures) {
	var figure = figures[move.row][move.col];

    if (figure === 0) {
    	return(1);
    } 

    if (enemyFigures.includes(figure)) {
    	return(2);
    }

    return(0);
};

function figurePositions(figure, figures) {
    var positions = [];

    figures.forEach((row, rowIndex, array) => {
      row.forEach((col, colIndex, array) => {
        if (col === figure) {
          figure = {
            row: rowIndex,
            col: colIndex
          };
          positions = positions.concat([figure]);
        };
      });
    });

    return(positions);
  };

function provokeChess(position, move, figures, enemyFigures) {
	// Move gets applied hypothetically and afterwards checked if it provokes chess of the own king, if so true is returned, otherwise false.
    var ownKing, friendlyFigures;
    if (enemyFigures.includes(11)) {
    	ownKing = 21;
    	friendlyFigures = [21, 22, 23, 24, 25, 26];
    } else {
    	ownKing = 11;
    	friendlyFigures = [11, 12, 13, 14, 15, 16];
    }
    
    var provokeChess = false;

    applyMove(position, move, figures);

    var ownKingPosition = figurePositions(ownKing, figures)[0];

    var enemyPositions = enemyFiguresPositions(figures, enemyFigures);

    enemyPositions.forEach((figure) => {
      var paths = getPaths(figure, figures);
      paths.forEach((path) => {
        var moves = generalAllowedMoves(path, figures, friendlyFigures);
        moves.forEach((move) => {
          if (move.row === ownKingPosition.row && move.col === ownKingPosition.col) {
            provokeChess = true;
          };
        })
      })
    })

    return(provokeChess);
};

function generalAllowedMoves(path, figures, enemyFigures) {
	// Returns all moves, that are allowed in general, which means without checking if they provoke that the own king stands chess
	var allowedMoves = [];
    // Loop over all moves of a path until a move is not allowed. All allowed moves up to this move are returned.
    for (var move of path) {
      var moveAllowed = isAllowed(move, figures, enemyFigures);
      if (moveAllowed === 1) {
      	// Move is allowed without any restrictions
        allowedMoves = allowedMoves.concat(move);
      } else if (moveAllowed === 2) {
      	// Move is allowed but only up to this field (field is blocked by enemy figure)
        allowedMoves = allowedMoves.concat(move);
        break;
      } else {
      	// Move is forbidden
        break;
      }
    };

    return(allowedMoves);
};

function allowedMoves(position, figures, enemyFigures) {
	var paths = getPaths(position, figures);
  var allowed = [];

	paths.forEach((path) => {
		var moves = generalAllowedMoves(path, figures, enemyFigures);

		var allowedPathMoves = [];
		moves.forEach((move) => {
			if (!provokeChess(position, move, copyFigures(figures), enemyFigures)) {
				allowedPathMoves = allowedPathMoves.concat(move);
      }
		});

		allowed = allowed.concat(allowedPathMoves);
  });

	return(allowed);
};

export default allowedMoves;