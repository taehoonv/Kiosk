// 1번 table(4x4)을 생성함.

// 현재 선택된 좌석을 저장하기 위한 객체
// {
//   "A1": true,
//   "A2": false
// }
// 식으로 저장됨

function insert(result){
  txt.value += txt.value;
}

var personnel = document.getElementById('personnel');
var personnel_post = document.getElementById('personnel_post');
personnel_post.value = personnel.innerHTML;

const selectedSeatsObj = {}
const row = 4
const col = 8
const table = document.createElement("div")
const selectedSeat = document.createElement("div")
var d = new Date();
var m = d.getMonth();
var today = d.getFullYear() + "." + (d.getMonth()+1)
      + "." + d.getDate(); 
try{
  document.getElementById("date").innerHTML = `날짜: ${today}`;
}catch(e){

};
selectedSeat.setAttribute("id", "selectedSeat")
table.setAttribute("class", "table")

let isClear = undefined

for (let i = 0 ; i < row ; i++) {
  const rowElement = document.createElement("div")
  rowElement.setAttribute("class", "row")
  for (let j = 0 ; j < col ; j++) {
    const colElement = document.createElement("span")
    colElement.setAttribute("class", "col cell off")

    // value to reference when calculating what to color
    colElement.setAttribute("data-row", i)
    colElement.setAttribute("data-col", j)
    switch (i){
      case 0:
      colElement.innerHTML = `A${j+1}`;
      break;
      case 1:
      colElement.innerHTML = `B${j+1}`;
      break;
      case 2:
      colElement.innerHTML = `C${j+1}`;
      break;
      case 3:
      colElement.innerHTML = `D${j+1}`;
      break;
      case 4:
      colElement.innerHTML = `E${j+1}`;
      break;
    }
    rowElement.appendChild(colElement)
  }
  table.appendChild(rowElement)
  
}

const changeColor = (row, col) => {
  const element = table.children[row].children[col]
  const classNames = element.getAttribute("class").split(' ')
  const status = classNames[classNames.length - 1]

  if (status === 'on') {
    element.setAttribute("class", "col cell off")
    // 원래 status가 'on'이었으면, 누르면서 선택 상태를 해제 -> false로 만듬
    selectedSeatsObj[element.innerHTML] = false
  } else {
    element.setAttribute("class", "col cell on")
    // 원래 status가 'off'이었으면, 누르면서 선택 상태로 만듬 -> true로 만듬
    selectedSeatsObj[element.innerHTML] = true
  }

  const seats = Object.keys(selectedSeatsObj) // Key의 값만 받아서 배열로 만듬 (["A1", "A2"] 식으로)
  const selectedSeats = seats.filter(seat => {
    // 위의 배열을 하나씩 돌면서, 해당 Key의 Value가 true인 것만 골라서 새로운 배열로 만듬
    // seats 배열: ["A1", "A2"]
    // selectedSeatsObj 객체 : { "A1": true, "A2": false }
    // selectedSeats = ["A1"]
    if (selectedSeatsObj[seat]) return true
  })
  const selectedSeatsStr = selectedSeats.reduce((acc, seat) => {
    // 배열 내의 값들을 하나의 String으로 합친다
    return `${acc},${seat}`
  }, "").slice(1) // 맨 앞에 붙은 ',' 삭제

  // 실제 요소에 적용
  document.getElementById("selectedSeat").innerHTML = `좌석: ${selectedSeatsStr}`;
  }


const change1Tiles = (clickedRow, clickedCol) => {
  changeColor(clickedRow, clickedCol)
}

/*
const change2Tiles = (clickedRow, clickedCol) => {
  changeColor(clickedRow, clickedCol)
  changeColor(clickedRow, clickedCol + 1)
}

const change3Tiles = (clickedRow, clickedCol) => {
  changeColor(clickedRow, clickedCol)
  changeColor(clickedRow, clickedCol + 1)
  changeColor(clickedRow, clickedCol + 2)
}

const change4Tiles = (clickedRow, clickedCol) => {
  changeColor(clickedRow, clickedCol)
  changeColor(clickedRow, clickedCol + 1)
  changeColor(clickedRow, clickedCol + 2)
  changeColor(clickedRow, clickedCol + 3)
}

const change5Tiles = (clickedRow, clickedCol) => {
  changeColor(clickedRow, clickedCol)
  changeColor(clickedRow, clickedCol + 1)
  changeColor(clickedRow, clickedCol + 2)
  changeColor(clickedRow, clickedCol + 3)
  changeColor(clickedRow, clickedCol + 4)
}*/


