const mainTetris = document.createElement("div");
const main = document.querySelector(".main");

// Отвечает за создание тетриса
const tetris = {
  init: function() {
    this.createTetris();
    this.setDataset();
  },

  createTetris: function() {
    let fragment = document.createDocumentFragment();

    mainTetris.classList.add("tetris");

    for (let i = 1; i < 181; i++) {
      const excel = document.createElement("div");
      excel.classList.add("excel");

      mainTetris.appendChild(excel);
    }

    fragment.appendChild(mainTetris);

    main.appendChild(fragment);
  },

  setDataset: function() {
    const excel = document.querySelectorAll(".excel");
    let i = 0;

    for (let y = 18; y > 0; y--) {
      for (let x = 1; x < 11; x++) {
        excel[i].dataset.posX = x;
        excel[i].dataset.posY = y;
        i++;
      }
    }
  }
};
const coords = {
  x: 6,
  y: 15
};
const figures = {
  I: {
    1: [0, 0],
    2: [0, -1],
    3: [0, 1],
    4: [0, 2]
  },
  J: {
    1: [0, 0],
    2: [-1, 0],
    3: [0, 1],
    4: [0, 2]
  },
  O: {
    1: [0, 0],
    2: [1, 0],
    3: [1, 1],
    4: [0, 1]
  },
  L: {
    1: [0, 0],
    2: [1, 0],
    3: [0, 1],
    4: [0, 2]
  },
  Z: {
    1: [0, 0],
    2: [-1, 0],
    3: [0, -1],
    4: [1, -1]
  },
  T: {
    1: [0, 0],
    2: [1, 0],
    3: [0, 1],
    4: [-1, 0]
  },
  S: {
    1: [0, 0],
    2: [1, 1],
    3: [0, 1],
    4: [-1, 0]
  }
};
const figureRotate = {
  I: {
    1: [[0, 0], [-1, 1], [1, -1], [2, -2]],
    2: [[0, 0], [1, -1], [-1, 1], [-2, 2]],
    3: [[0, 0], [-1, 1], [1, -1], [2, -2]],
    4: [[0, 0], [1, -1], [-1, 1], [-2, 2]]
  },
  J: {
    1: [[0, 0], [1, 1], [1, -1], [2, -2]],
    2: [[0, 0], [1, -1], [-1, -1], [-2, -2]],
    3: [[0, 0], [-1, -1], [-1, 1], [-2, 2]],
    4: [[0, 0], [-1, 1], [1, 1], [2, 2]]
  },
  O: {
    1: [[0, 0], [0, 0], [0, 0], [0, 0]],
    2: [[0, 0], [0, 0], [0, 0], [0, 0]],
    3: [[0, 0], [0, 0], [0, 0], [0, 0]],
    4: [[0, 0], [0, 0], [0, 0], [0, 0]]
  },
  L: {
    1: [[0, 0], [-1, -1], [1, -1], [2, -2]],
    2: [[0, 0], [-1, 1], [-1, -1], [-2, -2]],
    3: [[0, 0], [1, 1], [-1, 1], [-2, 2]],
    4: [[0, 0], [1, -1], [1, 1], [2, 2]]
  },
  Z: {
    1: [[0, 0], [1, 1], [-1, 1], [-2, 0]],
    2: [[0, 0], [-1, -1], [1, -1], [2, 0]],
    3: [[0, 0], [1, 1], [-1, 1], [-2, 0]],
    4: [[0, 0], [-1, -1], [1, -1], [2, 0]]
  },
  T: {
    1: [[0, 0], [-1, 1], [-1, -1], [1, -1]],
    2: [[0, 0], [-1, -1], [1, -1], [1, 1]],
    3: [[0, 0], [1, -1], [1, 1], [-1, 1]],
    4: [[0, 0], [1, 1], [-1, 1], [-1, -1]]
  },
  S: {
    1: [[0, 0], [-2, 0], [-1, -1], [1, -1]],
    2: [[0, 0], [2, 0], [1, 1], [-1, 1]],
    3: [[0, 0], [-2, 0], [-1, -1], [1, -1]],
    4: [[0, 0], [2, 0], [1, 1], [-1, 1]]
  }
};
const figuresNames = ["I", "J", "O", "L", "Z", "T", "S"];
const scoreField = document.querySelector(".score__count");

