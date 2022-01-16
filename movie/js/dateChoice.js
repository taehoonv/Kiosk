var date = new Date();
var yy = date.toISOString().slice(0, 4)*1;
var mm = date.toISOString().slice(5, 7)*1;
var dd = date.toISOString().slice(8, 10)*1;
var weekNum = date.getDay();
var week = new Array('일','월','화','수','목','금','토');

todayDate(yy,mm,dd);

function todayDate(yy, mm, dd){
  var yyy = yy;
  var mmm = mm;
  var ddd = dd;
  var today = document.querySelector('#today');
  if(mmm<10){
    mmm='0'+mmm;
  }
  if(ddd<10){
    ddd='0'+ddd;
  }

  today.innerHTML = yyy+'.'+mmm+'.'+ddd+'('+week[weekNum]+')';
}

function todayP(){
    dd+=1;
    weekNum+=1;
    if(weekNum>6){
      weekNum=0;
    }
    if((mm==1||mm==3||mm==5||mm==7||mm==8||mm==10||mm==12)&&dd>31){
      mm+=1;
      if(mm==13){
        mm=1;
        yy+=1;
      }
      dd=1;
    }else if((mm==4||mm==6||mm==9||mm==11)&&dd>30){
      mm+=1;
      dd=1;
    }else if(mm==2&&dd>28){
      mm+=1;
      dd=1;
    }
    todayDate(yy,mm,dd);
}

function todayM(){

  if( (yy>date.toISOString().slice(0, 4)*1) || ((yy=date.toISOString().slice(0, 4)*1) && (mm>date.toISOString().slice(5, 7)*1))
  || ((mm=date.toISOString().slice(5, 7)*1) && (dd>date.toISOString().slice(8, 10)*1))   )
    {

      dd-=1;
      weekNum-=1;
      if(weekNum<0){
        weekNum=6;
      }
      if((mm==1||mm==3||mm==5||mm==7||mm==8||mm==10||mm==12)&&dd<1){
        mm-=1;
        if(mm==0){
          mm=12;
          yy-=1;
        }
        if(mm==2){
          dd=28;
        }else{
          dd=30;
        }
      }else if((mm==4||mm==6||mm==9||mm==11)&&dd<1){
        mm-=1;
        dd=31;
      }
      todayDate(yy,mm,dd);
    }


}
