window.addEventListener('load', function () {
    // 1.获取元素
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    // 获取focus的宽度
    var w = focus.offsetWidth;
    var ol = focus.children[1];
    // 2.利用定时器自动轮播图片
    var index = 0;
    var timer = setInterval(function () {
        index++;
        var translatex = -w * index;
        // 动画过度
        ul.style.transition = 'all .3s';
        ul.style.transform = 'translateX(' + translatex + 'px)';
    }, 2000)
    // 等待过度动画加载完后，再去判断最后一张到第一张   transitionend
    ul.addEventListener('transitionend', function () {
        // 无缝滚动  索引号为3 跳转
        if (index >= 3) {
            index = 0;  //回到第一张
            ul.style.transition = ''; // 关闭动画
            var translatex = -w * index;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }else if (index < 0) {
            index = 2;  //回到第一张
            ul.style.transition = ''; // 关闭动画
            var translatex = -w * index;
            ul.style.transform = 'translateX(' + translatex + 'px)';
            // 3.小圆点跟随变化
            // 把ol 里面 带 li 的current去掉
        }
        ol.querySelector('.current').classList.remove('current');
        ol.children[index].classList.add('current');
    })
    // 4.手指滑动图片
    var startX = 0;
    var moveX = 0;
    var flag = false;  //防止手指点击未移动
    ul.addEventListener('touchstart', function (e) {
        // 关闭定时切换图片
        clearInterval(timer);
        startX=e.targetTouches[0].pageX;
    })
    ul.addEventListener('touchmove', function (e) {
        // 计算移动距离
        moveX = e.targetTouches[0].pageX - startX;
        // 盒子移动： 盒子原来位置 + 手指移动位置
        var translatex = -index * w + moveX;
        // 手指移动不需要动画函数
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
        flag = true;
        e.preventDefault();  //防止滚动屏幕
    })
    // 手指离开  根据手指移动距离判断下一张还是回弹
    ul.addEventListener('touchend', function (e) {
        if (flag)
        {
            if (Math.abs(moveX) > 50) {
            // 右滑为正  播放上一张
            if (moveX > 50) {
                index--;
            } else {
                index++;
            }
            var translatex = -index * w;
            ul.style.transition = "all .3s";
            ul.style.transform = 'translateX(' + translatex + 'px)';
            } else {
            var translatex = -index * w;
            ul.style.transition = "all .3s";
            ul.style.transform = 'translateX(' + translatex + 'px)';
            }    
        }
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            var translatex = -w * index;
            // 动画过度
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }, 2000);

    });


})