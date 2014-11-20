/**
 * Created by zd on 14-11-20.
 */
function AutomaticSearch(id){
    //生成窗口的id
    var SearchwindowID='autoComplete'+createHexRandom();
    var html="<div style='left: 63px; top: 18px;display: none;width:222px;' id='"+SearchwindowID+"' class='autofill_wrap autofill_wrap_large'>";
    //键盘事件
    $('#'+id).keyup(function(){
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
            var reg = /^([\u4e00-\u9fa5||·])$/;//判断中文
            if(reg.test(value)){
                searchData=DataToFiter(searchlist.ch,2,value,0);
            }
            var reg2 = /^[a-zA-Z]+$/;//表示英文
            if(reg2.test(value)){
                value=value.toLowerCase();
                searchData=DataToFiter(searchlist.ch,1,value,0);
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
            for(var i= 0,len=searchData.length;i<len;i++){
                html+="<tr class='autofill_item enableListRow'><td><div class='match_div'>";
                var values=searchData[i][0].split(','),valueString="";
                for(var j= 0;j<values.length;j++){
                    valueString+=values[j];
                }
                html+="<span class='match_right'>"+valueString+"</span>";
                html+="<span class='match_left'>"+searchData[i][1]+"</span>";
                html+="</div></tr>";
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
                $(this).css({background:'#8AB923'});
                $(this).children().css({color:'#fff'});
            },function(){
                $(this).css({background:'#fff'});
                $(this).children().css({color:'#006DAE'});
            });
            $('#'+SearchwindowID+' .autofill_tray .autofill_item').click(function(){
                var childerValue=$(this).find('span:nth-child(2)').text();
                $('#'+id).val(childerValue);
                GetShowOrHide('#'+SearchwindowID,'hide');
            });
        }
        //关闭搜索窗口
        $('#'+SearchwindowID+'  div.show_title span.autofill_close').click(function(){
            GetShowOrHide('#'+SearchwindowID,'hide');
        });
    });

}
//过滤数据
/*
 *data：数据集
 * languageType：语言类型 1:表示英文  2：表示中文
 * searchString：搜索字符串
 * searchLength：搜索当前字符串第个位置
 */
function DataToFiter(data,languageType,searchString,searchLength){
    if(searchLength==0 && languageType==1){
        data=DataToFirst(data,searchString);
    }
    if(searchString.length<=searchLength)return data;
    var selectData=[];
    if(languageType==1){
        for(var i= 0,len=data.length;i<len;i++){
            var values=data[i],value='';
            if(languageType==1){
                value=values[0];
            }
            else if(languageType==2)
                value=values[1];
            if(value.length>=searchString.length){
                if(searchLength==0){
                    if(value.charAt(searchLength)==searchString.charAt(searchLength)){
                        selectData.push(values);
                    }
                }else{
                    var itemvalue=value.split(','),itemString="",selectItembool=false;
                    //判断输入的字符串是否等于简写的字符长度
                    if(searchString.length<=itemvalue.length){
                        for(var x= 0,vlen=itemvalue.length;x<vlen;x++){
                            if(itemvalue[x].charAt(0)==searchString.charAt(x)){
                                selectItembool=true;
                            }else{
                                if(searchString.charAt(x)==""){
                                    selectItembool=true;
                                }else{
                                    selectItembool=false;
                                }
                            }
                            itemString+=itemvalue[x];
                        }
                        if(selectItembool)selectData.push(values);
                    }else{
                        for(var x= 0,vlen=itemvalue.length;x<vlen;x++){
                            itemString+=itemvalue[x];
                        }
                    }
                    if(!selectItembool)
                        if(itemString.charAt(searchLength)==searchString.charAt(searchLength)){
                            selectData.push(values);
                        }
                }
            }
        }
    }else if(languageType==2){
        $.each(data,function(i,n){
            $.each(n,function(j,k){
                var itemvalues=k[1];
                if(itemvalues.charAt(searchLength)==searchString.charAt(searchLength)){
                    selectData.push(k);
                }
            })
        });
    }
    searchLength=searchLength+1;
    return DataToFiter(selectData,languageType,searchString,searchLength);
}
//返回首字母的集合
function DataToFirst(data,searchString){
    var charString=searchString.charAt(0);
    var selectData=[];
    $.each(data,function(i,n){
        if(i==charString){
            selectData=n;
        }
    });
    return selectData;
}
