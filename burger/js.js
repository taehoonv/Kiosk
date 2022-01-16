var arrOrdered = new Array();
var total = 0;
$(function() { // 장바구니 버튼 누를 떄
    $("#shopping_list").on("click", function() {
        $("#purchase_option").slideDown(); // 장소와 결제방법 보이기
        $("#menuselect").slideUp(); // 메뉴 선택창 안보이기
        $(".twoblock").slideUp();
        //$(".threeblock").slideUp();
        $("#blank").slideDown(); // 메뉴 사이 빈 공간 제거
        $("#cancel").html('취소'); // 버튼 취소와 이전 변경
        var prev = document.getElementById("prev");
        prev.style.display = "none"; // 이전 없애기
        var can = document.getElementById("cancel");
        can.style.display = ""; // 취소 활성화
        var pur = document.getElementById("purchase");
        pur.style.display = "";
        var shop = document.getElementById("shopping_list");
        shop.style.display = "none";

        $("#recipts").animate({
            height : "240"
        });
    }); // 고른 메뉴 확장
 });
$(function() { // 취소 버튼 누를 때 결제 버튼 누를 때와 반대
    $("#cancel").on("click", function() {
        $("#purchase_option").slideUp();
        $("#menuselect").slideDown();
        $(".twoblock").slideDown();
        //$(".threeblock").slideDown();
        $("#blank").slideUp();
        $("#cancel").html('이전')
        var prev = document.getElementById("prev");
        prev.style.display = "";
        var can = document.getElementById("cancel");
        can.style.display = "none";
        var pur = document.getElementById("purchase");
        pur.style.display = "none";
        var shop = document.getElementById("shopping_list");
        shop.style.display = "";

        $("#recipts").animate({
            height : "80"
        });
    });
});

$(function() {
    $(".menu_click").on("click", function(){
        add_div(this.id, this.value);
    })
})

function selectHere() { // 매장 식사 누를 시
    var here = document.getElementById("here");
    here.style.background = "#8FC43B"
    var togo = document.getElementById("togo");
    togo.style.background = "#FFF"
}

function selectTogo() { // 포장 누를 시
    var here = document.getElementById("here");
    here.style.background = "#FFF"
    var togo = document.getElementById("togo");
    togo.style.background = "#8FC43B"
}

function selectCard() { // 카드결제 누를 시
    var dis = document.getElementById("purchase");
    dis.disabled = false;
    var card = document.getElementById("card");
    card.style.background = "#8FC43B"
    var mobile = document.getElementById("mobile");
    mobile.style.background = "#FFF"
    var popCard = document.getElementById("popCard");
    popCard.style.display = "";
    var popCoupon = document.getElementById("popCoupon");
    popCoupon.style.display = "none";
}

function selectMobile() { // 모바일 결제 누를 시
    var dis = document.getElementById("purchase");
    dis.disabled = false;
    var card = document.getElementById("card");
    card.style.background = "#FFF";
    var mobile = document.getElementById("mobile");
    mobile.style.background = "#8FC43B"
    var popCard = document.getElementById("popCard");
    popCard.style.display = "none";
    var popCoupon = document.getElementById("popCoupon");
    popCoupon.style.display = "";
}

function wrapWindowByMask_LHB() { // 화면의 높이와 너비를 구한다.
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();
    // 문서영역의 크기
    console.log("document 사이즈:" + $(document).width() + "*" + $(document).height());
    // 브라우저에서 문서가 보여지는 영역의 크기
    console.log("window 사이즈:" + $(window).width() + "*" + $(window).height());
    // 마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채운다.
    $('#mask').css({
        'width': maskWidth,
        'height': maskHeight
    });
    // 애니메이션 효과
    // $('#mask').fadeIn(1000);
    $('#mask').fadeTo("slow", 0.5);
}

function popupOpen_LHB() {
    $('.layerpop_LHB').css("position", "absolute");
    // 영역 가운에데 레이어를 뛰우기 위해 위치 계산
    $('.layerpop_LHB').css("top", (($(window).height() - $('.layerpop_LHB').outerHeight()) / 2) + $(window).scrollTop());
    $('.layerpop_LHB').css("left", (($(window).width() - $('.layerpop_LHB').outerWidth()) / 2) + $(window).scrollLeft());
    $('#layerbox_LHB').show();
}

