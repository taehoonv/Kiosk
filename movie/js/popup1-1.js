function insertvalue(result){
  formA.displayResultA.value=formA.displayResultA.value+result;
}
function insertvalueB(result){
  formB.displayResultB.value=formB.displayResultB.value+result;
}
function reset(){
  document.getElementById('displayResultA').value = "";
  document.getElementById('displayResultB').value = "";
}
// 고친 부분 1002
function backNumberA(){
  var value = formA.displayResultA.value;
  formA.displayResultA.value= value.substr(0, value.length - 1);
}
function backNumberB(){
  var value = formB.displayResultB.value;
  formB.displayResultB.value= value.substr(0, value.length - 1);
}
