(function () {
    let count = 3,
        $videoBox = $(".video-box"),
        $close = $('.btn-close'),
        $btnPlay = $(".btn-play"),
        $mask = $('.mask'),
        $chaPrev = $('.icon-prev'),
        $chaNext = $('.icon-next'),
        $icon = $(".portrait-icon"),
        $aFoucs = $(".atlas-title>a"),
        $atlasBox = $('.atlas-group-item'),
        $atlasCon = $('.atlas-group-item>div'),
        $bigImg = $(".big-img"),
        $img = $('.big-img>img'),
        iconW = parseInt($icon.eq(count - 2).offset().left),
        videoW = parseInt($videoBox.width()) / 2,
        videoH = parseInt($videoBox.height()) / 2;
    $videoBox.css({
        marginLeft: -videoW + 'px',
        marginTop: -videoH + 'px'
    });
    $btnPlay.on('click',function () {
        var videoSrc = 'video/GF_Season2_V2_x2642.mp4';
        $videoBox.show().find('video').attr('src',videoSrc);
        $mask.show();
    });
    $close.on('click',function () {
        $videoBox.hide().find('video').attr('src','');
        $mask.hide();
    });
    $chaNext.on("click",function () {
        onMove("next");
    });
    $chaPrev.on("click",function () {
        onMove("prev");
    });
    $icon.on("click",function () {
        let index = $(this).index();
        goIndex(index);
        onMove(index);
    });
    $aFoucs.on('click',function(){
        var index = $(this).index();
        addRemove($aFoucs,'atlas-active',index);
        $atlasBox.stop(true,false).fadeOut('fast').eq(index).stop(true,false).fadeIn(300);
    });
    $atlasCon.on('click',function () {
        let index = $(this).index(),
            $parent = $(this).parent(),
            $box = $('.atlas-group-item'),
            parentIndex = $parent.index(),
            imgSrc = $box.eq(parentIndex).find('div').eq(index).find('img').attr('src');
        $bigImg.show().find('img').attr('src',imgSrc);
    });
    $img.on('click',function () {
        $bigImg.hide();
    });
    let _Count = {};
    _Count.num = 0;
    function onMove(flag){
        let length = $icon.length - 1;
        if(flag === "prev") {
            _Count.num = (_Count.num === 0) ? 0 : _Count.num - 1;
        } else if(flag === "next") {
            _Count.num = (_Count.num === length) ? length : _Count.num + 1;
        }
        if($.isNumeric(flag)) {
            _Count.num = flag;
        }else {
            goIndex(_Count.num);
        }
    }
    function addRemove(el,cl,index) {
        el.stop(true,false).removeClass(cl).eq(index).stop(true,false).addClass(cl);
    }
    function goIndex(index) {
        let $roleItem = $(".role-item"),
            $gunItem = $(".gun-item"),
            $intItem = $(".introduce-item"),
            $dollItem = $(".doll-item"),
            $cvBox = $(".cv-item"),
            $iconCon = $('.portrait-content');
        if(index > count) {
            $iconCon.animate({left: -iconW + 'px'},300);
        } else if(index === count) {
            $iconCon.animate({left: '0px'},300);
        }
        addRemove($icon,'icon-active',index);
        addRemove($roleItem,'role-item-active',index);
        addRemove($dollItem,'doll-item-active',index);
        $gunItem.stop(true,false).hide().eq(index).stop(true,false).show();
        $intItem.stop(true,false).hide().eq(index).stop(true,false).show();
        $cvBox.stop(true,false).css('display','none').eq(index).stop(true,false).css('display','block');
    }
})();