let counter = 1;

tetris.init();

let flag = true;
let name = randomFigure();
let currentEl = createFigure(figures[name]);

setInterval(function(e) {
  move();
}, 500);

window.addEventListener("keydown", e => {
  //  left
  if (e.keyCode === 37) {
    moveLeft();
  }
  // right
  if (e.keyCode === 39) {
    moveRight();
  }
  //  down
  if (e.keyCode === 40) {
    move();
  }
  //  up
  if (e.keyCode === 38) {
    rotateFigure();
  }
});

function reload() {
  checkLine();

  name = randomFigure();
  currentEl = createFigure(figures[name]);
  counter = 1;
  flag = true;
}

function move() {
  for (let i = 0; i < currentEl.length; i++) {
    if (
      +currentEl[i].dataset.posY === 1 ||
      document
        .querySelector(
          `[data-pos-x="${currentEl[i].dataset.posX}"][data-pos-y="${+currentEl[
            i
          ].dataset.posY - 1}"]`
        )
        .classList.contains("set")
    ) {
      flag = false;
    }
  }

  if (flag) {
    currentEl.forEach(item => {
      item.classList.remove("figure");
    });

    currentEl = [
      document.querySelector(
        `[data-pos-x="${currentEl[0].dataset.posX}"][data-pos-y="${+currentEl[0]
          .dataset.posY - 1}"]`
      ),
      document.querySelector(
        `[data-pos-x="${currentEl[1].dataset.posX}"][data-pos-y="${+currentEl[1]
          .dataset.posY - 1}"]`
      ),
      document.querySelector(
        `[data-pos-x="${currentEl[2].dataset.posX}"][data-pos-y="${+currentEl[2]
          .dataset.posY - 1}"]`
      ),
      document.querySelector(
        `[data-pos-x="${currentEl[3].dataset.posX}"][data-pos-y="${+currentEl[3]
          .dataset.posY - 1}"]`
      )
    ];

    currentEl.forEach(item => {
      item.classList.add("figure");
    });
  } else {
    currentEl.forEach(item => {
      item.classList.remove("figure");
      item.classList.add("set");
    });

    reload();
  }
}

function randomFigure() {
  const num = Math.round(Math.random() * (figuresNames.length - 1));
  return figuresNames[num];
}

function createFigure(obj) {
  let container = [];

  for (let key in obj) {
    const arr = obj[key];
    const test = document.querySelector(
      `[data-pos-x="${coords.x + arr[0]}"][data-pos-y="${coords.y + arr[1]}"]`
    );
    test.classList.add("figure");
    container.push(test);
  }
  return container;
}

function moveLeft() {
  for (let i = 0; i < currentEl.length; i++) {
    if (
      +currentEl[i].dataset.posX === 1 ||
      document
        .querySelector(
          `[data-pos-x="${+currentEl[i].dataset.posX -
            1}"][data-pos-y="${+currentEl[i].dataset.posY}"]`
        )
        .classList.contains("set")
    ) {
      return;
    }
  }

  currentEl.forEach(item => {
    item.classList.remove("figure");
  });

  currentEl = [
    document.querySelector(
      `[data-pos-x="${+currentEl[0].dataset.posX -
        1}"][data-pos-y="${+currentEl[0].dataset.posY}"]`
    ),
    document.querySelector(
      `[data-pos-x="${+currentEl[1].dataset.posX -
        1}"][data-pos-y="${+currentEl[1].dataset.posY}"]`
    ),
    document.querySelector(
      `[data-pos-x="${+currentEl[2].dataset.posX -
        1}"][data-pos-y="${+currentEl[2].dataset.posY}"]`
    ),
    document.querySelector(
      `[data-pos-x="${+currentEl[3].dataset.posX -
        1}"][data-pos-y="${+currentEl[3].dataset.posY}"]`
    )
  ];

  currentEl.forEach(item => {
    item.classList.add("figure");
  });
}

