/**
 * Created by zd on 14-11-19.
 */
var menu_Data={
    "data":['国内热门','国际热门','欧洲','美洲','非洲','大洋洲','亚洲'],
    "datas":['热门','ABCDEF','GHJKL','MNPQRS','TWXYZ']
};
function CityWindowShow(id,config){
    //加载配置及数据
    var input_id=$('#'+id);
    if(input_id==null || input_id==undefined)return;
    //生成提示窗口的Id
    var mNoticeID="mNotice"+createHexRandom();
    var html="<div data-window='citywindow' style=\"z-index: 2000; position: absolute; background-color: #FFF;\" class='mNotice-wrap' id='"+mNoticeID+"'>";
    //判断输入框是否只读
    if(config.readOnly!=undefined || config.readOnly!=null){
        if(config.readOnly){
            $('#'+id).attr('readonly','readonly');
            $('#'+id).css({cursor:'pointer'});
        }
    }
    if(config.type==1){
        html+=GetMenuData(1,config.status);
    }else if(config.type==2){
        html+=GetMenuData(2,config.status);
    }else if(config.type==3){
        html+=GetMenuDataList();
    }else if(config.type==4){
        html+=GetMenuDataZiYou();
    }else if(config.type==5){
        html+=GetMenuDataZiYouBlack();
    }
    html+="</div>";
    $('body').prepend(html);
    if(config.type==3){
        $('#'+mNoticeID).css({width:'360px'});
    }else if(config.type==4 || config.type==5){
        $('#'+mNoticeID).css({width:'410px'});
    }
    //初使化隐藏控件
    mNoticeID="#"+mNoticeID;
    $(mNoticeID).hide();
    input_id.focus(function(){
        var value=$(this),
            wLeft=input_id.offset().left,
            wTop=input_id.offset().top+input_id.height()+2;
        //加载窗口的位置
        $(mNoticeID).css({left:wLeft});
        $(mNoticeID).css({top:wTop});
        if(value.val()==input_id.attr('title'))
            value.val('');
        //隐藏所有其它窗口
        var menu_windows=$("div[data-window='citywindow']");
        for(var i= 0,len=menu_windows.length;i<len;i++){
            GetShowOrHide('#'+$(menu_windows[i]).attr('id'),'hide');
        }
        //显示当前窗口
        GetShowOrHide(mNoticeID,'show');

        //监听全局事件
        document.onclick=function(event){
            var windowTop=input_id.offset().top;
            var windowLeft=input_id.offset().left;
            var widowWidth=$(mNoticeID).width();
            var windowHeight=$(mNoticeID).height();
            if($.browser.msie){
                if(window.event.pageX<windowLeft || window.event.pageX>windowLeft+widowWidth){
                    GetShowOrHide(mNoticeID,'hide');
                }
                if(window.event.pageY<windowTop){
                    GetShowOrHide(mNoticeID,'hide');
                }
                if(window.event.pageY>windowHeight+windowTop){
                    GetShowOrHide(mNoticeID,'hide');
                }
                //console.log(window.event.pageX+'--'+ window.event.pageY+'--windowTop:'+windowTop+'--windowLeft:'+windowLeft+'--widowWidth:'+widowWidth+'--windowHeight:'+windowHeight);
            }else{
                if(event.clientX<windowLeft || event.clientX>windowLeft+widowWidth){
                    GetShowOrHide(mNoticeID,'hide');
                }
                if(event.clientY<windowTop || event.clientY>windowHeight+windowTop){
                    GetShowOrHide(mNoticeID,'hide');
                }
            }
            //console.log(e.clientX+'--'+ e.clientY+'--windowTop:'+windowTop+'--windowLeft:'+windowLeft+'--widowWidth:'+widowWidth+'--windowHeight:'+windowHeight);
        }
    });
    input_id.blur(function(){
        var value=$(this);
        if(value.val().length==0 || value.val()=='')
            value.val(input_id.attr('title'));
    });
    if(config.type!=4 && config.type!=5){
        //触发触键事件
        input_id.keydown(function(){
            GetShowOrHide(mNoticeID,'hide');
        });
        //关闭事件
        $(mNoticeID+' .mNotice-mTab .mNotice-mTab-head .mNotice-close').click(function(){
            GetShowOrHide(mNoticeID,'hide');
        });
        //获取菜单名称
        var items=$(mNoticeID+' .mNotice-mTab .mNotice-mTab-wrap .mNotice-mTab-tab-tray .mNotice-mTab-item');
        //获取相应子菜单
        var lists=$(mNoticeID+' .mNotice-mTab .mNotice-mTab-wrap .mNotice-mTab-content');
        for(var i= 0,len=items.length;i<len;i++){
            $(items[i]).click(function(){
                for(var j=0;j<len;j++){
                    $(items[j]).removeClass('current');
                }
                $(this).addClass('current');
                for(var j=0;j<len;j++){
                    if($(items[j]).attr('class').indexOf('current')>-1){
                        $(lists[j]).removeClass('none');
                    }else{
                        $(lists[j]).addClass('none');
                    }
                }
            });
        }
        //悬停  移除
        var list_MenuChilder=$(mNoticeID+' .mNotice-mTab .mNotice-mTab-wrap .mNotice-mTab-content .mNotice-normal');
        list_MenuChilder.hover(function(){
            $(this).addClass('mNotice-hover');
            $(this).css({color: '#F60'});
        },function(){
            $(this).removeClass('mNotice-hover');
            $(this).css({color: '#333'});
        });
        list_MenuChilder.click(function(){
            input_id.val($(this).attr('title'));
            GetShowOrHide(mNoticeID,'hide');
        });
        //true 触发键盘事件
        if(config.automaticsearch){
            input_id.keyup(function(){
                GetShowOrHide(mNoticeID,'hide');
            });
        }
    }else if(config.type==4 || config.type==5){
        //获取菜单名称、获取相应子菜单
        var items="",lists="";
        if(config.type==4){
            items=$(mNoticeID+' .iv_notice .iv_notice_con .iv_notice_tab li');
            lists=$(mNoticeID+'  .iv_notice .iv_notice_con .iv_notice_tab_con');
        }else if(config.type==5){
            items=$(mNoticeID+' .iv_notice .iv_notice_con .iv_notice_tab li');
            lists=$(mNoticeID+'  .iv_notice .iv_notice_con .iv_notice_tab_con');
        }
        for(var i= 0,len=items.length;i<len;i++){
            $(items[i]).click(function(){
                for(var j=0;j<len;j++){
                    $(items[j]).removeClass('current');
                }
                $(this).addClass('current');
                for(var j=0;j<len;j++){
                    if($(items[j]).attr('class').indexOf('current')>-1){
                        $(lists[j]).removeClass('none');
                    }else{
                        $(lists[j]).addClass('none');
                    }
                }
            });
        }
        //悬停  移除
        var list_MenuChilder=$(mNoticeID+' .iv_notice .iv_notice_con .iv_notice_tab_con .mNotice-normal');
        list_MenuChilder.hover(function(){
            $(this).addClass('mNotice-hover');
            $(this).css({color: '#F60'});
        },function(){
            $(this).removeClass('mNotice-hover');
            $(this).css({color: '#333'});
        });
        list_MenuChilder.click(function(){
            input_id.val($(this).attr('title'));
            GetShowOrHide(mNoticeID,'hide');
        });
    }
}
var mneuChilder=[
    "<div class='mNotice-mTab-content clearfix none'><span class='mNotice-normal mNotice-fixWidth' title='上海'>上海</span><span class='mNotice-normal mNotice-fixWidth' title='北京'>北京</span><span class='mNotice-normal mNotice-fixWidth' title='香港'>香港</span><span class='mNotice-normal mNotice-fixWidth' title='广州'>广州</span><span class='mNotice-normal mNotice-fixWidth' title='杭州'>杭州</span><span class='mNotice-normal mNotice-fixWidth' title='厦门'>厦门</span><span class='mNotice-normal mNotice-fixWidth' title='南京'>南京</span><span class='mNotice-normal mNotice-fixWidth' title='澳门'>澳门</span><span class='mNotice-normal mNotice-fixWidth' title='成都'>成都</span><span class='mNotice-normal mNotice-fixWidth' title='青岛'>青岛</span><span class='mNotice-normal mNotice-fixWidth' title='台北'>台北</span><span class='mNotice-normal mNotice-fixWidth' title='福州'>福州</span><span class='mNotice-normal mNotice-fixWidth' title='天津'>天津</span><span class='mNotice-normal mNotice-fixWidth' title='深圳'>深圳</span><span class='mNotice-normal mNotice-fixWidth' title='大连'>大连</span><span class='mNotice-normal mNotice-fixWidth' title='无锡'>无锡</span><span class='mNotice-normal mNotice-fixWidth' title='重庆'>重庆</span><span class='mNotice-normal mNotice-fixWidth' title='三亚'>三亚</span><span class='mNotice-normal mNotice-fixWidth' title='西安'>西安</span><span class='mNotice-normal mNotice-fixWidth' title='昆明'>昆明</span><span class='mNotice-normal mNotice-fixWidth' title='武汉'>武汉</span><span class='mNotice-normal mNotice-fixWidth' title='沈阳'>沈阳</span></div>",
    "<div class='mNotice-mTab-content clearfix'><span class='mNotice-normal mNotice-fixWidth' title='香港'>香港</span><span class='mNotice-normal mNotice-fixWidth' title='澳门'>澳门</span><span class='mNotice-normal mNotice-fixWidth' title='台北'>台北</span><span class='mNotice-normal mNotice-fixWidth' title='首尔'>首尔</span><span class='mNotice-normal mNotice-fixWidth' title='新加坡'>新加坡</span><span class='mNotice-normal mNotice-fixWidth' title='曼谷'>曼谷</span><span class='mNotice-normal mNotice-fixWidth' title='胡志明市'>胡志明市</span><span class='mNotice-normal mNotice-fixWidth' title='马尼拉'>马尼拉</span><span class='mNotice-normal mNotice-fixWidth' title='名古屋'>名古屋</span><span class='mNotice-normal mNotice-fixWidth' title='伦敦'>伦敦</span><span class='mNotice-normal mNotice-fixWidth' title='吉隆坡'>吉隆坡</span><span class='mNotice-normal mNotice-fixWidth' title='釜山'>釜山</span><span class='mNotice-normal mNotice-fixWidth' title='悉尼'>悉尼</span><span class='mNotice-normal mNotice-fixWidth' title='法兰克福'>法兰克福</span><span class='mNotice-normal mNotice-fixWidth' title='温哥华'>温哥华</span><span class='mNotice-normal mNotice-fixWidth' title='巴黎'>巴黎</span><span class='mNotice-normal mNotice-fixWidth' title='纽约'>纽约</span><span class='mNotice-normal mNotice-fixWidth' title='洛杉矶(美国)'>洛杉矶(美国)</span><span class='mNotice-normal mNotice-fixWidth' title='东京'>东京</span><span class='mNotice-normal mNotice-fixWidth' title='大阪'>大阪</span><span class='mNotice-normal mNotice-fixWidth' title='雅加达'>雅加达</span><span class='mNotice-normal mNotice-fixWidth' title='巴厘岛'>巴厘岛</span><span class='mNotice-normal mNotice-fixWidth' title='普吉岛'>普吉岛</span><span class='mNotice-normal mNotice-fixWidth' title='河内'>河内</span><span class='mNotice-normal mNotice-fixWidth' title='马累'>马累</span></div>",
    "<div class='mNotice-mTab-content clearfix'><span class='mNotice-normal mNotice-fixWidth' title='上海'>上海</span><span class='mNotice-normal mNotice-fixWidth' title='北京'>北京</span><span class='mNotice-normal mNotice-fixWidth' title='香港'>香港</span><span class='mNotice-normal mNotice-fixWidth' title='广州'>广州</span><span class='mNotice-normal mNotice-fixWidth' title='杭州'>杭州</span><span class='mNotice-normal mNotice-fixWidth' title='厦门'>厦门</span><span class='mNotice-normal mNotice-fixWidth' title='南京'>南京</span><span class='mNotice-normal mNotice-fixWidth' title='澳门'>澳门</span><span class='mNotice-normal mNotice-fixWidth' title='成都'>成都</span><span class='mNotice-normal mNotice-fixWidth' title='青岛'>青岛</span><span class='mNotice-normal mNotice-fixWidth' title='台北'>台北</span><span class='mNotice-normal mNotice-fixWidth' title='福州'>福州</span><span class='mNotice-normal mNotice-fixWidth' title='天津'>天津</span><span class='mNotice-normal mNotice-fixWidth' title='深圳'>深圳</span><span class='mNotice-normal mNotice-fixWidth' title='大连'>大连</span><span class='mNotice-normal mNotice-fixWidth' title='无锡'>无锡</span><span class='mNotice-normal mNotice-fixWidth' title='重庆'>重庆</span><span class='mNotice-normal mNotice-fixWidth' title='三亚'>三亚</span><span class='mNotice-normal mNotice-fixWidth' title='西安'>西安</span><span class='mNotice-normal mNotice-fixWidth' title='昆明'>昆明</span><span class='mNotice-normal mNotice-fixWidth' title='武汉'>武汉</span><span class='mNotice-normal mNotice-fixWidth' title='沈阳'>沈阳</span></div>",
    "<div class='mNotice-mTab-content clearfix none'><span class='mNotice-normal mNotice-fixWidth' title='香港'>香港</span><span class='mNotice-normal mNotice-fixWidth' title='澳门'>澳门</span><span class='mNotice-normal mNotice-fixWidth' title='台北'>台北</span><span class='mNotice-normal mNotice-fixWidth' title='首尔'>首尔</span><span class='mNotice-normal mNotice-fixWidth' title='新加坡'>新加坡</span><span class='mNotice-normal mNotice-fixWidth' title='曼谷'>曼谷</span><span class='mNotice-normal mNotice-fixWidth' title='胡志明市'>胡志明市</span><span class='mNotice-normal mNotice-fixWidth' title='马尼拉'>马尼拉</span><span class='mNotice-normal mNotice-fixWidth' title='名古屋'>名古屋</span><span class='mNotice-normal mNotice-fixWidth' title='伦敦'>伦敦</span><span class='mNotice-normal mNotice-fixWidth' title='吉隆坡'>吉隆坡</span><span class='mNotice-normal mNotice-fixWidth' title='釜山'>釜山</span><span class='mNotice-normal mNotice-fixWidth' title='悉尼'>悉尼</span><span class='mNotice-normal mNotice-fixWidth' title='法兰克福'>法兰克福</span><span class='mNotice-normal mNotice-fixWidth' title='温哥华'>温哥华</span><span class='mNotice-normal mNotice-fixWidth' title='巴黎'>巴黎</span><span class='mNotice-normal mNotice-fixWidth' title='纽约'>纽约</span><span class='mNotice-normal mNotice-fixWidth' title='洛杉矶(美国)'>洛杉矶(美国)</span><span class='mNotice-normal mNotice-fixWidth' title='东京'>东京</span><span class='mNotice-normal mNotice-fixWidth' title='大阪'>大阪</span><span class='mNotice-normal mNotice-fixWidth' title='雅加达'>雅加达</span><span class='mNotice-normal mNotice-fixWidth' title='巴厘岛'>巴厘岛</span><span class='mNotice-normal mNotice-fixWidth' title='普吉岛'>普吉岛</span><span class='mNotice-normal mNotice-fixWidth' title='河内'>河内</span><span class='mNotice-normal mNotice-fixWidth' title='马累'>马累</span></div>"
];
//type:1、去、2：返,g:1:国内：2：国外
function GetMenuData(g,type){
    var html="<iframe style='z-index: -1; opacity: 0; border: medium none; position: absolute; height: 199px; width: 410px;'></iframe>";
    html+="<div class='mNotice-mTab'>";
    html+="<h4 class='mNotice-mTab-head'>热门城市<span class='mNotice-mTab-head-remark'>（可直接选择城市或输入城市中文/拼音/英文）</span><span class=\"mNotice-close white\"></span></h4>";
    html+="<div class='mNotice-mTab-wrap'>";
    html+="<ul class='mNotice-mTab-tab-tray clearfix'>";
    if(g==1){
        $.each(menu_Data.datas,function(i,n){
            if(i==0)
                html+="<li class=\"mNotice-mTab-item current\">"+n+"</li>";
            else
                html+="<li class=\"mNotice-mTab-item\">"+n+"</li>";
        });
    }else{
        $.each(menu_Data.data,function(i,n){
            if(type==1){
                if(i==0)
                    html+="<li class=\"mNotice-mTab-item current\">"+n+"</li>";
                else
                    html+="<li class=\"mNotice-mTab-item\">"+n+"</li>";
            }else{
                if(i==1)
                    html+="<li class=\"mNotice-mTab-item current\">"+n+"</li>";
                else
                    html+="<li class=\"mNotice-mTab-item\">"+n+"</li>";
            }
        });
    }
    html+="</ul>";

    if(g==2){
        if(type==1){
            html+=mneuChilder[2];
            html+=mneuChilder[3];
        }else if(type==2){
            html+=mneuChilder[0];
            html+=mneuChilder[1];
        }

        html+="<div class='mNotice-mTab-content clearfix none'><span class='mNotice-normal mNotice-fixWidth' title='伦敦'>伦敦</span><span class='mNotice-normal mNotice-fixWidth' title='法兰克福'>法兰克福</span><span class='mNotice-normal mNotice-fixWidth' title='巴黎'>巴黎</span><span class='mNotice-normal mNotice-fixWidth' title='莫斯科'>莫斯科</span><span class='mNotice-normal mNotice-fixWidth' title='罗马(意大利)'>罗马(意大利)</span><span class='mNotice-normal mNotice-fixWidth' title='阿姆斯特丹'>阿姆斯特丹</span><span class='mNotice-normal mNotice-fixWidth' title='米兰'>米兰</span><span class='mNotice-normal mNotice-fixWidth' title='慕尼黑'>慕尼黑</span><span class='mNotice-normal mNotice-fixWidth' title='斯德哥尔摩'>斯德哥尔摩</span><span class='mNotice-normal mNotice-fixWidth' title='柏林(德国)'>柏林(德国)</span><span class='mNotice-normal mNotice-fixWidth' title='马德里'>马德里</span><span class='mNotice-normal mNotice-fixWidth' title='苏黎世'>苏黎世</span><span class='mNotice-normal mNotice-fixWidth' title='哥本哈根'>哥本哈根</span><span class='mNotice-normal mNotice-fixWidth' title='赫尔辛基'>赫尔辛基</span><span class='mNotice-normal mNotice-fixWidth' title='维也纳'>维也纳</span><span class='mNotice-normal mNotice-fixWidth' title='巴塞罗那(西班牙)'>巴塞罗那(西班牙)</span><span class='mNotice-normal mNotice-fixWidth' title='雅典'>雅典</span><span class='mNotice-normal mNotice-fixWidth' title='爱丁堡'>爱丁堡</span><span class='mNotice-normal mNotice-fixWidth' title='伯明翰(英国)'>伯明翰(英国)</span><span class='mNotice-normal mNotice-fixWidth' title='纽卡斯尔(英国)'>纽卡斯尔(英国)</span><span class='mNotice-normal mNotice-fixWidth' title='日内瓦'>日内瓦</span><span class='mNotice-normal mNotice-fixWidth' title='圣彼得堡'>圣彼得堡</span><span class='mNotice-normal mNotice-fixWidth' title='格拉斯哥(英国)'>格拉斯哥(英国)</span><span class='mNotice-normal mNotice-fixWidth' title='基辅(乌克兰)'>基辅(乌克兰)</span><span class='mNotice-normal mNotice-fixWidth' title='布达佩斯'>布达佩斯</span><span class='mNotice-normal mNotice-fixWidth' title='汉堡'>汉堡</span><span class='mNotice-normal mNotice-fixWidth' title='布拉格'>布拉格</span><span class='mNotice-normal mNotice-fixWidth' title='杜塞尔多夫'>杜塞尔多夫</span><span class='mNotice-normal mNotice-fixWidth' title='曼彻斯特(英国)'>曼彻斯特(英国)</span></div>";
        html+="<div class='mNotice-mTab-content clearfix none'><span class='mNotice-normal mNotice-fixWidth' title='温哥华'>温哥华</span><span class='mNotice-normal mNotice-fixWidth' title='纽约'>纽约</span><span class='mNotice-normal mNotice-fixWidth' title='洛杉矶(美国)'>洛杉矶(美国)</span><span class='mNotice-normal mNotice-fixWidth' title='巴塞罗那(委内瑞拉)'>巴塞罗那(委内瑞拉)</span><span class='mNotice-normal mNotice-fixWidth' title='伯明翰(美国)'>伯明翰(美国)</span><span class='mNotice-normal mNotice-fixWidth' title='旧金山（三藩市）'>旧金山（三藩市）</span><span class='mNotice-normal mNotice-fixWidth' title='芝加哥'>芝加哥</span><span class='mNotice-normal mNotice-fixWidth' title='多伦多'>多伦多</span><span class='mNotice-normal mNotice-fixWidth' title='西雅图'>西雅图</span><span class='mNotice-normal mNotice-fixWidth' title='华盛顿'>华盛顿</span><span class='mNotice-normal mNotice-fixWidth' title='波士顿'>波士顿</span><span class='mNotice-normal mNotice-fixWidth' title='底特律'>底特律</span><span class='mNotice-normal mNotice-fixWidth' title='亚特兰大'>亚特兰大</span><span class='mNotice-normal mNotice-fixWidth' title='休斯敦'>休斯敦</span><span class='mNotice-normal mNotice-fixWidth' title='达拉斯'>达拉斯</span><span class='mNotice-normal mNotice-fixWidth' title='费城'>费城</span><span class='mNotice-normal mNotice-fixWidth' title='圣保罗(巴西)'>圣保罗(巴西)</span><span class='mNotice-normal mNotice-fixWidth' title='渥太华'>渥太华</span><span class='mNotice-normal mNotice-fixWidth' title='墨西哥城'>墨西哥城</span><span class='mNotice-normal mNotice-fixWidth' title='拉斯维加斯'>拉斯维加斯</span><span class='mNotice-normal mNotice-fixWidth' title='卡尔加里'>卡尔加里</span><span class='mNotice-normal mNotice-fixWidth' title='迈阿密'>迈阿密</span><span class='mNotice-normal mNotice-fixWidth' title='丹佛'>丹佛</span><span class='mNotice-normal mNotice-fixWidth' title='奥兰多'>奥兰多</span><span class='mNotice-normal mNotice-fixWidth' title='波特兰(美国)'>波特兰(美国)</span><span class='mNotice-normal mNotice-fixWidth' title='曼彻斯特(美国)'>曼彻斯特(美国)</span><span class='mNotice-normal mNotice-fixWidth' title='埃德蒙顿'>埃德蒙顿</span><span class='mNotice-normal mNotice-fixWidth' title='布宜诺斯艾利斯'>布宜诺斯艾利斯</span><span class='mNotice-normal mNotice-fixWidth' title='墨尔本(美国)'>墨尔本(美国)</span><span class='mNotice-normal mNotice-fixWidth' title='明尼阿波利斯'>明尼阿波利斯</span></div>";
        html+="<div class='mNotice-mTab-content clearfix none'><span class='mNotice-normal mNotice-fixWidth' title='开罗'>开罗</span><span class='mNotice-normal mNotice-fixWidth' title='约翰内斯堡'>约翰内斯堡</span><span class='mNotice-normal mNotice-fixWidth' title='开普敦'>开普敦</span><span class='mNotice-normal mNotice-fixWidth' title='内罗毕'>内罗毕</span><span class='mNotice-normal mNotice-fixWidth' title='拉各斯'>拉各斯</span><span class='mNotice-normal mNotice-fixWidth' title='罗安达'>罗安达</span><span class='mNotice-normal mNotice-fixWidth' title='毛里求斯'>毛里求斯</span><span class='mNotice-normal mNotice-fixWidth' title='喀土穆'>喀土穆</span><span class='mNotice-normal mNotice-fixWidth' title='阿克拉(加纳)'>阿克拉(加纳)</span><span class='mNotice-normal mNotice-fixWidth' title='阿尔及尔'>阿尔及尔</span><span class='mNotice-normal mNotice-fixWidth' title='德班'>德班</span><span class='mNotice-normal mNotice-fixWidth' title='突尼斯'>突尼斯</span><span class='mNotice-normal mNotice-fixWidth' title='卢萨卡'>卢萨卡</span><span class='mNotice-normal mNotice-fixWidth' title='哈拉雷'>哈拉雷</span><span class='mNotice-normal mNotice-fixWidth' title='雅温得'>雅温得</span><span class='mNotice-normal mNotice-fixWidth' title='哈博罗内'>哈博罗内</span><span class='mNotice-normal mNotice-fixWidth' title='金沙萨'>金沙萨</span><span class='mNotice-normal mNotice-fixWidth' title='马普托'>马普托</span><span class='mNotice-normal mNotice-fixWidth' title='杜阿拉'>杜阿拉</span><span class='mNotice-normal mNotice-fixWidth' title='费里敦'>费里敦</span><span class='mNotice-normal mNotice-fixWidth' title='阿比让'>阿比让</span><span class='mNotice-normal mNotice-fixWidth' title='卢克索  '>卢克索 </span><span class='mNotice-normal mNotice-fixWidth' title='达累斯萨拉姆'>达累斯萨拉姆</span><span class='mNotice-normal mNotice-fixWidth' title='卡萨布兰卡'>卡萨布兰卡</span><span class='mNotice-normal mNotice-fixWidth' title='亚的斯亚贝巴'>亚的斯亚贝巴</span></div>";
        html+="<div class='mNotice-mTab-content clearfix none'><span class='mNotice-normal mNotice-fixWidth' title='悉尼'>悉尼</span><span class='mNotice-normal mNotice-fixWidth' title='纽卡斯尔(澳大利亚)'>纽卡斯尔(澳大利亚)</span><span class='mNotice-normal mNotice-fixWidth' title='墨尔本(澳大利亚)'>墨尔本(澳大利亚)</span><span class='mNotice-normal mNotice-fixWidth' title='奥克兰(新西兰)'>奥克兰(新西兰)</span><span class='mNotice-normal mNotice-fixWidth' title='布里斯班'>布里斯班</span><span class='mNotice-normal mNotice-fixWidth' title='阿德莱德'>阿德莱德</span><span class='mNotice-normal mNotice-fixWidth' title='珀斯'>珀斯</span><span class='mNotice-normal mNotice-fixWidth' title='惠灵顿'>惠灵顿</span><span class='mNotice-normal mNotice-fixWidth' title='堪培拉'>堪培拉</span><span class='mNotice-normal mNotice-fixWidth' title='凯恩斯'>凯恩斯</span><span class='mNotice-normal mNotice-fixWidth' title='楠迪'>楠迪</span><span class='mNotice-normal mNotice-fixWidth' title='黄金海岸'>黄金海岸</span><span class='mNotice-normal mNotice-fixWidth' title='帕皮堤'>帕皮堤</span><span class='mNotice-normal mNotice-fixWidth' title='霍巴特'>霍巴特</span><span class='mNotice-normal mNotice-fixWidth' title='达尔文'>达尔文</span><span class='mNotice-normal mNotice-fixWidth' title='达尼丁'>达尼丁</span></div>";
        html+="<div class='mNotice-mTab-content clearfix none'><span class='mNotice-normal mNotice-fixWidth' title='香港'>香港</span><span class='mNotice-normal mNotice-fixWidth' title='澳门'>澳门</span><span class='mNotice-normal mNotice-fixWidth' title='台北'>台北</span><span class='mNotice-normal mNotice-fixWidth' title='首尔'>首尔</span><span class='mNotice-normal mNotice-fixWidth' title='新加坡'>新加坡</span><span class='mNotice-normal mNotice-fixWidth' title='曼谷'>曼谷</span><span class='mNotice-normal mNotice-fixWidth' title='胡志明市'>胡志明市</span><span class='mNotice-normal mNotice-fixWidth' title='马尼拉'>马尼拉</span><span class='mNotice-normal mNotice-fixWidth' title='名古屋'>名古屋</span><span class='mNotice-normal mNotice-fixWidth' title='吉隆坡'>吉隆坡</span><span class='mNotice-normal mNotice-fixWidth' title='釜山'>釜山</span><span class='mNotice-normal mNotice-fixWidth' title='东京'>东京</span><span class='mNotice-normal mNotice-fixWidth' title='大阪'>大阪</span><span class='mNotice-normal mNotice-fixWidth' title='雅加达'>雅加达</span><span class='mNotice-normal mNotice-fixWidth' title='巴厘岛'>巴厘岛</span><span class='mNotice-normal mNotice-fixWidth' title='普吉岛'>普吉岛</span><span class='mNotice-normal mNotice-fixWidth' title='河内'>河内</span><span class='mNotice-normal mNotice-fixWidth' title='马累'>马累</span><span class='mNotice-normal mNotice-fixWidth' title='迪拜'>迪拜</span><span class='mNotice-normal mNotice-fixWidth' title='加德满都'>加德满都</span><span class='mNotice-normal mNotice-fixWidth' title='高雄'>高雄</span><span class='mNotice-normal mNotice-fixWidth' title='福冈'>福冈</span><span class='mNotice-normal mNotice-fixWidth' title='金边'>金边</span><span class='mNotice-normal mNotice-fixWidth' title='伊斯坦布尔'>伊斯坦布尔</span><span class='mNotice-normal mNotice-fixWidth' title='乌兰巴托'>乌兰巴托</span><span class='mNotice-normal mNotice-fixWidth' title='孟买'>孟买</span><span class='mNotice-normal mNotice-fixWidth' title='济州'>济州</span></div></div></div>";
    }else if(g==1){
        html+="<div class='mNotice-mTab-content clearfix'><span class='mNotice-normal mNotice-fixWidth' title='上海'>上海</span><span class='mNotice-normal mNotice-fixWidth' title='上海虹桥'>上海虹桥</span><span class='mNotice-normal mNotice-fixWidth' title='上海浦东'>上海浦东</span><span class='mNotice-normal mNotice-fixWidth' title='北京'>北京</span><span class='mNotice-normal mNotice-fixWidth' title='北京首都'>北京首都</span><span class='mNotice-normal mNotice-fixWidth' title='北京南苑'>北京南苑</span><span class='mNotice-normal mNotice-fixWidth' title='深圳'>深圳</span><span class='mNotice-normal mNotice-fixWidth' title='杭州'>杭州</span><span class='mNotice-normal mNotice-fixWidth' title='广州'>广州</span><span class='mNotice-normal mNotice-fixWidth' title='成都'>成都</span><span class='mNotice-normal mNotice-fixWidth' title='南京'>南京</span><span class='mNotice-normal mNotice-fixWidth' title='武汉'>武汉</span><span class='mNotice-normal mNotice-fixWidth' title='呼和浩特'>呼和浩特</span><span class='mNotice-normal mNotice-fixWidth' title='重庆'>重庆</span><span class='mNotice-normal mNotice-fixWidth' title='长沙'>长沙</span><span class='mNotice-normal mNotice-fixWidth' title='昆明'>昆明</span><span class='mNotice-normal mNotice-fixWidth' title='西安'>西安</span><span class='mNotice-normal mNotice-fixWidth' title='青岛'>青岛</span><span class='mNotice-normal mNotice-fixWidth' title='天津'>天津</span><span class='mNotice-normal mNotice-fixWidth' title='宁波'>宁波</span><span class='mNotice-normal mNotice-fixWidth' title='厦门'>厦门</span><span class='mNotice-normal mNotice-fixWidth' title='太原'>太原</span><span class='mNotice-normal mNotice-fixWidth' title='大连'>大连</span><span class='mNotice-normal mNotice-fixWidth' title='济南'>济南</span><span class='mNotice-normal mNotice-fixWidth' title='三亚'>三亚</span></div>";
        html+="<div class='mNotice-mTab-content none'><dl class='clearfix mNotice-block'><dt class='mNotice-title'>A</dt><dd class='mNotice-def'><span class='mNotice-normal mNotice-fixWidth' title='安顺'>安顺</span><span class='mNotice-normal mNotice-fixWidth' title='安庆'>安庆</span><span class='mNotice-normal mNotice-fixWidth' title='阿克苏'>阿克苏</span><span class='mNotice-normal mNotice-fixWidth' title='阿尔山'>阿尔山</span><span class='mNotice-normal mNotice-fixWidth' title='鞍山'>鞍山</span><span class='mNotice-normal mNotice-fixWidth' title='安康'>安康</span><span class='mNotice-normal mNotice-fixWidth' title='阿勒泰'>阿勒泰</span><span class='mNotice-normal mNotice-fixWidth' title='阿里'>阿里</span><span class='mNotice-normal mNotice-fixWidth' title='阿拉善右旗'>阿拉善右旗</span></dd></dl><dl class='clearfix mNotice-block'>";
        html+="<dt class='mNotice-title'>B</dt><dd class='mNotice-def'><span class='mNotice-normal mNotice-fixWidth' title='北京'>北京</span><span class='mNotice-normal mNotice-fixWidth' title='北京首都'>北京首都</span><span class='mNotice-normal mNotice-fixWidth' title='北京南苑'>北京南苑</span><span class='mNotice-normal mNotice-fixWidth' title='北海'>北海</span><span class='mNotice-normal mNotice-fixWidth' title='包头'>包头</span><span class='mNotice-normal mNotice-fixWidth' title='巴彦淖尔'>巴彦淖尔</span><span class='mNotice-normal mNotice-fixWidth' title='博乐'>博乐</span><span class='mNotice-normal mNotice-fixWidth' title='蚌埠'>蚌埠</span><span class='mNotice-normal mNotice-fixWidth' title='保山'>保山</span><span class='mNotice-normal mNotice-fixWidth' title='百色'>百色</span><span class='mNotice-normal mNotice-fixWidth' title='毕节'>毕节</span></dd>";
        html+="</dl><dl class='clearfix mNotice-block'><dt class='mNotice-title'>C</dt><dd class='mNotice-def'><span class='mNotice-normal mNotice-fixWidth' title='成都'>成都</span><span class='mNotice-normal mNotice-fixWidth' title='重庆'>重庆</span><span class='mNotice-normal mNotice-fixWidth' title='长沙'>长沙</span><span class='mNotice-normal mNotice-fixWidth' title='池州'>池州</span><span class='mNotice-normal mNotice-fixWidth' title='常州'>常州</span><span class='mNotice-normal mNotice-fixWidth' title='长春'>长春</span><span class='mNotice-normal mNotice-fixWidth' title='常德'>常德</span><span class='mNotice-normal mNotice-fixWidth' title='长治'>长治</span><span class='mNotice-normal mNotice-fixWidth' title='朝阳'>朝阳</span><span class='mNotice-normal mNotice-fixWidth' title='赤峰'>赤峰</span><span class='mNotice-normal mNotice-fixWidth' title='昌都'>昌都</span><span class='mNotice-normal mNotice-fixWidth' title='长白山'>长白山</span></dd>";
        html+="</dl><dl class='clearfix mNotice-block'><dt class='mNotice-title'>D</dt><dd class='mNotice-def'><span class='mNotice-normal mNotice-fixWidth' title='大连'>大连</span><span class='mNotice-normal mNotice-fixWidth' title='大同'>大同</span><span class='mNotice-normal mNotice-fixWidth' title='稻城'>稻城</span><span class='mNotice-normal mNotice-fixWidth' title='东莞'>东莞</span><span class='mNotice-normal mNotice-fixWidth' title='敦煌'>敦煌</span><span class='mNotice-normal mNotice-fixWidth' title='丹东'>丹东</span><span class='mNotice-normal mNotice-fixWidth' title='大理'>大理</span><span class='mNotice-normal mNotice-fixWidth' title='东营'>东营</span><span class='mNotice-normal mNotice-fixWidth' title='迪庆'>迪庆</span><span class='mNotice-normal mNotice-fixWidth' title='达州'>达州</span><span class='mNotice-normal mNotice-fixWidth' title='大庆'>大庆</span></dd>";
        html+="</dl><dl class='clearfix mNotice-block'><dt class='mNotice-title'>E</dt><dd class='mNotice-def'><span class='mNotice-normal mNotice-fixWidth' title='恩施'>恩施</span><span class='mNotice-normal mNotice-fixWidth' title='鄂尔多斯'>鄂尔多斯</span><span class='mNotice-normal mNotice-fixWidth' title='额济纳'>额济纳</span><span class='mNotice-normal mNotice-fixWidth' title='二连浩特'>二连浩特</span></dd>";
        html+="</dl><dl class='clearfix mNotice-block'><dt class='mNotice-title'>F</dt><dd class='mNotice-def'><span class='mNotice-normal mNotice-fixWidth' title='福州'>福州</span><span class='mNotice-normal mNotice-fixWidth' title='抚远'>抚远</span><span class='mNotice-normal mNotice-fixWidth' title='富蕴'>富蕴</span><span class='mNotice-normal mNotice-fixWidth' title='阜阳'>阜阳</span><span class='mNotice-normal mNotice-fixWidth' title='佛山'>佛山</span></dd>";
        html+="</dl></div><div class='mNotice-mTab-content none'><dl class='clearfix mNotice-block'><dt class='mNotice-title'>G</dt><dd class='mNotice-def'><span class='mNotice-normal mNotice-fixWidth' title='广州'>广州</span><span class='mNotice-normal mNotice-fixWidth' title='贵阳'>贵阳</span><span class='mNotice-normal mNotice-fixWidth' title='桂林'>桂林</span><span class='mNotice-normal mNotice-fixWidth' title='格尔木'>格尔木</span><span class='mNotice-normal mNotice-fixWidth' title='赣州'>赣州</span><span class='mNotice-normal mNotice-fixWidth' title='固原'>固原</span><span class='mNotice-normal mNotice-fixWidth' title='广元'>广元</span></dd></dl>";
        html+="<dl class='clearfix mNotice-block'><dt class='mNotice-title'>H</dt><dd class='mNotice-def'><span class='mNotice-normal mNotice-fixWidth' title='杭州'>杭州</span><span class='mNotice-normal mNotice-fixWidth' title='呼和浩特'>呼和浩特</span><span class='mNotice-normal mNotice-fixWidth' title='合肥'>合肥</span><span class='mNotice-normal mNotice-fixWidth' title='哈尔滨'>哈尔滨</span><span class='mNotice-normal mNotice-fixWidth' title='邯郸'>邯郸</span><span class='mNotice-normal mNotice-fixWidth' title='海口'>海口</span><span class='mNotice-normal mNotice-fixWidth' title='怀化'>怀化</span><span class='mNotice-normal mNotice-fixWidth' title='汉中'>汉中</span><span class='mNotice-normal mNotice-fixWidth' title='海拉尔'>海拉尔</span><span class='mNotice-normal mNotice-fixWidth' title='惠州'>惠州</span><span class='mNotice-normal mNotice-fixWidth' title='和田'>和田</span><span class='mNotice-normal mNotice-fixWidth' title='衡阳'>衡阳</span><span class='mNotice-normal mNotice-fixWidth' title='黄山'>黄山</span><span class='mNotice-normal mNotice-fixWidth' title='湖州'>湖州</span><span class='mNotice-normal mNotice-fixWidth' title='黄岩'>黄岩</span><span class='mNotice-normal mNotice-fixWidth' title='淮安'>淮安</span><span class='mNotice-normal mNotice-fixWidth' title='黑河'>黑河</span><span class='mNotice-normal mNotice-fixWidth' title='哈密'>哈密</span><span class='mNotice-normal mNotice-fixWidth' title='红原'>红原</span></dd>";
        html+="</dl><dl class='clearfix mNotice-block'><dt class='mNotice-title'>J</dt><dd class='mNotice-def'><span class='mNotice-normal mNotice-fixWidth' title='济南'>济南</span><span class='mNotice-normal mNotice-fixWidth' title='揭阳'>揭阳</span><span class='mNotice-normal mNotice-fixWidth' title='酒泉'>酒泉</span><span class='mNotice-normal mNotice-fixWidth' title='嘉峪关'>嘉峪关</span><span class='mNotice-normal mNotice-fixWidth' title='九江'>九江</span><span class='mNotice-normal mNotice-fixWidth' title='井冈山'>井冈山</span><span class='mNotice-normal mNotice-fixWidth' title='景德镇'>景德镇</span><span class='mNotice-normal mNotice-fixWidth' title='九寨沟'>九寨沟</span><span class='mNotice-normal mNotice-fixWidth' title='济宁'>济宁</span><span class='mNotice-normal mNotice-fixWidth' title='九华山'>九华山</span><span class='mNotice-normal mNotice-fixWidth' title='晋江'>晋江</span><span class='mNotice-normal mNotice-fixWidth' title='江阴'>江阴</span><span class='mNotice-normal mNotice-fixWidth' title='嘉兴'>嘉兴</span><span class='mNotice-normal mNotice-fixWidth' title='金昌'>金昌</span><span class='mNotice-normal mNotice-fixWidth' title='鸡西'>鸡西</span><span class='mNotice-normal mNotice-fixWidth' title='锦州'>锦州</span><span class='mNotice-normal mNotice-fixWidth' title='吉林'>吉林</span><span class='mNotice-normal mNotice-fixWidth' title='佳木斯'>佳木斯</span></dd>";
        html+="</dl><dl class='clearfix mNotice-block'><dt class='mNotice-title'>K</dt><dd class='mNotice-def'><span class='mNotice-normal mNotice-fixWidth' title='昆明'>昆明</span><span class='mNotice-normal mNotice-fixWidth' title='库车'>库车</span><span class='mNotice-normal mNotice-fixWidth' title='库尔勒'>库尔勒</span><span class='mNotice-normal mNotice-fixWidth' title='昆山'>昆山</span><span class='mNotice-normal mNotice-fixWidth' title='康定'>康定</span><span class='mNotice-normal mNotice-fixWidth' title='喀纳斯'>喀纳斯</span><span class='mNotice-normal mNotice-fixWidth' title='喀什'>喀什</span><span class='mNotice-normal mNotice-fixWidth' title='克拉玛依'>克拉玛依</span></dd>";
        html+="</dl><dl class='clearfix mNotice-block'><dt class='mNotice-title'>L</dt><dd class='mNotice-def'><span class='mNotice-normal mNotice-fixWidth' title='柳州'>柳州</span><span class='mNotice-normal mNotice-fixWidth' title='兰州'>兰州</span><span class='mNotice-normal mNotice-fixWidth' title='连云港'>连云港</span><span class='mNotice-normal mNotice-fixWidth' title='临沂'>临沂</span><span class='mNotice-normal mNotice-fixWidth' title='吕梁'>吕梁</span><span class='mNotice-normal mNotice-fixWidth' title='连城'>连城</span><span class='mNotice-normal mNotice-fixWidth' title='泸州'>泸州</span><span class='mNotice-normal mNotice-fixWidth' title='庐山'>庐山</span><span class='mNotice-normal mNotice-fixWidth' title='龙岩'>龙岩</span><span class='mNotice-normal mNotice-fixWidth' title='黎平'>黎平</span><span class='mNotice-normal mNotice-fixWidth' title='林芝'>林芝</span><span class='mNotice-normal mNotice-fixWidth' title='临沧'>临沧</span><span class='mNotice-normal mNotice-fixWidth' title='荔波'>荔波</span><span class='mNotice-normal mNotice-fixWidth' title='丽江'>丽江</span><span class='mNotice-normal mNotice-fixWidth' title='拉萨'>拉萨</span><span class='mNotice-normal mNotice-fixWidth' title='洛阳'>洛阳</span></dd>";
        html+="</dl></div><div class='mNotice-mTab-content none'><dl class='clearfix mNotice-block'><dt class='mNotice-title'>M</dt><dd class='mNotice-def'><span class='mNotice-normal mNotice-fixWidth' title='梅县'>梅县</span><span class='mNotice-normal mNotice-fixWidth' title='牡丹江'>牡丹江</span><span class='mNotice-normal mNotice-fixWidth' title='绵阳'>绵阳</span><span class='mNotice-normal mNotice-fixWidth' title='漠河'>漠河</span><span class='mNotice-normal mNotice-fixWidth' title='满洲里'>满洲里</span><span class='mNotice-normal mNotice-fixWidth' title='芒市'>芒市</span></dd>";
        html+="</dl><dl class='clearfix mNotice-block'><dt class='mNotice-title'>N</dt><dd class='mNotice-def'><span class='mNotice-normal mNotice-fixWidth' title='南京'>南京</span><span class='mNotice-normal mNotice-fixWidth' title='宁波'>宁波</span><span class='mNotice-normal mNotice-fixWidth' title='南宁'>南宁</span><span class='mNotice-normal mNotice-fixWidth' title='南阳'>南阳</span><span class='mNotice-normal mNotice-fixWidth' title='南昌'>南昌</span><span class='mNotice-normal mNotice-fixWidth' title='南通'>南通</span><span class='mNotice-normal mNotice-fixWidth' title='南海'>南海</span><span class='mNotice-normal mNotice-fixWidth' title='那拉提'>那拉提</span><span class='mNotice-normal mNotice-fixWidth' title='南充'>南充</span></dd>";
        html+="</dl><dl class='clearfix mNotice-block'><dt class='mNotice-title'>P</dt><dd class='mNotice-def'><span class='mNotice-normal mNotice-fixWidth' title='攀枝花'>攀枝花</span><span class='mNotice-normal mNotice-fixWidth' title='普洱'>普洱</span></dd>";
        html+="</dl><dl class='clearfix mNotice-block'><dt class='mNotice-title'>Q</dt><dd class='mNotice-def'><span class='mNotice-normal mNotice-fixWidth' title='青岛'>青岛</span><span class='mNotice-normal mNotice-fixWidth' title='泉州'>泉州</span><span class='mNotice-normal mNotice-fixWidth' title='齐齐哈尔'>齐齐哈尔</span><span class='mNotice-normal mNotice-fixWidth' title='秦皇岛'>秦皇岛</span><span class='mNotice-normal mNotice-fixWidth' title='黔江'>黔江</span><span class='mNotice-normal mNotice-fixWidth' title='庆阳'>庆阳</span><span class='mNotice-normal mNotice-fixWidth' title='且末'>且末</span><span class='mNotice-normal mNotice-fixWidth' title='衢州'>衢州</span></dd>";
        html+="</dl><dl class='clearfix mNotice-block'><dt class='mNotice-title'>R</dt><dd class='mNotice-def'><span class='mNotice-normal mNotice-fixWidth' title='日喀则'>日喀则</span></dd></dl><dl class='clearfix mNotice-block'><dt class='mNotice-title'>S</dt><dd class='mNotice-def'><span class='mNotice-normal mNotice-fixWidth' title='上海'>上海</span><span class='mNotice-normal mNotice-fixWidth' title='上海虹桥'>上海虹桥</span><span class='mNotice-normal mNotice-fixWidth' title='上海浦东'>上海浦东</span><span class='mNotice-normal mNotice-fixWidth' title='深圳'>深圳</span><span class='mNotice-normal mNotice-fixWidth' title='三亚'>三亚</span><span class='mNotice-normal mNotice-fixWidth' title='汕头'>汕头</span><span class='mNotice-normal mNotice-fixWidth' title='沈阳'>沈阳</span><span class='mNotice-normal mNotice-fixWidth' title='石家庄'>石家庄</span><span class='mNotice-normal mNotice-fixWidth' title='绍兴'>绍兴</span><span class='mNotice-normal mNotice-fixWidth' title='鄯善'>鄯善</span><span class='mNotice-normal mNotice-fixWidth' title='沙市'>沙市</span><span class='mNotice-normal mNotice-fixWidth' title='苏州'>苏州</span></dd>";
        html+="</dl></div><div class='mNotice-mTab-content none'><dl class='clearfix mNotice-block'><dt class='mNotice-title'>T</dt><dd class='mNotice-def'><span class='mNotice-normal mNotice-fixWidth' title='天津'>天津</span><span class='mNotice-normal mNotice-fixWidth' title='太原'>太原</span><span class='mNotice-normal mNotice-fixWidth' title='通辽'>通辽</span><span class='mNotice-normal mNotice-fixWidth' title='吐鲁番'>吐鲁番</span><span class='mNotice-normal mNotice-fixWidth' title='通化'>通化</span><span class='mNotice-normal mNotice-fixWidth' title='天水'>天水</span><span class='mNotice-normal mNotice-fixWidth' title='腾冲'>腾冲</span><span class='mNotice-normal mNotice-fixWidth' title='唐山'>唐山</span><span class='mNotice-normal mNotice-fixWidth' title='台州'>台州</span><span class='mNotice-normal mNotice-fixWidth' title='铜仁'>铜仁</span></dd>";
        html+="</dl><dl class='clearfix mNotice-block'><dt class='mNotice-title'>W</dt><dd class='mNotice-def'><span class='mNotice-normal mNotice-fixWidth' title='武汉'>武汉</span><span class='mNotice-normal mNotice-fixWidth' title='梧州'>梧州</span><span class='mNotice-normal mNotice-fixWidth' title='武夷山'>武夷山</span><span class='mNotice-normal mNotice-fixWidth' title='无锡'>无锡</span><span class='mNotice-normal mNotice-fixWidth' title='潍坊'>潍坊</span><span class='mNotice-normal mNotice-fixWidth' title='芜湖'>芜湖</span><span class='mNotice-normal mNotice-fixWidth' title='乌海'>乌海</span><span class='mNotice-normal mNotice-fixWidth' title='文山'>文山</span><span class='mNotice-normal mNotice-fixWidth' title='万州'>万州</span><span class='mNotice-normal mNotice-fixWidth' title='威海'>威海</span><span class='mNotice-normal mNotice-fixWidth' title='温州'>温州</span><span class='mNotice-normal mNotice-fixWidth' title='乌鲁木齐'>乌鲁木齐</span><span class='mNotice-normal mNotice-fixWidth' title='乌兰浩特'>乌兰浩特</span></dd>";
        html+="</dl><dl class='clearfix mNotice-block'><dt class='mNotice-title'>X</dt><dd class='mNotice-def'><span class='mNotice-normal mNotice-fixWidth' title='西安'>西安</span><span class='mNotice-normal mNotice-fixWidth' title='厦门'>厦门</span><span class='mNotice-normal mNotice-fixWidth' title='襄阳'>襄阳</span><span class='mNotice-normal mNotice-fixWidth' title='徐州'>徐州</span><span class='mNotice-normal mNotice-fixWidth' title='西宁'>西宁</span><span class='mNotice-normal mNotice-fixWidth' title='夏河'>夏河</span><span class='mNotice-normal mNotice-fixWidth' title='兴义'>兴义</span><span class='mNotice-normal mNotice-fixWidth' title='邢台'>邢台</span><span class='mNotice-normal mNotice-fixWidth' title='兴城'>兴城</span><span class='mNotice-normal mNotice-fixWidth' title='锡林浩特'>锡林浩特</span><span class='mNotice-normal mNotice-fixWidth' title='西昌'>西昌</span><span class='mNotice-normal mNotice-fixWidth' title='西双版纳'>西双版纳</span></dd></dl>";
        html+="<dl class='clearfix mNotice-block'><dt class='mNotice-title'>Y</dt><dd class='mNotice-def'><span class='mNotice-normal mNotice-fixWidth' title='宜昌'>宜昌</span><span class='mNotice-normal mNotice-fixWidth' title='盐城'>盐城</span><span class='mNotice-normal mNotice-fixWidth' title='延吉'>延吉</span><span class='mNotice-normal mNotice-fixWidth' title='宜宾'>宜宾</span><span class='mNotice-normal mNotice-fixWidth' title='延安'>延安</span><span class='mNotice-normal mNotice-fixWidth' title='运城'>运城</span><span class='mNotice-normal mNotice-fixWidth' title='烟台'>烟台</span><span class='mNotice-normal mNotice-fixWidth' title='银川'>银川</span><span class='mNotice-normal mNotice-fixWidth' title='宜春'>宜春</span><span class='mNotice-normal mNotice-fixWidth' title='扬州'>扬州</span><span class='mNotice-normal mNotice-fixWidth' title='玉树'>玉树</span><span class='mNotice-normal mNotice-fixWidth' title='榆林'>榆林</span><span class='mNotice-normal mNotice-fixWidth' title='元谋'>元谋</span><span class='mNotice-normal mNotice-fixWidth' title='伊宁'>伊宁</span><span class='mNotice-normal mNotice-fixWidth' title='伊春'>伊春</span><span class='mNotice-normal mNotice-fixWidth' title='义乌'>义乌</span><span class='mNotice-normal mNotice-fixWidth' title='永州'>永州</span></dd>";
        html+="</dl><dl class='clearfix mNotice-block'><dt class='mNotice-title'>Z</dt><dd class='mNotice-def'><span class='mNotice-normal mNotice-fixWidth' title='珠海'>珠海</span><span class='mNotice-normal mNotice-fixWidth' title='湛江'>湛江</span><span class='mNotice-normal mNotice-fixWidth' title='郑州'>郑州</span><span class='mNotice-normal mNotice-fixWidth' title='张家口'>张家口</span><span class='mNotice-normal mNotice-fixWidth' title='遵义'>遵义</span><span class='mNotice-normal mNotice-fixWidth' title='张掖'>张掖</span><span class='mNotice-normal mNotice-fixWidth' title='昭通'>昭通</span><span class='mNotice-normal mNotice-fixWidth' title='舟山'>舟山</span><span class='mNotice-normal mNotice-fixWidth' title='张家界'>张家界</span><span class='mNotice-normal mNotice-fixWidth' title='镇江'>镇江</span></dd></dl></div>";
    }
    return html;
}
//菜单列表
function GetMenuDataList(){
    var html="<iframe style='z-index: -1; opacity: 0; border: medium none; position: absolute; height: 216px; width: 360px;'></iframe>";
    html+="<div class='mNotice-mTab mNotice-mTabs'><h4 class='mNotice-mTab-head'>热门目的地<span class='mNotice-mTab-head-remark'>(可直接输入城市或城市拼音)</span></h4>";
    html+="<div id='mNotice-mTab-hotelCity2' class='mNotice-mTab-wrap'>";
    html+="<div class='mNotice-mTab-content' id='cityhot2'>";
    for(var i= 0,menu_length=searchlist.changxianyouMenu.length;i<menu_length;i++){
        html+="<dl class='clearfix mNotice-block'><dt class='mNotice-title'>"+searchlist.changxianyouMenu[i]+"</dt><dd class='mNotice-def'>";
        for(var j= 0,menu_child_length=searchlist.changxianyouMenuChild[i].length;j<menu_child_length;j++){
            var value=searchlist.changxianyouMenuChild[i][j][1];
            html+="<span class=\"mNotice-normal\" title="+value+">"+value+"</span>";
        }
        html+="</dd></dl>";
    }
    html+="</div>";
    html+="</div>";
    html+="</div>";
    return html;
}
//自由行列表
function GetMenuDataZiYou(){
    var html="<iframe style='z-index: -1; opacity: 0; border: medium none; position: absolute; height: 139px; width: 360px;'></iframe>"
    +"<div class='iv_notice iv_start_notice'>"
    +"<div class='iv_notice_title'>出发地<span></span></div>"
    +"<div class='iv_notice_con'>"
    +"<ul class='iv_notice_tab mNotice-mTab-tab-tray'>"
    +"<li class='current'>热门</li><li class=''>ABCDEF</li><li class=''>GHJKLM</li><li class=''>NPQRS</li><li class=''>TWXYZ</li></ul>"
    +"<div class='iv_notice_tab_con mNotice-mTab-content'><a href='javascript:void(0)' title='上海' target='_self' class='mNotice-normal'>上海</a><a href='javascript:void(0)' title='北京' target='_self' class='mNotice-normal'>北京</a><a href='javascript:void(0)' title='广州' target='_self' class='mNotice-normal'>广州</a><a href='javascript:void(0)' title='杭州' target='_self' class='mNotice-normal'>杭州</a><a href='javascript:void(0)' title='南京' target='_self' class='mNotice-normal'>南京</a><a href='javascript:void(0)' title='天津' target='_self' class='mNotice-normal'>天津</a><a href='javascript:void(0)' title='成都' target='_self' class='mNotice-normal'>成都</a><a href='javascript:void(0)' title='深圳' target='_self' class='mNotice-normal'>深圳</a><a href='javascript:void(0)' title='苏州' target='_self' class='mNotice-normal'>苏州</a><a href='javascript:void(0)' title='武汉' target='_self' class='mNotice-normal'>武汉</a><a href='javascript:void(0)' title='重庆' target='_self' class='mNotice-normal'>重庆</a></div>"
    +"<div class='iv_notice_tab_con mNotice-mTab-content none'><a href='javascript:void(0)' title='北京' target='_self' class='mNotice-normal'>北京</a><a href='javascript:void(0)' title='重庆' target='_self' class='mNotice-normal'>重庆</a><a href='javascript:void(0)' title='常州' target='_self' class='mNotice-normal'>常州</a><a href='javascript:void(0)' title='成都' target='_self' class='mNotice-normal'>成都</a><a href='javascript:void(0)' title='长沙' target='_self' class='mNotice-normal'>长沙</a><a href='javascript:void(0)' title='东莞' target='_self' class='mNotice-normal'>东莞</a><a href='javascript:void(0)' title='佛山' target='_self' class='mNotice-normal'>佛山</a><a href='javascript:void(0)' title='福州' target='_self' class='mNotice-normal'>福州</a></div>"
    +"<div class='iv_notice_tab_con mNotice-mTab-content none'><a href='javascript:void(0)' title='广州' target='_self' class='mNotice-normal'>广州</a><a href='javascript:void(0)' title='合肥' target='_self' class='mNotice-normal'>合肥</a><a href='javascript:void(0)' title='哈尔滨' target='_self' class='mNotice-normal'>哈尔滨</a><a href='javascript:void(0)' title='杭州' target='_self' class='mNotice-normal'>杭州</a><a href='javascript:void(0)' title='湖州' target='_self' class='mNotice-normal'>湖州</a><a href='javascript:void(0)' title='济南' target='_self' class='mNotice-normal'>济南</a><a href='javascript:void(0)' title='嘉兴' target='_self' class='mNotice-normal'>嘉兴</a><a href='javascript:void(0)' title='金华' target='_self' class='mNotice-normal'>金华</a><a href='javascript:void(0)' title='昆明' target='_self' class='mNotice-normal'>昆明</a></div>"
    +"<div class='iv_notice_tab_con mNotice-mTab-content none'><a href='javascript:void(0)' title='南京' target='_self' class='mNotice-normal'>南京</a><a href='javascript:void(0)' title='南通' target='_self' class='mNotice-normal'>南通</a><a href='javascript:void(0)' title='宁波' target='_self' class='mNotice-normal'>宁波</a><a href='javascript:void(0)' title='青岛' target='_self' class='mNotice-normal'>青岛</a><a href='javascript:void(0)' title='上海' target='_self' class='mNotice-normal'>上海</a><a href='javascript:void(0)' title='绍兴' target='_self' class='mNotice-normal'>绍兴</a><a href='javascript:void(0)' title='深圳' target='_self' class='mNotice-normal'>深圳</a><a href='javascript:void(0)' title='苏州' target='_self' class='mNotice-normal'>苏州</a><a href='javascript:void(0)' title='沈阳' target='_self' class='mNotice-normal'>沈阳</a></div>"
    +"<div class='iv_notice_tab_con mNotice-mTab-content none'><a href='javascript:void(0)' title='台州' target='_self' class='mNotice-normal'>台州</a><a href='javascript:void(0)' title='泰州' target='_self' class='mNotice-normal'>泰州</a><a href='javascript:void(0)' title='天津' target='_self' class='mNotice-normal'>天津</a><a href='javascript:void(0)' title='温州' target='_self' class='mNotice-normal'>温州</a><a href='javascript:void(0)' title='武汉' target='_self' class='mNotice-normal'>武汉</a><a href='javascript:void(0)' title='无锡' target='_self' class='mNotice-normal'>无锡</a><a href='javascript:void(0)' title='香港' target='_self' class='mNotice-normal'>香港</a><a href='javascript:void(0)' title='厦门' target='_self' class='mNotice-normal'>厦门</a><a href='javascript:void(0)' title='西安' target='_self' class='mNotice-normal'>西安</a><a href='javascript:void(0)' title='扬州' target='_self' class='mNotice-normal'>扬州</a><a href='javascript:void(0)' title='镇江' target='_self' class='mNotice-normal'>镇江</a><a href='javascript:void(0)' title='舟山' target='_self' class='mNotice-normal'>舟山</a></div>"
    +"</div></div>";
    return html;
}
//自由行返程列表
function GetMenuDataZiYouBlack(){
    var html="<iframe style='z-index: -1; opacity: 0; border: medium none; position: absolute; height: 139px; width: 360px;'></iframe>"
        +"<div class='iv_notice iv_start_notice'>"
        +"<div class='iv_notice_title'>目的地<span>(可直接输入城市名)</span></div>"
        +"<div class='iv_notice_con'>"
        +"<ul class='iv_notice_tab mNotice-mTab-tab-tray'>"
        +"<li class='current'>热门</li><li class=''>港澳</li><li class=''>日韩</li><li class=''>泰国</li><li class=''>东南亚</li><li class=''>欧美澳</li><li class=''>海岛旅游</li></ul>"
        +"<div class='iv_notice_tab_con mNotice-mTab-content'><a href='javascript:void(0)' title='港澳' target='_self' class='mNotice-normal'>港澳</a><a href='javascript:void(0)' title='清迈' target='_self' class='mNotice-normal'>清迈</a><a href='javascript:void(0)' title='首尔' target='_self' class='mNotice-normal'>首尔</a><a href='javascript:void(0)' title='东京' target='_self' class='mNotice-normal'>东京</a><a href='javascript:void(0)' title='塞班岛' target='_self' class='mNotice-normal'>塞班岛</a><a href='javascript:void(0)' title='大阪' target='_self' class='mNotice-normal'>大阪</a><a href='javascript:void(0)' title='巴厘岛' target='_self' class='mNotice-normal'>巴厘岛</a><a href='javascript:void(0)' title='普吉岛' target='_self' class='mNotice-normal'>普吉岛</a><a href='javascript:void(0)' title='济州岛' target='_self' class='mNotice-normal'>济州岛</a><a href='javascript:void(0)' title='马尔代夫' target='_self' class='mNotice-normal'>马尔代夫</a><a href='javascript:void(0)' title='新加坡' target='_self' class='mNotice-normal'>新加坡</a><a href='javascript:void(0)' title='曼谷' target='_self' class='mNotice-normal'>曼谷</a><a href='javascript:void(0)' title='毛里求斯' target='_self' class='mNotice-normal'>毛里求斯</a><a href='javascript:void(0)' title='欧洲' target='_self' class='mNotice-normal'>欧洲</a><a href='javascript:void(0)' title='美国' target='_self' class='mNotice-normal'>美国</a><a href='javascript:void(0)' title='澳洲' target='_self' class='mNotice-normal'>澳洲</a></div>"
        +"<div class='iv_notice_tab_con mNotice-mTab-content none'><a href='javascript:void(0)' title='香港' target='_self' class='mNotice-normal'>香港</a><a href='javascript:void(0)' title='澳门' target='_self' class='mNotice-normal'>澳门</a><a href='javascript:void(0)' title='港澳' target='_self' class='mNotice-normal'>港澳</a></div>"
        +"<div class='iv_notice_tab_con mNotice-mTab-content none'><a href='javascript:void(0)' title='日本' target='_self' class='mNotice-normal iv_notice_main_title'>日本</a><a href='javascript:void(0)' title='东京' target='_self' class='mNotice-normal'>东京</a><a href='javascript:void(0)' title='京都' target='_self' class='mNotice-normal'>京都</a><a href='javascript:void(0)' title='大阪' target='_self' class='mNotice-normal'>大阪</a><a href='javascript:void(0)' title='冲绳' target='_self' class='mNotice-normal'>冲绳</a><a href='javascript:void(0)' title='名古屋' target='_self' class='mNotice-normal'>名古屋</a><a href='javascript:void(0)' title='箱根' target='_self' class='mNotice-normal'>箱根</a><a href='javascript:void(0)' title='成田' target='_self' class='mNotice-normal'>成田</a><a href='javascript:void(0)' title='关西' target='_self' class='mNotice-normal'>关西</a><a href='javascript:void(0)' title='札幌' target='_self' class='mNotice-normal'>札幌</a><a href='javascript:void(0)' title='韩国' target='_self' class='mNotice-normal iv_notice_main_title'>韩国</a><a href='javascript:void(0)' title='首尔' target='_self' class='mNotice-normal'>首尔</a><a href='javascript:void(0)' title='济州岛' target='_self' class='mNotice-normal'>济州岛</a></div>"
        +"<div class='iv_notice_tab_con mNotice-mTab-content none'><a href='javascript:void(0)' title='曼谷' target='_self' class='mNotice-normal'>曼谷</a><a href='javascript:void(0)' title='芭堤雅' target='_self' class='mNotice-normal'>芭堤雅</a><a href='javascript:void(0)' title='清迈' target='_self' class='mNotice-normal'>清迈</a><a href='javascript:void(0)' title='苏梅岛' target='_self' class='mNotice-normal'>苏梅岛</a><a href='javascript:void(0)' title='甲米' target='_self' class='mNotice-normal'>甲米</a><a href='javascript:void(0)' title='华欣' target='_self' class='mNotice-normal'>华欣</a></div>"
        +"<div class='iv_notice_tab_con mNotice-mTab-content none'><a href='javascript:void(0)' title='新加坡' target='_self' class='mNotice-normal'>新加坡</a><a href='javascript:void(0)' title='兰卡威' target='_self' class='mNotice-normal'>兰卡威</a><a href='javascript:void(0)' title='斯里兰卡' target='_self' class='mNotice-normal'>斯里兰卡</a><a href='javascript:void(0)' title='吉隆坡' target='_self' class='mNotice-normal'>吉隆坡</a><a href='javascript:void(0)' title='吴哥窟' target='_self' class='mNotice-normal'>吴哥窟</a><a href='javascript:void(0)' title='岘港' target='_self' class='mNotice-normal'>岘港</a><a href='javascript:void(0)' title='芽庄' target='_self' class='mNotice-normal'>芽庄</a><a href='javascript:void(0)' title='美奈' target='_self' class='mNotice-normal'>美奈</a><a href='javascript:void(0)' title='越南' target='_self' class='mNotice-normal'>越南</a><a href='javascript:void(0)' title='柬埔寨' target='_self' class='mNotice-normal'>柬埔寨</a><a href='javascript:void(0)' title='暹粒' target='_self' class='mNotice-normal'>暹粒</a></div>"
        +"<div class='iv_notice_tab_con mNotice-mTab-content none'><a href='javascript:void(0)' title='欧洲' target='_self' class='mNotice-normal iv_notice_main_title'>欧洲</a><a href='javascript:void(0)' title='希腊' target='_self' class='mNotice-normal'>希腊</a><a href='javascript:void(0)' title='法国' target='_self' class='mNotice-normal'>法国</a><a href='javascript:void(0)' title='西班牙' target='_self' class='mNotice-normal'>西班牙</a><a href='javascript:void(0)' title='意大利' target='_self' class='mNotice-normal'>意大利</a><a href='javascript:void(0)' title='英国' target='_self' class='mNotice-normal'>英国</a><a href='javascript:void(0)' title='德国' target='_self' class='mNotice-normal'>德国</a><a href='javascript:void(0)' title='挪威' target='_self' class='mNotice-normal'>挪威</a><a href='javascript:void(0)' title='冰岛' target='_self' class='mNotice-normal'>冰岛</a><a href='javascript:void(0)' title='瑞士' target='_self' class='mNotice-normal'>瑞士</a><a href='javascript:void(0)' title='爱尔兰' target='_self' class='mNotice-normal'>爱尔兰</a><a href='javascript:void(0)' title='奥地利' target='_self' class='mNotice-normal'>奥地利</a><a href='javascript:void(0)' title='丹麦' target='_self' class='mNotice-normal'>丹麦</a><a href='javascript:void(0)' title='美洲' target='_self' class='mNotice-normal iv_notice_main_title'>美洲</a><a href='javascript:void(0)' title='美国西海岸' target='_self' class='mNotice-normal'>美国西海岸</a><a href='javascript:void(0)' title='美国东海岸' target='_self' class='mNotice-normal'>美国东海岸</a><a href='javascript:void(0)' title='美洲自驾' target='_self' class='mNotice-normal'>美洲自驾</a><a href='javascript:void(0)' title='夏威夷' target='_self' class='mNotice-normal'>夏威夷</a><a href='javascript:void(0)' title='澳洲' target='_self' class='mNotice-normal iv_notice_main_title'>澳洲</a><a href='javascript:void(0)' title='悉尼' target='_self' class='mNotice-normal'>悉尼</a><a href='javascript:void(0)' title='凯恩斯' target='_self' class='mNotice-normal'>凯恩斯</a><a href='javascript:void(0)' title='墨尔本' target='_self' class='mNotice-normal'>墨尔本</a><a href='javascript:void(0)' title='布里斯班' target='_self' class='mNotice-normal'>布里斯班</a></div>"
        +"<div class='iv_notice_tab_con mNotice-mTab-content none'><a href='javascript:void(0)' title='普吉岛' target='_self' class='mNotice-normal'>普吉岛</a><a href='javascript:void(0)' title='巴厘岛' target='_self' class='mNotice-normal'>巴厘岛</a><a href='javascript:void(0)' title='塞班岛' target='_self' class='mNotice-normal'>塞班岛</a><a href='javascript:void(0)' title='毛里求斯' target='_self' class='mNotice-normal'>毛里求斯</a><a href='javascript:void(0)' title='马尔代夫' target='_self' class='mNotice-normal'>马尔代夫</a><a href='javascript:void(0)' title='关岛' target='_self' class='mNotice-normal'>关岛</a><a href='javascript:void(0)' title='塞舌尔' target='_self' class='mNotice-normal'>塞舌尔</a><a href='javascript:void(0)' title='沙巴' target='_self' class='mNotice-normal'>沙巴</a></div>"
        +"</div></div>";
    return html;
}
