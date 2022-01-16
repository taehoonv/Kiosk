<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>JA CINEMA KIOSK</title>
    <link rel="shortcut icon" type="image/x-icon" href="favicon.ico">
    <link rel="stylesheet" href="css/style5.css">
    <link rel="stylesheet" href="css/popup5-1.css">
    <link rel="stylesheet" href="css/popup5-4.css">
  </head>
  <body id="main">
    <a href="../index.html"><img src="img/topBar.png" class="name"></img></a>
    <div id="view1">
        <?php echo '<div id="image"><img src="media/'.$_POST['movie_name_post'].'.png"></div>';?>
        <div id="view2">
          <?php
          echo '
              <div id="movietitle"> <img src="img/'.$_POST['age_post'].'.png" id="grade"> <b id="movie_name">'.$_POST['movie_name_post'].'</b></div>
              <div></div>
              <div id="dd">'.$_POST['date_post'].'</div>
              <div id="time">'.$_POST['time_post'].'</div>
              <div id="personnel">'.$_POST['personnel_post'].'</div>
              <div id="selectedSeat">'.$_POST['selectedSeat_post'].'</div>';
            ?>
        </div>
    </div>
    <div class="costbox">
        <div id="price">
        <?php
          echo $_POST['price_post'];
        ?>
        </div>
    </div>
    <div class="cardBox">
      <div class="write">결제방법을 선택해 주세요.</div>
      <img src="img/payCard.png" class="btn leftbtn" onclick="javascript:goDetail1();"></img>
      <img src="img/payCoupon.png" class="btn" onclick="javascript:goDetail2();"></img>
      <img src="img/payCash.png" class="btn rightbtn" onclick="javascript:goDetail3();"></img>
    </div>
    <div class="beforeafter">
      <form action="4.php" method="post">
        <textarea id="age_post" name="age_post" rows="1" cols="20" style="display:none"><?php echo $_POST['age_post']; ?></textarea>
        <textarea id="date_post" name="date_post" rows="1" cols="20" style="display:none"><?php echo $_POST['date_post']; ?></textarea>
        <textarea id="time_post" name="time_post" rows="1" cols="20" style="display:none"><?php echo $_POST['time_post']; ?></textarea>
        <textarea id="personnel_post" name="personnel_post" rows="1" cols="20" style="display:none"><?php echo $_POST['personnel_post']; ?></textarea>
        <textarea id="selectedSeat_post" name="selectedSeat_post" rows="1" cols="20" style="display:none"><?php echo $_POST['selectedSeat_post']; ?></textarea>
        <textarea id="movie_name_post" name="movie_name_post" rows="1" cols="20" style="display:none"><?php echo $_POST['movie_name_post']; ?></textarea>
        <textarea id="price_post" name="price_post" rows="1" cols="20" style="display:none"><?php echo $_POST['price_post']; ?></textarea>
        <input type="submit" class="before" value="◀이전" />
      </form>
    </div>

    <!-- popup1 -->
    <div id="layerbox1" class="popup1">
      <span id="close">&times;</span>
      <p class="first">카드투입</p>
      <hr style="width: 300px; color: gray; border: thin solid">
      <p class="last"> 그림과 같이 카드를 투입구에 넣어주세요.<br>결제 오류 시, 카드를 긁어주세요.</p>
      <!-- 1002 -->
      <img src="img/popUpCard.png" class="icon icon1"></img>
    </div>

    <!-- popup2 -->
    <div id="layerbox2" class="popup2">
      <span id="close">&times;</span>
      <p class="first"> 바코드스캔</p>
      <hr style="width: 300px; color: gray; border: thin solid">
      <p class="last"> 그림과 같이 바코드를 스캐너에 인식해주세요.</p>
      <!-- 1002 -->
      <img src="img/popUpBarcode.png" class="icon icon2"></img>
    </div>

    <!-- popup3 -->
    <div id="layerbox3" class="popup3">
      <span id="close">&times;</span>
      <p class="first"> 현금투입</p>
      <hr style="width: 300px; color: gray; border: thin solid">
      <p class="last"> 그림과 같이 현금을 투입구에 넣어주세요.</p>
      <!-- 1002 -->
      <img src="img/popUpCash.png" class="icon icon3"></img>
    </div>

<!-- 거의 다 바뀜 1002 -->
    <!-- popup4 -->
    <div id="layerbox4" class="popup4">
    <?php
        echo '
        <div class="first4"> 예매완료</div>
        <hr style="width: 300px; color: gray; border: thin solid">
        <p class="last4"> 예매가 완료되었습니다.<br> 출력된 입장권을 받아가세요.</p>
        <div class="ticket">
          <div class="receipt">입장권</div>
          <div class="div">====================</div>
          <div class="v2">
            <div id="movietitle" class="m"><img src="img/'.$_POST['age_post'].'.png" id="grade" class="g"></img> <b>'.$_POST['movie_name_post'].'</b></div>
            <div class="v3">
              <div class="d">'.$_POST['date_post'].'</div>
              <div class="t">'.$_POST['time_post'].'</div>
              <div class="p">'.$_POST['personnel_post'].'</div>
              <div class="s">'.$_POST['selectedSeat_post'].'</div>
            </div>
          </div>
          <div class="div">====================</div>
          <div class="desc">교환·환불은 상영시작 전까지 입장권 지참해주세요. 시작시간은 10분 정도 차이날 수 있습니다. 상영시간 전 입장 부탁드립니다.
          </div>
        </div>';
      ?>
      <!-- 고친 부분 1002 -->
      <a href="../index.html"><div class="complete4">완료</div></a>
    </div>
    <!-- cover -->
    <div id="cover" class="cover"> </div>
    <script src="js/jQuery.js"></script>
    <script src="js/5.js"></script>
  </body>
</html>
