function wrapWindowByMask() {
    //화면의 높이와 너비를 구한다.
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();

    //문서영역의 크기
    console.log( "document 사이즈:"+ $(document).width() + "*" + $(document).height());
    //브라우저에서 문서가 보여지는 영역의 크기
    console.log( "window 사이즈:"+ $(window).width() + "*" + $(window).height());

    //마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채운다.
    $('#cover').css({
        'width' : maskWidth,
        'height' : maskHeight
    });

    //애니메이션 효과
    //$('#mask').fadeIn(1000);
    $('#cover').fadeTo("slow", 0.5);
}
// 예매번호조회 팝업오픈
function popupOpen1() {
    $('.popup1').css("position", "absolute");
    //영역 가운에데 레이어를 뛰우기 위해 위치 계산
    $('.popup1').css("top",(($(window).height() - $('.popup1').outerHeight()) / 64) + $(window).scrollTop());
    $('.popup1').css("left",(($(window).width() - $('.popup1').outerWidth()) / 2) + $(window).scrollLeft());
    $('#layerbox1').show();
}
// 휴대폰번호조회 팝업오픈
function popupOpen2() {
    $('.popup2').css("position", "absolute");
    //영역 가운에데 레이어를 뛰우기 위해 위치 계산
    $('.popup2').css("top",(($(window).height() - $('.popup2').outerHeight()) / 64) + $(window).scrollTop());
    $('.popup2').css("left",(($(window).width() - $('.popup2').outerWidth()) / 2) + $(window).scrollLeft());
    $('#layerbox2').show();
}
// 예매권팝업 오픈
function popupOpen4() {
    $('.popup4').css("position", "absolute");
    //영역 가운에데 레이어를 뛰우기 위해 위치 계산
    $('.popup4').css("top",(($(window).height() - $('.popup4').outerHeight()) / 64) + $(window).scrollTop());
    $('.popup4').css("left",(($(window).width() - $('.popup4').outerWidth()) / 2) + $(window).scrollLeft());
    $('#layerbox4').show();
}

function popupClose1() {
    $('#layerbox1').hide();
    $('#cover').hide();
}
function popupClose2() {
    $('#layerbox2').hide();
    $('#cover').hide();
}
function popupClose4() {
    $('#layerbox4').hide();
    $('#cover').hide();
}
// 팝업구현함수
function goDetail1() {

/*팝업 오픈전 별도의 작업이 있을경우 구현*/

popupOpen1(); //레이어 팝업창 오픈
wrapWindowByMask(); //화면 마스크 효과
}
function goDetail2() {

/*팝업 오픈전 별도의 작업이 있을경우 구현*/

popupOpen2(); //레이어 팝업창 오픈
wrapWindowByMask(); //화면 마스크 효과
}
function goDetail4() {

/*팝업 오픈전 별도의 작업이 있을경우 구현*/

popupOpen4(); //레이어 팝업창 오픈
wrapWindowByMask(); //화면 마스크 효과
}

// popup1
// x표 누를시 팝업 종료
$(document).ready(function() {
$(".popup1").on('click', function() {
  if($(event.target).is("#close")){
    $(".cover").fadeOut('slow');
    $(".popup1").fadeOut('slow');
    formA.displayResultA.value
  }
});
})

// popup2
// x표 누를시 팝업 종료
$(document).ready(function() {
$(".popup2").on('click', function() {
  if($(event.target).is("#close")){
    $(".cover").fadeOut('slow');
    $(".popup2").fadeOut('slow');
    formB.displayResultB.value
  }
});
})

// 예매번호체크함수
function checkTicketNumber(str){

  var pass = str.value;
  var message = "";

  if(pass != "123412341234"){
    message = "예매정보가 없습니다. 첫화면으로 돌아갑니다."
  }

  if(message) {
    alert(message);
    str.value = "";
    location.href="1.html"
  } else {
    $(".popup1").fadeOut('slow'); // 고친부분
    goDetail4();
  }
}
//휴대폰번호체크함수
function checkPhoneNumber(str){

  var pass = str.value;
  var message = "";

  if(pass != "01012341234"){
    message = "예매정보가 없습니다. 첫화면으로 돌아갑니다."
  }

  if(message) {
    alert(message);
    str.value = "";
    location.href="1.html"
  } else {
    $(".popup2").fadeOut('slow');
    goDetail4();
  }
}
