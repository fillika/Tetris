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
const figuresNames = ["I", "J", "O", "L", "Z", "T", "S"];
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

/*
// Создает фигуру (случано генерирует её
const createRandomFigure = {
  init: function(num) {
    return this.createFigure(num);
  },

  x: 5,
  y: 15,

  mainArr: [
    // палка
    [
      [0, 1],
      [0, 2],
      [0, 3],
      //  Поворот на 90 градусов
      [[-1, 1], [0, 0], [1, -1], [2, -2]],
      //  Поворот на 180 градусов
      [[1, -1], [0, 0], [-1, 1], [-2, 2]],
      // Поворот на 270 градусов
      [[-1, 1], [0, 0], [1, -1], [2, -2]],
      //  Поворот на 360 градусов
      [[1, -1], [0, 0], [-1, 1], [-2, 2]]
    ],
    //Квадрат
    [
      [1, 0],
      [0, 1],
      [1, 1],
      //  Поворот на 90 градусов
      [[0, 0], [0, 0], [1, -1], [0, 0]],
      //  Поворот на 180 градусов
      [[0, 0], [0, 0], [-1, 1], [0, 0]],
      // Поворот на 270 градусов
      [[0, 0], [0, 0], [1, -1], [0, 0]],
      //  Поворот на 360 градусов
      [[0, 0], [0, 0], [0, 0], [0, 0]]
    ],
    //  L
    [
      [1, 0],
      [0, 1],
      [0, 2],
      //  Поворот на 90 градусов
      [[0, 0], [-1, 1], [1, 0], [2, -1]],
      //  Поворот на 180 градусов
      [[1, -1], [1, -1], [-1, 0], [-1, 0]],
      // Поворот на 270 градусов
      [[-1, 0], [0, -1], [2, -2], [1, -1]],
      //  Поворот на 360 градусов
      [[0, -1], [0, -1], [-2, 0], [-2, 0]]
    ],
    // reverse L
    [
      [1, 0],
      [1, 1],
      [1, 2],
      //  Поворот на 90 градусов
      [[0, 0], [0, 0], [1, -1], [-1, -1]],
      //  Поворот на 180 градусов
      [[0, -1], [-1, 0], [-2, 1], [1, 0]],
      // Поворот на 270 градусов
      [[2, 0], [0, 0], [1, -1], [1, -1]],
      //  Поворот на 360 градусов
      [[-2, 0], [1, -1], [0, 0], [-1, 1]]
    ],
    // flash right
    [
      [1, 0],
      [-1, 1],
      [0, 1],
      //  Поворот на 90 градусов
      [[0, -1], [-1, 0], [2, -1], [1, 0]],
      //  Поворот на 180 градусов
      [[0, 0], [1, -1], [-2, 0], [-1, -1]],
      // Поворот на 270 градусов
      [[0, -1], [-1, 0], [2, -1], [1, 0]],
      //  Поворот на 360 градусов
      [[0, 0], [1, -1], [-2, 0], [-1, -1]]
    ],
    // flash left
    [
      [1, 0],
      [1, 1],
      [2, 1],
      //  Поворот на 90 градусов
      [[2, -1], [0, 0], [1, -1], [-1, 0]],
      //  Поворот на 180 градусов
      [[-2, 0], [0, -1], [-1, 0], [1, -1]],
      // Поворот на 270 градусов
      [[2, -1], [0, 0], [1, -1], [-1, 0]],
      //  Поворот на 360 градусов
      [[-2, 0], [0, -1], [-1, 0], [1, -1]]
    ],
    // T
    [
      [1, 0],
      [2, 0],
      [1, 1], //  Поворот на 90 градусов
      [[1, -1], [0, 0], [0, 0], [0, 0]],
      //  Поворот на 180 градусов
      [[0, 0], [-1, 0], [-1, 0], [1, -1]],
      // Поворот на 270 градусов
      [[1, -1], [1, -1], [1, -1], [0, 0]],
      //  Поворот на 360 градусов
      [[-2, 0], [0, -1], [0, -1], [-1, -1]]
    ]
  ],
  figureBody: 0,

  createFigure: function(num) {
    this.figureBody = [
      document.querySelector(
        `[data-pos-x="${this.x}"][data-pos-y="${this.y}"]`
      ),
      document.querySelector(
        `[data-pos-x="${this.x + this.getX(num, 0)}"][data-pos-y="${this.y +
          this.getY(num, 0)}"]`
      ),
      document.querySelector(
        `[data-pos-x="${this.x + this.getX(num, 1)}"][data-pos-y="${this.y +
          this.getY(num, 1)}"]`
      ),
      document.querySelector(
        `[data-pos-x="${this.x + this.getX(num, 2)}"][data-pos-y="${this.y +
          this.getY(num, 2)}"]`
      )
    ];

    for (let i = 0; i < this.figureBody.length; i++) {
      this.figureBody[i].classList.add("figure");
    }

    return this.figureBody;
  },

  getRandom: function() {
    return Math.round(Math.random() * (this.mainArr.length - 1));
  },

  getX: function(num, x) {
    return this.mainArr[num][x][0];
  },
  getY: function(num, y) {
    return this.mainArr[num][y][1];
  }
};
// Все, что связано с движением фигур (вниз, влево, вправо)
const move = {
  moveFigure: function(num) {
    let moveFlag = true;

    // Получаем координаты текущего местоположения фигуры (всех её частей)
    let coordinates = this.getCoords(body);

    // Проверка, коснулись ли мы дна или коснулись другой фигуры
    // Проверяя, есть ли класс Set
    for (let i = 0; i < coordinates.length; i++) {
      if (
        coordinates[i][1] == 1 ||
        document
          .querySelector(
            `[data-pos-x="${coordinates[i][0]}"][data-pos-y="${coordinates[
              i
            ][1] - 1}"]`
          )
          .classList.contains("set")
      ) {
        moveFlag = false;
        break;
      }
    }

    if (moveFlag) {
      // Удаляем визуально
      for (let i = 0; i < body.length; i++) {
        body[i].classList.remove("figure");
      }

      // Присваиваем новые координаты по Y (как бы создаем иллюзию движения)
      body = [
        document.querySelector(
          `[data-pos-x="${coordinates[0][0]}"][data-pos-y="${coordinates[0][1] -
            1}"]`
        ),
        document.querySelector(
          `[data-pos-x="${coordinates[1][0]}"][data-pos-y="${coordinates[1][1] -
            1}"]`
        ),
        document.querySelector(
          `[data-pos-x="${coordinates[2][0]}"][data-pos-y="${coordinates[2][1] -
            1}"]`
        ),
        document.querySelector(
          `[data-pos-x="${coordinates[3][0]}"][data-pos-y="${coordinates[3][1] -
            1}"]`
        )
      ];

      // Снова присваиваем класс, чтобы визуально отобразить фигуру на клетку ниже
      for (let i = 0; i < body.length; i++) {
        body[i].classList.add("figure");
      }
    } else {
      for (let i = 0; i < body.length; i++) {
        body[i].classList.remove("figure");
        body[i].classList.add("set");
      }

      body = createRandomFigure.init(num);
    }
  },
  getCoords: function(arr) {
    return [
      [arr[0].dataset.posX, arr[0].dataset.posY],
      [arr[1].dataset.posX, arr[1].dataset.posY],
      [arr[2].dataset.posX, arr[2].dataset.posY],
      [arr[3].dataset.posX, arr[3].dataset.posY]
    ];
  },
  getNewState: function(a) {
    let flag = true;
    let coordinates = this.getCoords(body);
    let figureNew = [
      document.querySelector(
        `[data-pos-x="${+coordinates[0][0] + a}"][data-pos-y="${
          coordinates[0][1]
        }"]`
      ),
      document.querySelector(
        `[data-pos-x="${+coordinates[1][0] + a}"][data-pos-y="${
          coordinates[1][1]
        }"]`
      ),
      document.querySelector(
        `[data-pos-x="${+coordinates[2][0] + a}"][data-pos-y="${
          coordinates[2][1]
        }"]`
      ),
      document.querySelector(
        `[data-pos-x="${+coordinates[3][0] + a}"][data-pos-y="${
          coordinates[3][1]
        }"]`
      )
    ];

    figureNew.forEach((item, i) => {
      if (!figureNew || figureNew[i].classList.contains("set")) {
        flag = false;
      }
    });

    if (flag) {
      for (let i = 0; i < body.length; i++) {
        body[i].classList.remove("figure");
      }

      body = figureNew;

      for (let i = 0; i < body.length; i++) {
        body[i].classList.add("figure");
      }
    }
  }
};

const game = {};

tetris.init();

let num = createRandomFigure.getRandom();

let body = createRandomFigure.init(num);

move.moveFigure(num);

let interval = setInterval(() => {
  move.moveFigure(num);
}, 300);

let rotate = 1;

let coordinates = move.getCoords(body);

window.addEventListener("keydown", e => {
  if (e.keyCode === 37) {
    move.getNewState(-1);
  }
  if (e.keyCode === 39) {
    move.getNewState(+1);
  }
  if (e.keyCode === 40) {
    move.moveFigure();
  }
  if (e.keyCode === 38) {
    let flag = true;
    let coordinates = move.getCoords(body);
    let figureNew = [
      document.querySelector(
        `[data-pos-x="${+coordinates[0][0] +
          createRandomFigure.mainArr[num][
            rotate + 2
          ][0][0]}"][data-pos-y="${+coordinates[0][1] +
          createRandomFigure.mainArr[num][rotate + 2][0][1]}"]`
      ),
      document.querySelector(
        `[data-pos-x="${+coordinates[1][0] +
          createRandomFigure.mainArr[num][
            rotate + 2
          ][1][0]}"][data-pos-y="${+coordinates[1][1] +
          createRandomFigure.mainArr[num][rotate + 2][1][1]}"]`
      ),
      document.querySelector(
        `[data-pos-x="${+coordinates[2][0] +
          createRandomFigure.mainArr[num][
            rotate + 2
          ][2][0]}"][data-pos-y="${+coordinates[2][1] +
          createRandomFigure.mainArr[num][rotate + 2][2][1]}"]`
      ),
      document.querySelector(
        `[data-pos-x="${+coordinates[3][0] +
          createRandomFigure.mainArr[num][
            rotate + 2
          ][3][0]}"][data-pos-y="${+coordinates[3][1] +
          createRandomFigure.mainArr[num][rotate + 2][3][1]}"]`
      )
    ];

    figureNew.forEach((item, i) => {
      if (!figureNew || figureNew[i].classList.contains("set")) {
        flag = false;
      }
    });

    if (flag) {
      for (let i = 0; i < body.length; i++) {
        body[i].classList.remove("figure");
      }

      body = figureNew;

      for (let i = 0; i < body.length; i++) {
        body[i].classList.add("figure");
      }

      if (rotate < 4) {
        rotate++;
      } else {
        rotate = 1;
      }
    }
  }
});
*/