const changeTiles = (e) => {
  // base coordinate
  const clickedRow = parseInt(e.target.dataset.row)
  const clickedCol = parseInt(e.target.dataset.col)
  change1Tiles(clickedRow, clickedCol)
  /*
    if(personnel_post.value === `인원: 1명`) {
      
    }
   else if(personnel_post === `인원: 2명`){
      change2Tiles(clickedRow, clickedCol)
    }
    else if(personnel_post === `인원: 3명`){
      change3Tiles(clickedRow, clickedCol)
    }
    else if(personnel_post === `인원: 4명`){
      change4Tiles(clickedRow, clickedCol)
    }
    else if(personnel_post === `인원: 5명`){
      change5Tiles(clickedRow, clickedCol)
    }*/
  }

const isClearCheck = (row, col) => {
    const element = table.children[row].children[col]
    const classNames = element.getAttribute("class").split(' ')
    const status = classNames[classNames.length - 1]
    if (status === 'on') return true
    else return false
  }

// 좌석이 모두 예약되면 알림!
  for (let i = 0 ; i < row ; i++) {
    for (let j = 0 ; j < col ; j++) {
      isClear = isClearCheck(i,j)
      if (isClear === false) break
    }
    if (isClear === false) break
  }
  if (isClear === true) alert('좌석 모두 예약됨!')

table.addEventListener("click", changeTiles)

document.getElementsByClassName("wrapper")[0].appendChild(table)


/* 공유 객체 생성

const movieInfo {
  title:
  image:
  grade:
}


// 다차원 객체를 갖는 selectedInfo

const selectedInfo {
  movieInfo: {위와 같음}
  date:
  time:
  adultPersonnel:
  childPersonnel:
  totalPrice:
}

/*

/* 공유 객체를 통해 3번 화면에서 선택된 인원을 표시해준다.
const personnel = document.getElementById("pesonnel")
personnel.innerHTML(`인원: 성인${adultPersonnel}명, 청소년${childPersonnel}명}`);
*/
 
/* 인원 수에 따른 조건 분기 
const change2Tiles = (clickedRow, clickedCol) => {
  changeColor(clickedRow, clickedCol)
  changeColor(clickedRow, clickedCol + 1)
}

const change3Tiles = (clickedRow, clickedCol) => {
  changeColor(clickedRow, clickedCol)
  changeColor(clickedRow, clickedCol + 1)
  changeColor(clickedRow, clickedCol + 2)
}

const change4Tiles = (clickedRow, clickedCol) => {
  changeColor(clickedRow, clickedCol)
  changeColor(clickedRow, clickedCol + 1)
  changeColor(clickedRow, clickedCol + 2)
  changeColor(clickedRow, clickedCol + 3)
}

const change5Tiles = (clickedRow, clickedCol) => {
  changeColor(clickedRow, clickedCol)
  changeColor(clickedRow, clickedCol + 1)
  changeColor(clickedRow, clickedCol + 2)
  changeColor(clickedRow, clickedCol + 3)
  changeColor(clickedRow, clickedCol + 4)
}

const changeTiles = (e) => {
  // base coordinate
  var personnel = document.getElementById('personnel');
  var personnel_post = document.getElementById('personnel_post');
  const clickedRow = parseInt(e.target.dataset.row)
  const clickedCol = parseInt(e.target.dataset.col)
    if(personnel_post.value === 1) {
      change1Tiles(clickedRow, clickedCol)
    }
    else if(personnel_post.value === 2){
      change2Tiles(clickedRow, clickedCol)
    }
    else if(personnel_post.value === 3){
      change3Tiles(clickedRow, clickedCol)
    }
    else if(personnel_post.value === 4){
      change4Tiles(clickedRow, clickedCol)
    }
    else if(personnel_post.value === 5){
      change5Tiles(clickedRow, clickedCol)
    }
  }

*/


/* JQuery Example
var arrSelected = new Array();
var tempSelected;
			$(function(){
				$(".table").click(function(){
					tempSelected = new Array();
					var clicked = $(this).val();
					tempSelected.push(clicked);
				});
      });

function seatingSelect(){
  arrSelected.push(tempSelected);
  document.getElementById("selectedSeat").innerHTML = arrSelected;
}
*/
