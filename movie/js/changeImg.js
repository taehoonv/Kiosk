var i = 0; // start point
var images = [];
var time = 3000;

// Image List
images[0] = 'img/adver1.png';
images[1] = 'img/adver2.png';

function changeImg(){
  document.slide.src = images[i];

  if( i < images.length - 1){
    i++;
  } else {
    i = 0;
  }

  setTimeout("changeImg()", time);
}

window.onload = changeImg;
