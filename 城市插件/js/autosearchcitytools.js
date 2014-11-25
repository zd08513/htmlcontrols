/**
 * Created by zd on 14-11-20.
 */
function AutomaticSearch(id,config){
    //键盘上下事件的选择的第几个tr
    var auto_i=-1;
    //生成窗口的id
    var SearchwindowID='autoComplete'+createHexRandom();
    var html="<div style='left: 63px; top: 18px;display: none;width:222px;' data-autosearch='citysearch' id='"+SearchwindowID+"' class='autofill_wrap autofill_wrap_large'>";
    //键盘事件
    $('#'+id).keyup(function(e){
        var windows=$('#'+SearchwindowID).attr('id');
        var bool=false;
        if(windows!=undefined){
            html="";
            $(windows).html("");
            bool=true;
        }
        var value=$(this).val(),data=[],
            searchData=[],
            searchMessage='';
        if(value.length>0){
            var reg = /[^\u4e00-\u9fa5]/;//判断中文
            if(!reg.test(value)){
                //获取国内数据
                var itemsch=searchFilter(searchlist.ch,value,0);
                $.each(itemsch,function(i,n){
                    searchData.push(n);
                });
                //获取国外数据
                var itemsen=searchFilter_EN(searchlist.en,value,0);
                $.each(itemsen,function(i,n){
                    searchData.push(n);
                });
            }
            var reg2 = /^[a-zA-Z]+$/;//表示英文
            if(reg2.test(value)){
                value=value.toLowerCase();
                //获取国内数据
                var itemsch=searchFilterCH(searchlist.ch,value,0);
                $.each(itemsch,function(i,n){
                    searchData.push(n);
                });
                //获取国外数据
                var selectIem=searchFilter_ENW(searchlist.en,value,0);
                $.each(selectIem,function(x,y){
                    var valueitem=[];
                    valueitem.push(y[0][1],y[1])
                    searchData.push(valueitem);
                });
                //国内三字码查询
                if(value.length<=3){
                    var itemdata=searchlist.threedata_ch.split('@');
                    for(var i=0;i<itemdata.length;i++){
                        var a=itemdata[i];
                        if(a.length>0){
                            var b= a.split('|');
                            var c=b[b.length-1].toLowerCase();
                            if(GetFind(c,value,true)){
                                var items=[];
                                items.push(b[0],b[1]+"("+b[2]+")");
                                searchData.push(items);
                            }
                        }
                    }
                    var itemdata=searchlist.threedata_en.split('@');
                    for(var i=0;i<itemdata.length;i++){
                        var a=itemdata[i];
                        if(a.length>0){
                            var b= a.split('|');
                            var c=b[b.length-1].toLowerCase();
                            if(GetFind(c,value,true)){
                                var items=[];
                                items.push(b[0],b[1]);
                                searchData.push(items);
                            }
                        }
                    }
                }
            }

            if(searchData.length==0 || searchData==null || searchData==''){
                searchMessage='对不起，找不到：'+value;
            }else{
                searchMessage='输入中文/拼音/英文/或↑↓键选择';
            }
            //加载列表
            html+="<iframe style='z-index: -1; opacity: 0; border: medium none; position: absolute; height: 310px; width: 222px;'></iframe>";
            html+="<div class='show_title'><span class='autofill_hd_inner'>"+searchMessage+"</span><span class='autofill_close show_title'></span></div>";
            html+="<table style='width: 222px;' class='autofill_tray' cellpadding='0' cellspacing='0'><tbody>";
            if(config.count=='yes') {
                for (var i = 0, len = searchData.length; i < len; i++) {
                    html += "<tr class='autofill_item enableListRow'><td><div class='match_div'>";
                    var values = searchData[i][0].split(','), valueString = "";
                    for (var j = 0; j < values.length; j++) {
                        valueString += values[j];
                    }
                    html += "<span class='match_right'>" + valueString + "</span>";
                    html += "<span class='match_left'>" + searchData[i][1] + "</span>";
                    html += "</div></tr>";
                }
            }else{
                if(searchData.length>=config.count){
                    for (var i = 0, len = config.count; i < len; i++) {
                        html += "<tr class='autofill_item enableListRow'><td><div class='match_div'>";
                        var values = searchData[i][0].split(','), valueString = "";
                        for (var j = 0; j < values.length; j++) {
                            valueString += values[j];
                        }
                        html += "<span class='match_right'>" + valueString + "</span>";
                        html += "<span class='match_left'>" + searchData[i][1] + "</span>";
                        html += "</div></tr>";
                    }
                }else{
                    for (var i = 0, len = searchData.length; i < len; i++) {
                        html += "<tr class='autofill_item enableListRow'><td><div class='match_div'>";
                        var values = searchData[i][0].split(','), valueString = "";
                        for (var j = 0; j < values.length; j++) {
                            valueString += values[j];
                        }
                        html += "<span class='match_right'>" + valueString + "</span>";
                        html += "<span class='match_left'>" + searchData[i][1] + "</span>";
                        html += "</div></tr>";
                    }
                }
            }
            html+="<tbody></table></div>";
            if(bool){
                GetShowOrHide('#'+SearchwindowID,'show');
                $('#'+SearchwindowID).html(html);
            }else{
                html+="</div>";
                $('body').prepend(html);
                var wLeft=$(this).offset().left,
                    wTop=$(this).offset().top+$(this).height()+2;
                GetShowOrHide('#'+SearchwindowID,'show');
                $('#'+SearchwindowID).css({left:wLeft+"px"});
                $('#'+SearchwindowID).css({top:wTop+"px"});
            }
        }else{
            GetShowOrHide('#'+SearchwindowID,'hide');
        }
        if(searchData.length>0){
            //鼠标经过换色
            $('#'+SearchwindowID+' .autofill_tray tbody tr').hover(function(){
                var select_value=$(this).children().children().children()[1].innerHTML;
                var tr_objs=$('#'+SearchwindowID+' .autofill_tray tbody tr');
                $.each(tr_objs,function(t,r){
                    var value_span=$(r).children().children().children()[1].innerHTML;
                    if(value_span==select_value){
                        auto_i=t;
                        $(this).css({background:'#8AB923'});
                        $(this).children().css({color:'#fff'});
                    }else{
                        $(this).css({background:'#fff'});
                        $(this).children().css({color:'#006DAE'});
                    }
                });
            },function(){
                /*$(this).css({background:'#fff'});
                $(this).children().css({color:'#006DAE'});*/
                var select_value=$(this).children().children().children()[1].innerHTML;
                var tr_objs=$('#'+SearchwindowID+' .autofill_tray tbody tr');
                $.each(tr_objs,function(t,r){
                    var value_span=$(r).children().children().children()[1].innerHTML;
                    if(value_span==select_value){
                        auto_i=t;
                        $(this).css({background:'#8AB923'});
                        $(this).children().css({color:'#fff'});
                    }else{
                        $(this).css({background:'#fff'});
                        $(this).children().css({color:'#006DAE'});
                    }
                });
            });
            $('#'+SearchwindowID+' .autofill_tray tbody tr').click(function(){
                var childerValue=$(this).children().children().children()[1];//$(this).contains('span:nth-child(2)').text();
                $('#'+id).val(childerValue.innerHTML);
                GetShowOrHide('#'+SearchwindowID,'hide');
                auto_i=-1;
            });
            //键盘上事件
            var selectAuto=$('#'+SearchwindowID+' .autofill_tray tbody tr');
            if(e.keyCode==38){
                if(auto_i<0)auto_i=0;
                auto_i--;
                $(selectAuto[auto_i]).css({background:'#8AB923'});
                $(selectAuto[auto_i]).children().css({color:'#fff'});
            }else if(e.keyCode==40){
                var selectSumCount=0;
                if(config.count=='yes' || searchData.length<config.count){
                    selectSumCount=searchData.length;
                }else
                    selectSumCount=config.count;
                if(selectSumCount>auto_i)
                    auto_i++;
                $(selectAuto[auto_i]).css({background:'#8AB923'});
                $(selectAuto[auto_i]).children().css({color:'#fff'});
            }else if(e.keyCode==13){//回车事件
                var childerValue=$(selectAuto[auto_i]).children().children().children()[1];
                $('#'+id).val(childerValue.innerHTML);
                auto_i=-1;
                GetShowOrHide('#'+SearchwindowID,'hide');
            }
            //监听全局事件
            document.onclick=function(e){
                var windowTop=$('#'+id).offset().top;
                var windowLeft=$('#'+id).offset().left;
                var widowWidth=$('#'+SearchwindowID).width();
                var windowHeight=$('#'+SearchwindowID).height();
                if($.browser.msie){
                    if (window.event.pageX < windowLeft || window.event.pageX > windowLeft + widowWidth) {
                        GetShowOrHide('#' + SearchwindowID, 'hide');
                    }
                    if (window.event.pageY < windowTop || window.event.pageY > windowHeight + windowTop) {
                        GetShowOrHide('#' + SearchwindowID, 'hide');
                    }
                }else {
                    if (e.clientX < windowLeft || e.clientX > windowLeft + widowWidth) {
                        GetShowOrHide('#' + SearchwindowID, 'hide');
                    }
                    if (e.clientY < windowTop || e.clientY > windowHeight + windowTop) {
                        GetShowOrHide('#' + SearchwindowID, 'hide');
                    }
                }
                //console.log(e.clientX+'--'+ e.clientY+'--windowTop:'+windowTop+'--windowLeft:'+windowLeft+'--widowWidth:'+widowWidth+'--windowHeight:'+windowHeight);
            }
        }
        //关闭搜索窗口
        $('#'+SearchwindowID+'  div.show_title span.autofill_close').click(function(){
            GetShowOrHide('#'+SearchwindowID,'hide');
        });
        //失去焦点事件
        /*$(this).blur(function(){
            var childerValue=$('#'+SearchwindowID+' .autofill_tray tbody tr').children().children().children()[1];//$(this).contains('span:nth-child(2)').text();
            $('#'+id).val(childerValue.innerHTML);
            GetShowOrHide('#'+SearchwindowID,'hide');
            auto_i=-1;
        });*/
    });
    //触发触键事件
    $('#'+id).focus(function(){
        var show_ids=$("div[data-autosearch='citysearch']");
        for(var i= 0,len=show_ids.length;i<len;i++){
            if($(show_ids[i]).attr('id')!=id)//隐藏其它不活动的窗口
                GetShowOrHide('#'+$(show_ids[i]).attr('id'),'hide');
        }
    });
}
//国内中文过滤的方法
function searchFilter(data,searchString,searchLength){
    var selectData=[];
    if(searchLength>=searchString.length)return data;
    if(searchLength==0) {
        $.each(data, function (i, n) {
            $.each(n, function (j, k) {
                var arr = $.grep(k, function (x, y) {
                    return x.charAt(searchLength) == searchString.charAt(searchLength);
                });
                if (arr.length > 0) {
                    selectData.push(k);
                }
            });
        });
    }else{
        $.each(data, function (j, k) {
            var arr = $.grep(k, function (x, y) {
                return x.charAt(searchLength) == searchString.charAt(searchLength);
            });
            if (arr.length > 0) {
                selectData.push(k);
            }
        });
    }
    searchLength++;
    return searchFilter(selectData,searchString,searchLength);
}
//国外中文过滤的方法
function searchFilter_EN(data,searchString,searchLength){
    var selectData=[];
    var reg = /[^\u4e00-\u9fa5]/;
    if(searchLength>=searchString.length){
        return data;
    }else{
        $.each(data, function (j, k) {
            var arr = $.grep(k, function (x, y) {
                if(!reg.test(x)){
                    return x.charAt(searchLength) == searchString.charAt(searchLength);
                }else{
                    if(x.indexOf('(')>-1){
                        var xFirst= x.substring(0, x.indexOf('('));
                        var xSectond=x.substring(x.indexOf('(')+1, x.indexOf(')'));
                        return xFirst.charAt(searchLength) == searchString.charAt(searchLength)||xSectond.charAt(searchLength) == searchString.charAt(searchLength);
                    }
                }
            });
            if (arr.length > 0) {
                if(k[0].length==2){
                    var item=[];
                    item.push(k[0][1],k[1]);
                    selectData.push(item);
                }else{
                    selectData.push(k);
                }
            }
        });
        searchLength++;
        return searchFilter_EN(selectData,searchString,searchLength);
    }
}
//国内拼音过滤方法
function searchFilterCH(data,searchString,searchLength){
    var selectData=[];
    if(searchLength>=searchString.length){
        return data;
    }else{
        if(searchLength==0){
            $.each(data,function(i,n){
                if(i==searchString.charAt(0)){
                    selectData=n;
                }
            })
        }else{
            $.each(data,function(i,n){
                var values=n[0].split(','),valuestring="",vs="";
                for(var v=0;v<values.length;v++){
                    valuestring+=values[v];
                    vs+=values[v].charAt(0);
                }
                //if(valuestring.length==0 || vs.length==0)return;
                //if(valuestring.filter(searchString)){
                if(GetFind(valuestring,searchString,true)){
                    selectData.push(n);
                }else if(GetFind(vs,searchString,true)){
                    selectData.push(n);
                }
            });
        }
        searchLength++;
        return searchFilterCH(selectData,searchString,searchLength);
    }
}
////国外英文过滤方法
function searchFilter_ENW(data,searchString,searchLength){
    var selectData=[];
    if(searchLength>=searchString.length){
        return data;
    }else{
        $.each(data, function (i, n) {
            var itemvalue = n[0], zhString = '', zhJ = '', ENString = '',zhk='';
            var itemvalues = itemvalue[0].split(',');
            if(itemvalue[0].indexOf('(')>-1){
                zhString=itemvalue[0].substring(0,itemvalue[0].indexOf('('));
                zhk=itemvalue[0].substring(itemvalue[0].indexOf('(')+1,itemvalue[0].indexOf(')'));
            }
            ENString = itemvalue[1].toLowerCase();
            for (var v = 0; v < itemvalues.length; v++) {
                zhString += itemvalues[v];
                zhJ += itemvalues[v].charAt(0);
            }
            if (GetFind(zhString,searchString,true)) {
                selectData.push(n);
            } else if (GetFind(zhJ,searchString,true)) {
                selectData.push(n);
            } else if (GetFind(ENString,searchString,true)) {
                selectData.push(n);
            }else if(zhk.length>0){
                var zhks=zhk.split(','),zhkk='';
                for(var v=0;v<zhks.length;v++){
                    zhkk+=zhks[v];
                }
                if(GetFind(zhkk,searchLength,true)){
                    selectData.push(n);
                }
            }
        });
        searchLength++;
        return searchFilter_ENW(selectData,searchString,searchLength);
    }
}
function GetFind(value,search,bool_v){
    var bool_v=false;
    if(value.indexOf(search)>-1)
        bool_v=true;
    return bool_v;
}
