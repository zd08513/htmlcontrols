/**
 * Created by zd on 14-11-19.
 */
//显示或隐藏
function GetShowOrHide(id,type){
    if(type=='show')
        $(id).show();
    else if(type=='hide')
        $(id).hide();
}
//获取随机码
function createHexRandom(){
    var num = '';
    for (i = 0; i <= 31; i++)
    {
        var tmp = Math.ceil(Math.random()*15);
        if(tmp > 9){
            switch(tmp){
                case(10):
                    num+='a';
                    break;
                case(11):
                    num+='b';
                    break;
                case(12):
                    num+='c';
                    break;
                case(13):
                    num+='d';
                    break;
                case(14):
                    num+='e';
                    break;
                case(15):
                    num+='f';
                    break;
            }
        }else{
            num+=tmp;
        }
    }
    return num;
}


/*['shanghai','上海'],['shanghaihongqiao','上海虹桥'],['beijing','北京'],['beijingshoudu','北京首都'],
 ['beijingnanyuan','北京南苑'],['shenzhen','深圳'],['hangzhou','杭州'],['guangzhou','广州'],['chendu','成都'],
 ['nanjing','南京'],['wuhan','武汉'],['huhehaote','呼和浩特'],['chongqing','重庆'],['changsha','长沙'],
 ['kunming','昆明'],['xian','西安'],['qingdao','青岛'],['tianjin','天津'],['ningbo','宁波'],
 ['xiamen','厦门'],['taiyuan','太原'],['dalian','大连'],['jinan','济南'],['sanya','三亚']*/