function moveRight() {
  for (let i = 0; i < currentEl.length; i++) {
    if (
      +currentEl[i].dataset.posX === 10 ||
      document
        .querySelector(
          `[data-pos-x="${+currentEl[i].dataset.posX +
            1}"][data-pos-y="${+currentEl[i].dataset.posY}"]`
        )
        .classList.contains("set")
    ) {
      return;
    }
  }

  currentEl.forEach(item => {
    item.classList.remove("figure");
  });

  currentEl = [
    document.querySelector(
      `[data-pos-x="${+currentEl[0].dataset.posX +
        1}"][data-pos-y="${+currentEl[0].dataset.posY}"]`
    ),
    document.querySelector(
      `[data-pos-x="${+currentEl[1].dataset.posX +
        1}"][data-pos-y="${+currentEl[1].dataset.posY}"]`
    ),
    document.querySelector(
      `[data-pos-x="${+currentEl[2].dataset.posX +
        1}"][data-pos-y="${+currentEl[2].dataset.posY}"]`
    ),
    document.querySelector(
      `[data-pos-x="${+currentEl[3].dataset.posX +
        1}"][data-pos-y="${+currentEl[3].dataset.posY}"]`
    )
  ];

  currentEl.forEach(item => {
    item.classList.add("figure");
  });
}

function rotateFigure() {
  if (counter > 4) {
    counter = 1;
  }

  let rotCoords = figureRotate[name][counter];

  let arr = [];

  let x1 = +currentEl[0].dataset.posX + rotCoords[0][0],
    x2 = +currentEl[1].dataset.posX + rotCoords[1][0],
    x3 = +currentEl[2].dataset.posX + rotCoords[2][0],
    x4 = +currentEl[3].dataset.posX + rotCoords[3][0],
    y1 = +currentEl[0].dataset.posY + rotCoords[0][1],
    y2 = +currentEl[1].dataset.posY + rotCoords[1][1],
    y3 = +currentEl[2].dataset.posY + rotCoords[2][1],
    y4 = +currentEl[3].dataset.posY + rotCoords[3][1];

  arr.push(x1, x2, x3, x4);

  const check = arr.some(item => {
    return item === 0 || item === 11;
  });

  const cell1 = document.querySelector(
    `[data-pos-x="${x1}"][data-pos-y="${y1}"]`
  );
  const cell2 = document.querySelector(
    `[data-pos-x="${x2}"][data-pos-y="${y2}"]`
  );
  const cell3 = document.querySelector(
    `[data-pos-x="${x3}"][data-pos-y="${y3}"]`
  );
  const cell4 = document.querySelector(
    `[data-pos-x="${x4}"][data-pos-y="${y4}"]`
  );

  if (
    check ||
    cell1.classList.contains("set") ||
    cell2.classList.contains("set") ||
    cell3.classList.contains("set") ||
    cell4.classList.contains("set")
  ) {
    return;
  }

  currentEl.forEach(item => {
    item.classList.remove("figure");
  });

  currentEl = [cell1, cell2, cell3, cell4];

  currentEl.forEach(item => {
    item.classList.add("figure");
  });

  counter += 1;
}

function checkLine() {
  let lineArr = [];
  let lineOne = [];

  for (let y = 1; y < 15; y++) {
    for (let i = 1; i < 11; i++) {
      const item = document.querySelector(
        `[data-pos-x="${i}"][data-pos-y="${y}"]`
      );
      lineOne.push(item);
    }
    lineArr.push(lineOne);
    lineOne = [];
  }

  lineArr.forEach(item => {
    const check = item.every(test);

    if (check) {
      item.forEach(it => {
        it.classList.remove("set");
      });

      moveAllOnY();
    }
  });
}

function test(item) {
  return item.classList.contains("set");
}

function moveAllOnY() {
  const allCells = document.querySelectorAll(".excel.set");

  allCells.forEach(item => {
    const y = +item.dataset.posY;

    item.classList.remove("set");

    item = document.querySelector(
      `[data-pos-x="${item.dataset.posX}"][data-pos-y="${item.dataset.posY -
        1}"]`
    );

    item.classList.add("set");
  });
}