function popupClose_LHB() {
    $('#layerbox_LHB').hide();
    $('#mask').hide();
}
$(function() {
    $("#purchase").click(function() {
        popupOpen_LHB(); // 레이어 팝업창 오픈
        wrapWindowByMask_LHB(); // 화면 마스크 효과
    });
});

function popupComplete_LHB() {
    $('#layerbox_LHB').hide();
    $('#mask').hide();
}

$(function() { // 취소 버튼 누를 때 결제 버튼 누를 때와 반대
    $("#mask").on("click", function() {
        popupComplete_LHB();
        popupOpen_LHB2();
        wrapWindowByMask_LHB2();
    })
})


//
function wrapWindowByMask_LHB2() { // 화면의 높이와 너비를 구한다.
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();
    // 문서영역의 크기
    console.log("document 사이즈:" + $(document).width() + "*" + $(document).height());
    // 브라우저에서 문서가 보여지는 영역의 크기
    console.log("window 사이즈:" + $(window).width() + "*" + $(window).height());
    // 마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채운다.
    $('#mask2').css({
        'width': maskWidth,
        'height': maskHeight
    });
    // 애니메이션 효과
    // $('#mask').fadeIn(1000);
    $('#mask2').fadeTo("slow", 0.5);
}

function popupOpen_LHB2() {
    $('.layerpop_LHB2').css("position", "absolute");
    // 영역 가운에데 레이어를 뛰우기 위해 위치 계산
    $('.layerpop_LHB2').css("top", (($(window).height() - $('.layerpop_LHB2').outerHeight()) / 2) + $(window).scrollTop());
    $('.layerpop_LHB2').css("left", (($(window).width() - $('.layerpop_LHB2').outerWidth()) / 2) + $(window).scrollLeft());
    $('#layerbox_LHB2').show();
}

function popupClose_LHB2() {
    $('#layerbox_LHB2').hide();
    $('#mask2').hide();
}

function popupComplete_LHB2() {
    $('#layerbox_LHB2').hide();
    $('#mask2').hide();
}

$(function() {
    $("#mask2").on("click", function() {
        popupComplete_LHB();
        location.href= '../index.html';
    })
})
//



function remove_div(obj) {
    var quan = obj.parentNode.childNodes[5].childNodes[7].innerText;
    var price = obj.parentNode.childNodes[9].textContent;
    var temp = quan*price;
    total = total-temp;
    $('#total_price').html('총 '+numberWithCommas(total)+'원');
    //document.getElementById('recipts').removeChild(obj.parentNode);
    obj.parentNode.parentNode.removeChild(obj.parentNode);

}

function add_div(name, price){
    var div = document.createElement("div");
    $('#menu_name').html(name);
    $('#menu_price').html(numberWithCommas(price*1));
    $('#origin_price').html(price*1);
    total = total+price*1;
    $('#total_price').html('총 '+numberWithCommas(total)+'원');
    div.innerHTML = document.getElementById('recipt_origin').innerHTML;
    div.className = 'recipt_LHB';
    document.getElementById('recipts').appendChild(div);
}

function add_quantity(obj){
    var quan = obj.parentNode.childNodes[7].innerText;
    var temp = quan*1 + 1
    var origin = obj.parentNode.parentNode.childNodes[9].innerText
    obj.parentNode.childNodes[7].innerText = temp;
    obj.parentNode.parentNode.childNodes[7].innerText = numberWithCommas(origin * temp);
    total = total*1+origin*1;
    $('#total_price').html('총 '+numberWithCommas(total)+'원');
}

function sub_quantity(obj){
    var quan = obj.parentNode.childNodes[7].innerText;
    if(quan > 1){
        var temp = quan*1 - 1
        var origin = obj.parentNode.parentNode.childNodes[9].innerText
        obj.parentNode.childNodes[7].innerText = temp;
        obj.parentNode.parentNode.childNodes[7].innerText = numberWithCommas(origin * temp);
        total = total*1-origin*1;
        $('#total_price').html('총 '+numberWithCommas(total)+'원');
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
