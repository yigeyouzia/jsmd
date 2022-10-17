window.addEventListener('load', function () {
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;  //720
    var ol = focus.querySelector('.circle');
    // 1.鼠标经过focus显示箭头
    focus.addEventListener('mouseover', function (e) {
        arrow_l.style.display = "block";
        arrow_r.style.display = "block";
        // 9.鼠标经过不自动播放
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseleave', function (e) {
        arrow_l.style.display = "none";
        arrow_r.style.display = "none";
        // 10.离开开启定时器
        timer = setInterval(function () {
        // 自动调用点击事件
        arrow_r.click();
    }, 200);
    })
    // 2.动态生成小圆圈  有几张图片生成几个
    var ul = focus.querySelector('ul');
    // console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++){
        var li = document.createElement('li');
        // 记录当前li的索引值
        // li.setAttribute('index', i);
        li.index = i;
        ol.appendChild(li);
        // 3.小圆圈排他思想  创建时绑定事件
        li.addEventListener('click', function (e) {
            for (var j = 0; j < ol.children.length; j++){
                ol.children[j].className = '';
            }
            this.className = 'current';
            // 4.点击小圆圈移动图片  移动目标是ul  距离是 索引值*图片宽度
            // 大盒子宽度
            var index = this.index;  //******一定写this不是li */
            // 当我们点击li  num 变化
            num = index;    
            console.log(index); 
            animate(ul, -index * focusWidth);
        })
    }
    ol.children[0].className = 'current'
    // 5.克隆第一张图片防在ul后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 6点击右侧按钮  图片滚动一张
    var num = 0;
    // ******节流阀
    var flag = true;
    arrow_r.addEventListener('click', function (e) {
        if (flag) {
            flag = false;
            if (num == ul.children.length-1) {
            ul.style.left = 0;
            num = 0;
        }
        num++;
            animate(ul, -num * focusWidth, function () {
            // 回调函数里面打开节流阀
                flag = true;
        });
        // 小圆圈跟随移动
        for (var i = 0; i < ol.children.length; i++){
            ol.children[i].className = '';
        }
        ol.children[num%ol.children.length].className = 'current';
        }
    })
    // 7.点击右侧按钮  图片滚动一张
    arrow_l.addEventListener('click', function (e) {
        if (flag) {
            flag = false;
            if (num==0) {
            ul.style.right = 0;
            num=ul.children.length-1;
        }
        num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
        });
        for (var i = 0; i < ol.children.length; i++){
            ol.children[i].className = '';
        }
        ol.children[num%ol.children.length].className = 'current';
        }
    })
    // 8自动播放功能
    var timer = setInterval(function () {
        // 自动调用点击事件
        arrow_r.click();
    }, 200);
})