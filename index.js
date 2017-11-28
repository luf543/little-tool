/**
 * Created by lufeng.tuniu on 2017/11/28.
 */
var os = require('os');
var shell = require("shelljs");
var argv = require('yargs')
  .option('r', {
    alias : 'random',
    describe: '生成随机:姓名 -r n/手机号 -r m／身份证号 -r c'
  })
  .usage('Usage: dt [options]')
  .example('dt -r n', '生成随机姓名')
  .help('h')
  .alias('h', 'help')
  .epilog('copyright 2017')
  .argv;

if(argv.r){
  switch (argv.r){
    case 'n':
      getName();
      break;
    case 'm':
      getMoble();
      break;
    case 'c':
      getId_no();
      break;
    default:
      console.log('常将冷眼观螃蟹，看你横行到几时')
  }
}

function randomResult(index, data) {
  var clipCommand = {
    'windows': 'clip',
    'darwin': 'pbcopy'
  };
  var titles = ['姓名', '手机号', '身份证号'];
  for(var osType in clipCommand){
    var command = 'clip';
    if(os.type().toLowerCase().indexOf(osType)>=0) {
      command = clipCommand[osType];
    }
  }
  console.log('帮您随机生成'+titles[index]+': '+data);
  shell.exec("echo " + data + " | " + command);
}
// 生成随机姓名
function getName(){
  var familyNames = [
    "赵",    "钱",    "孙",    "李",    "周",    "吴",    "郑",    "王",    "冯",    "陈",
    "褚",    "卫",    "蒋",    "沈",    "韩",    "杨",    "朱",    "秦",    "尤",    "许",
    "何",    "吕",    "施",    "张",    "孔",    "曹",    "严",    "华",    "金",    "魏",
    "陶",    "姜",    "戚",    "谢",    "邹",    "喻",    "柏",    "水",    "窦",    "章",
    "云",    "苏",    "潘",    "葛",    "奚",    "范",    "彭",    "郎",    "鲁",    "韦",
    "昌",    "马",    "苗",    "凤",    "花",    "方",    "俞",    "任",    "袁",    "柳",
    "酆",    "鲍",    "史",    "唐",    "费",    "廉",    "岑",    "薛",    "雷",    "贺",
    "倪",    "汤",    "滕",    "殷",    "罗",    "毕",    "郝",    "邬",    "安",    "常",
    "乐",    "于",    "时",    "傅",    "皮",    "卞",    "齐",    "康",    "伍",    "余",
    "元",    "卜",    "顾",    "孟",    "平",    "黄",    "和",    "穆",    "萧",    "尹"];
  var givenNames =  [
    "子璇", "淼", "国栋", "夫子", "瑞堂", "甜", "敏", "尚", "国贤", "贺祥", "晨涛",
    "昊轩", "易轩", "益辰", "益帆", "益冉", "瑾春", "瑾昆", "春齐", "杨", "文昊",
    "东东", "雄霖", "浩晨", "熙涵", "溶溶", "冰枫", "欣欣", "宜豪", "欣慧", "建政",
    "美欣", "淑慧", "文轩", "文杰", "欣源", "忠林", "榕润", "欣汝", "慧嘉", "新建",
    "建林", "亦菲", "林", "冰洁", "佳欣", "涵涵", "禹辰", "淳美", "泽惠", "伟洋",
    "涵越", "润丽", "翔", "淑华", "晶莹", "凌晶", "苒溪", "雨涵", "嘉怡", "佳毅",
    "子辰", "佳琪", "紫轩", "瑞辰", "昕蕊", "萌", "明远", "欣宜", "泽远", "欣怡",
    "佳怡", "佳惠", "晨茜", "晨璐", "运昊", "汝鑫", "淑君", "晶滢", "润莎", "榕汕",
    "佳钰", "佳玉", "晓庆", "一鸣", "语晨", "添池", "添昊", "雨泽", "雅晗", "雅涵",
    "清妍", "诗悦", "嘉乐", "晨涵", "天赫", "玥傲", "佳昊", "天昊", "萌萌", "若萌"
  ];

  var i = parseInt(10 * Math.random())*10 + parseInt(10 * Math.random());
  var familyName = familyNames[i];

  var j = parseInt(10 * Math.random())*10 + parseInt(10 * Math.random());
  var givenName = givenNames[i];

  var name = familyName + givenName;
  randomResult(0, name);
}

//生成随机手机号
function getMoble() {

  var prefixArray = ["130", "131", "132", "133", "135", "137", "138", "170", "187", "189"];
  var i = parseInt(10 * Math.random());
  var prefix = prefixArray[i];

  for (var j = 0; j < 8; j++) {
    prefix = prefix + Math.floor(Math.random() * 10);
  }

  randomResult(1, prefix);
}
// 生成随机身份证号
function getId_no(){
  var coefficientArray = [ "7","9","10","5","8","4","2","1","6","3","7","9","10","5","8","4","2"];// 加权因子
  var lastNumberArray = [ "1","0","X","9","8","7","6","5","4","3","2"];// 校验码
  var address = "420101"; // 住址
  var birthday = "19810101"; // 生日
  var s = Math.floor(Math.random()*10).toString() + Math.floor(Math.random()*10).toString() + Math.floor(Math.random()*10).toString();
  var array = (address + birthday + s).split("");
  var total = 0;
  for(i in array){
    total = total + parseInt(array[i])*parseInt(coefficientArray[i]);
  }
  var lastNumber = lastNumberArray[parseInt(total%11)];
  var id_no_String = address + birthday + s + lastNumber;

  randomResult(2, id_no_String);

}