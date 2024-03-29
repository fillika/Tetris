const mainTetris = document.createElement("div");
const main = document.querySelector(".main");

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

const createRandomFigure = {
  init: function() {
    return this.createFigure();
  },

  x: 5,
  y: 15,

  mainArr: [
    // палка
    [[0, 1], [0, 2], [0, 3]],
    //Квадрат
    [[1, 0], [0, 1], [1, 1]],
    //  L
    [[1, 0], [0, 1], [0, 2]],
    // reverse L
    [[1, 0], [1, 1], [1, 2]],
    // flash right
    [[1, 0], [-1, 1], [0, 1]],
    // flash left
    [[1, 0], [1, 1], [2, 1]],
    // T
    [[1, 0], [2, 0], [1, 1]]
  ],
  figureBody: 0,

  createFigure: function() {
    const num = this.getRandom();

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

const game = {};

tetris.init();

let body = createRandomFigure.init();

moveFigure();

let interval = setInterval(() => {
  moveFigure();
}, 300);

function moveFigure() {
  let moveFlag = true;

  // Получаем координаты текущего местоположения фигуры (всех её частей)
  let coordinates = getCoords(body);

  // Проверка, коснулись ли мы дна или коснулись другой фигуры
  // Проверяя, есть ли класс Set
  for (let i = 0; i < coordinates.length; i++) {
    if (
      coordinates[i][1] == 1 ||
      document
        .querySelector(
          `[data-pos-x="${coordinates[i][0]}"][data-pos-y="${coordinates[i][1] -
            1}"]`
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

    body = createRandomFigure.init();
  }
}

function getCoords(arr) {
  let coordinates = [
    [arr[0].dataset.posX, arr[0].dataset.posY],
    [arr[1].dataset.posX, arr[1].dataset.posY],
    [arr[2].dataset.posX, arr[2].dataset.posY],
    [arr[3].dataset.posX, arr[3].dataset.posY]
  ];

  return coordinates;
}

function getNewState(a) {
  let flag = true;
  let coordinates = getCoords(body);
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

window.addEventListener("keydown", e => {
  if (e.keyCode === 37) {
    getNewState(-1);
  }
  if (e.keyCode === 39) {
    getNewState(+1);
  }
  if (e.keyCode === 40) {
    moveFigure();
  }
});
