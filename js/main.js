'use strict'

// タイマー部分
var point;
var sec; //0.1秒
var seconds; //秒
var min; //分
var hour; //時間
var start; //スタートボタンを押したときの時間
var now; //goTimer発動の時間を代入
var time; //経過時間
var id; //setIntervalを止めるために代入する変数

document.getElementById('start').addEventListener('click', function () {
  $('#rules').addClass('delete');
  start = new Date(); //スタートボタンを押したときの時間を代入
    id = setInterval(goTimer, 10); //goTimerを10ミリ秒ごとに繰り返す
});

var goTimer = function () {
  now = new Date(); //goTimer発動の時間を代入
  time = now.getTime() - start.getTime(); //発動時間からstart時間を

  point = Math.floor(time / 100);
  sec = Math.floor(time / 1000);
  min = Math.floor(sec / 60);
  hour = Math.floor(min / 60);
  seconds = Math.floor(time / 1000);

  if (seconds < 180) {
    point = 9 - (point - sec * 10);
    sec = 59 - (sec - min * 60);
    min = 2 - (min - hour * 60);

    point = addZero(point);
    sec = addZero(sec);
    min = addZero(min);

    document.getElementById('timer').innerHTML = min + ':' + sec
    
  } else if (seconds >= 180 && seconds < 240) {

    if (seconds === 180) {
      $('#finalscore').text(`score:${score}`);
      $('#timeup').removeClass('delete'); //ゲーム終了
    }

    point = point - sec * 10;
    sec = sec - min * 60;
    min = min - 3;

    point = addZero(point);
    sec = addZero(sec);
    min = addZero(min);

    document.getElementById('timer').style.color = 'red';
    document.getElementById('timer').innerHTML = min + ':' + sec
  } else {
    clearInterval(id);
    document.getElementById('timer').innerHTML = '03:00:00';
    document.getElementById('timer').style.color = 'white';
    
  }
  
}

//一桁だった場合に頭に0を足す
let addZero = function (value) {
  if (value < 10) {
    value = '0' + value;
  }
  return value;
}

// スコアの定義
let score = 0;
let plusScore = 10;


//じゃんけん部分

// 勝率のための変数
let total = 0;
let win = 0;
let rate = 0;

