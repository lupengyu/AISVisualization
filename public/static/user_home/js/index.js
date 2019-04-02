window.onscroll=function(){
    var top=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
    var $topbar = $(".topbar");
    var $title = $(".title");

    if(top <= 70) {
        $topbar.hide();
        $title.show();
    }
    else if(top > 70) {
        (function(){
            $topbar.show();
            $title.hide();
        })();
    }
};