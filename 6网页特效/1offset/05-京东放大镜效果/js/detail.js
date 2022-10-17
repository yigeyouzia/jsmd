window.addEventListener('load', function () {
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    // 1.鼠标经过盒子显示黄色放大镜
    preview_img.addEventListener('mouseover', function (e) {
        mask.style.display = "block";
        big.style.display = "block";
    })
    preview_img.addEventListener('mouseout', function (e) {
        mask.style.display = "none";
        big.style.display = "none";
        
    })
    preview_img.addEventListener('mousemove', function (e) {
        // 鼠标在盒子内坐标
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        // 盒子一半150
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        var maskMax = preview_img.offsetHeight - mask.offsetHeight;
        if (maskX < 0) {
            maskX = 0;
        } else if (maskX >= maskMax) {   //最大移动距离 大盒子减去mask
            maskX = maskMax;
        }
        if (maskY < 0) {
            maskY = 0;
        } else if (maskY >= maskMax) { 
            maskY = maskMax;
        }
        mask.style.left = maskX + "px";
        mask.style.top = maskY + "px";   
        // 2.大图片等比例同步移动
        var bigImg = document.querySelector('.bigImg');
        var bigMax = bigImg.offsetWidth - big.offsetWidth;
        var bigX = maskX * bigMax / maskMax;
        var bigY = maskY * bigMax / maskMax;
        bigImg.style.left = -bigX + "px";
        bigImg.style.top = -bigY + "px";
    })

})