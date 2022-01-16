<!DOCTYPE html>
 <html> 
    <head>
        <meta charset="utf-8">
        <title>JA CINEMA KIOSK</title>
        <link rel="shortcut icon" type="image/x-icon" href="favicon.ico">
        <link rel="stylesheet" href="css/style.css">
        <style type="text/css">
            a:link { color: white; text-decoration: none;}
            a:visited { color: white; text-decoration: none;}
            a:hover { color: black; text-decoration: none;}
           </style>
    </head>
    <body>
        <div id="main">
            <div id="top"> <a href="index.html"><img src="img/topBar.png" alt="topbar"></a></div>
            <div id="view1">
                <?php echo '<div id="image"><img src="media/'.$_POST['movie_name_post'].'.png"></div>'; ?>
                <div id="view2">
                    <?php
                      echo '
                      <div id="movietitle"> <img src="img/'.$_POST['age_post'].'.png" id="grade"> <b id="movie_name">'.$_POST['movie_name_post'].'</b></div>
                      <div></div>
                      <div id="dd">'.$_POST['date_post'].'</div>
                      <div id="time">'.$_POST['time_post'].'</div>
                      <div id="personnel">'.$_POST['personnel_post'].'</div>
                      <div id="selectedSeat">좌석: </div>';
                    ?>
                </div>
            </div>
            <div class="costbox">
                <div id="price"><?php echo $_POST['price_post']; ?></div>
            </div>    
            <br>
            <div id="seat">
               <div id="screen">SCREEN</div>
                <br>
                <div id="extable">
                        <div class="row1">
                            <div class="cant">
                                <span class="cell1"><img src="img/cant.png"></span>
                                <span class="cell1"><img src="img/cant.png"></span>
                                <span class="cell1"><img src="img/cant.png"></span>
                                <span class="cell1"><img src="img/cant.png"></span>
                            </div>
                                <span class="cell1"><img src="img/wheel.png"></span>
                                <span class="cell1"><img src="img/wheel.png"></span>
                                <span class="cell1"><img src="img/wheel.png"></span>
                                <span class="cell2"><img src="img/wheel.png"></span>
                            </div>
                    </div>
                <div class="wrapper"></div>
            </div>    
            <div id="notice"><img src="img/seatGuide.png">
            </div>
            <div id="form">
                <form action="5.php" method="post">
                  <input type="button" value="◀이전" id="previous" onclick="window.location.href='2.html'"/>
                  <textarea id="age_post" name="age_post" rows="1" cols="20" style="display:none"><?php echo $_POST['age_post']; ?></textarea>
                  <textarea id="date_post" name="date_post" rows="1" cols="20" style="display:none"></textarea>
                  <textarea id="time_post" name="time_post" rows="1" cols="20" style="display:none"></textarea>
                  <textarea id="personnel_post" name="personnel_post" rows="1" cols="20" style="display:none"></textarea>
                  <textarea id="selectedSeat_post" name="selectedSeat_post" rows="1" cols="20" style="display:none"></textarea>
                  <textarea id="movie_name_post" name="movie_name_post" rows="1" cols="20" style="display:none"></textarea>
                  <textarea id="price_post" name="price_post" rows="1" cols="20" style="display:none"></textarea>
                  <input type="submit" value="다음▶" id="next" onclick="submit1()"/>
                </form>
            </div>
        <script type="text/javascript" src="js/submit.js"></script>
        <script type="text/javascript" src="js/book.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
        <script src="http://code.jquery.com/ui/1.11.0/jquery-ui.js"></script>
    </body>
</html>

  <!--
<form>
    <!-- <input type="button" value="좌석안내 (좌석 미리보기)" id="notice" 
    onclick="window.location.href='preview.html'"/>
    </form>

