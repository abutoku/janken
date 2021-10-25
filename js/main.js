'use strict'

// スコアの定義
let score = 1000;

//じゃんけん部分

// 変数定義
let total = 0;
let win = 0;

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
    score += 10;
  } else if (randomNumber === 2) {
    $('#result').text('LOSE...');
    change_pa();
    if (score > 0) {
      score -= 5;
    }
  }

  // 勝率計算
  const rate = Math.floor(win / total * 100);

  //スコア表示の更新
  $('#my_score').text(`${score}`);

  //ボタンの更新
  if (score >= 50) {
    $("#spin_btn").prop("disabled", false);
  }
  if (score < 50) {
    $("#spin_btn").prop("disabled", true);
  }
  
}); // グーボタンを押したときの動作ここまで

// チョキボタンを押したときの動作
$('#cho_btn').on('click', function () {

  const randomNumber = com_set();

  if (randomNumber === 0) {
    $('#result').text('LOSE...');
    change_gu();
    if (score > 0) {
      score -= 5;
    }
  } else if (randomNumber === 1) {
    $('#result').text('DRAW');
    change_cho();
  } else if (randomNumber === 2) {
    $('#result').text('YOU WIN');
    change_pa();
    win++;
    score += 10;
  }

  // 勝率計算
  const rate = Math.floor(win / total * 100);

  //スコア表示の更新
  $('#my_score').text(`${score}`);

  //ボタンの更新
  if (score >= 50) {
    $("#spin_btn").prop("disabled", false);
  }
  if (score < 50) {
    $("#spin_btn").prop("disabled", true);
  }

});// チョキボタンを押したときの動作ここまで


// パーボタンを押したときの動作
$('#par_btn').on('click', function () {

  const randomNumber = com_set();

  if (randomNumber === 0) {
    $('#result').text('YOU WIN');
    change_gu();
    win++;
    score += 10;
  } else if (randomNumber === 1) {
    $('#result').text('LOSE...');
    change_cho();
    if (score > 0) {
      score -= 5;
    }
  } else if (randomNumber === 2) {
    $('#result').text('DRAW');
    change_pa();
  }

  // 勝率計算
  const rate = Math.floor(win / total * 100);

  //スコア表示の更新
  $('#my_score').text(`${score}`);

  //ボタンの更新
  if (score >= 50) {
    $("#spin_btn").prop("disabled", false);
  }

  if (score < 50) {
    $("#spin_btn").prop("disabled", true);
  }

});// パーボタンを押したときの動作ここまで

//じゃんけん部分ここまで！！！！
//じゃんけん部分ここまで！！！！
//じゃんけん部分ここまで！！！！

//スロット部分

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
    
    if (check_1 === 0 && check_2 === 0 && check_3 === 0) {
      score += 1000;
      $('#my_score').text(`${score}`);
    }
    if (check_1 === 1 && check_2 === 1 && check_3 === 1) {
      score *= 2;
      $('#my_score').text(`${score}`);
    }
    if (check_1 === 2 && check_2 === 2 && check_3 === 2) {
      score *= 2;
      $('#my_score').text(`${score}`);
    }
    if (check_1 === 3 && check_2 === 3 && check_3 === 3) {
      score *= 2;
      $('#my_score').text(`${score}`);
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
  console.log(check_1);

  panel_check();

});

// ストップボタンを2を押したとき
$('#btn_2').on('click', function () {
  //プッシュ数をカウント
  push++;
  //setIntervalを止める
  clearInterval(panel_move_2);
  $("#btn_2").prop("disabled", true);
  console.log(check_2);

  panel_check();
  
});

// ストップボタンを3を押したとき
$('#btn_3').on('click', function () {
  //プッシュ数をカウント
  push++;
  //setIntervalを止める
  clearInterval(panel_move_3);
  $("#btn_3").prop("disabled", true);
  console.log(check_3);

  panel_check();
  
});



// spinボタンをを押したとき
$('#spin_btn').on('click', function () {

  score -= 50; //50スコアマイナス
  $('#my_score').text(`${score}`); //スコア表示更新

  if (score < 50) {
    $("#spin_btn").prop("disabled", true); // 50スコア未満になったらボタン無効化
  }

  // パネル１が回る
  panel_move_1 = setInterval(() => {
    panel_change_1();
  }, 500);

  // パネル２が回る
  panel_move_2 = setInterval(() => {
    panel_change_2();
  }, 500);

  // パネル３が回る
  panel_move_3 = setInterval(() => {
    panel_change_3();
  }, 500);

// ストップボタンを有効化
  $("#btn_1").prop("disabled", false);
  $("#btn_2").prop("disabled", false);
  $("#btn_3").prop("disabled", false);

// スピンボタンを無効化
  $("#spin_btn").prop("disabled", true);

});
