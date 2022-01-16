function submit1(){
  var date = document.getElementById('dd');
  var time = document.getElementById('time');
  var personnel = document.getElementById('personnel');
  var selectedSeat = document.getElementById('selectedSeat');
  var movie_name = document.getElementById('movie_name');
  var price = document.getElementById('price');

  var date_post = document.getElementById('date_post');
  var time_post = document.getElementById('time_post');
  var personnel_post = document.getElementById('personnel_post');
  var selectedSeat_post = document.getElementById('selectedSeat_post');
  var movie_name_post = document.getElementById('movie_name_post');
  var price_post = document.getElementById('price_post');
  date_post.value = date.innerHTML;
  time_post.value = time.innerHTML;
  personnel_post.value = personnel.innerHTML;
  selectedSeat_post.value = selectedSeat.innerHTML;
  movie_name_post.value = movie_name.innerHTML;
  price_post.value = price.innerHTML;
}

var movie_name_id;
var time_id;
var age;

function submit2(){
  var date = document.getElementById('today');
  var time = document.getElementById(time_id);
  var movie_name = document.getElementById(movie_name_id);

  var date_post = document.getElementById('date_post');
  var time_post = document.getElementById('time_post');
  var movie_name_post = document.getElementById('movie_name_post');
  var age_post = document.getElementById('age_post');

  age_post.value = age;
  date_post.value = "날짜: "+date.innerHTML;
  time_post.value = '시간: '+time.innerHTML;
  movie_name_post.value = movie_name.innerHTML;
}

function submit3(){
  var personnel = document.getElementById('d1');
  var price = document.getElementById('d2');
  var personnel_post = document.getElementById('personnel_post');
  var price_post = document.getElementById('price_post');
  personnel_post.value = '인원: '+personnel.value+'명';
  price_post.value = '결제금액: '+price.value+'원';

}
