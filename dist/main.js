"use strict";
const cells = Array.from(document.getElementsByClassName('cell'));
const marks = document.querySelectorAll('[data-turn]');
const board = document.querySelector('[data-board]');
const restartBtn = document.querySelector('[data-restart]');
const statusText = document.querySelector('[data-status]');
const INITIAL_TEXT = 'Choose A Mark To Start';
let options = [...Array(9)];
let roundWon = false;
let markSelected = false;
let turn;
marks.forEach((mark) => mark.addEventListener('click', selectMark));
cells.forEach((cell) => cell.addEventListener('click', cellClicked));
restartBtn.addEventListener('click', restartGame);
function selectMark() {
    var _a;
    if (!markSelected) {
        turn = (_a = this.textContent) === null || _a === void 0 ? void 0 : _a.toUpperCase();
        markSelected = true;
    }
}
function cellClicked() {
    if (turn === undefined || this.textContent !== '')
        return;
    options[[...cells].indexOf(this)] = turn;
    updateCell(this, turn);
    turn = turn === 'X' ? 'O' : 'X';
    updateText(`${turn}'s turn`);
    checkWinner();
    checkDraw();
}
function updateCell(cell, turn) {
    cell.textContent = turn;
}
function checker(n1, n2, n3) {
    if (options[n1] === options[n2] && options[n2] === options[n3] && options[n1] !== undefined) {
        cells.forEach((cell, index) => {
            if (index === n1 || index === n2 || index === n3) {
                cells[[...cells].indexOf(cell)].style.backgroundColor =
                    getComputedStyle(document.documentElement).getPropertyValue('--gray-color');
            }
        });
        roundWon = true;
        updateText(`${turn = turn === 'X' ? 'O' : 'X'}'s Won`);
        preventClick();
    }
}
function checkWinner() {
    for (let i = 0; i < options.length; i += 3) {
        checker(i, i + 1, i + 2);
    }
    for (let i = 0; i < options.length; i++) {
        checker(i, i + 3, i + 6);
    }
    checker(0, 4, 8);
    checker(2, 4, 6);
}
function checkDraw() {
    if (options.every(option => option !== undefined) && roundWon == false) {
        updateText('Draw!');
        preventClick();
    }
}
function preventClick() {
    board.classList.add('no-click');
}
function restartGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = getComputedStyle(cell).getPropertyValue('--cell-color');
    });
    markSelected = false;
    turn = undefined;
    updateText(INITIAL_TEXT);
    options = options.map(option => {
        option = undefined;
        return option;
    });
}
function updateText(text) {
    statusText.textContent = text;
}
