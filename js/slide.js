var wrap = document.querySelector('.wrap');
var next = document.querySelector('.arrow_right');
var prev = document.querySelector('.arrow_left');
var index = 0;
next.onclick = function(){
    next_pic();
};
prev.onclick = function(){
    prev_pic();
};
function next_pic() {
    var newLeft;
    if(wrap.style.left === "-2940px"){
        newLeft = -980;
    }else{
        newLeft = parseInt(wrap.style.left)-490;
    }
    wrap.style.left = newLeft + 'px';
    index++;
    if(index > 4){
        index = 0;
    }
    showCurrentDot()
}
function prev_pic(){
    var newLeft;
    if(wrap.style.left === "0px"){
        newLeft = -1960;
    }else{
        newLeft = parseInt(wrap.style.left)+490;
    }
    wrap.style.left = newLeft + 'px';
    index--;
    if(index < 0){
        index = 4;
    }
    showCurrentDot();
}

/*自动播放*/
var timer = null;
function autoPlay(){
    timer = setInterval(function(){
        next_pic();
    },1000);
}
autoPlay();

var container = document.querySelector('.container');
container.onmouseover = function(){
    clearInterval(timer);
};
container.onmouseout = function(){
    autoPlay();
};

/*让焦点随着图片的移动而移动*/

var dots = document.getElementsByTagName('span');
function showCurrentDot(){
    for(var i = 0, len = dots.length; i < len; i++){
        dots[i].className = "";
    }
    dots[index].className = 'on';
}

/*点击焦点到达相对应的图片*/
for(var i = 0, len = dots.length; i < len; i++){
    (function(i){
        dots[i].onclick = function(){
            var dis = index - i;
            if(index == 4 && parseInt(wrap.style.left)!==-2450){
                dis = dis - 5;
            }
            //和使用prev和next相同，在最开始的照片5和最终的照片1在使用时会出现问题，导致符号和位数的出错，做相应的处理即可
            if(index == 0 && parseInt(wrap.style.left)!==-490){
                dis = 5 + dis;
            }
            wrap.style.left = (parseInt(wrap.style.left) + dis * 490) + 'px';
            index = i;
            showCurrentDot();
        };
    })(i);
}