var searchlist={
    "ch":{
        "a":[['an,shun','安顺'],['an,qing','安庆'],['a,ke,su','阿克苏'],['a,er,shan','阿尔山'],['an,shan','鞍山'],['an,kang','安康'],['a,le,tai','阿勒泰'],['a,li','阿里'],['a,la,shan,you,qi','阿拉善右旗']],
        "b":[['bei,jing','北京'],['bei,jing,shou,du','北京首都'],['bei,jing,nan,yuan','北京南苑'],['bei,hai','北海'],['bao,tou','包头'],['ba,yan,zhuo,er','巴彦淖尔'],['bo,le','博乐'],['beng,bu','蚌埠'],['baoshan','保山'],['bai,se','百色'],['bi,jie','毕节']],
        "c":[['chen,du','成都'],['chong,qing','重庆'],['chang,sha','长沙'],['chi,zhou','池州'],['chang,zhou','常州'],['chang,chun','长春'],['chang,de','常德'],['chang,zhi','长治'],['chao,yan','朝阳'],['chi,feng','赤峰'],['chang,du','昌都'],['chang,bai,shan','长白山']],
        "d":[['da,lian','大连'],['da,tong','大同'],['dao,cheng','稻城'],['dong,wan','东莞'],['dun,huang','敦煌'],['dan,dong','丹东'],['da,li','大理'],['dong,ying','东营'],['di,qing','迪庆'],['da,zhou','达州'],['da,qing','大庆']],
        "e":[['en,shi','恩施'],['e,er,duo,si','鄂尔多斯'],['e,ji,la','额济纳'],['er,lian,hao,te','二连浩特']],
        "f":[['fu,zhou','福州'],['fu,yuan','抚远'],['fu,yun','富蕴'],['fu,yang','阜阳'],['fu,shan','佛山']],
        "g":[['guang,zhou','广州'],['gui,yang','贵阳'],['gui,lin','桂林'],['ge,er,mu','格尔木'],['gan,zhou','赣州'],['gu,yuan','固原'],['guang,yuan','广元']],
        "h":[['heng,zhou','杭州'],['hu,he,hao,te','呼和浩特'],['he,fei','合肥'],['ha,er,bin','哈尔滨'],['han,dan','邯郸'],['hai,kou','海口'],['huai,hua','怀化'],['han,zhong','汉中'],['hai,laer','海拉尔'],['hui,zhou','惠州'],['he,tian','和田'],['heng,yang','衡阳'],['huang,shan','黄山'],['hu,zhou','湖州'],['huang,yan','黄岩'],['huai,an','淮安'],['hei,he','黑河'],['ha,mi','哈密'],['hong,yuan','红原']],
        "j":[['ji,nan','济南'],['jie,yang','揭阳'],['jiu,quan','酒泉'],['jia,gu,guan','嘉峪关'],['jiu,jiang','九江'],['jing,gang,shan','井冈山'],['jing,de,zhen','景德镇'],['jiu,zhai,gou','九寨沟'],['ji,ning','济宁'],['jiu,hua,shan','九华山'],['ji,jiang','晋江'],['jing,yin','江阴'],['ji,xing','嘉兴'],['jin,chang','金昌'],['ji,xi','鸡西'],['jin,zhou','锦州'],['jie,lin','吉林'],['jia,mu,si','佳木斯']],
        "k":[['kun,ming','昆明'],['ku,che','库车'],['ku,er,le','库尔勒'],['kun,shan','昆山'],['kang,ding','康定'],['ka,na,si','喀纳斯'],['ka,shen','喀什'],['ke,la,ma,yi','克拉玛依']],
        "l":[['liu,zhou','柳州'],['lan,zhou','兰州'],['lian,yun,gang','连云港'],['lin,yi','临沂'],['lv,liang','吕梁'],['lian,cheng','连城'],['lu,zhou','泸州'],['lu,shan','庐山'],['long,yan','龙岩'],['li,ping','黎平'],['lin,zhi','林芝'],['lin,cang','临沧'],['li,bo','荔波'],['li,jing','丽江'],['la,sa','拉萨'],['luo,yang','洛阳']],
        "m":[['mei,xian','梅县'],['du,dan,jiang','牡丹江'],['mian,yang','绵阳'],['mo,hei','漠河'],['man,hu,li','满洲里'],['mang,shi','芒市']],
        "n":[['nan,jing','南京'],['nin,gbo','宁波'],['nan,ning','南宁'],['nan,yang','南阳'],['nan,chang','南昌'],['nan,tong','南通'],['nan,hai','南海'],['na,la,ti','那拉提'],['nan,chong','南充']],
        "p":[['pang,zhi,hua','攀枝花'],['pu,er','普洱']],
        "q":[['qing,dao','青岛'],['quan,zhou','泉州'],['qi,qi,ha,er','齐齐哈尔'],['qing,huang,dao','秦皇岛'],['qian,jiang','黔江'],['qing,yang','庆阳'],['jie,mo','且末'],['heng,zhou','衢州']],
        "r":[['ri,ka,ze','日喀则']],
        "s":[['shang,hai','上海'],['shang,hai,hong,qiao','上海虹桥'],['shang,hai,pu,dong','上海浦东'],['shen,zhen','深圳'],['san,ya','三亚'],['shan,tou','汕头'],['shen,yang','沈阳'],['shi,jia,zhuang','石家庄'],['shao,xing','绍兴'],['shanshan','鄯善'],['sha,shi','沙市'],['su,zhou','苏州']],
        "t":[['tian,jin','天津'],['tai,yuan','太原'],['tong,liao','通辽'],['tu,lu,fan','吐鲁番'],['tong,hua','通化'],['tian,shui','天水'],['teng,chong','腾冲'],['tang,shan','唐山'],['tao,zhou','台州'],['tong,ren','铜仁']],
        "w":[['wu,han','武汉'],['wu,zhou','梧州'],['wu,yi,shan','武夷山'],['wu,xi','无锡'],['wei,fang','潍坊'],['wu,hu','芜湖'],['wu,hai','乌海'],['wen,shan','文山'],['wa,zhou','万州'],['wei,hai','威海'],['wen,zhou','温州'],['wu,lu,mu,qi','乌鲁木齐'],['wu,lan,hao,te','乌兰浩特']],
        "x":[['xi,an','西安'],['xia,men','厦门'],['xiang,yang','襄阳'],['xu,zhou','徐州'],['xi,ning','西宁'],['xia,he','夏河'],['xing,yi','兴义'],['xing,tai','邢台'],['xing,cheng','兴城'],['xi,lin,hao,te','锡林浩特'],['xi,chang','西昌'],['xi,shuang,ban,na','西双版纳']],
        "y":[['yi,chang','宜昌'],['yan,cheng','盐城'],['yan,jie','延吉'],['yi,bing','宜宾'],['ya,nan','延安'],['yun,cheng','运城'],['yan,tai','烟台'],['yin,chuan','银川'],['yi,chun','宜春'],['yang,zhou','扬州'],['yu,shu','玉树'],['yu,lin','榆林'],['yuan,mou','元谋'],['yi,ning','伊宁'],['yi,chun','伊春'],['yi,wu','义乌'],['yong,zhou','永州']],
        "z":[['zhu,hai','珠海'],['zhan,jiang','湛江'],['zheng,zhou','郑州'],['zhang,jia,kou','张家口'],['zun,yi','遵义'],['zhang,ye','张掖'],['zhao,tong','昭通'],['zhou,shan','舟山'],['zhang,jia,jie','张家界'],['zhen,jiang','镇江']]
    },
    "en":[
        [['lun,dun','LONDON'],'伦敦'],[['fa,lan,ke,fu','FRANKFURT'],'法兰克福'],[['ba,li','PARIS'],'巴黎'],[['mo,si,ke','MOSCOW'],'莫斯科'],[['luo,ma,(yi,da,li)','ROME'],'罗马(意大利)'],[['a,mu,si,te,dan','AMSTERDAM'],'阿姆斯特丹'],[['mi,lan','MILAN'],'米兰'],[['mu,ni,hei','MUNICH'],'慕尼黑'],
        [['si,de,ge,er,mo','STOCKHOLM'],'斯德哥尔摩'],[['bo,lin,(de,guo)','BERLIN'],'柏林(德国)'],[['ma,de,li','MADRID'],'马德里'],[['su,li,shi','ZURICH'],'苏黎世'],[['ge,ben,ha,gen','COPENHAGEN'],'哥本哈根'],[['he,er,xin,ji','HELSINKI'],'赫尔辛基'],[['wei,ye,na','VIENNA'],'维也纳'],[['ba,sai,luo,na,(xi,ba,ya)','BARCELONA'],'巴塞罗那(西班牙)'],
        [['ya,dian','ATHENS'],'雅典'],[['ai,ding,bao','EDINBURGH'],'爱丁堡'],[['bo,ming,han,(ying,guo)','BIRMINGHAM'],'伯明翰(英国)'],[['niu,ka,si,er(ying,guo)','NEWCASTLE'],'纽卡斯尔(英国)'],[['ri,nei,wa','GENEVA'],'日内瓦'],[['sheng,bi,de,bao','SAINT PETERSBURG'],'圣彼得堡'],[['ge,la,si,ge,(ying,guo)','GLASGOW'],'格拉斯哥(英国)'],[['ji,pu,(wu,ke,lan)','KIEV'],'基辅(乌克兰)'],
        [['bu,da,pei,si','BUDAPEST'],'布达佩斯'],[['han,bao','HAMBURG'],'汉堡'],[['bu,la,ge','PRAGUE'],'布拉格'],[['du,sai,er,duo,fu','DUSSELDORF'],'杜塞尔多夫'],[['man,qie,si,te,(ying,guo)','MANCHESTER'],'曼彻斯特(英国)'],[['wei,ge,hua','VANCOUVER'],'温哥华'],[['niu,yue','NEW YORK'],'纽约'],[['luo,san,ji,(mei,guo)','LOS ANGELES'],'洛杉矶(美国)'],[['ba,sai,luo,na,(wei,nei,duan,la)','BARCELONA'],'巴塞罗那(委内瑞拉)'],
        [['bo,ming,han,(mei,guo)','BIRMINGHAM'],'伯明翰(美国)'],[['jiu,jin,shan,(san,fan,shi)','SAN FRANCISCO'],'旧金山（三藩市）'],[['zhi,jia,ge','CHICAGO'],'芝加哥'],[['duo,lun,duo','TORONTO'],'多伦多'],[['xi,ya,tu','TORONTO'],'西雅图'],[['hua,sheng,dun','WASHINGTON'],'华盛顿'],[['bo,shi,dun','BOSTON'],'波士顿'],[['di,te,lv','DETROIT'],'底特律'],
        [['ya,te,lan,da','ATLANTA'],'亚特兰大'],[['xi,si,dun','HOUSTON'],'休斯敦'],[['da,la,si','DALLAS'],'达拉斯'],[['fei,cheng','PHILADELPHIA'],'费城'],[['sheng,bao,luo,(ba,xi)','SAO PAULO'],'圣保罗(巴西)'],[['wo,tai,hua','OTTAWA'],'渥太华'],[['mo,xi,ge,cheng','MEXICO CITY'],'墨西哥城'],[['la,xi,wei,jia,si','LAS VEGAS'],'拉斯维加斯'],[['ka,er,jia,li','CALGARY'],'卡尔加里'],
        [['mai,a,mi','MIAMI'],'迈阿密'],[['dan,fu','DENVER'],'丹佛'],[['ao,lan,duo','ORLANDO'],'奥兰多'],[['bo,te,lan,(ying,guo)','PORTLAND'],'波特兰(美国)'],[['man,qie,si,te,(mei,guo)','MANCHESTER'],'曼彻斯特(美国)'],[['ai,de,meng,dun','EDMONTON'],'埃德蒙顿'],[['bu,yi,ruo,si,ai,li,si','BUENOS AIRES'],'布宜诺斯艾利斯'],[['mo,er,ben,(mei,guo)','MELBOURNE'],'墨尔本(美国)'],
        [['ming,ni,a,bo,li,si','MINNEAPOLIS'],'明尼阿波利斯'],[['kai,luo','CAIRO'],'开罗'],[['yue,han,nei,si,bao','JOHANNESBURG'],'约翰内斯堡'],[['kai,pu,dun','CAPE TOWN'],'开普敦'],[['nei,luo,bi','NAIROBI'],'内罗毕'],[['la,ge,si','LAGOS'],'拉各斯'],[['luo,an,da','LUANDA'],'罗安达'],[['mao,li,qiu,si','MAURITIUS'],'毛里求斯'],
        [['ke,tu,mu','KHARTOUM'],'喀土穆'],[['a,ke,la,(jia,na)','ACCRA'],'阿克拉(加纳)'],[['a,er,ji,er','ALGIERS'],'阿尔及尔'],[['de,ban','DURBAN'],'德班'],[['tu,ni,si','TUNIS'],'突尼斯'],[['lu,sa,ka','LUSAKA'],'卢萨卡'],[['ha,la,lei','HARARE'],'哈拉雷'],[['ya,wei,de','YAOUNDE'],'雅温得'],
        [['ha,bo,luo,nei','GABORONE'],'哈博罗内'],[['jin,sha,sa','KINSHASA'],'金沙萨'],[['ma,pu,tuo','MAPUTO'],'马普托'],[['du,a,la','DOUALA'],'杜阿拉'],[['fei,li,dun','FREETOWN'],'费里敦'],[['a,bi,rang','ABIDJAN'],'阿比让'],
        [['lu,ke,suo','LUXOR'],'卢克索'],[['ka,sa,bu,lan,ka','CASABLANCA'],'卡萨布兰卡'],[['ya,de,si,ya,bei,ba','ADDIS ABABA'],'亚的斯亚贝巴'],[['da,lei,si,sa,la,mu','DAR ES SALAAM'],'达累斯萨拉姆'],[['xi,ni','SYDNEY'],'悉尼'],[['niu,ka,si,er,(ao,da,li,ya)','NEWCASTLE'],'纽卡斯尔(澳大利亚)'],[['mo,er,ben,(ao,da,li,ya)','MELBOURNE'],'墨尔本(澳大利亚)'],
        [['ao,ke,lan,(xin,xi,lan)','AUCKLAND'],'奥克兰(新西兰)'],[['bu,li,si,ban','BRISBANE'],'布里斯班'],[['a,de,cai,de','ADELAIDE'],'阿德莱德'],[['bo,si','PERTH'],'珀斯'],[['hui,ling,dun','WELLINGTON'],'惠灵顿'],[['kan,pei,la','CANBERRA'],'堪培拉'],[['kai,en,si','CAIRNS'],'凯恩斯'],[['nan,di','NADI'],'楠迪'],
        [['huang,jin,hai,an','COOLANGATTA'],'黄金海岸'],[['bo,pi,ti','NONOUTI'],'帕皮堤'],[['huo,ba,te','HOBART'],'霍巴特'],[['da,er,wen','DARWIN'],'达尔文'],[['da,ni,ding','DUNEDIN'],'达尼丁'],[['xiang,gang','HONGKONG'],'香港'],[['ao,men','MACAU'],'澳门'],[['tai,bei','TAIPEI'],'台北'],[['shou,er','SEOUL'],'首尔'],
        [['xin,jia,po','SINGAPORE'],'新加坡'],[['man,gu','BANGKOK'],'曼谷'],[['hu,zhi,ming,shi','HO CHI MINH CITY'],'胡志明市'],[['ma,ni,la','MANILA'],'马尼拉'],[['ming,gu,wu','NAGOYA'],'名古屋'],[['ji,long,po','KUALA LUMPUR'],'吉隆坡'],[['fu,shan','BUSAN'],'釜山'],[['dong,jing','Tokyo'],'东京'],
        [['da,ban','OSAKA'],'大阪'],[['ya,jia,da','JAKARTA'],'雅加达'],[['ba,li,dao','DENPASAR BALI'],'巴厘岛'],[['pu,ji,dao','PHUKET'],'普吉岛'],[['he,nei','HANOI'],'河内'],[['ma,lei','MALE'],'马累'],[['di,bai','DUBAI'],'迪拜'],[['jia,de,man,du','KATHMANDU'],'加德满都'],
        [['gao,xiong','KAOHSIUNG'],'高雄'],[['fu,wang','FUKUOKA'],'福冈'],[['jin,bian','PHNOM PENH'],'金边'],[['yi,si,tan,bu,er','ISTANBUL'],'伊斯坦布尔'],[['wu,lan,ba,tuo','ULAANBAATAR'],'乌兰巴托'],[['meng,mai','MUMBAI'],'孟买'],[['ji,zhou','JEJU'],'济州']
    ]
};