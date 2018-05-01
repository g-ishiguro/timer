//Startクリックの時刻から、Stopクリックの時刻を引く
(function() {
  'use strict';

  var timer = document.getElementById('timer');
  var Start = document.getElementById('Start');
  var Stop = document.getElementById('Stop');
  var Reset= document.getElementById('Reset');

  var startTime;
  var elapsedTime = 0;
  var timerId;
  var timeToAdd = 0;
  //stop watchが動いているか確認
  var isRunning = false;

  //各時間単位への変換
  function updateTimerText() {
    //例
    //135200ms => 02:15.200
    var m = Math.floor(elapsedTime / 60000);
    var s = Math.floor(elapsedTime % 60000 / 1000);
    var ms = elapsedTime % 1000;

    //桁数設定
    //mでは例後ろから２桁を取得=>常に２桁で表示
    m = ('0' + m).slice(-2);
    s = ('0' + s).slice(-2);
    ms = ('00' + ms).slice(-3);

    timer.textContent = m + ':' + s + '.' + ms;
  }

  //0.01秒ごとに現在の経過時刻からStartクリック時刻と引く=>経過時間を出す
  function countUp() {
    timerId = setTimeout(function () {
      elapsedTime = Date.now() - startTime + timeToAdd;
      countUp();
      updateTimerText();
    },10);
  }


  Start.addEventListener('click', function () {
    if (isRunning === true) {
      return;
    }
    isRunning = true;
    startTime = Date.now();
    countUp();
  });

  Stop.addEventListener('click', function () {
    if (isRunning === false) {
      return;
    }
    isRunning = false;
    clearTimeout(timerId);
    //timeToAdd=今までの計測時間=>stopをクリックする度足す
    timeToAdd += Date.now() - startTime;
  });

  Reset.addEventListener('click', function () {
    if (isRunning === true) {
      return;
    }
    elapsedTime = 0;
    timeToAdd = 0;
    updateTimerText();
  });
})();
