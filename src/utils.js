export function isPlayersFigure(figure, currentPlayerWhite) {
  if (currentPlayerWhite) {
    return([11, 12, 13, 14, 15, 16].includes(figure));
  } else {
    return([21, 22, 23, 24, 25, 26].includes(figure));
  };
};

export function enemyFigures(currentPlayerWhite) {
  var enemyFigures;

  if (currentPlayerWhite) {
    enemyFigures = [21, 22, 23, 24, 25, 26];
  } else {
    enemyFigures = [11, 12, 13, 14, 15, 16];
  }

  return(enemyFigures);
};

export function copyFigures(figures) {
  var copy = figures.map((row) => {
    var r = row.map((col) => {
      return(col);
    })
    return(r);
  })

  return(copy);
};

export function figureNumbersToNames(figureNumbers) {
  var fieldDict = {
    0: " ",
    1: "green-circle ",
    11: "king-white ",
    12: "queen-white ",
    13: "rook-white ",
    14: "bishop-white ",
    15: "knight-white ",
    16: "pawn-white ",
    21: "king-black ",
    22: "queen-black ",
    23: "rook-black ",
    24: "bishop-black ",
    25: "knight-black ",
    26: "pawn-black ",
  }

  var names = figureNumbers.map((number) => {
    return(fieldDict[number]);
  });

  return(names);
};

export function isFigure(value) {
  return(
    [11, 12, 13, 14, 15, 16, 21, 22, 23, 24, 25, 26].includes(value)
  );
}