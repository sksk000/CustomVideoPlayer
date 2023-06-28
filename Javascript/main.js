//動画再生周りで必要な変数を用意
var video = document.getElementById('video');
var playbtn = document.getElementById('playbtn');
var pausebtn = document.getElementById('pausebtn');
var timestamp = document.getElementById('timestamp');
var slider = document.getElementById('progress');

//各種イベントが呼ばれた際に呼ぶ関数を登録する
playbtn.addEventListener('click',function(){video.play();});
pausebtn.addEventListener('click',function(){video.pause();});
video.addEventListener('timeupdate',function()
{
    //現在の再生時間をテキストとスライダーにわたす
    timestamp.textContent = culcCurrentTime(video.currentTime);
    slider.value = (video.currentTime / video.duration) * 100;
    
}
);
video.addEventListener('click',function()
{
    if(video.paused)
    {
        video.play();
    }
    else
    {
        video.pause();
    }
    
}
);

//再生時間を計算する
function culcCurrentTime(time)
{
    //時間・分・秒を算出
    var hour = Math.floor(time / 3600);
    var min = Math.floor(time % 3600/60);
    var rem = Math.floor(time % 60);

    //各種文字列にして格納
    var ret = min.toString().padStart(2,'0') + ':' + rem.toString().padStart(2,'0');

    //一時間以上経った場合は表示させるようにする
    if(hour >= 1)
    {
        ret = hour.toString() + ':'+ ret;
    }

    return ret;
}




