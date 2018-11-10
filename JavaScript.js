var score = document.getElementById('score');
var map = document.getElementById('Map');
var rowNumber = 25;
var colNumber = 20;
var mapWidth = colNumber * 20 + 'px';
var mapHeight = rowNumber * 20 + 'px';
map.style.width = mapWidth;
map.style.height = mapHeight;
var snakeDIVPosition = [];
for ( var i = 0; i < rowNumber; i++) {
    var rowDIV = document.createElement('div');
    rowDIV.className = 'row';
    map.appendChild(rowDIV);
    var rowArray = [];

    for ( var j = 0; j < colNumber; j++) {
        var colDIV = document.createElement('div');
        colDIV.className = 'col';
        rowDIV.appendChild(colDIV);
        rowArray.push(colDIV);
    }
    snakeDIVPosition.push(rowArray);
}

var snake = [];

for ( var i = 0; i < 3; i++) {
    snakeDIVPosition[0][i].className = 'col activeSnake';
    snake[i] = snakeDIVPosition[0][i];
}

var x = 2;
var y = 0;
var scoreCount = 0;
var eggX = 0;
var eggY = 0;
var direction = 'right';
var changeDir = true;
var delayTimer = null;

document.onkeydown = function(event) {
    if (!changeDir) {
        return;
    }
    event = event || window.event;
    if (direction == 'right' && event.keyCode == 37) {
        return;
    }
    if (direction == 'left' && event.keyCode == 39) {
        return;
    }
    if (direction == 'up' && event.keyCode == 40) {
        return;
    }
    if (direction == 'down' && event.keyCode == 38) {
        return;
    }
    
    switch (event.keyCode) {
    case 37:
        direction = 'left';
        break;
    case 38:
        direction = 'up';
        break;
    case 39:
        direction = 'right';
        break;
    case 40:
        direction = 'down';
        break;
    }
    changeDir = false;
    delayTimer = setTimeout(function() {
        changeDir = true;
    }, 300);
};

function snakeMove() {
    switch (direction) {
    case 'left':
        x--;
        break;
    case 'right':
        x++;
        break;
    case 'up':
        y--;
        break;
    case 'down':
        y++;
        break;
    };
    if (x < 0 || y < 0 || x >= colNumber || y >= rowNumber) {
        alert('撞到墙壁了，游戏结束啦！！');
        clearInterval(moveTimer);
        return;
    }
    
    for ( var i = 0; i < snake.length; i++) {
        if (snake[i] == snakeDIVPosition[y][x]) {
            alert('咬到自己了，游戏结束啦！！');
            clearInterval(moveTimer);
            return;
        };
    }
    
    if (eggX == x && eggY == y) {
        snakeDIVPosition[eggY][eggX].className = 'col activeSnake';
        snake.push(snakeDIVPosition[eggY][eggX]);
        scoreCount++;
        score.innerHTML = scoreCount;
        createNewEgg();
    } else {
        snake[0].className = 'col';
        snake.shift();
        snakeDIVPosition[y][x].className = 'col activeSnake';
        snake.push(snakeDIVPosition[y][x]);
    };
};

var moveTimer = setInterval('snakeMove()', 300);

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};



function createNewEgg() {
    eggX = random(0, colNumber - 1);
    eggY = random(0, rowNumber - 1);

    if (snakeDIVPosition[eggY][eggX].className == 'col activeSnake') {
        createNewEgg();
    } else {
        snakeDIVPosition[eggY][eggX].className = 'col egg';
    }
};

createNewEgg();

var pause = document.getElementById('Pause');
var start = document.getElementById('Start');
var refresh = document.getElementById('Refresh');
var speed = document.getElementById('Speed');

pause.onclick = function() {
    clearInterval(moveTimer);
};

start.onclick = function() {
    clearInterval(moveTimer);
    moveTimer = setInterval('snakeMove()', speed1);
};

refresh.onclick = function() {
    window.location.reload();
};

var speed1 = 300;
speed.onclick = function() {
    speed1 -= 20;
    clearInterval(moveTimer);
    moveTimer = setInterval('snakeMove()', speed1);
};