window.onload = function () {
    console.log("--- main.js ---");

    //--とりあえずaタグ抜こうか
    var links = document.getElementsByTagName("a");
    var linkURL = Array(0), linkElem = Array(0);
    for (var i = 0; i < links.length; i++) {
        var tmp = links[i].innerText; //aタグの中身出して…
        //--商品コードなら配列に追加
        if (/(M|K|P|B|R|S|I|C|T)\-\d\d\d\d\d/.test(tmp) == true) {
            linkElem.push(links[i]);
            linkURL.push(tmp);
        }
    }

    //--cssを外部から弄る
    css =
        "<style>" +
        ".toolTip{ position: relative; }" +
        ".toolTip .ilspan{ display: block; border: solid 2px #999; background-color: #eee; color: #666; text-decoration: none; position: absolute; top: 15px;  left: 2px; padding: 5px; visibility: hidden; width:150px;}" +
        "a.toolTip:hover,a.toolTip:hover span{ visibility: visible; z-index: 100; }" +
        "</style>";

    document.head.innerHTML += css;

    //--直後に「→」マークの新要素を定義し、ホバーメニューを作る
    for (var i = 0; i < linkElem.length; i++) {
        linkElem[i].outerHTML +=
            "<a href=\"javascript:void(0)\" class=\"toolTip\">" +
            "➡" +
            "<span class=\"ilspan\">" +
            /*-- メイン画像 --*/
            "<img class=\"miniimage\" src=\"http://akizukidenshi.com/img/goods/L/" + linkURL[i] + ".jpg\" width=\"150\">" +
            "<br>" +
            /*-- ミニサムネ --*/
            "<img class=\"thumbnail\" width=\"30\" src=\"http://akizukidenshi.com/img/goods/L/" + linkURL[i] + ".jpg\">" +
            "<img class=\"thumbnail\" width=\"30\" src=\"http://akizukidenshi.com/img/goods/1/" + linkURL[i] + ".jpg\">" +
            "<img class=\"thumbnail\" width=\"30\" src=\"http://akizukidenshi.com/img/goods/2/" + linkURL[i] + ".jpg\">" +
            "<img class=\"thumbnail\" width=\"30\" src=\"http://akizukidenshi.com/img/goods/3/" + linkURL[i] + ".jpg\">" +
            "<img class=\"thumbnail\" width=\"30\" src=\"http://akizukidenshi.com/img/goods/4/" + linkURL[i] + ".jpg\">" +
            "<br>" +
            /*-- カートに入れるフォーム --*/
            "<form method=\"POST\" action=\"/catalog/cart/cart.aspx\">" +
            "<table><tr><td>" +
            "<input type=\"text\" name=\"" + linkURL[i] + "_qty\" value=\"1\" size=\"3\" maxlength=\"5\">" +
            "<input type=\"text\" name=\"" + "K-14286" + "_qty\" value=\"5\" size=\"3\" maxlength=\"5\">" +
            "</td><td>" +
            "<input type=\"image\" src=\"/img/sys/button/cart.gif\" alt=\"カートへ入れる\">" +
            "<td>" +
            "</tr></table>" +
            "<span class=\"valiationlist_\"><input name=\"goods\" type=\"hidden\" value=\"" + linkURL[i] + "\"></span>" +
            "</form>" +

            "</a>" +
            "</span>";
    }

    //--ホバーメニューをelementとして取得
    var hover_menu = document.getElementsByClassName("thumbnail");

    //--イベントリスナを追加
    for (var i = 0; i < hover_menu.length; i++) {
        hover_menu[i].addEventListener("mouseover", switchimage);
    }

    console.log("complete.");
}

//--画像を切り替える
var switchimage = function () {
    var tmpsrc = event.target.getAttribute("src");
    var tmpelem = document.getElementsByClassName("miniimage");
    for (var i = 0; i < tmpelem.length; i++) {
        tmpelem[i].setAttribute("src", tmpsrc);
    }
}