// じゃんけんのクリック回数のカウントと相手の手の関数
function com_set() {
  total++;
  const min = 0;
  const max = 2;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// グーに画像を変更
function change_gu() {
  $('#com_img').attr('src', './img/gu_02.PNG');
};

// チョキに画像を変更
function change_cho() {
  $('#com_img').attr('src', './img/cho_02.PNG');
};

// パーに画像を変更
function change_pa() {
  $('#com_img').attr('src', './img/pa_02.PNG');
};

// グーボタンを押したときの動作
$('#gu_btn').on('click', function () {

  const randomNumber = com_set();

  if (randomNumber === 0) {
    $('#result').text('DRAW');
    change_gu();
  } else if (randomNumber === 1) {
    $('#result').text('YOU WIN');
    change_cho();
    win++;
    score += plusScore;   
    $('#addscore').text(`+${plusScore}`);
    $('#addscore').fadeIn(100);
    $('#addscore').fadeOut('slow');

  } else if (randomNumber === 2) {
    $('#result').text('LOSE...');
    change_pa();
    
  }

  // 勝率計算
  rate = Math.floor(win / total * 100);

  //スロットのスピード変更
  if (rate > 50) {
    speed = 2000;
    speedrank = "Super Slow"
  } else if (rate > 40) {
    speed = 500;
    speedrank = "Slow"
  } else if (rate > 25) {
    speed = 200;
    speedrank = "Nomal"
  } else {
    speed = 50;
    speedrank = "Fast"
  }

  
  $('#rate_paragraph').text(`Rate:${rate}%`);
  $('#slot_speed').text(`Speed:${speedrank}`);
  $('#gauge_inner').css('width', rate + '%');
  

  //スコア表示の更新
  $('#my_score').text(`SCORE:${score}`);

  //ボタンの更新
  if (score >= 50) {
    $("#spin_btn").prop("disabled", false);
  } else {
    $("#spin_btn").prop("disabled", true);
  }
  
}); // グーボタンを押したときの動作ここまで

// チョキボタンを押したときの動作
$('#cho_btn').on('click', function () {

  const randomNumber = com_set();

  if (randomNumber === 0) {
    $('#result').text('LOSE...');
    change_gu();
    
  } else if (randomNumber === 1) {
    $('#result').text('DRAW');
    change_cho();
  } else if (randomNumber === 2) {
    $('#result').text('YOU WIN');
    change_pa();
    win++;
    score += plusScore;
    $('#addscore').text(`+${plusScore}`);
    $('#addscore').fadeIn(100);
    $('#addscore').fadeOut('slow');
  }

  // 勝率計算
  rate = Math.floor(win / total * 100);

  //スロットのスピード変更
  if (rate > 50) {
    speed = 2000;
    speedrank = "Super Slow"
  } else if (rate > 40) {
    speed = 500;
    speedrank = "Slow"
  } else if (rate > 25) {
    speed = 200;
    speedrank = "Nomal"
  } else {
    speed = 50;
    speedrank = "Fast"
  }
  
  $('#rate_paragraph').text(`Rate:${rate}%`);
  $('#slot_speed').text(`Speed:${speedrank}`);
  $('#gauge_inner').css('width', rate + '%');

  //スコア表示の更新
  $('#my_score').text(`SCORE:${score}`);

  //ボタンの更新
  if (score >= 50) {
    $("#spin_btn").prop("disabled", false);
  } else {
    $("#spin_btn").prop("disabled", true);
  }

});// チョキボタンを押したときの動作ここまで


// パーボタンを押したときの動作
$('#pa_btn').on('click', function () {

  const randomNumber = com_set();

  if (randomNumber === 0) {
    $('#result').text('YOU WIN');
    change_gu();
    win++;
    score += plusScore;
    $('#addscore').text(`+${plusScore}`);
    $('#addscore').fadeIn(100);
    $('#addscore').fadeOut('slow');
  } else if (randomNumber === 1) {
    $('#result').text('LOSE...');
    change_cho();
    
  } else if (randomNumber === 2) {
    $('#result').text('DRAW');
    change_pa();
  }

  // 勝率計算
  rate = Math.floor(win / total * 100);

  //スロットのスピード変更
  if (rate > 50) {
    speed = 2000;
    speedrank = "Super Slow" 
  } else if (rate > 40) {
    speed = 500;
    speedrank = "Slow"
  } else if (rate > 25) {
    speed = 200;
    speedrank = "Nomal"
  } else {
    speed = 50;
    speedrank = "Fast"
  }

  
  $('#rate_paragraph').text(`Rate:${rate}%`);
  $('#slot_speed').text(`Speed:${speedrank}`);
  $('#gauge_inner').css('width', rate + '%');

  //スコア表示の更新
  $('#my_score').text(`SCORE:${score}`);

  //ボタンの更新
  if (score >= 50) {
    $("#spin_btn").prop("disabled", false);
  } else {
    $("#spin_btn").prop("disabled", true);
  }

});// パーボタンを押したときの動作ここまで


//じゃんけん部分ここまで！！！！
//じゃんけん部分ここまで！！！！
//じゃんけん部分ここまで！！！！

//スロット部分

//スロットが動くスピードの変数
let speed = 50;
let speedrank = "";

// ストップボタンを押した回数をカウントする変数
let push = 0;

// パネルを止めるための変数
let panel_move_1;
let panel_move_2;
let panel_move_3;

//パネルチェック用の変数
let check_1;
let check_2;
let check_3;

// パネル画像の配列
const images = [
  "./img/slo_mouse.jpg",
  "./img/slo_cat.jpg",
  "./img/slo_lun.jpg",
  "./img/slo_ru.jpg",
];

// 乱数
function random() {
  const min = 0;
  const max = 3;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// スロット１が動く関数
function panel_change_1() {
  const i = random(); //乱数を変数に代入
  check_1 = i; //判定用の変数にも代入
  $('#img_01').attr('src', images[i]);
}

// スロット２が動く関数
function panel_change_2() {
  const i = random(); //乱数を変数に代入
  check_2 = i; //判定用の変数にも代入
  $('#img_02').attr('src', images[i]);
}

// スロット３が動く関数
function panel_change_3() {
  const i = random(); //乱数を変数に代入
  check_3 = i; //判定用の変数にも代入
  $('#img_03').attr('src', images[i]);
}

//判定用関数
function panel_check() {
 
  if (push === 3) {
    $("#spin_btn").prop("disabled", false);
    push = 0;
   
    //ネズミが一致するとスコア0
    if (check_1 === 0 && check_2 === 0 && check_3 === 0) {
      score = 0;
      $('#my_score').text(`SCORE:${score}`);
      $('#special').text(`SCORE 0...`);
      $('#special').fadeOut('slow');
    }
    
    //猫が一致するとスコア+5000
    if (check_1 === 1 && check_2 === 1 && check_3 === 1) {
      score += 5000;
      $('#my_score').text(`SCORE:${score}`);
      $('#special').text(`SCORE +5000`);
      $('#special').fadeOut('slow');
    }
    
    //インコ（グレー）が一致するとスコア2倍
    if (check_1 === 2 && check_2 === 2 && check_3 === 2) {
      score *= 2;
      $('#my_score').text(`SCORE:${score}`);
      $('#special').text(`SCORE ×2`);
      $('#special').fadeOut('slow');
    }

    //インコ（白）が一致するとじゃんけんに勝ったときのスコアが上昇
    if (check_1 === 3 && check_2 === 3 && check_3 === 3) {     
      plusScore += 50;
      $('#my_score').text(`SCORE:${score}`);
      $('#special').text(`SCORE UP`);
      $('#special').fadeOut('slow');
    }
  }

  if (score < 50) {
    $("#spin_btn").prop("disabled", true);
  }

}


// ストップボタンを1を押したとき
$('#btn_1').on('click', function () {  
  //プッシュ数をカウント
  push++;
  //setIntervalを止める
  clearInterval(panel_move_1);
  $("#btn_1").prop("disabled", true);
  panel_check();

});

// ストップボタンを2を押したとき
$('#btn_2').on('click', function () {
  //プッシュ数をカウント
  push++;
  //setIntervalを止める
  clearInterval(panel_move_2);
  $("#btn_2").prop("disabled", true);
  panel_check();
  
});

// ストップボタンを3を押したとき
$('#btn_3').on('click', function () {
  //プッシュ数をカウント
  push++;
  //setIntervalを止める
  clearInterval(panel_move_3);
  $("#btn_3").prop("disabled", true);
  panel_check();
  
});



// spinボタンをを押したとき
$('#spin_btn').on('click', function () {

  score -= 50; //50スコアマイナス
  $('#my_score').text(`SCORE:${score}`); //スコア表示更新

  if (score < 50) {
    $("#spin_btn").prop("disabled", true); // 50スコア未満になったらボタン無効化
  }

  // パネル１が回る
  panel_move_1 = setInterval(() => {
    panel_change_1();
  },speed);

  // パネル２が回る
  panel_move_2 = setInterval(() => {
    panel_change_2();
  },speed);

  // パネル３が回る
  panel_move_3 = setInterval(() => {
    panel_change_3();
  },speed);

// ストップボタンを有効化
  $("#btn_1").prop("disabled", false);
  $("#btn_2").prop("disabled", false);
  $("#btn_3").prop("disabled", false);

// スピンボタンを無効化
  $("#spin_btn").prop("disabled", true);

});
