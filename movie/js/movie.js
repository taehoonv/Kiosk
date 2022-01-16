var seatReservation;
var ticketUtill;
var carouselUtill;
var seatUtill;
var movieUtill;
var productUtill;
var productDetail;
var messageUtill;
var CINEMAID;

$(function () {

    //설정위치 이동 $('.ad_pic').hide();

    $.fn.seatReservation = function (option) {
        var S = $.extend({ target: '.mseat_wrap', leng: 'KR' }, option);

        this.target = $(S.target);                                                                      // 전체 영역
        this.personSelect = $('.personSelect');                                                         // 인원수 영역
        // 좌석 붙임 설정
        this.seatArr = $('.seat_setting');                                                              // 묶음좌석 영역
        this.seatNotice = this.target.find('.mseat_inner');                                             // 좌석 전체 영역
        this.seatScroll = this.target.find('.screen_scroll');                                           // 좌석 스크롤 영역
        this.seatArea = this.target.find('.seat_area');                                                 // 좌석 영역
        this.seatFlat = this.target.find('.floor_tit');                                                 // 합산 영역
        this.seatRatio = 0;                                                                             // 좌석 가로 비율
        this.seatRatio2 = 0;                                                                            // 좌석 세로 비율
        this.seatFixRatioX = 0;                                                  // 비율이 변하면 출입구 영향 광복9관  1604132
        this.seatFixRatioY = 0;                                                  // 비율이 변하면 출입구 영향 광복9관  1604132
        this.seatFirstLeftPadding = 0;                                                  // 비율이 변하면 출입구 영향 광복9관  1604132
        this.seatSizeFix = [];                                                                 // 좌석 사이즈
        this.seatRow = '';                                                                              // 좌석 번호
        this.saveLimit = cookieJson.ticketingState.seatSelect.seatArray.length;                         // 최대 선택 좌석 저장
        this.seatLimit = 0;                                                                             // 최대 선택 좌석
        this.seatTotal = 0;                                                                             // 전체 좌석수
        this.seatFull = 0;                                                                              // 대관 선택 좌석
        this.seatSelector = 0;                                                                          // 복층 변수
        this.maxCols = 0;                                                                               // 가로 최대좌석
        this.userLimit = new Array(0, 0);                                                               // 최대좌석 width
        this.spaceLimit = new Array(0, 0);                                                              // 최대좌석 간격 width
        this.saveGroup = 1;                                                                             // 좌석 그룹 저장
        this.clickSeat = 0;                                                                             // 묶음좌석 선택값
        this.viewCodeBul = 0;                                                                                       // 161013

        this.personBull1 = true; // 선택 인원에 대한 팝업 제어 (장애인, 경로우대, 유공자)
        this.personBull2 = true;
        this.personBull3 = true;

        this.personSelected = [];                                                                       // 사석방지 해제 값
        this.freePercent = 0;                                                                           // 사석방지 해제 값
        this.freeSeat = 0;                                                                              // 현재 예매율
        this.freeSelect = false;                                                                        // 사석방지 설정
        this.seatClose = '';                                                                            // 묶음별 사석방지 설정

        this.feesSave = [];                                                                             // 좌석별 금액정보 저장
        this.feesArray = [];                                                                            // 좌석별 합산금액 저장
        this.feesSum = 0;                                                                               // 좌석 합산금액
        this.priceSum = 0;                                                                              // 상품 합산금액
        this.priceTotal = 0;                                                                            // 상품 합산금액

        this.seatBlockCode = [];                                                               // 시트 메세지코드
        this.seatBlockMessage = [];                                                            // 시트메세지

        this.carouselView = 0;                                                                          // 상품  전시 여부
        this.carousel = $('.carouselwrap');
        this.carouselwrap = $('.carousel_box');                                                         // 상품 전체 영역
        this.carouselList = this.carouselwrap.find('.product_slist');                                   // 상품 리스트 영역
        this.carouselDetail = this.carouselwrap.find('.product_info');                                  // 상품 디테일 영역
        this.carouselscroll = this.carouselDetail.find('.product_right');                              // 상품 디테일 영역 
        this.carouselBtn = this.carouselwrap.find('> a');                                               // 상품 버튼
        this.carouselIndi = this.carouselwrap.find('.indicator');                                       // 상품 우버튼
        this.prodNo = 0;
        this.prodSum = 0;
        this.sweetWrap = $('.total_sweet');
        this.sweetText = this.sweetWrap.html();

        this.ticketCookie = $.cookie('ticketingState');                                                 // 영화정보 쿠키
        this.playDate = cookieJson.ticketingState.ticketing.playDate; // 2016-01-07
        this.playWeek = cookieJson.ticketingState.ticketing.playWeek;
        this.screenType = cookieJson.ticketingState.ticketing.screentype;
        this.cinemaName = cookieJson.ticketingState.ticketing.playSequenceCode[0].cinemaName;
        this.cinemaType = cookieJson.ticketingState.ticketing.playSequenceCode[0].cinemaType;
        this.cinemaCode = cookieJson.ticketingState.ticketing.playSequenceCode[0].cinemaCode;
        this.screenCode = cookieJson.ticketingState.ticketing.playSequenceCode[0].screenCode;
        this.screenName = cookieJson.ticketingState.ticketing.screenName;                                           // 160607
        this.brandName = cookieJson.ticketingState.ticketing.brandName;                                           // 170116
        this.movieCode = cookieJson.ticketingState.ticketing.playSequenceCode[0].movieCode;
        this.playSequence = cookieJson.ticketingState.ticketing.playSequenceCode[0].playSequence;
        this.startTime = cookieJson.ticketingState.ticketing.playSequenceCode[0].startTime;
        this.endTime = cookieJson.ticketingState.ticketing.playSequenceCode[0].endTime;
        this.sequenceCode = cookieJson.ticketingState.ticketing.playSequenceCode[0].sequenceCode;
        this.weekCode = cookieJson.ticketingState.ticketing.playSequenceCode[0].weekCode;
        this.screenDiv = cookieJson.ticketingState.ticketing.playSequenceCode[0].screenDiv;
        this.seatType = cookieJson.ticketingState.seatSelect.SeatType;
        this.seatSum = cookieJson.ticketingState.seatSelect.SeatCodes;
        this.seatArray = cookieJson.ticketingState.seatSelect.seatArray;
        this.prodList = $(cookieJson.ticketingState.goods);

        try {
            // 20160920 - FileLog 추가
            setFileLog(this.cinemaCode, this.cinemaName, 2, "쿠키값조회," + this.playDate + "," + this.screenCode + "," + this.playSequence, 1);
        } catch (e) { }

        this.leng = S.leng;                                                                             // 언어 체크

        if (this.leng != 'KR') $('.icn_smt2').hide();

        CINEMAID = this.cinemaCode;

        this.init();
    };

    $.fn.seatReservation.prototype = {
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 좌석 데이터 로드
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        init: function () {
           // $('.footBnImg').hide();

            // 부킹 가능여부
            var obj = { MethodName: "GetBookPossible", channelType: "HO", osType: BrowserAgent(), osVersion: navigator.userAgent, multiLanguageID: this.leng, screenID: this.screenCode, playDate: this.playDate, playSequence: this.playSequence };
            JsonCall(CinemaServiceDomain + "/LCWS/Ticketing/TicketingData.aspx", obj, this.ticketData);

            // 상품 전시여부 데이터
            var obj = {
                MethodName: "GetWebPageManagement", channelType: "HO", osType: BrowserAgent(), osVersion: navigator.userAgent
            };
            JsonCall(CinemaServiceDomain + "/LCWS/Common/MainData.aspx", obj, this.selectData);

            // 2016.02.22 홍상길 ReleaseBooking Master.Master로 이동
            //if (cookieJson.ticketingState.seatSelect.transNo != '') {
            //    var params = {
            //        MethodName: "ReleaseBooking",
            //        channelType: "HO",
            //        osType: BrowserAgent(),
            //        osVersion: navigator.userAgent,
            //        multiLanguageID: Language,
            //        playDate: this.playDate,
            //        playSequence: this.playSequence,
            //        screenId: this.screenCode,
            //        transNo: cookieJson.ticketingState.seatSelect.transNo,
            //        memberOnNo: memberInfo.MemberNoOn
            //    };

            //    try {
            //        GetData("ticket", params, $.proxy(function () {
            //            $.fn.cookieChanges('del', 'ticketingState.seatSelect.transNo', '');
            //        }, this), "");
            //    } catch (e) {
            //        CheckException(e, "releaseBooking", NOW_MENU_TYPE);
            //    };
            //};

            // 좌석 데이터
            var obj = { MethodName: "GetSeats", channelType: "HO", osType: BrowserAgent(), osVersion: navigator.userAgent, cinemaId: this.cinemaCode, screenId: this.screenCode, playDate: this.playDate, playSequence: this.playSequence }; // 좌석정보
            JsonCall(CinemaServiceDomain + "/LCWS/Ticketing/TicketingData.aspx", obj, this.jsonData);
            //var obj = { MethodName: "GetSeats", channelType: "HO", osType: BrowserAgent(), osVersion: navigator.userAgent, cinemaId: '1004', screenId: '100405', playDate: '2015-10-24', playSequence: '2' }; // 좌석정보
            //JsonCall(CinemaServiceDomain + "/LCWS/Ticketing/TicketingData.aspx", obj, this.jsonData);

            // 영화 데이터
            var obj = { MethodName: "GetMovieInfoInSeat", channelType: "HO", osType: BrowserAgent(), osVersion: navigator.userAgent, multiLanguageID: this.leng, screenID: this.screenCode, playDate: this.playDate, playSequence: this.playSequence };
            JsonCall(CinemaServiceDomain + "/LCWS/Movie/MovieData.aspx", obj, this.movieData);

            // 상품 데이터
            //***********************************************************************************************************
            //2016. 01. 10. by johnharu
            // 회원 여부를 판단하는 필드로 MemberGubun 대신 LotteCinemaMemberGubun 으로 수정
            // LotteCinemaMemberGubun 값의 유형
            // 1 : 정회원
            // 2 : 간편회원(준회원)
            // 3 : 비회원
            //***********************************************************************************************************
            if (memberInfo.LotteCinemaMemberGubun == '1') {
                var obj = {
                    MethodName: "CinemaMallTicketingItems", channelType: "HO", osType: BrowserAgent(), osVersion: navigator.userAgent, multiLanguageID: this.leng,
                    cinemaID: this.cinemaCode, screenID: this.screenCode, playDate: this.playDate, playSequence: this.playSequence, eventID: ""
                };
                JsonCall(CinemaServiceDomain + "/LCWS/CinemaMall/CinemaMallData.aspx", obj, this.productData);
            } else {
                this.carousel.hide();
                $('.total_wrap').find('.total_slide').addClass('total_list').find('.carouselView').hide();
            }

            if (typeof this.screenDiv != "undefined" && this.screenDiv != '') {
                // 상영관 메세지 데이터
                var obj = {
                    MethodName: "GetMessageInSeat", channelType: "HO", osType: BrowserAgent(), osVersion: navigator.userAgent, multiLanguageID: this.leng,
                    cinemaID: this.cinemaCode, screenID: this.screenCode, screenDivisionCode: this.screenDiv
                };
                JsonCall(CinemaServiceDomain + "/LCWS/Cinema/CinemaData.aspx", obj, this.messageData);
            }

            // 2016.03.21 강제 숨김처리, 상품은 항상 4개까지만 보여준다.
            $('.control_navi .indicator').hide();
            $('.carousel_box .btn_prev').hide();
            $('.carousel_box .btn_next').hide();
        },

        ticketData: function (data) {// 부킹 가능여부
            try {
                ticketUtill = data.responseJSON;
                seatReservation.ticketFalse();
            }
            catch (e) {
                //alert('ticketError');
            }
        },

        selectData: function (data) {// 상품 전시 여부
            try {
                carouselUtill = data.responseJSON;
                seatReservation.cinemashopViewYN();
            }
            catch (e) {
                //alert('carouselError');
            }
        },

        jsonData: function (data) {// 좌석 데이터 로드
            try {
                seatUtill = data.responseJSON;
                seatReservation.entranceDraw();
            }
            catch (e) {
                //alert('seatError');
            }
        },

        movieData: function (data) {// 영화 데이터 로드
            try {
                movieUtill = data.responseJSON;
                seatReservation.poster();
            }
            catch (e) {
                //alert('MovieError');
            }
        },

        messageData: function (data) {// 메세지 데이터 로드
            try {
                messageUtill = data.responseJSON;
                seatReservation.messageDraw();
            }
            catch (e) {
                //alert('messageError');
            }
        },

        productData: function (data) {// 상품 데이터 로드
            try {
                productUtill = data.responseJSON;
                seatReservation.productList();
            }
            catch (e) {
                //alert('productError');
            }
        },

        ticketFalse: function () {
            var timeBull = ticketUtill.IsOK;
            var timeMessage = ticketUtill.ResultMessage;

            if (!timeBull) {
                var timeError = new $.fn.modalPopGeneration({ type: 'server', lang: this.leng, btns: true, btnParam1: false, btnParam2: true, serverTitle: '알림', serverMessage: timeMessage, elem: $(this) });

                $('.pop_wrap .btnc_confirm').off().on('click', function () {
                    $(this).parents('.pop_wrap').remove();

                    window.location.href = '/LCHS/Contents/ticketing/ticketing.aspx';
                });
            }
        },

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 상영관 알림 메세지
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        messageDraw: function () {
            if (messageUtill.IsOK == 'true') {
                var cinemaMessage = $(messageUtill.CinemaMessage.Items);                  // 시네마 메세지
                var screenMessage = $(messageUtill.ScreenMessage.Items);                  // 스크린 메세지
                var seatMessage = $(messageUtill.SeatBlockMessage.Items);                 // 시트 메세지

                if (cinemaMessage.length > 0) {
                    $('.sear_right > .layer').show().find('p').text(cinemaMessage[0].Message);
                } else {
                    $('.sear_right > .layer').hide();
                }

                // 20160602 - 상영관 메시지 없을 경우 좌석 메시지 미출력 오류 수정
                var isAddedArea = false;
                if (screenMessage.length > 0) {
                    if (!isAddedArea) {
                        html = '<div class="alarm_special">';
                        html += '<p class="alarm_txt">' + screenMessage[0].Message + '</p>';
                        html += '<a href="javascript:void(0);" class="btn_close"><img src="/LCHS/image/Btn/btn_close02.gif" alt="닫기"></a>';
                        html += '</div>';

                        this.seatNotice.prepend(html);

                        this.seatNotice.find('.alarm_special').find('.btn_close').on('click', function () {
                            $(this).parent('.alarm_special').hide();
                        });

                        isAddedArea = true;
                    }
                }

                if (seatMessage.length > 0) {
                    if (!isAddedArea) {
                        html = '<div class="alarm_special">';
                        html += '<p class="alarm_txt"></p>';
                        html += '<a href="javascript:void(0);" class="btn_close"><img src="/LCHS/image/Btn/btn_close02.gif" alt="닫기"></a>';
                        html += '</div>';

                        this.seatNotice.prepend(html);

                        this.seatNotice.find('.alarm_special').hide();
                        this.seatNotice.find('.alarm_special').find('.btn_close').on('click', function () {
                            $(this).parent('.alarm_special').hide();
                        });

                        isAddedArea = true;
                    }

                    for (var i = 0; i < seatMessage.length; i++) {
                        this.seatBlockCode[i] = seatMessage[i].SeatBlockCode;
                        this.seatBlockMessage[i] = seatMessage[i].Message;
                    }
                }
            }
        },

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 상영관 정보
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        entranceDraw: function () {
            var T = this;
            var html = '';

            T.maxCols = Number($(seatUtill.ScreenSeatInfo.Items)[0].MaxSeatColumn);
            T.seatTotal = Number($(seatUtill.ScreenSeatInfo.Items)[0].TotalSeatCount);

            var occupancy = Number($(seatUtill.ScreenSeatInfo.Items)[0].BookingCount);
            var closeArray = $(seatUtill.ScreenSeatInfo.Items)[0].SeatApplyYNSet;
            T.seatClose = closeArray.split(',');

            T.freePercent = Number($(seatUtill.ScreenSeatInfo.Items)[0].AloneSeatCancelRate);

            if (occupancy > 0) {
                T.freeSeat = Math.round(occupancy / (T.seatTotal / 100));
            } else {
                T.freeSeat = 0;
            }

            if (T.freePercent <= T.freeSeat) {
                T.freeSelect = true;
            }

            var fees = $(seatUtill.Fees.Items); // 좌석 금액 저장

            fees.each(function (n) {
                var tiketCode = $(this)[0].TicketCode;
                var customerDivisionCode = $(this)[0].CustomerDivisionCode;
                var seatBlockCode = $(this)[0].SeatBlockCode;
                var serviceFee = $(this)[0].ServiceFee;
                var movieFee = $(this)[0].MovieFee;
                T.feesSave[n] = ({ 'tiketCode': tiketCode, 'customerDivisionCode': customerDivisionCode, 'seatBlockCode': seatBlockCode, 'serviceFee': serviceFee, 'movieFee': movieFee });
                //console.log(T.feesSave[n]);
            });

            T.seatDraw();

            try {
                // 20170607 - 좌석 안내 문구 서버측 데이터로 수정
                if ($(seatUtill.AdditionalMessages.Items)[0] != undefined && $(seatUtill.AdditionalMessages.Items)[0] != null && $(seatUtill.AdditionalMessages.Items)[0].Message != undefined && $(seatUtill.AdditionalMessages.Items)[0].Message != null && $(seatUtill.AdditionalMessages.Items)[0].Message != "") {
                    $('#pAdvice').html($(seatUtill.AdditionalMessages.Items)[0].Message);
                }
            } catch (e) { }
        },

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 좌석 드로우
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        seatDraw: function () {
            var T = this;
            var html = '';

            var seatNode = $(seatUtill.Seats.Items);                                // 좌석 노드
            var bookingSeat = $(seatUtill.BookingSeats.Items);                      // 예매좌석 노드

            var saveRow = '';                                                       // 좌석 세로넘버 저장
            var saveFloor = 0;                                                      // 좌석 세로넘버 저장
            var saveGroup = '';                                                     // 좌석 가로그룹 저장
            var interGroup = 0;                                                     // 좌석 세로그룹 저장

            var seatChange = 1;                                                     // 좌석 그룹 좌표

            var seatStartX = Number($(seatUtill.ScreenSeatInfo.Items)[0].StartXCoordinate);
            var seatStartY = Number($(seatUtill.ScreenSeatInfo.Items)[0].StartYCoordinate);

            var enterTop = 0;
            var enterSave = [];
            var enterLeft = 0;

            //20170825 신규
            var saveGroup_new = '';                                                     // 좌석 가로그룹 저장
            var seatGroup_old = '';                                                     // 이전 좌석그룹

            // 모든 좌석 데이터에 대해
            seatNode.each(function (n) {
                var dbRow = $(this)[0].SeatRow;                                     // 가로 넘버
                var dbCol = $(this)[0].SeatColumn;                                  // 세로 넘버

                var seatCode = $(this)[0].SeatNo;                                   // 가로그룹 넘버
                var physicalCell = $(this)[0].PhysicalBlockCode;                    // 가로그룹 넘버
                var logicalCell = $(this)[0].LogicalBlockCode;                      // 가로그룹 넘버
                var dsplPhysicalBlckCd = $(this)[0].DisplayPhysicalBlockCode;             // 좌석블록코드
                var feeCell = $(this)[0].FeeBlockCode;                              // 금액 블록코드
                var screenFloor = $(this)[0].ScreenFloor;                           // 상영관 층수
                var seatFloor = $(this)[0].SeatFloor;                               // 복층 변수
                var seatRow = $(this)[0].ShowSeatRow;                               // 가로 넘버
                var seatCol = Number($(this)[0].ShowSeatColumn);                    // 세로 넘버
                // ShowSeatRow와 SeatColumGroupNo 번호가 일치하지 않으면 다른 그룹으로 판단
                // 1장 이상의 인원 선택 시 동일 그룹에 해당하는 좌석에 대해 사석 로직 적용
                var seatGroup = Number($(this)[0].SeatColumGroupNo);                // 가로그룹 넘버
                var coupleGroup = $(this)[0].RelatedSeatNo;                         // 묶음그룹
                // 묶음 그룹의 개수에 따라 1장 이상 인원 선택 시 선택 좌석 판단
                var groupCount = $(this)[0].RelatedSeatCount;                       // 묶음그룹 카운트
                var seatWid = Number($(this)[0].SeatXLength);
                var seatHei = Number($(this)[0].SeatYLength);
                var salesDisableTicketCode = $(this)[0].SalesDisableTicketCode;                    // 마이너스요금으로 좌석 제어

                if (n == 0) {   // 1604132
                    if (T.maxCols > 28) {
                        T.seatFixRatioX = Math.ceil(seatWid / 16);
                        T.seatFixRatioY = Math.ceil(seatHei / 16);
                    } else {
                        T.seatFixRatioX = Math.ceil(seatWid / 22);
                        T.seatFixRatioY = Math.ceil(seatHei / 22);
                    }
                }

                // 좌석 표출 칼럼이 최대 28개 이상일 경우는 좌석의 크기 조절
                if (T.maxCols > 28) {
                    var seatX = Math.floor((Number($(this)[0].SeatXCoordinate) - seatStartX) / Math.ceil(seatWid / 16)) + 16;                     // x좌표
                    var seatY = Math.floor((Number($(this)[0].SeatYCoordinate) - seatStartY) / Math.ceil(seatHei / 16)) + 16;                     // y좌표
                    T.seatRatio = Math.ceil(seatWid / 16);
                    T.seatRatio2 = Math.ceil(seatHei / 16);
                    T.seatFirstLeftPadding = 16;
                } else {
                    var seatX = Math.floor((Number($(this)[0].SeatXCoordinate) - seatStartX) / Math.ceil(seatWid / 22)) + 22;                     // x좌표
                    var seatY = Math.floor((Number($(this)[0].SeatYCoordinate) - seatStartY) / Math.ceil(seatHei / 22)) + 22;                     // y좌표
                    T.seatRatio = Math.ceil(seatWid / 22);
                    T.seatRatio2 = Math.ceil(seatHei / 22);
                    T.seatFirstLeftPadding = 22;
                }
                var sweetSpot = $(this)[0].SweetSpotYN;                             // 스윗스팟

                //좌석블럭 Set[10:시네커플, 20:시네패밀리, 30: SuperVibe,40: 장애인석,50: 양팔걸이,60: 단팔걸이,70: 발받침,80: CineCouple 발받침, 90: 장애인석 발받침, 100: 첫열,110: VIP,120:시네패밀리 발받침,130:SuperVibe 발받침, 씨네비즈
                var seatBlock = $(this)[0].SeatBlockSet;                            // 시트 정보

                var searClass = '';                                                 // 좌석 클래스 리셋

                // seatBlock 값에서 ','를 제외하고 해당 좌석을 어떻게 표현해야 하는지 판단하기 위해
                var seatInfo = seatBlock.replace(/,/g, "").indexOf("Y");            // 좌석 클래스 정보 인덱스
                var seatAlt = '일반석';                                                                              // 좌석 alt 설정  // 1605031 장차법

                //좌석블럭 Set[10:시네커플, 20:시네패밀리, 30: SuperVibe,40: 장애인석,50: 양팔걸이,60: 단팔걸이,70: 발받침,80: CineCouple 발받침, 90: 장애인석 발받침, 100: 첫열,110: VIP,120:시네패밀리 발받침,130:SuperVibe 발받침, 씨네비즈
                switch (seatInfo) {
                    case 0:
                        searClass = 'cine_couple';
                        seatAlt = '시네커플석';
                        break;
                    case 1:
                        searClass = 'cine_family';
                        seatAlt = '시네패밀리석';
                        break;
                    case 2:
                        searClass = 'super_vibe';
                        seatAlt = '슈퍼바이브석';
                        break;
                    case 3:
                        searClass = 'handicapped';
                        seatAlt = '장애인석';
                        break;
                    case 4:
                        searClass = '';
                        break;
                    case 5:
                        searClass = '';
                        break;
                    case 6:
                        searClass = 'foot_seat';
                        seatAlt = '발받침석';
                        break;
                    case 7:
                        searClass = 'cine_couple';
                        seatAlt = '시네커플 발받침석';
                        break;
                    case 8:
                        searClass = 'handicapped';
                        seatAlt = '장애인 발받침석';
                        break;
                    case 9:
                        searClass = '';
                        break;
                    case 10:
                        searClass = 'special_fee';
                        seatAlt = '특별요금석';
                        break;
                    case 11:
                        searClass = 'cine_family';
                        seatAlt = '시네패밀리 발받침석';
                        break;
                    case 12:
                        searClass = 'super_vibe';
                        seatAlt = '슈퍼바이브 발받침석';
                        break;
                    case 13:
                        searClass = 'special_fee';
                        seatAlt = '씨네비즈';
                        break;
                }


                if (sweetSpot == 'Y') {
                    searClass += ' sweet_spot';
                    seatAlt += ' SWEET SPOT';                                                                       // 1605031 장차법
                }
                if (groupCount > 1) {
                    searClass += ' related_seat';                                                                   // 묶음 좌석인가 1604262
                    seatAlt += ' 묶음좌석';                                                                          // 1605031 장차법
                }

                // 층 표현
                // 복층일 경우에만 층 표현
                if (saveFloor != seatFloor) {
                    saveFloor = seatFloor;
                    T.seatSelector++;

                    html = '<div class="screen_Fbox seatSet' + T.seatSelector + '">';
                    html += '<span class="floor_tit"><em>' + (screenFloor) + 'F</em></span>';
                    if (T.maxCols > 28) {
                        html += '<div class="seat_Barea"><div class="seat_mArea"></div></div>';
                    } else {
                        html += '<div class="seat_Barea"><div class="seat_area"></div></div>';
                    }
                    html += '</div>';

                    T.seatScroll.append(html);


                    if (T.maxCols > 28) {
                        T.seatArea = T.seatScroll.find('.seat_mArea');
                    } else {
                        T.seatArea = T.seatScroll.find('.seat_area');
                    }

                    if (seatFloor > 1) {
                        T.seatScroll.find('.floor_tit').show().last().addClass('btn_sView');
                        T.seatScroll.find('.btn_sView').next('.seat_Barea').hide().parent('.screen_Fbox').css({ 'position': 'absolute', 'bottom': 0, 'width': '100%', 'z-index': '999' }).parent('.screen_scroll').css('padding-bottom', 25);
                        T.seatScroll.find('.screen_Fbox').first().prepend('<span class="bg_disabled"></span>');
                    } else {
                        T.seatScroll.find('.floor_tit').hide();
                    }
                }

                var seatNum = dbRow + seatCol;

                // 현재 좌석과 이전 좌석의 열 및 SeatColumGroupNo가 다를 경우는 다른 그룹으로 판단하고, 
                // 동일 그룹에 포함된 좌석에 한해 사석 로직을 적용
                // saveGroup은 이전 좌석에 대한 그룹 정보를 저장하는 변수
                // seatGroup은 현 좌석에 대한 그룹 정보를 저장하는 변수
                // saveRow는 이전 좌석에 대한 열 정보를 저장하는 변수
                // seatRow는 현 좌석에 대한 열 정보를 저장하는 변수

                //console.log("-----seatGroup : " + seatGroup + " saveRow : " + saveRow + " seatRow : " + seatRow + "  saveGroup : " + saveGroup);
                

                if (saveRow != seatRow) {                                                                           // 열이 바뀌는 경우
                    //20170817 수정
                    //좌석선택이 정상적으로 되지않음 안양일번지,프리미엄칠곡등
                    //if (saveGroup != seatGroup) { // 열이 바뀌면서, 그룹도 바뀌는 경우
                    //    saveGroup = seatGroup;
                       
                    //} else if (saveRow != seatRow) {
                    //    saveGroup++;
                    //}
                    //else {                      // 열이 바뀌지만, 그룹은 그대로 인 경우 (샤롯데프라이빗) 1605061
                    //    if (groupCount != 8 && seatGroup != '1') { // 신림 3관은 P18은 열이 바뀌지만 그룹이 그대로이기 때문에
                    //        saveGroup++;
                    //    }
                    //}
                    //saveRow = seatRow;
                    
                    //20170825 좌석 선택 오류 수정
                    //console.log("saveRow2222 : " + saveRow + " seatRow : " + seatRow + "   saveGroup  : " + saveGroup + "  seatGroup : " + seatGroup );
                    if (saveGroup != seatGroup) { // 열이 바뀌면서, 그룹도 바뀌는 경우
                        saveGroup = seatGroup;
                        seatGroup_old = seatGroup;
                    } else if (saveRow != seatRow) {
                        saveGroup++;
                        saveGroup_new = saveGroup;
                        seatGroup_old = seatGroup;
                    }
                    else {                      // 열이 바뀌지만, 그룹은 그대로 인 경우 (샤롯데프라이빗) 1605061
                        if (groupCount != 8 && seatGroup != '1') { // 신림 3관은 P18은 열이 바뀌지만 그룹이 그대로이기 때문에
                            saveGroup++;
                        }
                        seatGroup_old = seatGroup;
                    }

                    saveRow = seatRow;

                    //console.log("data-seat=" + seatNum + "   seatGroup22222 : " + seatGroup + " seatGroup_old : " + seatGroup_old + " saveRow2222 : " + saveRow + " seatRow : " + seatRow + " saveGroup_new : " + saveGroup_new + " saveGroup : " + saveGroup);

                    //saveRow = seatRow;
                    //if (saveGroup != seatGroup) {                                                                   // 열이 바뀌면서, 그룹도 바뀌는 경우
                    //    saveGroup = seatGroup;
                    //} else {                                                                                        // 열이 바뀌지만, 그룹은 그대로 인 경우 (샤롯데프라이빗) 1605061
                    //    if (groupCount != 8 && seatGroup != '1') {                                                                      // 신림 3관은 P18은 열이 바뀌지만 그룹이 그대로이기 때문에
                    //        saveGroup++;
                    //    }
                    //}
                    //20170817 수정

                    seatChange = 0;
                    // 1604132
                    // <span class="seat_tit" style="left: -30px; top: 0px;">A</span>와 같이 표현되는 열 이름 구성
                    if (T.maxCols > 28) {
                        html = '<span class="seat_tit" style="left:0; top:' + seatY + 'px">' + seatRow + '</span>';
                    } else {
                        html = '<span class="seat_tit" style="left:-30px; top:' + seatY + 'px">' + seatRow + '</span>';
                    }

                    // <a href="javascript:void(0);" class=" p0" data-seat="A1" block-code="p0" seat-group="grNum1" style="left: 22px; top: 0px;" title="좌석 번호:A1 - 일반석" seat-code="1A01">1</a>와 같이 표현되는 좌석 태그 구성
                    html += '<a href="javascript:void(0);" class="' + searClass + ' p' + feeCell + '" data-seat="' + seatNum + '" block-code="p'
                            + feeCell + '" seat-group="grNum' + saveGroup + '" style="left:' + seatX + 'px; top:' + seatY
                            + 'px" title="좌석 번호:' + seatNum + ' - ' + seatAlt + '">' + seatCol + '</a>';         // 1605031 장차법
                    //console.log(html);
                    // a 태그의 데이터 설정
                    // 개별 좌석에 해당하는 a 태그 선택 시 선택 좌석에 대한 정보를 추출하기 위한 목적
                    T.seatArea.last().append(html).find('a').last().data({ 'dsplPhysicalBlckCd': dsplPhysicalBlckCd, 'salesDisableTicketCode': salesDisableTicketCode, 'seatCode': seatCode, 'seatGroup': saveGroup, 'seatRow': dbRow, 'showSeatRow': seatRow, 'seatCol': seatCol, 'seat-group': saveGroup, 'seatName': seatAlt, 'physical': physicalCell, 'logical': logicalCell, 'coupleGroup': coupleGroup }).attr('seat-code', seatCode);

                    // 좌석간 높이 조절
                    if (interGroup != seatY) {
                        if (interGroup == 0) {
                            interGroup = seatY;
                        } else if (T.seatArea.last().find('li').length > 1) {
                            if (T.maxCols > 28) {
                                var rowSpace = 45;
                            } else {
                                var rowSpace = 63;
                            }

                            if (interGroup > (seatY - rowSpace)) {
                                interGroup = seatY;
                            } else {
                                interGroup = seatY;

                                if (T.maxCols > 28) {
                                    T.seatArea.last().find('li').last().css('margin-top', 16);
                                } else {
                                    T.seatArea.last().find('li').last().css('margin-top', 22);
                                }
                            }
                        }
                    }

                } else {

                    //console.log("seatGroup ==222 : " + seatGroup + " seatGroup_old : " + seatGroup_old + "   ===saveGroup==== 2222: " + saveGroup + " saveGroup_new : " + saveGroup_new);

                    if (seatGroup != saveGroup) {                        
                        //20170825 좌석 선택 오류 수정
                        //if (saveGroup == saveGroup_new) {
                        if (saveGroup == saveGroup_new && seatGroup == seatGroup_old) {
                            if (T.maxCols > 28) {
                                //seatChange += 6;
                            } else {
                                seatChange += 0;
                            }
                            seatGroup_old = seatGroup;
                        }else {
                            
                            seatGroup_old = seatGroup;
                            saveGroup = seatGroup;
                            if (T.maxCols > 28) {
                                //seatChange += 6;
                            } else {
                                seatChange += 0;
                            }
                        }
                        //20170825 좌석 선택 오류 수정

                        //saveGroup = seatGroup;
                        //if (T.maxCols > 28) {
                        //    //seatChange += 6;
                        //} else {
                        //    seatChange += 0;
                        //}
                        
                    }
                   
                    //console.log("33333data-seat=" + seatNum + "   seatGroup : " + seatGroup + " saveRow33333 : " + saveRow + " seatRow : " + seatRow + " saveGroup_new33333333333333 : " + saveGroup_new + " saveGroup : " + saveGroup);

                    html = '<a href="javascript:void(0);" class="' + searClass + ' p' + feeCell + '"  data-seat="' + seatNum + '" block-code="p'
                            + feeCell + '" seat-group="grNum' + saveGroup + '" style="left:' + (seatX - seatChange) + 'px; top:' + seatY
                            + 'px" title="좌석 번호:' + seatNum + ' - ' + seatAlt + '">' + seatCol + '</a>';            // 1605031 장차법
                    //console.log('" seat-group="grNum' + saveGroup + '"title="좌석 번호:' + seatNum + ' - ' + seatAlt);
                    T.seatArea.last().append(html).find('a').last().data({ 'dsplPhysicalBlckCd': dsplPhysicalBlckCd, 'salesDisableTicketCode': salesDisableTicketCode, 'seatCode': seatCode, 'seatGroup': saveGroup, 'seatRow': dbRow, 'showSeatRow': seatRow, 'seatCol': seatCol, 'seat-group': saveGroup, 'seatName': seatAlt, 'physical': physicalCell, 'logical': logicalCell, 'coupleGroup': coupleGroup }).attr('seat-code', seatCode);
                }

                if (T.seatTotal == groupCount) T.seatFull = T.seatTotal;
            });

            var allWidth = 0; // 전체 좌석 최대 길이
            var maxSeatX = new Array(0, 0, 0);

            // 좌석 중앙 정렬 및 좌석 표출 영역 높이 설정
            T.seatArea.each(function (n) { // 좌석 중앙 정렬
                var minSeatY = 10000;
                var maxSeatY = 0;

                $(this).find('a').each(function () {
                    var aPos = Number($(this).css('left').replace('px', ''));
                    if (maxSeatX[n] < aPos) {
                        maxSeatX[n] = aPos; // 좌석 최대 좌표
                    }
                    if (allWidth < aPos) {
                        allWidth = aPos; // 좌석 최대 좌표
                    }

                    var seatY = Number($(this).css('top').replace('px', ''));

                    if (minSeatY > seatY) minSeatY = seatY;
                    if (maxSeatY < seatY) maxSeatY = seatY;
                });

                $(this).css('height', (maxSeatY - minSeatY) + 20).find('a, span').css('top', '-=' + minSeatY);

                enterSave[n] = maxSeatX[n];

                if (maxSeatX[n] < 980) {
                    var posWidth = (980 - (maxSeatX[n] + 20)) / 2;
                } else {
                    var posWidth = 25;
                }

                enterLeft = posWidth;

                $(this).css('margin-left', posWidth);

                T.seatSizeFix[n] = posWidth;
            });

            if (T.seatArea.length < 2) {
                T.target.find('.floor_tit').hide();
            }

            T.seatScroll.find('.bg_disabled').css('height', T.seatScroll.height()).hide();

            if (T.seatSum.length > 0) { //좌석 쿠키에 의한 체크
                for (var i = 0; i < T.seatSum.length; i++) {
                    //T.seatArea.find('a[seat-code=' + T.seatSum[i] + ']').addClass('on').attr('alt', T.seatArea.find('a[seat-code=' + T.seatSum[i] + ']').attr('alt') + ' 선택완료');
                    T.seatArea.find('a[seat-code=' + T.seatSum[i] + ']').addClass('on').append("<span class=\"blind\">선택완료</span>");
                }
            }

            T.seatLimit -= T.seatArea.find('.on').length;

            //////////////// 예매좌석 설정 //////////////////////////////////////////////////////////////
            if (bookingSeat.length > 0) {
                var seatBull = false;

                bookingSeat.each(function (n) {
                    var bookingSeatRow = $(this)[0].SeatRow;                            // 가로 넘버
                    var bookingSeatCol = $(this)[0].SeatColumn;                         // 세로 넘버
                    var bookingSeatNo = $(this)[0].SeatNo;                              // 시트 코드

                    for (var i = 0; i < T.seatSum.length; i++) {
                        if (bookingSeatRow + bookingSeatCol == T.seatSum[i]) {
                            T.seatArea.find('a').removeClass('on');
                            $.fn.cookieChanges('del', 'ticketingState.seatSelect.SeatCodes', 'arr');
                            $.fn.cookieChanges('del', 'ticketingState.seatSelect.seatArray', 'arr');

                            seatBull = true;
                        }
                    }

                    //T.seatArea.find('a[seat-code=' + bookingSeatNo + ']').addClass('completed').attr('alt', T.seatArea.find('a[data-seat=' + (bookingSeatRow + bookingSeatCol) + ']').attr('alt') + ' 예매완료좌석');
                    T.seatArea.find('a[seat-code=' + bookingSeatNo + ']').addClass('completed').append("<span class=\"blind\">예매완료</span>");
                });

                if (seatBull) {
                    var bookingseat = new $.fn.modalPopGeneration({ type: 'message', code: 'COM2100', lang: T.leng, btns: true, btnParam1: false, btnParam2: true, elem: $(this) });
                }
            }

            //////////////// 출입구 설정 //////////////////////////////////////////////////////////////
            var enterNode = $(seatUtill.Enterences.Items); //출입구 노드

            enterNode.each(function () {

                var paddingVal = 20;  // 1604104 seatArea 상단패딩값

                var enterFloor = Number($(this)[0].EnterenceFloor) - 1;
                var enterType = Number($(this)[0].EnterenceAngleCode);
                var enherHeight = T.seatArea.height();
                var enterX = Math.ceil((Number($(this)[0].EnterenceXCoordination) - seatStartX) / T.seatFixRatioX) + T.seatSizeFix[enterFloor] + T.seatFirstLeftPadding;
                //var enterY = Math.ceil((Number($(this)[0].EnterenceYCoordination) - seatStartY) / T.seatRatio2)// + T.seatSizeFix;
                var enterY = Math.ceil((Number($(this)[0].EnterenceYCoordination) - seatStartY) / T.seatFixRatioY) + paddingVal; // 1604104

                var enterPos = 0;

                var enterClass = '';

                //if (enterX < 980 && enterY < T.seatArea.height()) {
                switch (enterType) {
                    case 10:
                        enterClass = 'w_center';
                        break;
                    case 20:
                        enterClass = 'w_bottom';
                        break;
                    case 30:
                        enterClass = 'w_left';
                        break;
                    case 40:
                        enterClass = 'w_right';
                        break;
                    default:
                        enterClass = 'w_right';
                        break;

                }
                if ((enterX + (960 - T.seatArea.width())) < 0) {
                    enterX = 0;
                }
                //else {  // 1604104
                //    enterX = enterX + (960 - T.seatArea.width());
                //};
                if (enterY < 0) {
                    enterY = 0;
                }
                var tmp = T.seatArea.height() + paddingVal; // 20은 bottom padding 값
                if (tmp <= enterY) { // 1604104
                    enterY = tmp + 10; // y축 보정값
                }
                enterPos = 'top:' + enterY + 'px;left:' + enterX + 'px';
                //} else {
                //    if (enterType > 20) {
                //        if (enterX < (T.seatArea.width() - (960 - T.seatArea.width())) / 2) {
                //            enterClass = 'w_left';
                //            if (enterY < T.seatArea.height()) {
                //                enterPos = 'top:' + enterY + 'px;left:0px';
                //            } else {
                //                enterPos = 'bottom:20px;left:0px';
                //            };
                //        } else {
                //            enterClass = 'w_right';
                //            if (enterY < T.seatArea.height()) {
                //                enterPos = 'top:' + enterY + 'px;right:0px';
                //            } else {
                //                enterPos = 'bottom:20px;right:0px';
                //            };
                //        };
                //    } else {
                //        if (enterY < enherHeight / 2) {
                //            enterClass = 'w_center';
                //            enterPos = 'top:0px;left:' + enterX + 'px';
                //        } else {
                //            enterClass = 'w_bottom';
                //            enterPos = 'bottom:0px;left:' + enterX + 'px';
                //        };
                //    };
                //};

                T.seatScroll.find('.seat_Barea').eq(enterFloor).append('<span class="' + enterClass + '" style="' + enterPos + '"> 상영관 출입문 입니다.</span>');
            });

            T.personDraw();
        },

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 좌석 타입 드로우
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        personDraw: function () {
            var T = this;
            var html = '';

            var personNode = $(seatUtill.CustomerDivision.Items); //인원 노드
            var insLimit = 0;
            var personCount = 8;

            personNode.each(function (n) {
                var personType = $(this)[0].CustomerDivisionCode;
                if (T.leng == 'KR') {
                    var personName = $(this)[0].CustomerDivisionNameKR;
                } else {
                    var personName = $(this)[0].CustomerDivisionNameUS;
                }

                html = '<li>';
                html += '   <label for="person' + n + '">' + personName + '</label>';
                //html += '   <select id="person' + n + '">';
                html += '   <select id="person' + n + '" title="' + personName + '-인원선택' + '">';

                for (var i = 0; i <= personCount; i++) {
                    //if (T.cinemaCode == 1016 && T.screenDiv == '301') {
                    //    // 20161221 - 샤롯데 프라이빗 2,4,6,8로 수정
                    //    if (!(i == 0 || i == 2 || i == 4 || i == 6 || i == 8)) {
                    //        continue;
                    //    }
                    //}

                    // 20170510 - 샤롯데 프라이빗 수정 - 총 좌석수와 연관좌석수(RelatedSeatCount)가 일치할 경우
                    try {
                        if ($(seatUtill.Seats.Items)[0].RelatedSeatCount != null && T.seatTotal == $(seatUtill.Seats.Items)[0].RelatedSeatCount) {
                            if (!(i == 0 || i == T.seatTotal)) {
                                continue;
                            }
                        }
                    } catch (e) {
                    }

                    //if (T.screenDiv == '301') {
                    //    // 20161221 - 샤롯데 프라이빗 2,4,6,8로 수정
                    //    // 20161230 - 샤롯데 프라이빗 8좌석 일괄구매로 수정
                    //    // 20170123 - 샤롯데 프라이빗 2,4,6,8로 수정
                    //    // 20170126 - 샤롯데 프라이빗 8좌석 일괄 구매 복원
                    //    if (!(i == 0 || i == 8)) {
                    //        continue;
                    //    }
                    //    //if (!(i == 0 || i == 2 || i == 4 || i == 6 || i == 8)) {
                    //    //    continue;
                    //    //}
                    //}
                    html += '       <option value="' + i + '">' + i + '</option>';
                }

                html += '   </select>';
                html += '</li>';

                T.personSelect.append(html).find('select').last().addClass('code' + personType).data({ 'code': personType, 'peple': personName, 'count': '0' });

                if (T.seatType != '' && typeof T.seatType != "undefined") {
                    T.personSelect.find('select').eq(n).val(Number(T.seatType[n].count)).change().find('option').eq(Number(T.seatType[n].count)).attr('selected', 'selected').prop('selected', true);
                    insLimit += Number(T.seatType[n].count);
                } else {
                    T.personSelect.find('select').eq(n).val(0).change().find('option').first().attr('selected', 'selected').prop('selected', true);
                }
            });

            T.personSelect.find('select').each(function (n) {
                if (Number($(this).val()) > 0) {
                    T.personSelected.push($(this).data('code'));
                }
            });

            $.fn.designSelectElement(); // 디자인 셀렉트

            if (T.seatType != '' && typeof T.seatType != "undefined") {
                T.seatLimit = insLimit - T.saveLimit;
            }

            setTimeout(function () {
                if (T.seatType != '' && typeof T.seatType != "undefined") {
                    T.selectArr();
                } else {
                    T.groupReset();
                }
            }, 500);

            T.event();
        },

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 좌석 그룹 리셋
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        groupReset: function () {
            var T = this;

            var searGroup = 1;                                                      // 좌석 그룹
            var insGroup = 0;                                                       // 좌석 그룹 인스턴스
            var bullGroup = true;                                                   // 좌석 그룹 선택

            T.saveGroup = 1;

            // 각 좌석을 표현하는 <a> 태그의 개수만큼 루프를 돌면서
            T.seatArea.find('a').each(function () {
                var insClass = $(this).attr('seat-group');
                //console.log("insClass :" + insClass);
                //console.log('insClass1=' + insClass);
                //console.log("$(this).prev('a').context.outerHTML=" + !$(this).prev('a').context.outerHTML);
                //console.log('$(this).context.outerHTML=' + $(this).context.outerHTML);
                // seat-group="grNum3"과 같이 포함된 속성을 제거
                $(this).removeClass(insClass);
                // 1604281
                // 선택불가 설정('no_select'), 장애인석('handicapped'), 예약완료('completed'), 사용불가('disabled'), 씨네패밀리석('cine_family'), 씨네커플석('cine_couple'), seatGroup 값이 insGroup 값과 다를 경우, 좌석을 선택한 상태일 경우('on') 그룹핑을 다시 설정
                if (($(this).hasClass('no_select') && $(this).hasClass('handicapped')) || $(this).hasClass('completed') || $(this).hasClass('disabled')
                    || $(this).hasClass('cine_family') || $(this).hasClass('cine_couple') || $(this).data('seatGroup') != insGroup || $(this).hasClass('on')) {
                    // 만약 현재 좌석의 seatGroup과 insGroup 값이 다를 경우 
                    if ($(this).data('seatGroup') != insGroup) {
                        // insGroup 변수에 현재 좌석의 seatGroup 값을 저장
                        insGroup = $(this).data('seatGroup');
                        // 그룹값을 증가시킴
                        T.saveGroup++;
                        // 만약 현재 좌석이 사용불가 상태인데, 왼쪽 좌석이 선택 불가 상태가 아니면 왼쪽 좌석과 다른 그룹값을 설정
                    } else if ($(this).hasClass('disabled')) {
                        if (!$(this).prev('a').hasClass('disabled')) {
                            insGroup = $(this).data('seatGroup');
                            T.saveGroup++;
                        }
                        // 만약 현재 좌석이 예약완료 상태인데, 왼쪽 좌석이 예약완료 상태가 아니면 왼쪽 좌석과 다른 그룹값을 설정
                    } else if ($(this).hasClass('completed')) {
                        if (!$(this).prev('a').hasClass('completed')) {
                            insGroup = $(this).data('seatGroup');
                            T.saveGroup++;
                        }
                        // 만약 현재 좌석이 티켓 매수에의해 선택된 상태인데, 왼쪽 좌석이 선택된 상태가 아니면 왼쪽 좌석과 다른 그룹값을 설정
                    } else if ($(this).hasClass('on')) {
                        if (!$(this).prev('a').hasClass('on') && $(this).prev('a').length > 0) {                    // 1605061
                            insGroup = $(this).data('seatGroup');
                            T.saveGroup++;
                        }
                        // 만약 현재 좌석이 씨네패밀리석인데, 왼쪽 좌석이 씨네패밀리석이 아니면 왼쪽 좌석과 다른 그룹값을 설정
                    } else if ($(this).hasClass('cine_family')) {
                        if (!$(this).prev('a').hasClass('cine_family')) {
                            insGroup = $(this).data('seatGroup');
                            T.saveGroup++;
                        }
                        // 만약 현재 좌석이 선택불가상태이고, 장애인석인데, 왼쪽 좌석이 사용불가 상태가 아니면 왼쪽 좌석과 다른 그룹값을 설정
                    } else if ($(this).hasClass('no_select') && $(this).hasClass('handicapped')) {                   // 1604281
                        if (!$(this).prev('a').hasClass('no_select')) {
                            insGroup = $(this).data('seatGroup');
                            T.saveGroup++;
                        }
                        // 만약 현재 좌석이 씨네커플석인데, 왼쪽 좌석이 씨네커플이 아니면 왼쪽 좌석과 다른 그룹값을 설정
                    } else if ($(this).hasClass('cine_couple')) {
                        if (!$(this).prev('a').hasClass('cine_couple')) {
                            insGroup = $(this).data('seatGroup');
                            T.saveGroup++;
                        } else if ($(this).data('coupleGroup') != $(this).prev('a').data('coupleGroup')) {
                            insGroup = $(this).data('seatGroup');
                            T.saveGroup++;
                        }
                    }
                }

                // 현재 좌서은 선택되지 않은 상태인데, 왼쪽 좌석은 선택되어 있다면 다른 그룹값 설정
                if (!$(this).hasClass('on') && $(this).prev('a').hasClass('on')) {
                    insGroup = $(this).data('seatGroup');
                    T.saveGroup++;
                    // 현재 좌석은 사용불가 상태가 아닌데, 왼쪽 좌석은 사용불가 상태라면 다른 그룹값 설정
                } else if (!$(this).hasClass('disabled') && $(this).prev('a').hasClass('disabled')) {
                    insGroup = $(this).data('seatGroup');
                    T.saveGroup++;
                    // 현재 좌서은 씨네 패밀리가 아닌데, 왼쪽 좌석은 씨네 패밀리일경우 다른 그룹값 설정
                } else if (!$(this).hasClass('cine_family') && $(this).prev('a').hasClass('cine_family')) {
                    insGroup = $(this).data('seatGroup');
                    T.saveGroup++;
                    // 현재 좌석은 씨네 커플이 아닌데, 왼쪽 좌석은 씨네 커플일 경우 다른 그룹값 설정
                } else if (!$(this).hasClass('cine_couple') && $(this).prev('a').hasClass('cine_couple')) {
                    insGroup = $(this).data('seatGroup');
                    T.saveGroup++;
                    // 현재 좌석은 예약 완료 상태가 아닌데, 왼쪽 좌석은 예약 완료 상태일 경우 다른 그룹값 설정
                } else if (!$(this).hasClass('completed') && $(this).prev('a').hasClass('completed')) {
                    insGroup = $(this).data('seatGroup');
                    T.saveGroup++;
                    // 현재 좌석은 선택불가 상태와 장애인석이 아닌데, 왼쪽 좌석은 선택 가능상태와 장애인석일경우 다른 그룹값 설정
                } else if (!($(this).hasClass('no_select') && $(this).hasClass('handicapped')) && ($(this).prev('a').hasClass('no_select')) && $(this).hasClass('handicapped')) {  // 1604281
                    insGroup = $(this).data('seatGroup');
                    T.saveGroup++;
                    // 현재 좌석이 열의 첫번째에 위치하고 있을 경우는 다른 그룹값 설정
                } else if ($(this).index() == 1) {
                    insGroup = $(this).data('seatGroup');
                    T.saveGroup++;
                }// else if (Number($(this).data('seatCol')) - 1 != Number($(this).prev('a').data('seatCol'))) {
                //    insGroup = $(this).data('seatGroup');
                //    T.saveGroup++;
                //};

                // 씨네 패밀리석, 씨네 커플석 및 그 이외의 자석에 따라 css 값 설정
                if ($(this).hasClass('cine_family')) {
                    searGroup = 'faNum' + T.saveGroup;
                } else if ($(this).hasClass('cine_couple')) {
                    searGroup = 'coNum' + T.saveGroup;
                } else {
                    // 20161230 - 샤롯데 프라이빗 8좌석 일괄 구매
                    // 샤롯데 프라이빗일 경우 8좌석 일괄 구매를 위해 강제로 grNum3으로 설정
                    //searGroup = 'grNum' + T.saveGroup;
                    // 20170123 - 샤롯데 프라이빗은 붙임좌석 2만 활성화
                    // 20170126 - 샤롯데 프라이빗 8좌석 일괄 구매 복원
                    //if (parseInt(cookieJson.ticketingState.ticketing.playSequenceCode[0].screenDiv) === 301) {
                    //    searGroup = 'grNum3';
                    //} else {
                    //    searGroup = 'grNum' + T.saveGroup;
                    //}
                    // 20170510 - 샤롯데 프라이빗 수정 - 총 좌석수와 연관좌석수(RelatedSeatCount)가 일치할 경우
                    try {
                        if (T.seatTotal == $(seatUtill.Seats.Items)[0].RelatedSeatCount) {
                            searGroup = 'grNum3';
                        } else {
                            searGroup = 'grNum' + T.saveGroup;
                        }
                    } catch (e) {
                        searGroup = 'grNum' + T.saveGroup;
                    }
                }
                //console.log("searGroup : " + searGroup);
                $(this).addClass(searGroup).attr('seat-group', searGroup);
            });

            T.seatDisable();

            if (T.seatArea.find('a').hasClass('on')) {
                T.seatCookie();
            }
        },

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 영화정보 포스터
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        poster: function () {
            var T = this;

            if (movieUtill.Movies.Items.length > 0) {
                var age = movieUtill.Movies.Items[0].ViewGradeCode;
                var ageName = movieUtill.Movies.Items[0].ViewGradeName;
                var name = movieUtill.Movies.Items[0].MovieName;
                var film = movieUtill.Movies.Items[0].FilmName;
                var img = movieUtill.Movies.Items[0].PosterURL;

                $('.total_data img').attr({ 'src': img, 'alt': name }).parent().next().find('strong').text(name).next().text(film).next().text(ageName);

                switch (age) {
                    case 12:
                        if (T.leng == 'KR') {
                            $('.seat_txt2').show().text('만 12세 미만의 고객님(영, 유아 포함)은 반드시 부모님 또는 성인 보호자의 동반하에 관람이 가능합니다.');
                        } else {
                            $('.seat_txt2').show().text('Audiences under 12 years old in full age (including baby and kid) have to be accompanied with parents or adult guardians for watching.');
                        }
                        break;
                    case 15:
                        if (T.leng == 'KR') {
                            $('.seat_txt2').show().text('만 15세 미만의 고객님(영, 유아 포함)은 반드시 부모님 또는 성인 보호자의 동반하에 관람이 가능합니다.');
                        } else {
                            $('.seat_txt2').show().text('Audiences under 15 years old in full age (including baby and kid) have to be accompanied with parents or adult.');
                        }
                        break;
                    case 18:
                        if (T.leng == 'KR') {
                            $('.seat_txt2').show().text('만 18세 미만의 고객님(영, 유아 포함)은 반드시 부모님 또는 보호자의 동반하여도 관람이 불가합니다. 만 18세 이상이지만 초/중/고 재학중 고객님은 영화관람이 불가합니다. 영화 관람 시, 신분증을 지참하여 주시기 바랍니다.');
                        } else {
                            $('.seat_txt2').show().text('Audiences under 18 years old in full age (including baby and kid) cannot watch even when accompanied by parents or guardians. Audiences who are over 18 years old in full age but attending elementary, middle or high school cannot watch the movie. For entrance, please bring your ID.');
                        }
                        break;
                }
            }

            T.selected();
        },

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 상품리스트 데이터 삽입
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        cinemashopViewYN: function () {
            var T = this;

            T.carouselView = carouselUtill.Result.CinemashopViewYN;

            if (T.carouselView < 1) {
                T.carousel.hide();
                $('.total_wrap').find('.total_slide').addClass('total_list').find('.carouselView').hide();
            }

        },
        productList: function () {
            var T = this;
            var html = '';

            if (productUtill.IsOK == 'FALSE' || productUtill.CinemaMallTicketingItems.Items.length == 0) {
                T.carousel.hide();
                $('.total_wrap').find('.total_slide').addClass('total_list').find('.carouselView').hide();
            } else {

                var productNode = $(productUtill.CinemaMallTicketingItems.Items);

                productNode.sort(function (a, b) { // 영화 소트
                    return a.SortSequence < b.SortSequence ? -1 : a.SortSequence > b.SortSequence ? 1 : 0;
                });

                T.carouselList.empty();

                productNode.each(function (n) {
                    // 주우락: itemType 추가 => largeCode 대용
                    var itemType = $(this)[0].ItemType;      // 시네마몰 대분류 타입: SWEET#(S), 기프트샾(E)
                    var largeCode = Number($(this)[0].DisplayLargeClassificationCode);      // 시네마몰 카테고리 타입: SWEET#(10), 기프트샾(20), 결합(30)
                    var middleCode = $(this)[0].DisplayMiddleClassificationCode;    // 시네마몰 서브 카테고리 타입 코드
                    var cinemaID = $(this)[0].CinemaID;                             // 영화관ID
                    var displayID = $(this)[0].DisplayItemID;                       // 세트품목ID
                    var DisplayName = $(this)[0].DisplayItemName;                   // 세트품목명
                    var dayName = $(this)[0].UseRestrictionsDayName;                // 유효기간
                    var displayDate = $(this)[0].DisplayDate;                       // 구매가능 기간
                    var customerBuy = $(this)[0].CustomerBuyRestrictionsName;       // 구매제한 횟수
                    var sellPrice = $(this)[0].CurrentSellPrice;                    // 정상가격
                    var disPrice = $(this)[0].DiscountSellPrice;                    // 판매가격
                    var refundDayCount = $(this)[0].RefundPassibleDayCount;         // 환불가능날짜수
                    var packageYN = $(this)[0].PackageYN;                           // 패키지 여부
                    var smartYN = $(this)[0].SmartOrderYN;                          // 스마트오더 여부
                    var itemUrl = $(this)[0].ItemImageUrl;                          // 상품 대표 이미지(리스트용)

                    var comboCode = $(this)[0].CombinationItemDivision;             // 결합상품 여부: Y(결합), N(매점)
                    var comboDescript = $(this)[0].CombinationItemDescription;      // 결합상품 설명
                    var screenId = $(this)[0].ScreenId;                             // 상영관ID
                    var playDate = $(this)[0].PlayDate;                             // 상영일

                    var dcType = $(this)[0].DcTypeCode;                             // 할인구분

                    var eventID = $(this)[0].EventID;                               // 이벤트ID
                    var ticketFixed = $(this)[0].TicketCountFixedYN;                // 티켓 구매수 고정 여부
                    var ticketCount = $(this)[0].TicketCount;                       // 티켓 구매 수
                    var ticketSet = $(this)[0].TicketCodeSet;                       // 티켓코드셋: 성인코드,청소년코드, ","로 구분, or조건

                    // 주우락: settleCode에서 DiscountSettleCode로 수정
                    var settleCode = $(this)[0].DiscountSettleCode;                 // 결제코드

                    if (comboCode == 'N' || dcType == 2) {
                        html = '<li class="prdList">';
                    } else {
                        html = '<li class="prdList ticketType" style="display:none;">';
                    }

                    html += '   <div class="product_order">';
                    if (smartYN == 'Y' && T.leng != 'KR') {
                        html += '   <span class="icn_smt">스마트오더가능제품</span>';
                    }
                    html += '		<span class="product_thum"><a href="javascript:void(0);" title="' + DisplayName + '"><img src="' + itemUrl + '" alt="' + DisplayName + '" data-pin-nopin="true"></a></span>';
                    html += '		<div class="product_txt">';
                    html += '			<a href="javascript:void(0);" title="' + DisplayName + '">' + DisplayName + '</a>';
                    html += '		</div>';
                    html += '		<p class="product_price">';
                    if (itemType == 'E' || sellPrice == disPrice) {
                        if (T.leng == 'KR') {
                            html += '			<span class="dash_price">판매가</span>';
                            html += '			<span class="price"><em>' + (sellPrice.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,")) + '</em><span> 원</span></span>';
                        } else {
                            html += '			<span class="dash_price">Sale Price</span>';
                            html += '			<span class="price"><em>' + (sellPrice.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,")) + '</em><span> KRW</span></span>';
                        }
                    } else {
                        html += '			<span class="dash_price"><del>' + (sellPrice.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,")) + '</del></span>';

                        if (T.leng == 'KR') {
                            html += '			<span class="price"><em>' + (disPrice.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,")) + '</em><span> 원</span></span>';
                        } else {
                            html += '			<span class="price"><em>' + (disPrice.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,")) + '</em><span> KRW</span></span>';
                        }
                    }
                    html += '		</p>';
                    html += '	</div>';
                    html += '</li>';

                    T.carouselList.append(html).find('li').last().addClass(displayID).attr({ 'ticketSet': ticketSet, 'ticketCount': ticketCount, 'ticketFixed': ticketFixed }).data({
                        'settleCode': settleCode,
                        'ticketSet': ticketSet,
                        'ticketCount': ticketCount,
                        'ticketFixed': ticketFixed,
                        'itemType': itemType,
                        'largeCode': largeCode,
                        'middleCode': middleCode,
                        'cinemaID': cinemaID,
                        'displayID': displayID,
                        'packageYN': packageYN,
                        'value': 0,
                        'comboCode': comboCode,
                        'dcType': dcType,
                        'eventID': eventID
                    });
                });
            }

            T.prodListEvent();
        },

        prodListEvent: function () {
            var T = this;
            T.prodNo = 0;

            T.carouselList.find('li:visible').each(function (n) {
                $(this).css('left', 250 * n);
            });

            T.prodSum = Math.ceil(T.carouselList.find('li:visible').length / 4);

            T.carouselIndi.empty();


            if (T.prodSum > 1) {
                for (var i = 0; i < T.prodSum; i++) {
                    html = '<li><a href="javascript:void(0);">배너' + (i + 1) + '</a></li>';

                    T.carouselIndi.append(html);
                    if (i == 0) T.carouselIndi.find('li').first().addClass('on');
                }
            } else {
                T.carouselBtn.hide();
            }

            T.carouselIndi.off().on('click', 'a', function () {
                var idx = $(this).parent().index();

                if (idx != T.prodNo) {
                    if (T.carouselList.find('li').is(':animated')) return false;

                    var idxReturn = 0;
                    if (idx > T.prodNo) {
                        idxReturn = idx - T.prodNo;
                        T.carouselList.find('li').animate({ 'left': '-=' + ((250 * 4) * idxReturn) }, 300);
                        T.prodNo = idx;
                    } else {
                        idxReturn = T.prodNo - idx;
                        T.carouselList.find('li').animate({ 'left': '+=' + ((250 * 4) * idxReturn) }, 300);
                        T.prodNo = idx;
                    }

                    T.carouselIndi.find('li').eq(T.prodNo).addClass('on').siblings().removeClass('on');

                    if (T.prodNo == 0) {
                        T.carouselwrap.find('.btn_prev').hide().next().show();
                    } else if (T.prodNo == T.prodSum - 1) {
                        T.carouselwrap.find('.btn_prev').show().next().hide();
                    } else {
                        T.carouselwrap.find('.btn_prev').show().next().show();
                    }
                }
            });

            // 상품 리스트 슬라이드
            T.carouselBtn.off().on('click', function () {
                if (T.carouselList.find('li').is(':animated')) return false;

                T.carouselDetail.slideUp(500);
                T.carouselList.find('li').removeClass('on');

                if ($(this).hasClass('btn_prev')) {
                    if (T.prodNo > 0) {
                        T.prodNo--;
                        T.carouselList.find('li').animate({ 'left': '+=' + (200 * 5) }, 300);
                    }
                } else {
                    if (T.prodNo < T.prodSum - 1) {
                        T.prodNo++;
                        T.carouselList.find('li').animate({ 'left': '-=' + (200 * 5) }, 300);
                    }
                }

                T.carouselIndi.find('li').eq(T.prodNo).addClass('on').siblings().removeClass('on');

                if (T.prodNo == 0) {
                    T.carouselwrap.find('.btn_prev').hide().next().show();
                } else if (T.prodNo == T.prodSum - 1) {
                    T.carouselwrap.find('.btn_prev').show().next().hide();
                } else {
                    T.carouselwrap.find('.btn_prev').show().next().show();
                }
            });

            T.carouselList.off().on('click', 'a', function () {
                $(this).parents('.prdList').addClass('on').siblings().removeClass('on');

                T.prodDetailLoad($(this).parents('.prdList').data('largeCode'), $(this).parents('.prdList').data('middleCode'), $(this).parents('.prdList').data('cinemaID'), $(this).parents('.prdList').data('settleCode'), $(this).parents('.prdList').data('displayID'), $(this).parents('.prdList').data('itemType'));

                T.carouselscroll.find('.shop_list').find('.amount').find('input').val(0);
            });
        },

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 상품상세 로드 - largeCode = 10 단품
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        prodDetailLoad: function (largeCode, middleCode, cinemaID, dcSettleCode, displayID, itemType) {
            if (itemType == 'S') {
                var obj = {
                    MethodName: "CinemaMallSweetItemDetail", channelType: "HO", osType: BrowserAgent(), osVersion: navigator.userAgent, multiLanguageID: this.leng,
                    displayLargeClassification: largeCode, displayMiddleClassification: middleCode, dcSettleCode: dcSettleCode, cinemaID: cinemaID, itemID: displayID
                };
            } else {
                var obj = {
                    MethodName: "CinemaMallGiftItemDetail", channelType: "HO", osType: BrowserAgent(), osVersion: navigator.userAgent, multiLanguageID: this.leng,
                    displayLargeClassification: largeCode, displayMiddleClassification: middleCode, dcSettleCode: dcSettleCode, itemID: displayID
                };
            }

            JsonCall(CinemaServiceDomain + "/LCWS/CinemaMall/CinemaMallData.aspx", obj, this.detailData);
        },

        detailData: function (data) {// 상품상세 로드
            try {
                productDetail = data.responseJSON;
                seatReservation.prodDetailView();
            }
            catch (e) {
                alert('detailError');
            }
        },

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 상품상세
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        prodDetailView: function () {
            var T = this;
            var html = '';

            var datailItems = $(productDetail.CinemaMallItemDetail.Items.Items);               // 아이템
            var datailImagess = $(productDetail.CinemaMallItemDetail.ItemImages.Items);        // 이미지
            var datailAdvises = $(productDetail.CinemaMallItemDetail.ItemUseAdvises.Items);    // 이용안내
            var datailCinemas = $(productDetail.CinemaMallItemDetail.ItemUnShowCinemas.Items); // 상품정보
            var datailRecom = $(productDetail.CinemaMallItemDetail.RecommendationItems.Items); // 상품정보

            var datailInfo = $(productDetail.CinemaMallItemDetail.SetProductInfo);             // 상품정보
            var datailGroup = $(productDetail.CinemaMallItemDetail.FixSetGroupInfos.Items);    // 그룹정보
            var datailFix = $(productDetail.CinemaMallItemDetail.FixSetProductInfos.Items);    // 픽스정보
            var datailSize = $(productDetail.CinemaMallItemDetail.SizeProductInfos.Items);     // 사이즈정보

            //var largeSelect = datailAdvises[0].DisplayLargeClassificationCode;
            //var middleSelect = datailAdvises[0].DisplayMiddleClassificationCode;
            //var sellDay = $(datailItems[0].UseRestrictionsDayName.Items);

            T.carouselDetail.find('> strong').text(datailItems[0].DisplayItemName);
            T.carouselDetail.find('.setInfo').text(datailItems[0].PackageConstitutionProduct);
            T.carouselDetail.find('.dateInfo').text(datailItems[0].DisplayDate);
            if (datailItems[0].CustomerBuyRestrictionsName.length > 0) {
                T.carouselDetail.find('.perInfo').show().text(datailItems[0].CustomerBuyRestrictionsName).prev().show();
            } else {
                T.carouselDetail.find('.perInfo').hide().prev().hide();
            }

            //var dayText = '';
            //sellDay.each(function (n) {
            //    if (n > 0) {
            //        dayText += ' / ';
            //    };
            //    dayText += $(this)[0].SetProductName + ' ';
            //    dayText += $(this)[0].UseRestrictionsDayName;
            //})
            T.carouselDetail.find('.dayInfo').text(datailItems[0].UseRestrictionsDayName);
            if (datailItems[0].DisplayItemDescription.length > 0) {
                T.carouselDetail.find('.txtInfo').show().text(datailItems[0].DisplayItemDescription).prev().show();
            } else {
                T.carouselDetail.find('.txtInfo').hide().prev().hide();
            }

            if (datailItems[0].OptionTemplateCode == 5) {
                T.carouselscroll.find('.sweetTree').show().siblings().hide();
                T.carouselDetail.find('.setInfo').prev('dt').addBack().show();

                var price = datailItems[0].DiscountSellPrice.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,");

                T.carouselscroll.find('.sweetTree').find('.goods_tit').text(datailItems[0].DisplayItemName);
                T.carouselscroll.find('.sweetTree').find('.goods_box').data({ 'price': datailItems[0].DiscountSellPrice });

                T.carouselscroll.find('.sweetTree').data({
                    'comboCode': T.carouselList.find('li.on').data('comboCode'),
                    'dcType': T.carouselList.find('li.on').data('dcType'),
                    'eventID': T.carouselList.find('li.on').data('eventID'),
                    'itemType': T.carouselList.find('li.on').data('itemType'),
                    'rootAmount': datailItems[0].CurrentSellPrice,
                    'packageYN': datailItems[0].PackageYN,
                    'RootTypeCode': datailInfo[0].SetTypeCode,
                    'itemCode': datailItems[0].DisplayItemID,
                    'setName': datailItems[0].DisplayItemName,
                    'RootPrice': datailItems[0].DiscountSellPrice,
                    'DuplDivisionCode': datailItems[0].DuplDcDivisionCode,
                    'totalAmount': datailItems[0].CurrentSellPrice,
                    'RootsettleCode': datailItems[0].SettleCode,
                    'OptionTemplateCode': datailItems[0].OptionTemplateCode,
                    'LargeClassCode': datailItems[0].DisplayLargeClassificationCode,
                    'RootDivCode': datailItems[0].ConstitutionProductionDivCode,
                    'buyQuantity': 1
                });
            } else if (datailItems[0].OptionTemplateCode == 1) { // 단품옵션
                T.carouselscroll.find('.sweetOne').show().empty().siblings().hide();
                T.carouselDetail.find('.setInfo').prev('dt').addBack().hide();

                var price = datailItems[0].DiscountSellPrice.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,");

                T.carouselscroll.find('.sweetOne').find('.goods_box').find('.price').data({ 'price': datailItems[0].DiscountSellPrice }).find('span').text(price);

                html = '<div class="pro_tit">' + datailGroup[0].Option1Title;
                html += '    <select>';
                if (T.leng == 'KR') { // 1604222
                    html += '        <option value="0" class="default">선택하세요</option>';
                } else {
                    html += '        <option value="0" class="default">selection</option>';
                };
                html += '    </select>';
                html += '</div>';
                html += '<ul class="shop_list">';
                html += '</ul>';

                T.carouselscroll.find('.sweetOne').append(html);

                T.carouselscroll.find('.sweetOne').data({//settleCode
                    'comboCode': T.carouselList.find('li.on').data('comboCode'),
                    'dcType': T.carouselList.find('li.on').data('dcType'),
                    'eventID': T.carouselList.find('li.on').data('eventID'),
                    'itemType': T.carouselList.find('li.on').data('itemType'),
                    'rootAmount': datailItems[0].CurrentSellPrice,
                    'packageYN': datailItems[0].PackageYN,
                    'RootTypeCode': datailInfo[0].SetTypeCode,
                    'itemCode': datailItems[0].DisplayItemID,
                    'RootsettleCode': datailItems[0].SettleCode,
                    'setName': datailItems[0].DisplayItemName,
                    'RootPrice': datailItems[0].DiscountSellPrice,
                    'DuplDivisionCode': datailItems[0].DuplDcDivisionCode,
                    'totalAmount': datailItems[0].CurrentSellPrice,
                    'OptionTemplateCode': datailItems[0].OptionTemplateCode,
                    'LargeClassCode': datailItems[0].DisplayLargeClassificationCode,
                    'RootDivCode': datailItems[0].ConstitutionProductionDivCode,
                    'buyQuantity': 1
                });

                if (T.carouselList.find('li.on').data('comboCode') == 'Y') {
                    T.carouselscroll.find('.sweetOne').data({
                        'RootsettleCode': T.carouselList.find('li.on').data('settleCode')
                    });
                }

                T.carouselscroll.find('.total').find('span').text(0).data({ 'price': 0 });

                datailSize.each(function (n) {
                    var menuID = $(this)[0].MenuID;
                    var setummyID = $(this)[0].SetGroupDummyID;
                    var setName = $(this)[0].SetGroupName;
                    var selectCode = $(this)[0].SelectProductID;
                    var selectName = $(this)[0].SelectProductName;
                    var addPrice = $(this)[0].AddPrice;
                    var sellPrice = $(this)[0].DiscountSellPrice;
                    var normalAmount = $(this)[0].NormalAmount;
                    var settleCode = $(this)[0].SettleCode;
                    var tastCode = $(this)[0].TastePerfumeCode;
                    var tasteName = $(this)[0].TastePerfumeName;

                    html = '<option value="' + selectCode + '" class="' + tastCode + '">' + selectName + '</option>'; // 1604152
                    //html = '<option value="' + selectCode + '" class="' + tastCode + '">' + selectName + '(+' + addPrice + ')</option>';

                    //T.carouselscroll.find('.sweetOne').find('select').append(html).find('option').last().data({
                    T.carouselscroll.find('.sweetOne').find('select').append(html).find('option').last().data({
                        'selectMenuID': datailGroup[0].MenuID,
                        'selectName': selectName,
                        'sellPrice': sellPrice,
                        'normalAmount': normalAmount,
                        'optionIAddPrice': addPrice,
                        'dataSelect': selectCode,
                        'settleCode': settleCode,
                        'optionIBuyQuantity': 0,
                        'ConsDivCode': datailGroup[0].ConstitutionProductionDivCode
                    });

                    if (T.carouselList.find('li.on').data('comboCode') == 'Y') {
                        T.carouselscroll.find('.sweetOne').find('select').find('option').last().data({
                            'settleCode': T.carouselList.find('li.on').data('settleCode')
                        });
                    }


                });




            } else if (datailItems[0].OptionTemplateCode == 2) { // 콤보상품
                T.carouselscroll.find('.sweetTwo').show().empty().siblings().hide();
                T.carouselDetail.find('.setInfo').prev('dt').addBack().show();

                var price = datailItems[0].DiscountSellPrice.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,");

                T.carouselscroll.find('.sweetTwo').data({
                    'comboCode': T.carouselList.find('li.on').data('comboCode'),
                    'dcType': T.carouselList.find('li.on').data('dcType'),
                    'eventID': T.carouselList.find('li.on').data('eventID'),
                    'itemType': T.carouselList.find('li.on').data('itemType'),
                    'rootAmount': datailItems[0].CurrentSellPrice,
                    'packageYN': datailItems[0].PackageYN,
                    'RootTypeCode': datailInfo[0].SetTypeCode,
                    'itemCode': datailItems[0].DisplayItemID,
                    'RootsettleCode': datailItems[0].SettleCode,
                    'setName': datailItems[0].DisplayItemName,
                    'RootPrice': datailItems[0].DiscountSellPrice,
                    'DuplDivisionCode': datailItems[0].DuplDcDivisionCode,
                    'totalAmount': datailItems[0].CurrentSellPrice,
                    'OptionTemplateCode': datailItems[0].OptionTemplateCode,
                    'LargeClassCode': datailItems[0].DisplayLargeClassificationCode,
                    'RootDivCode': datailItems[0].ConstitutionProductionDivCode,
                    'buyQuantity': 1
                });

                if (T.carouselList.find('li.on').data('comboCode') == 'Y') {
                    T.carouselscroll.find('.sweetTwo').data({
                        'RootsettleCode': T.carouselList.find('li.on').data('settleCode')
                    });
                }

                datailGroup.each(function (n) {
                    var selectType = $(this)[0].FixSelectType;
                    var menuID = $(this)[0].MenuID;
                    var optionTitle = $(this)[0].Option1Title;
                    var setummyID = $(this)[0].SetGroupDummyID;
                    var setName = $(this)[0].SetGroupName;
                    var optionItemCode = $(this)[0].SetGroupName;
                    var ConsDivCode = $(this)[0].ConstitutionProductionDivCode;

                    html = '<ul class="shop_list03 ' + setummyID + '">';
                    html += '   <li>';
                    html += '       <strong class="pro_tit">' + setName + '</strong>';
                    html += '       <ul class="sel_list">';
                    html += '           <li>';
                    html += '               <select class="select_box taste">';
                    // 20160318 맛 주석 처리 참고
                    //if (T.leng == 'KR') {
                    //    html += '                   <option value="0" class="default">' + optionTitle + '을 선택하세요</option>';
                    //} else {
                    //    html += '                   <option value="0" class="default">' + optionTitle + ' selection</option>';
                    //};
                    html += '               </select>';
                    html += '           </li>';
                    html += '           <li class="size_select">';
                    html += '               <select class="select_box size">';
                    //if (T.leng == 'KR') {
                    //    html += '                   <span><option value="0" class="default">선택하세요</option></span>';
                    //} else {
                    //    html += '                   <span><option value="0" class="default">selection</option></span>';
                    //};
                    html += '               </select>';
                    html += '           </li>';
                    html += '       </ul>';
                    html += '   </li>';
                    html += '</ul>';

                    T.carouselscroll.find('.sweetTwo').append(html).find('> ul').last().data({
                        'selectMenuID': menuID,
                        'setTypeCode': 0,
                        'ConsDivCode': ConsDivCode,
                        'optionITypeName': optionTitle
                    });
                });

                datailFix.each(function (n) {
                    var menuID = $(this)[0].MenuID;
                    var setummyID = $(this)[0].SetGroupDummyID;
                    var sizeCount = $(this)[0].SizeCount;
                    var setName = $(this)[0].SetGroupName;
                    var tastCode = $(this)[0].TastePerfumeCode;
                    var tasteName = $(this)[0].Option1ListValue;
                    var optionTitle = $(this)[0].Option2Title;

                    html = '<option value="' + menuID + '" class="' + tastCode + '">' + tasteName + '</option>';

                    T.carouselscroll.find('.sweetTwo').find('.' + setummyID).find('.taste').append(html).find('option').last().data({ 'sizeCount': sizeCount });

                    T.carouselscroll.find('.sweetTwo').find('> ul').eq(n).data({
                        'optionISelectName': optionTitle
                    });

                    // 20160318 맛 주석 처리 참고
                    //if (n == 0) {
                    //    if (T.leng == 'KR') {
                    //        T.carouselscroll.find('.sweetTwo').find('.' + setummyID).find('.size').find('option').first().text(optionTitle + '를 선택하세요');
                    //    } else {
                    //        T.carouselscroll.find('.sweetTwo').find('.' + setummyID).find('.size').find('option').first().text(optionTitle + ' selection');
                    //    };
                    //};
                });

                T.carouselscroll.find('.sweetTwo').find('.taste').each(function (n) {
                    $(this).find('option').first().prop('selected', true);

                    var selectName = $(this).find('option').first().text();

                    T.carouselscroll.find('.sweetTwo').find('> ul').eq(n).data({
                        'optionITypeName': selectName
                    });
                });

                datailSize.each(function (n) {
                    var menuID = $(this)[0].MenuID;
                    var setummyID = $(this)[0].SetGroupDummyID;
                    var setName = $(this)[0].SetGroupName;
                    var sizeCount = $(this)[0].SizeCount;
                    var selectCode = $(this)[0].SelectProductID;
                    var selectName = $(this)[0].SelectProductName;
                    var addPrice = $(this)[0].AddPrice;
                    var sellPrice = $(this)[0].DiscountSellPrice;
                    var normalAmount = $(this)[0].NormalAmount;
                    var SettleCode = $(this)[0].SettleCode;
                    var tastCode = $(this)[0].TastePerfumeCode;
                    var tasteName = $(this)[0].TastePerfumeName;
                    var option2List = $(this)[0].Option2ListValue;

                    html = '<option value="' + addPrice + '" class="' + tastCode + '">' + option2List + '</option>';
                    //console.log(html);
                    T.carouselscroll.find('.sweetTwo').find('.' + setummyID).find('.size').append(html).find('option').last().data({
                        'dataSelect': selectCode,
                        'normalAmount': normalAmount,
                        'optionIAddPrice': addPrice
                    });

                    T.carouselscroll.find('.sweetTwo').find('.' + setummyID).data({
                        'optionISelectCode': '',
                        'sellPrice': sellPrice,
                        'settleCode': SettleCode
                    });

                    if (T.carouselList.find('li.on').data('comboCode') == 'Y') {
                        T.carouselscroll.find('.sweetTwo').find('.' + setummyID).data({
                            'settleCode': T.carouselList.find('li.on').data('settleCode')
                        });
                    }
                });

                T.carouselscroll.find('.sweetTwo').find('.size').each(function (n) {
                    var tastVar = $(this).parent().prev().find('select').find('option').first().attr('class');

                    $(this).find('option').not('.' + tastVar).wrap('<span></span>');
                    $(this).find('> span').hide();

                    $(this).find('> option').first().prop('selected', true);

                    var selectName = $(this).find('> option').first().text();

                    T.carouselscroll.find('.sweetTwo').find('> ul').eq(n).data({
                        'optionISelectName': selectName
                    });
                });

                T.carouselscroll.find('.total').find('span').text(datailItems[0].DiscountSellPrice.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,")).data({ 'price': datailItems[0].DiscountSellPrice });
            };

            T.carouselDetail.slideDown(500);

            T.prodDetailEvent(datailItems[0].OptionTemplateCode);
        },

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 상품 상세 이벤트
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        prodDetailEvent: function (OptionTemplateCode) {
            var T = this;
            var html = '';

            if (OptionTemplateCode == 5) {
                T.carouselscroll.find('.sweetTree').find('.amount').off().on('click', 'a', function () {
                    if ($(this).hasClass('prod_up')) {
                        $(this).siblings('input').val(Number($(this).siblings('input').val()) + 1);

                        var price = $(this).parents('.goods_box').data('price') * Number($(this).siblings('input').val());

                        $(this).parent().siblings('.price').find('span').text(price.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,")).data({ 'price': price });
                    } else {
                        if (Number($(this).siblings('input').val()) > 0) {
                            $(this).siblings('input').val(Number($(this).siblings('input').val()) - 1);

                            var price = $(this).parents('.goods_box').data('price') * Number($(this).siblings('input').val());
                            $(this).parent().siblings('.price').find('span').text(price.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,")).data({ 'price': price });
                        }
                    }

                    var totalPrice = Number($(this).parents('.goods_box').data('price')) * Number($(this).siblings('input').val());

                    T.carouselscroll.find('.total').find('span').text(totalPrice.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,"));
                });

                T.carouselDetail.find('.btnc_complete').off().on('click', function () {
                    var inputVal = T.carouselscroll.find('.sweetTree');
                    if (Number(inputVal.find('input').val()) > 0) {

                        var totalPrice = Number(inputVal.find('.goods_box').data('price')) * Number(inputVal.find('input').val());

                        html = '<dl class="' + inputVal.data('itemCode') + '">';
                        html += '   <dt>' + inputVal.data('setName') + '</dt>';
                        html += '   <dd>&#92; <span>' + totalPrice.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,") + '</span><a href="javascript:void(0);"><img src="/LCHS/Image/Btn/btn_close03.png" alt="닫기"></a></dd>';
                        html += '</dl>';

                        T.sweetWrap.append(html).find('.' + T.carouselscroll.find('.sweetTree').data('itemCode')).last().data({
                            'price': totalPrice,
                            'itemType': T.carouselscroll.find('.sweetTree').data('itemType'),
                            'comboCode': T.carouselscroll.find('.sweetTree').data('comboCode'),
                            'dcType': T.carouselscroll.find('.sweetTree').data('dcType'),
                            'rootAmount': T.carouselscroll.find('.sweetTree').data('rootAmount'),
                            'eventID': T.carouselscroll.find('.sweetTree').data('eventID'),
                            'LargeClassCode': T.carouselscroll.find('.sweetTree').data('LargeClassCode'),
                            'packageYN': T.carouselscroll.find('.sweetTree').data('packageYN'),
                            'RootTypeCode': T.carouselscroll.find('.sweetTree').data('RootTypeCode'),
                            'itemCode': T.carouselscroll.find('.sweetTree').data('itemCode'),
                            'setName': T.carouselscroll.find('.sweetTree').data('setName'),
                            'RootPrice': T.carouselscroll.find('.sweetTree').data('RootPrice'),
                            'DuplDivisionCode': T.target.find('.sweetTree').data('DuplDivisionCode'),
                            'totalAmount': totalPrice,
                            'RootsettleCode': T.carouselscroll.find('.sweetTree').data('RootsettleCode'),
                            'buyQuantity': T.carouselscroll.find('.sweetTree').data('buyQuantity'),
                            'RootDivCode': T.carouselscroll.find('.sweetTree').data('RootDivCode'),
                            'OptionTemplateCode': T.carouselscroll.find('.sweetTree').data('OptionTemplateCode')
                        });

                        $('.prodView').show();
                    } else {
                        T.sweetWrap.find('.' + inputVal.data('itemCode')).remove();
                    }

                    T.carouselList.find('.' + T.carouselscroll.find('.sweetTree').data('itemCode')).data({ 'value': 1 });

                    if (T.sweetWrap.find('dl').length > 0) {
                        T.sweetWrap.find('p').remove();

                        T.prodTotal();
                    } else {
                        T.sweetWrap.empty().append(T.sweetText);
                    }

                    if ($(this).hasClass('complete_end')) {
                        T.carouselList.find('li').removeClass('on');
                        T.carouselDetail.slideUp(500);
                    }
                });
            } else if (OptionTemplateCode == 1) { ////////////////////////// 단품옵션
                T.carouselscroll.find('.sweetOne').find('select').change(function () {
                    var html = '';
                    var dummyID = $(this).val();

                    var selectMenuID = $(this).find('option:selected').data('selectMenuID');
                    var selectName = $(this).find('option:selected').data('selectName');
                    var sellPrice = $(this).find('option:selected').data('sellPrice');
                    var optionIAddPrice = $(this).find('option:selected').data('optionIAddPrice');
                    var dataSelect = $(this).find('option:selected').data('dataSelect');
                    var settleCode = $(this).find('option:selected').data('settleCode');
                    var optionIBuyQuantity = $(this).find('option:selected').data('optionIBuyQuantity');
                    var ConsDivCode = $(this).find('option:selected').data('ConsDivCode');
                    var normalAmount = $(this).find('option:selected').data('normalAmount');
                    var valText1 = $(this).find('option:selected').text();  // 1603262

                    if (!$(this).parents('.pro_tit').next('.shop_list').find('li').hasClass(dummyID) && dummyID != "0") {  // 1604222
                        html = '<li class="shopAppend ' + dummyID + '">';
                        html += '   <strong class="goods_tit">' + selectName + '</strong>';
                        html += '   <div class="goods_box">';
                        html += '       <div class="amount">';
                        //html += '           <input type="text" title="수량갯수 입력" value="0">';
                        html += '           <input type="text" title="수량갯수 입력" value="1">';
                        html += '           <a href="javascript:void(0);" class="prod_down"><img src="/LCHS/Image/Btn/btn_s_minus02.gif" alt="수랑감소"></a>';
                        html += '           <a href="javascript:void(0);" class="prod_up"><img src="/LCHS/Image/Btn/btn_s_plus02.gif" alt="수량증가"></a>';
                        html += '       </div>';
                        if (T.leng == 'KR') {
                            //html += '       <p class="price"><span>0</span>원</p>';
                            html += '       <p class="price"><span>' + sellPrice + '</span>원</p>'; // 1604222
                        } else {
                            //html += '       <p class="price"><span>0</span>KRW</p>';
                            html += '       <p class="price"><span>' + sellPrice + '</span>KRW</p>'; // 1604222
                        }
                        html += '       <a href="javascript:void(0);" class="btn_s_close"><img src="/LCHS/Image/Btn/btn_d_close.png" alt="닫기"></a>';
                        html += '   </div>';
                        html += '</li>';

                        // 총 가격 초기화값
                        var totalPrice = sellPrice;
                        T.carouselscroll.find('.sweetOne').find('.shop_list').find('li').each(function () {
                            totalPrice += Number($(this).find('.price').find('span').data('price'));
                        });
                        T.carouselscroll.find('.total').find('span').text(totalPrice).data({ 'price': totalPrice });


                        $(this).parents('.pro_tit').next('.shop_list').append(html).find('li').last().data({
                            'normalAmount': normalAmount,
                            'selectMenuID': selectMenuID,
                            'selectName': selectName,
                            'sellPrice': sellPrice,
                            'optionIAddPrice': optionIAddPrice,
                            'settleCode': settleCode,
                            //'optionIBuyQuantity': 0,
                            'optionIBuyQuantity': 1, // 1604222
                            'optionISelectCode': dataSelect,
                            'optionISelectName': valText1,  //1603262
                            'optionITypeName': "",
                            'ConsDivCode': ConsDivCode
                        }).find('.price').find('span').data({
                            'price': 0
                        });


                    }
                    //    $(this).find('option').first().attr('selected', 'selected');
                    //} else {
                    //    $(this).find('option').first().attr('selected', 'selected');
                    //}

                    T.carouselscroll.find('.sweetOne').find('.shop_list').find('.amount').off().on('click', 'a', function () {
                        if ($(this).hasClass('prod_up')) {
                            $(this).siblings('input').val(Number($(this).siblings('input').val()) + 1);

                            var price = $(this).parents('.shopAppend').data('sellPrice') * Number($(this).siblings('input').val());

                            $(this).parent().siblings('.price').find('span').text(price.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,")).data({ 'price': price });
                        } else {
                            if (Number($(this).siblings('input').val()) > 0) {
                                $(this).siblings('input').val(Number($(this).siblings('input').val()) - 1);

                                var price = $(this).parents('.shopAppend').data('sellPrice') * Number($(this).siblings('input').val());
                                $(this).parent().siblings('.price').find('span').text(price.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,")).data({ 'price': price });
                            }
                        }

                        $(this).parents('.shopAppend').data({ 'optionIBuyQuantity': $(this).siblings('input').val() });

                        var totalPrice = 0;

                        T.carouselscroll.find('.sweetOne').find('.shop_list').find('li').each(function () {
                            totalPrice += Number($(this).find('.price').find('span').data('price'));
                        });

                        T.carouselscroll.find('.total').find('span').text(totalPrice.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,")).data({ 'price': totalPrice });
                    });

                    T.carouselscroll.find('.sweetOne').find('.shop_list').find('.btn_s_close').off().on('click', function () {


                        var len = T.carouselscroll.find('.sweetOne').find("li").length; // 1604042
                        //if (len <= 1) {  // 1604222
                        if (len <= 0) {
                            var bookingError = new $.fn.modalPopGeneration({ type: 'server', lang: T.leng, btns: true, btnParam1: false, btnParam2: true, serverTitle: '알림', serverMessage: "상품은 1개이상 선택 하셔야 합니다.", elem: $(this) });
                            return false;
                        }

                        $(this).parents('.shopAppend').remove();

                        var totalPrice = 0;
                        T.carouselscroll.find('.sweetOne').find('.shop_list').find('li').each(function () {
                            totalPrice += Number($(this).find('.price').find('span').data('price'));
                        });

                        T.carouselscroll.find('.total').find('span').text(totalPrice.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,")).data({ 'price': totalPrice });

                        T.carouselscroll.find('.sweetOne').find('.pro_tit > select').val(0); // 1604222
                    });

                    // 1603262 기본 수량 선택하도록 함 
                    //T.carouselscroll.find('.sweetOne').find('.' + dummyID + '').find('.prod_up').trigger('click');  // 1604042
                });

                T.carouselDetail.find('.btnc_complete').off().on('click', function () {

                    var totalPrice = Number(T.carouselscroll.find('.total').find('span').data('price'));

                    T.carouselscroll.find('.sweetOne').find('.shop_list').find('.price').each(function () {
                        if ($(this).children().text() == '0') {
                            totalPrice = 0;
                        }
                    });

                    if (totalPrice > 0) {
                        html = '<dl class="' + T.carouselscroll.find('.sweetOne').data('itemCode') + '">';
                        html += '   <dt>' + T.carouselscroll.find('.sweetOne').data('setName') + '</dt>';
                        html += '   <dd>&#92; <span>' + totalPrice.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,") + '</span><a href="javascript:void(0);"><img src="/LCHS/Image/Btn/btn_close03.png" alt="닫기"></a></dd>';
                        html += '</dl>';

                        T.sweetWrap.append(html).find('.' + T.carouselscroll.find('.sweetOne').data('itemCode')).last().data({
                            'price': totalPrice,
                            'itemType': T.carouselscroll.find('.sweetOne').data('itemType'),
                            'comboCode': T.carouselscroll.find('.sweetOne').data('comboCode'),
                            'dcType': T.carouselscroll.find('.sweetOne').data('dcType'),
                            'eventID': T.carouselscroll.find('.sweetOne').data('eventID'),
                            'LargeClassCode': T.carouselscroll.find('.sweetOne').data('LargeClassCode'),
                            'packageYN': T.carouselscroll.find('.sweetOne').data('packageYN'),
                            'RootTypeCode': T.carouselscroll.find('.sweetOne').data('RootTypeCode'),
                            'rootAmount': T.carouselscroll.find('.sweetOne').data('rootAmount'),
                            'itemCode': T.carouselscroll.find('.sweetOne').data('itemCode'),
                            'setName': T.carouselscroll.find('.sweetOne').data('setName'),
                            'RootPrice': T.carouselscroll.find('.sweetOne').data('RootPrice'),
                            'DuplDivisionCode': T.target.find('.sweetOne').data('DuplDivisionCode'),
                            'totalAmount': totalPrice,
                            'RootsettleCode': T.carouselscroll.find('.sweetOne').data('RootsettleCode'),
                            'buyQuantity': T.carouselscroll.find('.sweetOne').data('buyQuantity'),
                            'RootDivCode': T.carouselscroll.find('.sweetOne').data('RootDivCode'),
                            'OptionTemplateCode': T.carouselscroll.find('.sweetOne').data('OptionTemplateCode')
                        });

                        var selectMenuID = [];
                        var optionISelectCode = [];
                        var sellPrice = [];
                        var optionIAddPrice = [];
                        var settleCode = [];
                        var ConsDivCode = [];
                        var normalAmount = [];
                        var optionIBuyQuantity = [];
                        var optionITypeName = []; //1603262
                        var optionISelectName = [];

                        T.carouselscroll.find('.sweetOne').find('.shop_list').find('li').each(function (n) {
                            selectMenuID[n] = $(this).data('selectMenuID');
                            optionISelectCode[n] = $(this).data('optionISelectCode');
                            sellPrice[n] = $(this).data('sellPrice');
                            optionIAddPrice[n] = $(this).data('optionIAddPrice');
                            settleCode[n] = $(this).data('settleCode');
                            ConsDivCode[n] = $(this).data('ConsDivCode');
                            normalAmount[n] = $(this).data('normalAmount');
                            optionIBuyQuantity[n] = $(this).data('optionIBuyQuantity');
                            optionISelectName[n] = $(this).data('selectName');
                            //optionITypeName[n] = $(this).data('optionITypeName'); //1603262
                            optionITypeName[n] = $(this).data('optionITypeName').replace(/\+/gi, '!p!'); //1603262
                        });


                        T.sweetWrap.find('.' + T.carouselscroll.find('.sweetOne').data('itemCode')).data({
                            'selectMenuID': selectMenuID,
                            'optionISelectCode': optionISelectCode,
                            'sellPrice': sellPrice,
                            'optionIAddPrice': optionIAddPrice,
                            'settleCode': settleCode,
                            'ConsDivCode': ConsDivCode,
                            'normalAmount': normalAmount,
                            'optionIBuyQuantity': optionIBuyQuantity,
                            'optionISelectName': optionISelectName,
                            'optionITypeName': optionITypeName  // 1603262
                        });

                        if (T.sweetWrap.find('dl').length > 0) {
                            T.sweetWrap.find('p').remove();
                            T.prodTotal();
                        } else {
                            T.sweetWrap.empty().append(T.sweetText);
                        }

                        if ($(this).hasClass('complete_end')) {
                            T.carouselList.find('li').removeClass('on');
                            T.carouselDetail.slideUp(500);
                        }



                        $('.prodView').show();
                    } else {
                        var popSet = new $.fn.modalPopGeneration({ type: 'message', code: 'COM1116', lang: T.leng, btns: true, btnParam1: false, btnParam2: true, elem: $(this) });
                    }
                });

                //T.carouselscroll.find('.sweetOne').find('select').each(function (n) { // 1603262 기본값선택
                //    $(this).find('option').first().attr('selected', true);  // 1604222
                //    $(this).trigger('change');
                //});

            } else if (OptionTemplateCode == 2) { ////////////////////////// 콤보상품
                T.carouselscroll.find('.sweetTwo').find('.taste').change(function () {
                    var dummyID = $(this).find('option:selected').attr('class');
                    var count = Number($(this).find('option:selected').data('sizeCount'));
                    var valText1 = $(this).find('> option:selected').text();
                    if (count == "NaN" || typeof count == "undefined") {
                        count = 0;
                    }
                    if (count > 0) {
                        $(this).parent().next().find('span').find('> option').unwrap();
                        //$(this).parent().next().slideDown(300).find('option').not('.' + dummyID).wrap('<span></span>').parent().hide().find('option').eq(0).unwrap();
                        //console.log(dummyID);
                        $(this).parent().next().find('select').find('> option').not('.' + dummyID).wrap('<span></span>');
                    } else {
                        $(this).parent().next().find('span').find('> option').unwrap();
                        $(this).parent().next().find('option.' + dummyID).eq(0).attr('selected', 'selected');
                        $(this).parent().next().slideUp(300).find('option').not('.' + dummyID).wrap('<span></span>').parent().hide();

                        var dummyVal = $(this).parent().next().find('option.' + dummyID).eq(0).val();
                        $(this).parent().next().val(dummyVal).change();
                    }

                    $(this).parents('.shop_list03').data({
                        'optionITypeName': valText1,
                        //'selectMenuID': $(this).val()
                        'selectMenuID': Number($(this).find("> option:selected").val())
                    });

                    var totalPrice = Number(T.carouselscroll.find('.total').find('span').data('price'));

                    //console.log("옵션1 : " + $(this).children().first().prop('tagName') + ',' + $(this).find(':selected').text() + ":" + "$(this).find(':selected').index()=" + $(this).find(':selected').index());
                    T.carouselscroll.find('.sweetTwo').find('.size').each(function () {
                        //totalPrice += Number($(this).val());
                        totalPrice += Number($(this).find("> option:selected").val());
                        //console.log("옵션2 totalPrice : " + totalPrice);
                        $(this).parents('.shop_list03').data({
                            // 20160314 김태완 - 수정
                            //'normalAmount': $(this).find('option:selected').data('normalAmount'),
                            //'optionISelectCode': $(this).find('option:selected').data('dataSelect'),
                            //'optionIAddPrice': $(this).find('option:selected').data('optionIAddPrice')
                            'normalAmount': $(this).find('> option:selected').data('normalAmount'),
                            'optionISelectCode': $(this).find('> option:selected').data('dataSelect'),
                            'optionIAddPrice': $(this).find('> option:selected').data('optionIAddPrice')
                        });
                        //console.log($(this).parents('.shop_list03').data());
                    });
                    T.carouselscroll.find('.total').find('span').text(totalPrice.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,"));
                });

                // 2번째 옵션 변경시
                T.carouselscroll.find('.sweetTwo').find('.size').change(function () {
                    var totalPrice = Number(T.carouselscroll.find('.total').find('span').data('price'));
                    var valText2 = $(this).find('> option:selected').text();

                    $(this).parents('.shop_list03').data({
                        // 20160314 김태완 - 수정
                        //'normalAmount': $(this).find('option:selected').data('normalAmount'),
                        //'optionISelectCode': $(this).find('option:selected').data('dataSelect'),
                        //'optionIAddPrice': $(this).find('option:selected').data('optionIAddPrice'),
                        'normalAmount': $(this).find('> option:selected').data('normalAmount'),
                        'optionISelectCode': $(this).find('> option:selected').data('dataSelect'),
                        'optionIAddPrice': $(this).find('> option:selected').data('optionIAddPrice'),
                        'optionISelectName': valText2
                    });

                    //console.log("옵션2 ==>>" +$(this).children().first().prop('tagName') + ',' + $(this).find(':selected').text() + ":" + "$(this).find(':selected').index()=" + $(this).find(':selected').index());
                    T.carouselscroll.find('.sweetTwo').find('.size').each(function () {
                        //totalPrice += Number($(this).val());
                        totalPrice += Number($(this).find("> option:selected").val());
                    });
                    T.carouselscroll.find('.total').find('span').text(totalPrice.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,"));
                });

                T.carouselscroll.find('.sweetTwo').find('.taste').each(function () {
                    //if ($(this).find('option').length < 3) {
                    if ($(this).find('option').length < 2) { // 1604061
                        $(this).find('option').eq(1).attr('selected', 'selected');
                        $(this).change().attr('disabled', 'disabled');
                    }
                });

                T.carouselDetail.find('.btnc_complete').off().on('click', function () {
                    var valueError = true;

                    //######################################
                    // 20160321 김태완 - 매점상품 기본설정시 change 이벤트 안하면 값 설정이 안되므로 추가함
                    T.carouselscroll.find('.sweetTwo').find('.size').change();
                    //######################################

                    T.carouselscroll.find('.sweetTwo').find('select').each(function () {
                        if ($(this).find('> option:selected').attr('class') == 'default') {
                            valueError = false;
                        }
                    });

                    if (valueError) {
                        var totalPrice = Number(T.carouselscroll.find('.total').find('span').data('price'));

                        T.carouselscroll.find('.sweetTwo').find('.size').each(function () {
                            //totalPrice += Number($(this).val());
                            totalPrice += Number($(this).find(">option:selected").val());
                        });

                        html = '<dl class="' + T.carouselscroll.find('.sweetTwo').data('itemCode') + '">';
                        html += '   <dt>' + T.carouselscroll.find('.sweetTwo').data('setName') + '</dt>';
                        html += '   <dd>&#92; <span>' + totalPrice.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,") + '</span><a href="javascript:void(0);"><img src="/LCHS/Image/Btn/btn_close03.png" alt="닫기"></a></dd>';
                        html += '</dl>';

                        T.sweetWrap.append(html).find('.' + T.carouselscroll.find('.sweetTwo').data('itemCode')).last().data({
                            'price': totalPrice,
                            'itemType': T.carouselscroll.find('.sweetTwo').data('itemType'),
                            'comboCode': T.carouselscroll.find('.sweetTwo').data('comboCode'),
                            'dcType': T.carouselscroll.find('.sweetTwo').data('dcType'),
                            'rootAmount': T.carouselscroll.find('.sweetTwo').data('rootAmount'),
                            'eventID': T.carouselscroll.find('.sweetTwo').data('eventID'),
                            'LargeClassCode': T.carouselscroll.find('.sweetTwo').data('LargeClassCode'),
                            'packageYN': T.carouselscroll.find('.sweetTwo').data('packageYN'),
                            'RootTypeCode': T.carouselscroll.find('.sweetTwo').data('RootTypeCode'),
                            'itemCode': T.carouselscroll.find('.sweetTwo').data('itemCode'),
                            'setName': T.carouselscroll.find('.sweetTwo').data('setName'),
                            'RootPrice': T.carouselscroll.find('.sweetTwo').data('RootPrice'),
                            'DuplDivisionCode': T.target.find('.sweetTwo').data('DuplDivisionCode'),
                            'totalAmount': totalPrice,
                            'RootsettleCode': T.carouselscroll.find('.sweetTwo').data('RootsettleCode'),
                            'buyQuantity': T.carouselscroll.find('.sweetTwo').data('buyQuantity'),
                            'RootDivCode': T.carouselscroll.find('.sweetTwo').data('RootDivCode'),
                            'OptionTemplateCode': T.carouselscroll.find('.sweetTwo').data('OptionTemplateCode')

                        });

                        var selectMenuID = [];
                        var optionISelectCode = [];
                        var sellPrice = [];
                        var optionIAddPrice = [];
                        var settleCode = [];
                        var ConsDivCode = [];
                        var normalAmount = [];
                        var optionITypeName = [];
                        var optionISelectName = [];

                        T.carouselscroll.find('.sweetTwo').find('> ul').each(function (n) {
                            selectMenuID[n] = $(this).data('selectMenuID');
                            optionISelectCode[n] = $(this).data('optionISelectCode');
                            sellPrice[n] = $(this).data('sellPrice');
                            optionIAddPrice[n] = $(this).data('optionIAddPrice');
                            settleCode[n] = $(this).data('settleCode');
                            ConsDivCode[n] = $(this).data('ConsDivCode');
                            normalAmount[n] = $(this).data('normalAmount');
                            optionITypeName[n] = $(this).data('optionITypeName').replace(/\+/gi, '!p!');
                            optionISelectName[n] = $(this).data('optionISelectName').replace(/\+/gi, '!p!');
                        });

                        T.sweetWrap.find('.' + T.carouselscroll.find('.sweetTwo').data('itemCode')).last().data({
                            'selectMenuID': selectMenuID,
                            'optionISelectCode': optionISelectCode,
                            'sellPrice': sellPrice,
                            'optionIAddPrice': optionIAddPrice,
                            'settleCode': settleCode,
                            'ConsDivCode': ConsDivCode,
                            'normalAmount': normalAmount,
                            'optionITypeName': optionITypeName,
                            'optionISelectName': optionISelectName
                        });

                        T.carouselList.find('.' + T.carouselscroll.find('.sweetTwo').data('itemCode')).data({ 'value': 1 });

                        if (T.sweetWrap.find('dl').length > 0) {
                            T.sweetWrap.find('p').remove();

                            T.prodTotal();
                        } else {
                            T.sweetWrap.empty().append(T.sweetText);
                        }

                        if ($(this).hasClass('complete_end')) {
                            T.carouselList.find('li').removeClass('on');
                            T.carouselDetail.slideUp(500);
                        }

                        T.prodTotal();

                        $('.prodView').show();
                    } else {
                        var popSet = new $.fn.modalPopGeneration({ type: 'message', code: 'COM1116', lang: T.leng, btns: true, btnParam1: false, btnParam2: true, elem: $(this) });
                    }
                });
            }

            T.carouselDetail.find('.btn_close').off().on('click', function () {
                T.carouselList.find('li').removeClass('on');
                T.carouselDetail.slideUp(500);
            });
        },

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 가격 합산
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        prodTotal: function () {
            var T = this;

            var totalPrice = 0;

            T.sweetWrap.find('dl').each(function () {
                totalPrice += $(this).data('price');
                $('.prodSum span').data({ 'price': totalPrice }).text(totalPrice.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,"));
            });

            T.priceSum = totalPrice + T.feesSum;

            $('.fixSum span').data({ 'price': T.priceSum }).text(T.priceSum.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,"));
        },

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 영화정보
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        selected: function () {
            var T = this;

            //var substrVar = T.screenCode.toString();
            //var screenSelect = T.screenCode.toString().substr(-2);
            var screenName = T.screenName.toString();             // 160607  

            $('.day_data').empty().text(T.playDate + ' (' + T.playWeek + ')');
            $('.time_data').empty().text(T.startTime + ' ~ ' + T.endTime);

            if (T.leng == 'KR') {
                //if (T.cinemaType.length > 0) { // 1603296
                if (typeof T.cinemaType != "undefined" && T.cinemaType.length > 0) {
                    //var typeText = T.cinemaName + ', ' + Number(screenSelect) + '관,<br />' + T.cinemaType;
                    var typeText = T.cinemaName + ', <br />' + screenName + ',<br />' + T.cinemaType;
                } else {
                    //var typeText = T.cinemaName + ', ' + Number(screenSelect) + '관';
                    var typeText = T.cinemaName + ', <br />' + screenName;
                }
            } else {
                //if (T.cinemaType.length > 0) {  // 1603296
                if (typeof T.cinemaType != "undefined" && T.cinemaType.length > 0) {
                    //var typeText = T.cinemaName + ', Screen' + Number(screenSelect) + ',<br />' + T.cinemaType;
                    var typeText = T.cinemaName + ', Screen <br />' + screenName + ',<br />' + T.cinemaType;
                } else {
                    //var typeText = T.cinemaName + ', Screen' + Number(screenSelect);
                    var typeText = T.cinemaName + ', Screen <br />' + screenName;
                }
            }

            $('.name_data').empty().html(typeText);
        },

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 결제정보 호출&& _param.ContainsKey("noMemberTelNo") && _param.ContainsKey("noMemberName") && _param.ContainsKey("noMemberPassword"))
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        SetBooking: function (multiLanguageID, cinemaId, screenId, playDate, playSequence, movieCode, seatNoString, memberOnNo, ticketJsonString, mallJsonString) {
            var obj = {
                MethodName: "SetBooking",
                channelType: "HO",
                osType: BrowserAgent(),
                osVersion: navigator.userAgent,
                multiLanguageID: multiLanguageID,
                cinemaId: cinemaId,
                screenId: screenId,
                playDate: playDate,
                playSequence: playSequence,
                movieCode: movieCode,
                seatNoString: seatNoString,
                memberOnNo: memberOnNo,
                noMemberTelNo: memberInfo.MemberNoOn == '0' ? memberInfo.HandPhone : '',
                noMemberName: memberInfo.MemberNoOn == '0' ? memberInfo.MemberName : '',
                noMemberPassword: memberInfo.MemberNoOn == '0' ? memberInfo.Password : '',
                ticketJsonString: ticketJsonString,
                mallJsonString: mallJsonString
            };

            JsonCall(CinemaServiceDomain + "/LCWS/Ticketing/PaymentData.aspx", obj, ReturnJsonData);
        },

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 이벤트
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        event: function () {
            var T = this;

            T.seatRow = T.seatArea.find('li');

            // 좌석 마우스 오버
            //T.seatArea.on('mouseenter', 'a', function () {                                                        // 1605031 장차법
            T.seatArea.on('mouseenter focus', 'a', function () {
                var group = $(this).attr('seat-group');
                var groupSum = T.seatArea.find('.' + group).length;
                var idx = T.seatArea.find('.' + group).index(this);
                var elem = T.seatArea.find('.' + group);
                T.seatHover(group, groupSum, idx, elem, $(this));
            });

            // 좌석 마우스 아웃
            //T.seatArea.on('mouseleave', function () {
            T.seatArea.on('mouseleave blur', function () {
                T.seatArea.find('a').removeClass('over');
            });

            // 좌석 마우스 클릭
            T.seatArea.on('click', 'a', function () {
                var insLimite = 0;

                T.personSelect.find('select').each(function (n) {
                    insLimite += Number($(this).val());
                });


                // 선택한 티켓 매수가 0보가 클 경우
                if (insLimite > 0) {
                    // 선택한 좌석이 이미 선택된 상태가 아니고 사용불가 상태도 아니며 예매 완료된 상태도 아닐 경우
                    if (!$(this).hasClass('on') && !$(this).hasClass('disabled') && !$(this).hasClass('completed')) {
                        // 마우스 오버 상태를 가지고 있다면
                        if ($(this).hasClass('over')) {
                            //if ($(this).hasClass('cine_family')) {
                            // 연관 좌석일 경우 - 좌석 구매시 해당 좌석이 연관 좌석 설정이 되어 있으면 한 좌석 구매가 불가능 하며, 해당 연관 좌석은 일괄 구매를 해야 함.
                            if ($(this).hasClass('related_seat')) {
                                var seatGroup = $(this).attr('seat-group');

                                T.seatArea.find('.' + seatGroup).addClass('on');
                                T.seatLimit -= T.seatArea.find('.' + seatGroup).length;
                                T.clickSeat = T.seatLimit;
                            } else {
                                T.seatArea.find('.over').addClass('on');
                                T.seatLimit -= T.clickSeat;
                                T.clickSeat = T.seatLimit;
                            }

                            T.seatArea.find('.on').append("<span class=\"blind\">선택됨</span>");                    // 1605031 장차법 

                            T.seatArea.find('.on').each(function () {
                                var dsplPhysicalBlckCd = $(this).data('dsplPhysicalBlckCd');

                                for (var i = 0; i < T.seatBlockCode.length; i++) {
                                    if (T.seatBlockCode[i] == dsplPhysicalBlckCd) {
                                        T.seatNotice.find('.alarm_special').fadeIn(500).find('p').text(T.seatBlockMessage[i]);
                                    }
                                }

                            });
                        }
                    } else if ($(this).hasClass('on')) {
                        T.seatLimit += T.seatArea.find('.' + $(this).attr('seat-group') + '[class*="on"]').length;

                        T.seatArea.find('.on > span').remove();                                                      // 1605031 장차법

                        T.seatArea.find('.' + $(this).attr('seat-group') + '[class*="on"]').removeClass('on').removeClass('over');

                        T.clickSeat = T.seatLimit;

                        $(this).focus();                                                                            // 1605031 장차법
                    }

                    T.selectArr();
                } else {
                    var personError = new $.fn.modalPopGeneration({ type: 'message', code: 'COM2101', lang: T.leng, btns: true, btnParam1: false, btnParam2: true, elem: $(this) });

                    $('.pop_wrap .btnc_confirm').off().on('click', function () {
                        $(this).parents('.pop_wrap').remove();
                        T.personSelect.find('.select_box').first().find('a').focus();                               // 1605031 장차법
                    });

                }

                T.seatCookie();
            });

            T.seatScroll.on('click', '.btn_sView, .bg_disabled', function () {
                T.seatScroll.find('.btn_sView').toggleClass('on').next('.seat_Barea').slideToggle(300).parent().prev().find('.bg_disabled').slideToggle(300);
            });

            $('.btn_wrap .btn_next').on('click', function () {

                var insPerson = 0;
                T.personSelect.find('.select_box').find('select').each(function () {
                    insPerson += Number($(this).val());
                });

                if (insPerson > 0 && 0 == Number(T.clickSeat) && cookieJson.ticketingState.seatSelect.seatArray.length > 0) {

                    // Validation Check                                                                                 160816
                    if (T.cookieDefaultCheck()) {
                        // no process
                    } else {
                        new $.fn.modalPopGeneration({ type: 'server', lang: this.leng, btns: true, btnParam1: false, btnParam2: true, serverTitle: '알림', serverMessage: '좌석을 다시 선택해 주시기 바랍니다.', elem: $(this) });
                        return;
                    }

                    var seatArraySum = 0;
                    var ticketJsonString = [];

                    for (var i = 0; i < cookieJson.ticketingState.seatSelect.SeatType.length; i++) {
                        if (cookieJson.ticketingState.seatSelect.SeatType[i].count > 0) {
                            for (var j = 0; j < cookieJson.ticketingState.seatSelect.SeatType[i].count; j++) {
                                var ticketArray = {};

                                ticketArray.SequenceNoGroupCode = T.sequenceCode;
                                ticketArray.WeekendDivisionCode = T.weekCode;
                                ticketArray.CustomerDivisionCode = cookieJson.ticketingState.seatSelect.SeatType[i].code;
                                ticketArray.SeatNo = cookieJson.ticketingState.seatSelect.seatArray[seatArraySum];
                                ticketArray.Price = T.feesArray[seatArraySum];
                                ticketJsonString.push(ticketArray);
                                seatArraySum++;
                            }
                        }
                    }

                    var ticketString = {};
                    ticketString.Tickets = ticketJsonString;
                    ticketString.TotalPrice = T.feesSum;

                    var jsonInfo = JSON.stringify(ticketString);

                    var seatNum = (cookieJson.ticketingState.seatSelect.seatArray).join(',');

                    var mallJsonString = '';

                    if (T.sweetWrap.find('dl').length > 0) {
                        mallJsonString += '{"goodsItems": {';
                        mallJsonString += '"detailDivision":"' + T.sweetWrap.find('dl').data('LargeClassCode') + '"';
                        mallJsonString += ',"itemType":"' + T.sweetWrap.find('dl').data('itemType') + '"';
                        mallJsonString += ',"cinemaID":"' + T.cinemaCode + '"';
                        mallJsonString += ',"cinemaName":""';
                        mallJsonString += ',"items": [';

                        T.sweetWrap.find('dl').each(function (n) {
                            if (n > 0) mallJsonString += ',';
                            mallJsonString += '{"packageYN":"' + $(this).data('packageYN') + '"';
                            //mallJsonString += ',"detailDivision":"' + $(this).data('LargeClassCode') + '"';
                            //mallJsonString += ',"itemType":"' + $(this).data('itemType') + '"';
                            mallJsonString += ',"categoryCode":""';
                            mallJsonString += ',"setTypeCode":"' + $(this).data('RootTypeCode') + '"';
                            mallJsonString += ',"itemCode":"' + $(this).data('itemCode') + '"';
                            mallJsonString += ',"itemName":""';
                            mallJsonString += ',"itemImgUrl":""';
                            mallJsonString += ',"constitutionProductDivCode":"' + $(this).data('RootDivCode') + '"';
                            mallJsonString += ',"settleCode":"' + $(this).data('RootsettleCode') + '"';
                            mallJsonString += ',"duplDivisionCode":"' + $(this).data('DuplDivisionCode') + '"';
                            mallJsonString += ',"totalAmount":"' + $(this).data('totalAmount') + '"';
                            mallJsonString += ',"normalAmount":"' + $(this).data('rootAmount') + '"';
                            mallJsonString += ',"sellPrice":"' + $(this).data('RootPrice') + '"';
                            mallJsonString += ',"buyQuantity":"' + $(this).data('buyQuantity') + '"';
                            mallJsonString += ',"buyMethod":"1"';
                            mallJsonString += ',"combinationItemYN":"' + $(this).data('comboCode') + '"';
                            mallJsonString += ',"dcTypeCode":"' + $(this).data('dcType') + '"';
                            mallJsonString += ',"eventID":"' + $(this).data('eventID') + '"';
                            mallJsonString += ',"options": [';

                            if (typeof $(this).data('selectMenuID') != "undefined" && $(this).data('selectMenuID') != null) {
                                for (i = 0; i < $(this).data('selectMenuID').length; i++) {
                                    if (i > 0) mallJsonString += ',';
                                    mallJsonString += '{"selectMenuID":"' + $(this).data('selectMenuID')[i] + '"';
                                    mallJsonString += ',"optionItemCode":""';
                                    mallJsonString += ',"optionItemName":""';
                                    mallJsonString += ',"optionITypeCode":""';
                                    mallJsonString += ',"optionITypeName":"' + $(this).data('optionITypeName')[i].replace(/\+/gi, '!p!') + '"';
                                    mallJsonString += ',"optionISelectCode":"' + $(this).data('optionISelectCode')[i] + '"';
                                    mallJsonString += ',"optionISelectName":"' + $(this).data('optionISelectName')[i].replace(/\+/gi, '!p!') + '"';
                                    mallJsonString += ',"normalAmount":"' + $(this).data('normalAmount')[i] + '"';
                                    mallJsonString += ',"sellPrice":"' + $(this).data('sellPrice')[i] + '"';
                                    mallJsonString += ',"optionIAddPrice":"' + $(this).data('optionIAddPrice')[i] + '"';
                                    mallJsonString += ',"constitutionProductDivCode":"' + $(this).data('ConsDivCode')[i] + '"';
                                    mallJsonString += ',"settleCode":"' + $(this).data('settleCode')[i] + '"';
                                    //mallJsonString += ',"optionIBuyQuantity":"1"}';.
                                    if ($(this).data('OptionTemplateCode') == '1') { // 1603262
                                        mallJsonString += ',"optionIBuyQuantity":"' + $(this).data('optionIBuyQuantity')[i] + '"}';
                                    } else {
                                        mallJsonString += ',"optionIBuyQuantity":"1"}';
                                    }

                                }
                            }

                            mallJsonString += ']}';
                        });

                        mallJsonString += ']';
                        mallJsonString += ',"presentInfos":{}';
                        mallJsonString += ',"totalAmount":"' + $('.fixSum span').data('price') + '"';
                        mallJsonString += '}}';
                    }

                    var obj = {
                        MethodName: "SetBooking", channelType: "HO", osType: BrowserAgent(), osVersion: navigator.userAgent, multiLanguageID: T.leng,
                        cinemaId: T.cinemaCode, screenId: T.screenCode, playDate: T.playDate, playSequence: T.playSequence, movieCode: T.movieCode,
                        seatNoString: seatNum, memberOnNo: memberInfo.MemberNoOn,
                        noMemberTelNo: memberInfo.MemberNoOn == '0' ? memberInfo.HandPhone : '',
                        noMemberName: memberInfo.MemberNoOn == '0' ? memberInfo.MemberName : '',
                        noMemberPassword: memberInfo.MemberNoOn == '0' ? memberInfo.Password : '',
                        ticketJsonString: jsonInfo, mallJsonString: mallJsonString, totalPrice: T.priceSum
                    };

                    try {
                        GetData("payment", obj, $.proxy(function (e) {
                            $.fn.cookieChanges('del', 'ticketingState.seatSelect.transNo', '');
                            $.fn.cookieChanges('add', 'ticketingState.seatSelect.transNo', e.responseJSON.Results.Items[0].TransNo);
                            //console.log(e.responseJSON.Results.Items[0].TransNo);

                            $.fn.cookieChanges('del', 'ticketingState.seatSelect.SeatType', 'arr');
                            $.fn.cookieChanges('del', 'ticketingState.seatSelect.SeatCodes', 'arr');
                            $.fn.cookieChanges('del', 'ticketingState.seatSelect.seatArray', 'arr');

                            if (Number(e.responseJSON.Results.Items[0].MassageCode) == 1 && e.responseJSON.Results.Items[0].TransNo != null) {

                                // 2016.01.09 홍상길 추가
                                $.fn.cookieChanges('del', 'ticketingState.BookingStatus', '');
                                $.fn.cookieChanges('add', 'ticketingState.BookingStatus', '3');

                                // 20161222 - 샤롯데 프라이빗 특별판매 안내 팝업 추가
                                // 20161230 - 샤롯데 프라이빗 8좌석 일괄 구매로 수정
                                // 20170123 - 샤롯데 프라이빗 특별판매 안내 팝업 추가
                                // 20170126 - 샤롯데 프라이빗 8좌석 일괄 구매 복원
                                //try {
                                //    if (parseInt(cookieJson.ticketingState.ticketing.playSequenceCode[0].screenDiv) === 301) {
                                //        var popSet = new $.fn.modalPopGeneration({
                                //            type: 'load', url: '/LCHS/View/ticketing/charlotte-private-special-guide.html?v=20170123001', btns: false, btnParam1: false, btnParam2: true, cancel: '.btnc_confirm'
                                //        });
                                //    }
                                //    else {
                                //        window.location.href = '/LCHS/Contents/ticketing/order-settlement.aspx';
                                //    }
                                //} catch (e) {
                                window.location.href = '/LCHS/Contents/ticketing/order-settlement.aspx';
                                //}
                            } else {
                                var bookingError = new $.fn.modalPopGeneration({ type: 'server', lang: T.leng, btns: true, btnParam1: false, btnParam2: true, serverTitle: '알림', serverMessage: e.responseJSON.Results.Items[0].ReturnMessage, elem: $(this) });

                                $('.pop_wrap .btnc_confirm').off().on('click', function () {
                                    $(this).parents('.pop_wrap').remove();

                                    window.location.href = '/LCHS/Contents/ticketing/person-seat-select.aspx';
                                });
                            }

                        }, this), "sync");
                    } catch (e) {
                        CheckException(e, "SetBooking", NOW_MENU_TYPE);

                        window.location.href = '/LCHS/Contents/ticketing/person-seat-select.aspx';
                    }
                } else if (insPerson == 0) {
                    var personError = new $.fn.modalPopGeneration({ type: 'message', code: 'COM2101', lang: T.leng, btns: true, btnParam1: false, btnParam2: true, elem: $(this) });
                } else if (insPerson > 0 && 0 != Number(T.clickSeat)) {
                    var personError = new $.fn.modalPopGeneration({ type: 'message', code: 'COM2102', lang: T.leng, btns: true, btnParam1: false, btnParam2: true, elem: $(this) });
                }
            });

            // 결제 상품 취소
            $('.total_sweet').on('click', 'a', function () {
                var insClass = $(this).parents('dl').attr('class');

                $(this).parent().parent().remove();
                T.carouselList.find('.' + insClass).data({ 'value': 0 });
                T.carouselList.find('.' + insClass).data('value');

                if ($('.total_sweet').find('dl').length > 0) {
                    $('.total_sweet').find('> dt').remove();
                } else {
                    $('.total_sweet').html(T.sweetText);
                }

                var totalPrice = 0;
                if (T.sweetWrap.find('dl').length > 0) {
                    T.sweetWrap.find('dl').each(function () {
                        totalPrice += $(this).data('price');
                        $('.prodSum span').data({ 'price': totalPrice }).text(totalPrice.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,"));
                    });
                } else {
                    totalPrice = 0;
                    $('.prodSum span').data({ 'price': totalPrice }).text(totalPrice.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,"));
                }

                T.prodPriceSum();
            });

            // 인원 선택 셀렉트
            T.personSelect.find('.select_box').find('select').change(function () {
                T.personSelected = [];
                var insLimite = 0;
                var insCookie = [];
                // 티켓 유형별 선택 상자에서 선택된 인원 수를 모두 구해 insLimite 변수에 저장 
                // 티켓 유형별 선택 상자에서 선택된 인원이 0보가 클 경우 해당 티켓 유형을 T.personSelected에 저장
                T.personSelect.find('select').each(function (n) {
                    insCookie[n] = { 'code': $(this).data('code'), 'name': $(this).data('peple'), 'count': $(this).val() };
                    insLimite += Number($(this).val());
                    if (Number($(this).val()) > 0) {
                        T.personSelected.push($(this).data('code'));
                    }
                });

                // 티켓 유형별 팝업 설정
                // 11 : 장애인
                // 12 : 시니어
                // 13 : 국가 유공자
                if (Number($(this).val()) > 0) {
                    switch ($(this).data('code')) {
                        case 11:
                            if (T.personBull1) {
                                T.personBull1 = false;

                                // 장애인 티켓 유형에 대한 팝업 설정
                                var personAlert1 = new $.fn.modalPopGeneration({ type: 'message', code: 'COM2106', lang: T.leng, btns: true, btnParam1: false, btnParam2: true, elem: $(this) });
                            }
                            break;
                        case 12:
                            if (T.personBull2) {
                                T.personBull2 = false;

                                // 시니어 티켓 유형에 대한 팝업 설정
                                var personAlert2 = new $.fn.modalPopGeneration({ type: 'message', code: 'COM2107', lang: T.leng, btns: true, btnParam1: false, btnParam2: true, elem: $(this) });
                            }
                            break;
                        case 94:
                            if (T.personBull3) {
                                T.personBull3 = false;

                                // 국가 유공자 티켓 유형에 대한 팝업 설정
                                var personAlert3 = new $.fn.modalPopGeneration({ type: 'message', code: 'COM2108', lang: T.leng, btns: true, btnParam1: false, btnParam2: true, elem: $(this) });
                            }
                            break;
                    }
                }

                // 티켓 유형별 선택 인원 합이 8을 넘으면 팝업 메시지 출력
                if (insLimite > 8) {

                    var popSet = new $.fn.modalPopGeneration({ type: 'message', code: 'COM2000', lang: T.leng, btns: true, btnParam1: false, btnParam2: true, elem: $(this) });

                    insLimite = 0;
                    T.personSelect.find('select').val(0).change().siblings('a').text(insLimite);

                    T.personSelect.find('select').each(function (n) {
                        insCookie[n] = { 'code': $(this).data('code'), 'name': $(this).data('peple'), 'count': 0 };
                    });
                }

                /*
                for (var i = 0; i < T.personSelected.length; i++) {
                    if (T.personSelected[i] == 11 || T.personSelected[i] == 12) {
                        T.seatArea.find('.cine_couple, .cine_family, .super_vibe, .special_fee, .special_fee').addClass('no_select').removeAttr('href');
                    }
                }
                */
                // 현 상태의 좌석 선택 제한 개수를 티켓 유형별 선택인원의 합으로 설정
                T.seatLimit = insLimite;

                // 사용불가 좌석에 대한 class 제거
                T.seatArea.find('a').removeClass('disabled');
                // 선택한 좌석에 대한 선택 상태 class 제거
                T.seatArea.find('a').removeClass('on');
                // 화면 하단의 예매 정보 중 좌석 관련 데이터 초기화
                $('.seat_data').empty();
                $('.seatSum span').empty().text('0');
                $('.fixSum span').empty().text('0');

                // 선택 좌석 정보를 저장하는 쿠키 데이터 초기화
                $.fn.cookieChanges('del', 'ticketingState.seatSelect.SeatType', 'arr');
                $.fn.cookieChanges('del', 'ticketingState.seatSelect.SeatCodes', 'arr');
                $.fn.cookieChanges('del', 'ticketingState.seatSelect.seatArray', 'arr');

                $.fn.cookieChanges('add', 'ticketingState.seatSelect.SeatType', insCookie);

                T.selectArr();
            });

            // 묶음좌석 인풋
            T.seatArr.find('input').click(function () {
                T.clickSeat = Number($(this).val());
                T.seatDisable();
            });

            // 전체리셋 버튼
            $('.sear_right .reset a').on('click', function () {
                T.reset();
                return false;
            });

            // 공지 버튼
            $('.sear_right .layer a').bind('focusin', function () {
                $(this).parent().next('.layer_seat').stop().show();
                return false;
            }).bind('focusout', function () {
                $(this).parent().next('.layer_seat').stop().fadeOut(300);
                return false;
            }).bind('mouseenter', function () {
                $(this).parent().next('.layer_seat').stop().show();
                return false;
            }).bind('mouseleave', function () {
                $(this).parent().next('.layer_seat').stop().fadeOut(300);
                return false;
            });

            // 좌석 버튼
            $('.seat_setup > a').bind('focusin', function () {
                $(this).next('.layer_seat').stop().show();
                return false;
            }).bind('focusout', function () {
                $(this).next('.layer_seat').stop().fadeOut(300);
                return false;
            }).bind('mouseenter', function () {
                $(this).next('.layer_seat').stop().show();
                return false;
            }).bind('mouseleave', function () {
                $(this).next('.layer_seat').stop().fadeOut(300);
                return false;
            });//info_list

            // 범례 버튼
            $('.info_list a').bind('focusin', function () {
                $(this).next().stop().show();
                return false;
            }).bind('focusout', function () {
                $(this).next().stop().fadeOut(300);
                return false;
            }).bind('mouseenter', function () {
                $(this).next().stop().show();
                return false;
            }).bind('mouseleave', function () {
                $(this).next().stop().fadeOut(300);
                return false;
            });

            // 요금표 버튼 20170404 sunho 쿼리스트링 추가
            $('.sear_right .s_price a').on('click', function () {
                var popSet = new $.fn.modalPopGeneration({ type: 'load', url: '/LCHS/view/cinema-money.html?v=201705151', btns: false, btnParam1: false, btnParam2: true, closed: '.pop_btn_close', elem: $(this) });
            });
        },

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 좌석 묶음 설정
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 좌석 붙임 설정 활성화
        selectArr: function () {
            var T = this;

            // 좌석 붙임 설정 항목들의 disabled 속성값을 disabled로 초기화
            T.seatArr.find('li').removeClass('on').find('input').attr('disabled', 'disabled');

            // 대관일 경우
            // 좌석수와 연관좌석수가 동일할 경우는 전 좌석 일괄 구매
            if (T.seatFull > 0) {
                switch (T.seatLimit) {
                    case 0:
                        T.seatArr.find('li').removeClass('on').find('input').attr('disabled', 'disabled');
                        T.clickSeat = 0;
                        break;
                    case T.seatFull:
                        T.seatArr.find('li').find('input').prop('checked', false).parent().next().find('input').prop('checked', false);
                        T.clickSeat = T.seatFull;
                        break;
                }
            } else {
                // 예매율이 특정 값 이상일 경우는 사석 방지 로직을 적용하지 않음
                if (T.freeSelect) {
                    // 하나의 좌석을 선택할 수 있도록 좌석 붙임 설정의 첫번째 항목의 disable 속성 값을 제거하고, 선택된 상태로 설정
                    if (T.seatLimit > 0) {
                        T.seatArr.find('li').eq(0).addClass('on').find('input').prop('checked', true).removeAttr('disabled');
                        T.clickSeat = 1;
                    } else {
                        T.seatArr.find('li').removeClass('on').find('input').attr('disabled', 'disabled');
                        T.clickSeat = 0;
                    }
                } else {
                    // 티켓 유형별 선택 매수의 합에 따라 좌석 붙임 설정을 활성화 시킴(1,2,3,4)
                    switch (T.seatLimit) {
                        case 0:
                            T.seatArr.find('li').removeClass('on').find('input').attr('disabled', 'disabled');
                            T.clickSeat = 0;
                            break;
                            // 티켓 유형별 선택 매수의 합이 1일 경우는 좌석 붙임 설정 항목 중 1을 활성화
                        case 1:
                            T.seatArr.find('li').eq(0).addClass('on').find('input').prop('checked', true).removeAttr('disabled');
                            // 선택 가능한 좌석 개수를 1로 설정
                            T.clickSeat = 1;
                            break;
                            // 티켓 유형별 선택 매수의 합이 2일 경우는 좌석 붙임 설정 항목 중 2을 활성화
                        case 2:
                            T.seatArr.find('li').eq(1).addClass('on').find('input').prop('checked', true).removeAttr('disabled');
                            // 선택 가능한 좌석 개수를 2로 설정
                            T.clickSeat = 2;
                            break;
                            // 티켓 유형별 선택 매수의 합이 3일 경우는 좌석 붙임 설정 항목 중 3을 활성화
                        case 3:
                            T.seatArr.find('li').eq(2).addClass('on').find('input').prop('checked', true).removeAttr('disabled');
                            // 선택 가능한 좌석 개수를 3로 설정
                            T.clickSeat = 3;
                            break;
                            // 티켓 유형별 선택 매수의 합이 4일 경우는 좌석 붙임 설정 항목 중 2와 4를 활성화
                        case 4:
                            // 20161222 - 샤롯데 프라이빗은 붙임좌석 2만 활성화
                            // 20161230 - 샤롯데 프라이빗 8좌석 일괄 구매 복원
                            // 20170123 - 샤롯데 프라이빗은 붙임좌석 2만 활성화
                            // 20170126 - 샤롯데 프라이빗 8좌석 일괄 구매 복원
                            //try {
                            //    if (parseInt(cookieJson.ticketingState.ticketing.playSequenceCode[0].screenDiv) === 301) {
                            //        T.seatArr.find('li').eq(1).addClass('on').find('input').prop('checked', true).removeAttr('disabled');
                            //    }
                            //    else {
                            //        T.seatArr.find('li').eq(1).addClass('on').find('input').prop('checked', true).removeAttr('disabled').parent().next().next().addClass('on').find('input').removeAttr('disabled');
                            //    }
                            //} catch (e) {
                            T.seatArr.find('li').eq(1).addClass('on').find('input').prop('checked', true).removeAttr('disabled').parent().next().next().addClass('on').find('input').removeAttr('disabled');
                            //}

                            // 선택 가능한 좌석 개수를 2부터 시작하도록 설정
                            T.clickSeat = 2;
                            break;
                            // 티켓 유형별 선택 매수의 합이 8일 경우는 좌석 붙임 설정 항목 중 2,3,4를 활성화
                        case 8:
                            // 20161222 - 샤롯데 프라이빗은 붙임좌석 2만 활성화
                            // 20161230 - 샤롯데 프라이빗 8좌석 일괄 구매 복원
                            // 20170123 - 샤롯데 프라이빗은 붙임좌석 2만 활성화
                            // 20170126 - 샤롯데 프라이빗 8좌석 일괄 구매 복원
                            //try {
                            //    if (parseInt(cookieJson.ticketingState.ticketing.playSequenceCode[0].screenDiv) === 301) {
                            //        T.seatArr.find('li').eq(1).addClass('on').find('input').prop('checked', true).removeAttr('disabled');
                            //    }
                            //    else {
                            //        T.seatArr.find('li').eq(1).addClass('on').find('input').prop('checked', true).removeAttr('disabled').parent().next().addClass('on').find('input').removeAttr('disabled').parent().next().addClass('on').find('input').removeAttr('disabled');
                            //    }
                            //}
                            //catch (e) {
                            T.seatArr.find('li').eq(1).addClass('on').find('input').prop('checked', true).removeAttr('disabled').parent().next().addClass('on').find('input').removeAttr('disabled').parent().next().addClass('on').find('input').removeAttr('disabled');
                            //}

                            // 선택 가능한 좌석 개수를 2부터 시작하도록 설정
                            T.clickSeat = 2;
                            break;
                            // 티켓 유형별 선택 매수의 합이 5일 경우는 좌석 붙임 설정 항목 중 2,3를 활성화
                        case 5:
                            T.seatArr.find('li').eq(1).addClass('on').find('input').prop('checked', true).removeAttr('disabled').parent().next().addClass('on').find('input').removeAttr('disabled');
                            // 선택 가능한 좌석 개수를 2부터 시작하도록 설정
                            T.clickSeat = 2;
                            break;
                            // 티켓 유형별 선택 매수의 합이 6일 경우는 좌석 붙임 설정 항목 중 2,3,4를 활성화
                        case 6:
                            // 20161222 - 샤롯데 프라이빗은 붙임좌석 2만 활성화
                            // 20161230 - 샤롯데 프라이빗 8좌석 일괄 구매 복원
                            // 20170123 - 샤롯데 프라이빗은 붙임좌석 2만 활성화
                            // 20170126 - 샤롯데 프라이빗 8좌석 일괄 구매 복원
                            //try {
                            //    if (parseInt(cookieJson.ticketingState.ticketing.playSequenceCode[0].screenDiv) === 301) {
                            //        T.seatArr.find('li').eq(1).addClass('on').find('input').prop('checked', true).removeAttr('disabled');
                            //    }
                            //    else {
                            //        T.seatArr.find('li').eq(1).addClass('on').find('input').prop('checked', true).removeAttr('disabled').parent().next().addClass('on').find('input').removeAttr('disabled').parent().next().addClass('on').find('input').removeAttr('disabled');
                            //    }
                            //}
                            //catch (e) {
                            T.seatArr.find('li').eq(1).addClass('on').find('input').prop('checked', true).removeAttr('disabled').parent().next().addClass('on').find('input').removeAttr('disabled').parent().next().addClass('on').find('input').removeAttr('disabled');
                            //}
                            // 선택 가능한 좌석 개수를 2부터 시작하도록 설정
                            T.clickSeat = 2;
                            break;
                            // 티켓 유형별 선택 매수의 합이 6일 경우는 좌석 붙임 설정 항목 중 2,3,4를 활성화
                        case 7:
                            T.seatArr.find('li').eq(1).addClass('on').find('input').prop('checked', true).removeAttr('disabled').parent().next().addClass('on').find('input').removeAttr('disabled').parent().next().addClass('on').find('input').removeAttr('disabled');
                            // 선택 가능한 좌석 개수를 2부터 시작하도록 설정
                            T.clickSeat = 2;
                            break;
                    }
                }
            }

            T.groupReset();
        },

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 좌석 쿠키
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        seatCookie: function () {
            var T = this;

            var seatTotal = [];
            var seatArr = [];
            var seatNum = '';

            T.seatArea.find('.on').each(function (n) {
                seatTotal[n] = $(this).attr('seat-code');
                seatArr[n] = $(this).data('seatCode');

                if (n == 0) {
                    seatNum = $(this).data('showSeatRow') + $(this).data('seatCol');
                } else {
                    seatNum += ', ' + $(this).data('showSeatRow') + $(this).data('seatCol');
                }
            });

            $('.seat_data').empty().text(seatNum);

            if (T.seatArea.find('.on').length > 0) {
                $.fn.cookieChanges('add', 'ticketingState.seatSelect.SeatCodes', seatTotal);
                $.fn.cookieChanges('add', 'ticketingState.seatSelect.seatArray', seatArr);
            } else {
                $.fn.cookieChanges('del', 'ticketingState.seatSelect.SeatCodes', 'arr');
                $.fn.cookieChanges('del', 'ticketingState.seatSelect.seatArray', 'arr');
            }

            T.prodPriceSum();
            //설정위치 이동됨 $('.quick').hide();
        },

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 상품 합계
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        prodPriceSum: function () {
            var T = this;
            var seatPrice = 0;
            var seatSum = 0;
            var seatArray = cookieJson.ticketingState.seatSelect.SeatCodes;
            var len = seatArray.length;
            T.feesSum = 0;

            // 티켓 유형별 선택 좌석의 총합만큼 좌석을 선택한 후라면, 
            if (len > 0 && T.seatLimit == 0) {
                // 선택 좌석의 CustomerDivisionCode와 티켓 유형별 CustomerDivisionCode가 일치하면, 
                // 동일 티켓의 MovieFee를 좌석 요금에 반영, 
                // 선택 좌석의 PhysicalBlockCode와 티켓 유형별 SeatBlockCode가 일치하면
                // 동일 티켓의 ServiceFee 추가
                // 선택 좌석의 LogicalBlockCode와 티켓 유형별 SeatBlockCode가 일치하면
                // 동일 티켓의 ServiceFee 추가
                T.personSelect.find('select').each(function (n) {
                    if ($(this).val() > 0) {
                        for (var i = 0; i < $(this).val() ; i++) {
                            seatPrice = 0;

                            for (j = 0; j < T.feesSave.length; j++) {
                                if ($(this).data('code') == T.feesSave[j].customerDivisionCode) {
                                    if (T.feesSave[j].seatBlockCode == 1) {
                                        seatPrice += (T.feesSave[j].movieFee);
                                    }

                                    if (T.seatArea.find('a[seat-code=' + seatArray[seatSum] + ']').data('physical') == T.feesSave[j].seatBlockCode) {
                                        seatPrice += (T.feesSave[j].serviceFee);
                                    }

                                    if (T.seatArea.find('a[seat-code=' + seatArray[seatSum] + ']').data('logical') == T.feesSave[j].seatBlockCode) {
                                        seatPrice += (T.feesSave[j].serviceFee);
                                    }
                                }
                            }

                            T.feesArray[seatSum] = seatPrice;

                            T.feesSum += seatPrice;

                            seatSum++;
                        }
                    }
                });
            }

            $('.seatSum span').empty().text(T.feesSum.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,")).data({ 'total': T.feesSum });

            if ($('.prodSum:eq(0) span').data('price') == null) {
                T.priceSum = T.feesSum;
            } else {
                T.priceSum = $('.prodSum:eq(0) span').data('price') + T.feesSum;
            }

            $('.fixSum span').data({ 'price': T.priceSum }).text(T.priceSum.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,"));
        },

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 좌석 리셋
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        reset: function () {
            this.seatArea.find('a').removeClass('on');
            this.personSelect.find('.select_box').find('select').val(0);
            this.personSelect.find('.select_box').find('select').change();
            this.personSelect.find('.select_box').find('> a').removeClass('active').text(0).next('ul').find('a').removeClass('on').eq(0).addClass('on');

            $('.seat_data').empty();
            $('.seatSum span').empty().text('0');
            $('.prodSum span').empty().text('0');
            $('.fixSum span').empty().text('0');
            $('.total_sweet').empty();

            $.fn.cookieChanges('del', 'ticketingState.seatSelect.SeatType', 'arr');
            $.fn.cookieChanges('del', 'ticketingState.seatSelect.SeatCodes', 'arr');
            $.fn.cookieChanges('del', 'ticketingState.seatSelect.seatArray', 'arr');
            $.fn.cookieChanges('del', 'ticketingState.goods', 'arr');

            var T = this;
            var html = '';

            var bookingSeat = $(seatUtill.BookingSeats.Items);                      // 예매좌석 노드

            bookingSeat.each(function (n) {
                var seatRow = $(this)[0].SeatRow;                                     // 가로 넘버
                var seatCol = $(this)[0].SeatColumn;                                  // 세로 넘버
                var dbGroup = $(this)[0].SeatColGroupNo;                            // 가로그룹 넘버

                for (var i = 0; i < T.seatSum.length; i++) {
                    if (seatRow + seatCol == T.seatSum[i]) {
                        T.seatArea.find('a').removeClass('on');
                        $.fn.cookieChanges('del', 'ticketingState.seatSelect.SeatCodes', 'arr');
                        $.fn.cookieChanges('del', 'ticketingState.seatSelect.seatArray', 'arr');
                        return false;
                    }
                }

                //T.seatArea.find('a[data-seat=' + (seatRow + seatCol) + ']').removeClass('no_select').attr('alt', T.seatArea.find('a[data-seat=' + (seatRow + seatCol) + ']').attr('alt') + ' 예매완료좌석');
                T.seatArea.find('a[data-seat=' + (seatRow + seatCol) + ']').removeClass('no_select').append("<span class=\"blind\">예매완료</span>");
            });

            T.groupReset();
        },

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 좌석 사석방지 함수(셀렉트)
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        seatDisable: function () {

            // 초기화
            var T = this;
            T.carouselList.find('li.ticketType').hide();

            // 모든 좌석의 선택불가 class 및 span 태그 제거
            T.seatArea.find('a.no_select').removeClass('no_select').find('span').remove();         // 1605191

            // 좌석 선택시, 결합상품 노출
            var selectCount = T.seatArea.find('a.on').length;
            T.carouselList.find('li.ticketType').each(function () {
                if (selectCount >= Number($(this).attr('ticketcount'))) {
                    $(this).show();
                }
            });

            T.prodListEvent();

            // 사석제어
            // 일정 예매율 이상일 경우 사석 로직 미적용
            if (T.freeSelect) {
                if (Number(T.clickSeat) == 0 && T.seatArea.find('a').hasClass('on')) {
                    if (T.seatArea.find('a'))
                        T.seatArea.find('a').not('.on').addClass('no_select');
                }

                switch (Number(T.clickSeat)) {                                                                      // 1605021
                    case 1:
                        if (T.seatLimit == 1) {
                            T.seatArea.find('.related_seat').addClass('no_select')                                  // 1인선택시 묶음좌석은 비활성화
                        }
                        break;
                }

            } else {
                // 좌석붙임설정에 의해 선택 가능한 좌석 수에 따라 
                switch (Number(T.clickSeat)) {
                    // 선택 가능한 좌석 수가 0이면 선택된 좌석을 선택 불가 상태로 설정
                    case 0:
                        if (T.seatArea.find('a').hasClass('on')) {                                                  // 선택이 끝난 나머지 좌석 비활성화
                            T.seatArea.find('a').not('.on').addClass('no_select');
                        } else {
                            T.seatArea.find('a.no_select').removeClass('no_select').find('span').remove();         // 1605191
                        }

                        T.prodListEvent();

                        break;
                    case 1:
                        // 재설정된 그룹의 최대 값만큼 반복하면서
                        // 각 좌석의 그룹 설정을 위해 부여한 값들 중 최대값까지 비교
                        // 각 그룹의 두번째 좌석과 마지막 좌석 이전 좌석은 선택 불가 처리
                        for (var i = 1; i <= T.saveGroup; i++) {
                            var insn = T.seatArea.find('.grNum' + i + '[class*="on"]').length;                      // 그룹 내 선택된 좌석 수
                            var inst = T.seatArea.find('.grNum' + i).length - insn;                                 // 그룹 내 선택되지 않은 좌석 수
                            // 그룹내 미선택된 좌석수가 2일 경우 
                            // 모두 선택 불가 처리
                            if (inst == 2) {                                                                        // 그룹 내 선택되지 않은 좌석 수가 2개 인경우
                                T.seatArea.find('.grNum' + i).not('.on').each(function () {                         // 선택되지 않은 좌석 전부 비활성화
                                    if (!$(this).hasClass('completed')) {
                                        $(this).addClass('no_select');
                                    }
                                });
                                // 그룹내 미선택된 좌석수가 2이상일 경우
                            } else if (inst > 2) {                                                                  // 그룹 내 선택되지 않은 좌석 수가 3개 이상인 경우
                                T.seatArea.find('.grNum' + i).eq(1).not('.on').each(function () {                   // 그룹내 2번째 좌석 비활성화
                                    if (!$(this).hasClass('completed')) {
                                        $(this).addClass('no_select');
                                    }
                                });
                                T.seatArea.find('.grNum' + i).eq(inst - 2).not('.on').each(function () {            // 그룹 내 오른쪽에서 2번째 좌석 비활성화
                                    if (!$(this).hasClass('completed')) {
                                        $(this).addClass('no_select');
                                    }
                                });
                            }

                            if (T.seatClose[0] == 'N') {                                                            // 2개 좌석 사석 적용 안한다면 
                                if (inst == 2) {
                                    T.seatArea.find('.grNum' + i).removeClass('no_select').find('span').remove();
                                }
                            }
                        }
                        T.seatArea.find('.related_seat').addClass('no_select');
                        break;
                    case 2:
                        // 재설정된 그룹의 최대 값만큼 반복하면서
                        // 각 좌석의 그룹 설정을 위해 부여한 값들 중 최대값까지 비교
                        for (var i = 1; i <= T.saveGroup; i++) {
                            var insn = T.seatArea.find('.grNum' + i + '[class*="on"]').length;                      // 그룹 내 선택된 좌석 수
                            var inst = T.seatArea.find('.grNum' + i).length - insn;                                 // 그룹 내 선택되지 않은 좌석 수

                            // 동일 그룹내 선택되지 않은 좌석수가 1이거나 3이면 좌석 선택 불가 설정
                            if (inst < 2 || inst == 3) {                                                            // 그룹 내 선택되지 않은 좌석 수가 1 또는 3개일 경우
                                T.seatArea.find('.grNum' + i).not('.on').each(function () {
                                    if (!$(this).hasClass('completed')) {
                                        $(this).addClass('no_select');
                                    }
                                });
                                // 동일 그룹내 선택되지 않은 좌석수가 5이면 좌석 선택 불가 설정
                            } else if (inst == 5) {                                                                 // 그룹 내 선택되지 않은 좌석 수가 1 또는 3개일 경우
                                T.seatArea.find('.grNum' + i).not('.on').each(function (n) {
                                    if (n == 2) {                                                                   // 선택되지않은 좌석 수 5개 중 3번째 좌석 비활성화
                                        if (!$(this).hasClass('completed')) {
                                            $(this).addClass('no_select');
                                        }
                                    }
                                });
                            }

                            // 씨네 커플석일 경우 동일 그룹내 미선택된 좌석수가 1이거나 3이면 좌석 선택 불가 설정
                            var insnC = T.seatArea.find('.coNum' + i + '[class*="on"]').length;                     // 시네커플일 경우
                            var instC = T.seatArea.find('.coNum' + i).length - insnC;
                            if (instC < 2 || instC == 3) {
                                T.seatArea.find('.coNum' + i).not('.on').each(function () {
                                    if (!$(this).hasClass('completed')) {
                                        $(this).addClass('no_select');
                                    }
                                });
                            }

                            // 3좌석에 사석 미적용 설정시 좌석 선택 불가 설정 해제
                            if (T.seatClose[1] == 'N') {                                                            // 3개 좌석 사석 적용 안한다면
                                if (inst == 3) {
                                    T.seatArea.find('.grNum' + i).removeClass('no_select').find('span').remove();
                                }
                            }
                        }

                        /*
                        T.seatArea.find('.cine_family').addClass('no_select');
                        if (T.seatArea.find('.cine_family').hasClass('on')) {                                       // 시네패밀리가 선택되어 있다면 모든 좌석 비활성화
                            T.seatArea.find('a').addClass('no_select');
                        }
                        */
                        //T.seatArea.find('.related_seat').addClass('no_select');
                        break;
                    case 3:
                        // 재설정된 그룹의 최대 값만큼 반복하면서
                        // 각 좌석의 그룹 설정을 위해 부여한 값들 중 최대값까지 비교
                        for (var i = 1; i <= T.saveGroup; i++) {
                            var insn = T.seatArea.find('.grNum' + i + '[class*="on"]').length;                      // 그룹 내 선택된 좌석 수
                            var inst = T.seatArea.find('.grNum' + i).length - insn;                                 // 그룹 내 선택되지 않은 좌석 수

                            // 동일 그룹내 미선택 좌석이 1,2개 또는 4개일경우 좌석 선택 불가 설정
                            if (inst < 3 || inst == 4) {
                                T.seatArea.find('.grNum' + i).not('.on').each(function () {
                                    if (!$(this).hasClass('completed')) {
                                        $(this).addClass('no_select');
                                    }
                                });
                            }

                            // 4좌석에 대한 3좌석 예매 가능 설정시 좌석 선택 불가 설정 해제
                            if (T.seatClose[2] == 'N') {                                                            // 4개 좌석 사석 적용 안한다면
                                if (inst == 4) {
                                    T.seatArea.find('.grNum' + i).removeClass('no_select').find('span').remove();
                                }
                            }
                        }
                        T.seatArea.find('.related_seat').addClass('no_select');
                        break;
                    case 4:
                        // 재설정된 그룹의 최대 값만큼 반복하면서
                        // 각 좌석의 그룹 설정을 위해 부여한 값들 중 최대값까지 비교
                        for (var i = 1; i <= T.saveGroup; i++) {
                            var insn = T.seatArea.find('.grNum' + i + '[class*="on"]').length;                      // 그룹 내 선택된 좌석 수
                            var inst = T.seatArea.find('.grNum' + i).length - insn;                                 // 그룹 내 선택되지 않은 좌석 수

                            // 동일 그룹내 미선택 좌석이 1,2,3개 또는 5개일경우 좌석 선택 불가 설정
                            if (inst < 4 || inst == 5) {
                                T.seatArea.find('.grNum' + i).not('.on').each(function () {
                                    if (!$(this).hasClass('completed')) {
                                        $(this).addClass('no_select');
                                    }
                                });
                            }

                            var insnC = T.seatArea.find('.coNum' + i + '[class*="on"]').length;                     // 시네커플일 경우
                            var instC = T.seatArea.find('.coNum' + i).length - insnC;
                            if (instC < 4 || instC == 5) {
                                T.seatArea.find('.coNum' + i).not('.on').each(function () {
                                    if (!$(this).hasClass('completed')) {
                                        $(this).addClass('no_select');
                                    }
                                });
                            }
                        }
                        break;
                }
            }

            // 시네패밀리 4좌석 6좌석 제어  1605022
            if (T.seatArea.find('[class*="faNum"]').length > 0) {
                for (i = 1; i <= T.saveGroup; i++) {
                    var insFa = T.seatArea.find('.faNum' + i).length;
                    // 씨네패밀리 좌석의 경우 티켓 유형별 선택 매수의 총합과 씨네패킬리 좌석수가 동일할 경우만 좌석 선택 가능
                    // 씨네패밀리 4, 6좌석 일괄 구매
                    if (T.seatLimit == insFa) {
                        T.seatArea.find('.faNum' + i).removeClass('no_select').find('span').remove();
                    } else {
                        T.seatArea.find('.faNum' + i).not('.on').addClass('no_select');
                    }
                }
            }

            // 장애인 좌석 처리 1605021
            // 장애인석의 경우 티켓 유형 중 장애인 티켓의 매수가 0이상이어야 선택 가능
            T.personSelect.find('select').each(function (n) {
                if ($(this).hasClass('code11')) {

                    T.seatArea.find('.handicapped').addClass('no_select').removeAttr('href').append("<span class=\"blind\">선택불가</span>");                                          // 장애인좌석이있어도 성인이 앉을 수 있음

                    if (Number($(this).val()) > 0) {
                        T.seatArea.find('.handicapped').removeClass('no_select').find('span').remove();
                    }
                }
            });

            // 장애인, 경로, 국가유공자 우대 티켓 선택시 FeeBlockCode 가 0인 것 비활성화
            var bBlockCode = false;
            T.personSelect.find('select').each(function (n) {
                if ($(this).hasClass('code11') || $(this).hasClass('code12') || $(this).hasClass('code94')) {
                    if (Number($(this).val()) > 0) {
                        bBlockCode = true;
                    }
                }
            });
            if (bBlockCode) T.seatArea.find('a').not('.p0').addClass('no_select');

            // block-code 가 있는 좌석을 선택할 경우, 그외 전 좌석 비활성화 
            var feeCode = T.seatArea.find('.on').attr('block-code');
            if (feeCode != null) T.seatArea.find('a').not('.' + feeCode).addClass('no_select');

            // 영화관에서 좌석 제어
            // 좌석별로 설정된 티켓 유형별 구매 불가 설정(salesDisableTicketCode값에 따라)
            $(T.feesSave).each(function (i, e) {
                if (T.personSelect.find('select.code' + e.customerDivisionCode).val() > 0) {
                    T.seatArea.find('a').each(function () {
                        if ($(this).data('salesDisableTicketCode').indexOf(e.customerDivisionCode) > -1) {
                            $(this).addClass('no_select');
                        }
                    });
                }
            });

            // 장차법 관련
            T.seatArea.find('a.no_select').not('a.handicapped').removeAttr('href').append("<span class=\"blind\">선택불가</span>");
        },

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 좌석 사석방지 함수(hover)
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 현 좌석의 그룹 값('grNum8'), 현 좌석과 동일 그룹에 있는 좌석 수, 동일 그룹에 있는 좌석들 중 현 좌석의 인덱스, 현 좌석
        seatHover: function (group, groupSum, idx, elem, thisElem) {
            var T = this;

            T.seatArea.find('a').removeClass('over');

            if (!thisElem.hasClass('on') && !thisElem.hasClass('disabled') && !thisElem.hasClass('completed') && !thisElem.hasClass('no_select') && T.clickSeat > 0) { //선택가능좌석
                // 대관 선택시 - 샤롯데 프라이빗과 같이 전 좌석 구매일 경우
                // 모든 좌석을 over 상태로 설정
                if (T.seatFull > 0) {
                    T.seatArea.find('a').addClass('over');
                } else {
                    if (T.clickSeat > 1) { // 인원수 2명 이상
                        //if (idx > 1 && idx < groupSum - 1) { // 현재 선택의 위치 앞 2열 이상 뒤 2열 이하
                        //현 좌석의 동일 그룹 좌석수에서 현 좌석의 인덱스와 선택한 티켓 매수를 뺀 나머지를 구함
                        var rightSeat = groupSum - (idx + T.clickSeat); // 뒤쪽 남은 자리 체크

                        if (idx < 2) { // 앞쪽 남은자리가 1자리 이하일때
                            for (var i = 0; i < T.clickSeat; i++) {
                                elem.eq(i).addClass('over');
                            }
                        } else if (rightSeat < 1) { // 뒤쪽 남은자리가 1자리 이하일때
                            for (var i = 1; i <= T.clickSeat; i++) {
                                elem.eq(groupSum - i).addClass('over');
                            }
                        } else if (idx > 1 && rightSeat > 1) { // 남은 앞좌석과 뒷좌석 1자리 이상일때 일때
                            if (idx % 2 == 1) { // 남은 앞자리가 홀수라면
                                idx -= 1;
                            }
                            for (var i = 0; i < T.clickSeat; i++) {
                                elem.eq(idx + i).addClass('over');
                            }
                        } else {
                            if (rightSeat < 2 && idx - 1 < 2) { // 앞뒤자리가 모두 1자리 이하일때
                                idx = 0;
                            } else if (rightSeat < 2 && idx - 1 > 1) { // 뒤자리는 1자리 이하지만 앞자리는 2자리 이상일때
                                idx -= 1;
                            }
                            for (var i = 0; i < T.clickSeat; i++) {
                                elem.eq(idx + i).addClass('over');
                            }
                        }
                    } else { // 1자리 선택 시
                        // 티켓 매수가 1일 경우 현 위치의 좌석만 over 처리
                        thisElem.addClass('over');
                    }
                }
            }
        },

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Validation Check
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        cookieDefaultCheck: function () {

            // 샤롯데 프라이빗 8인 예매 필수 체크
            var screenDiv = cookieJson.ticketingState.ticketing.playSequenceCode[0].screenDiv;
            var seatArray = cookieJson.ticketingState.seatSelect.seatArray;
            // 20161221 - 샤롯데 프라이빗 2,4,6,8로 수정 - 안내문구 추가
            // 20161230 - 샤롯데 프라이빗 8좌석 일괄 구매로 수정
            // 20170123 - 샤롯데 프라이빗 2,4,6,8로 수정 - 안내문구 추가
            // 20170126 - 샤롯데 프라이빗 8좌석 일괄 구매 복원
            //if (parseInt(screenDiv) === 301) {
            //    if (seatArray.length !== 8) {
            //        return false;
            //    }
            //}
            // 20170510 - 샤롯데 프라이빗 수정 - 총 좌석수와 연관좌석수(RelatedSeatCount)가 일치할 경우
            try {
                if ($(this)[0].seatTotal == $(seatUtill.Seats.Items)[0].RelatedSeatCount && seatArray.length != $(this)[0].seatTotal) {
                    return false;
                }
            } catch (e) {
            }
            //    //alert("샤롯데 프라이빗 특별 판매 안내\nㆍ12/23~1/1 샤롯데 프라이빗을 2인 단위로 구매하실 수 있습니다.\nㆍ본 특별 판매는 관람권 사용이 제한됩니다.\nㆍ샤롯데 프라이빗의 특성상 라운지 이용이 불가하며\n 웰컴푸드(생수, 생과자)는 영화상영 전 1회 제공됩니다.\n 영화 상영 중 별도의 서비스가 제한되는 점 양해 부탁드립니다.");
            //    var bookingError = new $.fn.modalPopGeneration({ type: 'server', lang: 'KR', btns: true, btnParam1: false, btnParam2: true, serverTitle: '샤롯데 프라이빗 특별 판매 안내', serverMessage: "ㆍ12/23~1/1 샤롯데 프라이빗을 2인 단위로 구매하실 수 있습니다.<br/>ㆍ본 특별 판매는 관람권 사용이 제한됩니다.<br/>ㆍ샤롯데 프라이빗의 특성상 라운지 이용이 불가하며<br/> 웰컴푸드(생수, 생과자)는 영화상영 전 1회 제공됩니다.<br/> 영화 상영 중 별도의 서비스가 제한되는 점 양해 부탁드립니다.", elem: $(this) });

            //}

            // 좌석이 중복되어 booking 되었는지 필수 체크
            var beforeCnt = seatArray.length;
            var afterCnt = $.unique(seatArray).length;
            if (beforeCnt !== afterCnt) {
                return false;
            }
            return true;
        }
    };
});