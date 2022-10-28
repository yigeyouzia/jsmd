$(function () {
    // 节流阀   互斥锁
    // 当我们点击li时  此时不需要执行页面滚动里面的li 的背景选择  添加current
    var flag = true;
    var toolTop = $(".recommend").offset().top;
    // console.log(toolTop);
    // 滚动函数
    toggleTool();  //页面刷新一下调用函数
    function toggleTool() {
        if ($(document).scrollTop() >= toolTop ) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        };
    }
    // 1.显示隐藏电梯导航
    $(window).scroll(function () {
        toggleTool();
        // 3.滚动到位置左边li变红色
        if (flag) {
            $(".floor .w").each(function (i,ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                $(".fixedtool li").eq(i).addClass("current").siblings().removeClass();
                }   
            })
        }
    })
    // 2.点击导航页面到达相应位置
    $(".fixedtool li").click(function () {
        flag = false;
        console.log($(this).index());
        var index = $(this).index()
        var boxTop = $(".floor .w").eq(index).offset().top;  //前往位置
        // 页面滚动
        $("body, html").stop().animate({
            scrollTop: boxTop
        }, function () {
            // 到达位置后打开锁
            flag = true;
        });
        // 点击小li变红色  其他变白色  排他思想
        $(this).addClass("current").siblings().removeClass();
    })
})