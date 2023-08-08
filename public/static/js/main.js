//動画のサイズ変更を行うので変更前のサイズと変更後のサイズを格納
const resizeVideoWidth = "90%";
const beforeVideoWidth = "63%";
const maxInnerSize = 1000;

//動画再生周りで必要な変数を用意
var video = document.getElementById("video");
var playbtn = document.getElementById("playbtn");
var stopbtn = document.getElementById("stopbtn");
var timestamp = document.getElementById("timestamp");
var slider = document.getElementById("progress");
var titletext = document.getElementById("titletext");
var isFirstVideoClick = false;
var moviefunctionitems = document.getElementById("moviefunctionitem");
var playicon = document.getElementById("playicon");

//各種イベントが呼ばれた際に呼ぶ関数を登録する
playbtn.addEventListener("click", function () {
  if (video.paused) {
    video.play();
    playicon.classList.remove("fa-pause");
    playicon.classList.add("fa-play");
  } else {
    video.pause();
    playicon.classList.remove("fa-play");
    playicon.classList.add("fa-pause");
  }
});
stopbtn.addEventListener("click", function () {
  video.pause();
  video.currentTime = 0;
});
video.addEventListener("timeupdate", function () {
  //現在の再生時間をテキストとスライダーにわたす
  timestamp.textContent = culcCurrentTime(video.currentTime);
  slider.value = (video.currentTime / video.duration) * 100;
});
video.addEventListener("click", function () {
  //初めて動画をクリックした際にタイトルを非表示から表示に変える
  if (titletext.style.display == "") {
    titletext.style.display = "block";
  }

  if (!isFirstVideoClick) {
    isFirstVideoClick = true;
    reizeMoviewindow();
  }

  //再生開始してなければ再生を行う
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
});

window.addEventListener("resize", reizeMoviewindow);

slider.addEventListener("change", function () {
  //slider.valueは割合ではなくスライダーの位置
  //全体の再生時間＊スライダーの割合(100の内のどこらへんか)
  video.currentTime = video.duration * (slider.value / 100);
});

//再生時間を計算する
function culcCurrentTime(time) {
  //時間・分・秒を算出
  var hour = Math.floor(time / 3600);
  var min = Math.floor((time % 3600) / 60);
  var rem = Math.floor(time % 60);

  //各種文字列にして格納
  var ret =
    min.toString().padStart(2, "0") + ":" + rem.toString().padStart(2, "0");

  //一時間以上経った場合は表示させるようにする
  if (hour >= 1) {
    ret = hour.toString() + ":" + ret;
  }

  return ret;
}

function reizeMoviewindow() {
  //幅が一定のサイズになっているか確認
  if (window.innerWidth < maxInnerSize) {
    //一定のサイズになっていたら動画自体の幅を変更
    video.style.width = resizeVideoWidth;
    moviefunctionitems.style.width = resizeVideoWidth;
  } else {
    video.style.width = beforeVideoWidth;
    moviefunctionitems.style.width = beforeVideoWidth;
  }
}
