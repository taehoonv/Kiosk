function wrapWindowByMask() { // 화면의 높이와 너비를 구한다.
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();
    // 문서영역의 크기
    console.log("document 사이즈:" + $(document).width() + "*" + $(document).height());
    // 브라우저에서 문서가 보여지는 영역의 크기
    console.log("window 사이즈:" + $(window).width() + "*" + $(window).height());
    // 마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채운다.
    $('#LSY_mask').css({'width': maskWidth, 'height': maskHeight});
    // 애니메이션 효과
    // $('#mask').fadeIn(1000);
    $('#LSY_mask').fadeTo("slow", 0.5);
}
function popupOpen() {
    $('.LSY_layerpop').css("position", "absolute");
    // 영역 가운에데 레이어를 뛰우기 위해 위치 계산
    $('.LSY_layerpop').css("top", (($(window).height() - $('.LSY_layerpop').outerHeight()) / 2) + $(window).scrollTop());
    $('.LSY_layerpop').css("left", (($(window).width() - $('.LSY_layerpop').outerWidth()) / 2) + $(window).scrollLeft());
    $('#LSY_layerbox').show();
}
function popupforceClose() {
    $('#LSY_layerbox').hide();
    $('#LSY_mask').hide();
    popup_reset();
}
function popupClose() {
    $('#LSY_layerbox').hide();
    $('#LSY_mask').hide();
    var bacon = document.getElementById("베이컨");
    var patty = document.getElementById("패티");
    var cheese = document.getElementById("치즈");
    var tomato = document.getElementById("토마토");
    if(bacon.style.backgroundColor == "rgb(245, 243, 213)"){tempName+="+베이컨"; tempPrice = tempPrice*1 + 500;}
    if(patty.style.backgroundColor == "rgb(245, 243, 213)"){tempName+="+패티"; tempPrice = tempPrice*1 + 1200;}
    if(cheese.style.backgroundColor == "rgb(245, 243, 213)"){tempName+="+치즈"; tempPrice = tempPrice*1 + 300;}
    if(tomato.style.backgroundColor == "rgb(245, 243, 213)"){tempName+="+토마토"; tempPrice = tempPrice*1 + 300;}
    add_div(tempName+tempName2+tempName3, tempPrice*1 + tempPrice2*1 + tempPrice3*1);
    popup_reset();
}
function goDetail() {
    popupOpen(); // 레이어 팝업창 오픈
    wrapWindowByMask(); // 화면 마스크 효과
}
var getName;
var getPrice;
var tempName;
var tempPrice;
$(function () {
    $(".burger").on("click", function () {
        getId = this.id.split(' ')[0];
        getName = this
            .id
            .split(' ')
            .slice(1)
            .join(' ');
        getPrice = this.value;
        $('#soloImage').attr('src', './option/' + getId + '.png')
        $('#soloName').text(getName + ' 단품');
        $('#soloPrice').text(numberWithCommas(getPrice) + '원');
        $('#setImage').attr('src', './option/' + getId + 'set.png')
        $('#setName').text(getName + ' 세트');
        $('#setPrice').text(numberWithCommas(getPrice * 1 + 1000) + '원');
        goDetail();
    })
})
function popup_reset() { // 레이어 1번으로 돌아가기
    var title = document.getElementById("LSY_title");
    var subtitle = document.getElementById("LSY_subtitle")
    $(title).text("구성 선택");
    $(subtitle).text(" 구성을 선택해 주세요.");
    document
        .getElementById('LSY_drink')
        .style
        .display = 'none';
    document
        .getElementById('LSY_side')
        .style
        .display = 'none';
    document
        .getElementById('LSY_Ingredient')
        .style
        .display = 'none';
    $('#LSY_option').show();
    document
        .getElementById('LSY_next')
        .style
        .display = '';
    document
        .getElementById('LSY_previous1')
        .style
        .display = 'none';
    document
        .getElementById('LSY_next_page1')
        .style
        .display = 'none';
    document
        .getElementById('LSY_previous2')
        .style
        .display = 'none';
    document
        .getElementById('LSY_next_page2')
        .style
        .display = 'none';
    document
        .getElementById('LSY_previous3')
        .style
        .display = 'none';
    document
        .getElementById('LSY_next_page3')
        .style
        .display = 'none';
    // 버튼 모두 초기화
    $('.LSY_opt').css('background-color', '#ffffff');
    $('.LSY_1st').css('background-color', '#ffffff');
    $('.LSY_2nd').css('background-color', '#ffffff');
    $('.LSY_3rd').css('background-color', '#ffffff');
    $('#LSY_next').css('background-color', '#C5E1A5');
    document.getElementById('LSY_next').disabled = 'disabled';
    $('#LSY_next_page1').css('background-color', '#C5E1A5');
    document.getElementById('LSY_next_page1').disabled = 'disabled';
    $('#LSY_next_page2').css('background-color', '#C5E1A5');
    document.getElementById('LSY_next_page2').disabled = 'disabled';
    $('#LSY_next_page3').css('background-color', '#C5E1A5');
    document.getElementById('LSY_next_page3').disabled = 'disabled';
    checked = 0;
    tempPrice = 0;
    tempPrice2 = 0;
    tempPrice3 = 0;
    tempName = '';
    tempName2 = '';
    tempName3 = '';
}
// 구성 선택에서 확인
$(function () {
    $("#LSY_next").on("click", function () {
        $("#LSY_option").slideUp();
        $("#LSY_Ingredient").slideDown();
        var title = document.getElementById("LSY_title");
        var subtitle = document.getElementById("LSY_subtitle")
        $(title).text("재료 선택");
        $(subtitle).text(" 재료를 선택해 주세요.");
        var next = document.getElementById("LSY_next");
        var previous = document.getElementById("LSY_previous1");
        var finish = document.getElementById("LSY_next_page1");
        next.style.display = "none";
        previous.style.display = "";
        finish.style.display = "";
    });
});
// 재료 선택에서 이전
$(function () {
    $("#LSY_previous1").on("click", function () {
        $("#LSY_option").slideDown();
        $("#LSY_Ingredient").slideUp();
        var title = document.getElementById("LSY_title");
        var subtitle = document.getElementById("LSY_subtitle")
        $(title).text("구성 선택");
        $(subtitle).text("구성을 선택해 주세요.");
        var next = document.getElementById("LSY_next");
        var previous = document.getElementById("LSY_previous1");
        var finish = document.getElementById("LSY_next_page1");
        next.style.display = "block";
        previous.style.display = "none";
        finish.style.display = "none";
    });
});
// 재료 선택에서 확인
$(function () {
    $("#LSY_next_page1").on("click", function () {
        if (checked == 0) {
            $("#LSY_Ingredient").slideUp();
            $("#LSY_side").slideDown();
            var title = document.getElementById("LSY_title");
            var subtitle = document.getElementById("LSY_subtitle")
            $(title).text("사이드 선택");
            $(subtitle).text("사이드 메뉴를 선택해 주세요.");
            var previous = document.getElementById("LSY_previous1");
            var finish = document.getElementById("LSY_next_page1");
            var cprevious = document.getElementById("LSY_previous2");
            var cfinish = document.getElementById("LSY_next_page2");
            previous.style.display = "none";
            finish.style.display = "none";
            cprevious.style.display = "";
            cfinish.style.display = "";
        } else if (checked == 1) {
            popupClose();
        }
    });
});
// 사이드 선택에서 이전
$(function () {
    $("#LSY_previous2").on("click", function () {
        $("#LSY_Ingredient").slideDown();
        $("#LSY_side").slideUp();
        var title = document.getElementById("LSY_title");
        var subtitle = document.getElementById("LSY_subtitle")
        $(title).text("재료 선택");
        $(subtitle).text("추가할 재료를 선택해 주세요.");
        var previous = document.getElementById("LSY_previous1");
        var finish = document.getElementById("LSY_next_page1");
        var cprevious = document.getElementById("LSY_previous2");
        var cfinish = document.getElementById("LSY_next_page2");
        previous.style.display = "";
        finish.style.display = "";
        cprevious.style.display = "none";
        cfinish.style.display = "none";
    });
});
// 사이드 선택에서 확인
$(function () {
    $("#LSY_next_page2").on("click", function () {
        $("#LSY_side").slideUp();
        $("#LSY_drink").slideDown();
        var title = document.getElementById("LSY_title");
        var subtitle = document.getElementById("LSY_subtitle")
        $(title).text("음료 선택");
        $(subtitle).text("음료를 선택해 주세요.");
        var previous = document.getElementById("LSY_previous2");
        var finish = document.getElementById("LSY_next_page2");
        var cprevious = document.getElementById("LSY_previous3");
        var cfinish = document.getElementById("LSY_next_page3");
        previous.style.display = "none";
        finish.style.display = "none";
        cprevious.style.display = "";
        cfinish.style.display = "";
    });
});
// 음료 선택에서 이전
$(function () {
    $("#LSY_previous3").on("click", function () {
        $("#LSY_side").slideDown();
        $("#LSY_drink").slideUp();
        var title = document.getElementById("LSY_title");
        var subtitle = document.getElementById("LSY_subtitle")
        $(title).text("사이드 선택");
        $(subtitle).text("사이드 메뉴를 선택해 주세요.");
        var previous = document.getElementById("LSY_previous2");
        var finish = document.getElementById("LSY_next_page2");
        var cprevious = document.getElementById("LSY_previous3");
        var cfinish = document.getElementById("LSY_next_page3");
        previous.style.display = "";
        finish.style.display = "";
        cprevious.style.display = "none";
        cfinish.style.display = "none";
    });
});
// 음료 선택에서 확인
$(function () {
    $("#LSY_next_page3").on("click", function () {
        popupClose();
    });
});
var checked = 0;
$(function () {
    $(".LSY_opt").click(function () {
        checked=0;
        tempName = getName+' 세트';
        tempPrice = getPrice*1+1000;
        $('.LSY_opt').css('background-color', '#ffffff');
        var clicked_option = $(this).val();
        var clicked_menu = document.getElementById(clicked_option);
        var clicked_next = document.getElementById('LSY_next');
        if (clicked_option == 'LSY_solo') {
            checked = 1;
            tempName = getName+' 단품';
            tempName2 = '';
            tempName3 = '';
            tempPrice = getPrice;
            tempPrice2 = 0;
            tempPrice3 = 0;
        }
        clicked_menu.style.background = "#f5f3d5";
        clicked_next.style.background = "#8fc43b";
        clicked_next.disabled = false;
    });
});
$(function () {
    $(".LSY_1st").click(function () {
        var clicked_option = this.id;
        var clicked_menu = document.getElementById(clicked_option);
        var clicked_next = document.getElementById('LSY_next_page1');
        $('.LSY_1st_except').css('background-color', '#ffffff');
        // clicked_menu.style.background = "#f5f3d5";
        clicked_next.style.background = "#8fc43b";
        clicked_next.disabled = false;
    });
});
function aa(id) {
    var clicked_menu = document.getElementById(id);
    if (clicked_menu.style.backgroundColor == "rgb(245, 243, 213)") {
        clicked_menu.style.backgroundColor = "#ffffff";
    } else {
        clicked_menu.style.backgroundColor = "#f5f3d5";
    }
    // rgb(245, 243, 213)
    // rgb(255, 255, 255)
}
$(function () {
    $(".LSY_1st_except").click(function () {
        var clicked_option = this.id;
        var clicked_menu = document.getElementById(clicked_option);
        var clicked_next = document.getElementById('LSY_next_page1');
        $('.LSY_1st').css('background-color', '#ffffff');
        clicked_menu.style.background = "#f5f3d5"
        clicked_next.style.background = "#8fc43b";
        clicked_next.disabled = false;
    });
});
var tempPrice2 = '';
var tempName2 = '';
$(function () {
    $(".LSY_2nd").click(function () {
        $('.LSY_2nd').css('background-color', '#ffffff');
        var clicked_option = this.id;
        tempPrice2 = this.value;
        tempName2 = this.id;
        var clicked_menu = document.getElementById(clicked_option);
        var clicked_next = document.getElementById('LSY_next_page2');
        clicked_menu.style.background = "#f5f3d5";
        clicked_next.style.background = "#8fc43b";
        clicked_next.disabled = false;
    });
});
var tempPrice3 = '';
var tempName3 = '';
$(function () {
    $(".LSY_3rd").click(function () {
        $('.LSY_3rd').css('background-color', '#ffffff');
        var clicked_option = this.id;
        tempPrice3 = this.value;
        tempName3 = this.id;
        var clicked_menu = document.getElementById(clicked_option);
        var clicked_next = document.getElementById('LSY_next_page3');
        clicked_menu.style.background = "#f5f3d5";
        clicked_next.style.background = "#8fc43b";
        clicked_next.disabled = false;
    });
});
