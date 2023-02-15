

const cells = Array.from(document.getElementsByClassName('cell') as HTMLCollectionOf<HTMLElement>)
const marks = document.querySelectorAll('[data-turn]')
const board = <HTMLDivElement> document.querySelector('[data-board]')
const restartBtn = <HTMLButtonElement> document.querySelector('[data-restart]')
const statusText = <HTMLHeadingElement> document.querySelector('[data-status]')

const INITIAL_TEXT = 'Choose A Mark To Start'

let options = [...Array(9)]

let roundWon: boolean = false
let markSelected: boolean = false

let turn: string | undefined

marks.forEach((mark): void => mark.addEventListener('click', selectMark))
cells.forEach((cell): void => cell.addEventListener('click', cellClicked))

restartBtn.addEventListener('click', restartGame)

function selectMark(this: any) {
   if (!markSelected) {
      turn = this.textContent?.toUpperCase()
      markSelected = true
   }
}

function cellClicked(this: any): void {

   if (turn === undefined || this.textContent !== '') return

   options[[...cells].indexOf(this)] = turn
   updateCell(this, turn)
   turn = turn === 'X' ? 'O' : 'X'
   updateText(`${turn}'s turn`)
   checkWinner()
   checkDraw()
}

function updateCell(cell: HTMLElement, turn: string): void {
   cell.textContent = turn
}

function checker(n1: number, n2: number, n3: number): void {
   if (options[n1] === options[n2] && options[n2] === options[n3] && options[n1] !== undefined) {
      cells.forEach((cell, index: number) => {
         if (index === n1 || index === n2 || index === n3) {
            cells[[...cells].indexOf(cell)].style.backgroundColor = 
            getComputedStyle(document.documentElement).getPropertyValue('--gray-color')
         }
      })
      roundWon = true;
      updateText(`${turn = turn === 'X' ? 'O' : 'X'}'s Won`)
      preventClick()
   }
}

function checkWinner(): void {

   for (let i = 0; i < options.length; i += 3) {
      checker(i, i+1, i+2)
   }

   for (let i = 0; i < options.length; i++) {
      checker(i, i+3, i+6)
   }

   checker(0, 4, 8)
   checker(2, 4, 6)
}

function checkDraw(): void {
   if (options.every(option => option !== undefined) && roundWon == false) {
      updateText('Draw!')
      preventClick()
   }
}

function preventClick(): void {
   board.classList.add('no-click')
}

function restartGame(): void {

   cells.forEach(cell => {
      cell.textContent = ''
      cell.style.backgroundColor = getComputedStyle(cell).getPropertyValue('--cell-color')
   })

   markSelected = false
   turn = undefined
   updateText(INITIAL_TEXT)
   options = options.map(option => {
      option = undefined
      return option
   })

}

function updateText(text: string): void {
   statusText.textContent = text
}
