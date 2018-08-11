$(function () {
  var inputVal = ''; //用户填写的倍数
  var zhushus = []; //注数数组;
  var currNumber = [] //存储每组位数的数组
  var minMoney = 2; //每注金额
  var lastMoney = 0.00;//计算出的金额
  var AllZhushu = 0;//方案注数
  var AllMoney = 0;//方案注数金额
  var danshiNumberL = 0;//单式号码长度
  var yesArr = [];//单式正确的数组
  var orderList= [];//投注数组
  var yrates = k3lotteryrates.rates;
  var newmaxJJ = '';

  var _thisPlayid = '';

  function tabGameInit(){
    _thisPlayid = 'x5qsfs';
    rates = yrates[_thisPlayid];
    gameSwitch($('.bet_filter_box'),syxw_sm_title,syxw_sm);
    $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从01-11共11个号码中选择3个不重复的号码组成一注，所选号码与当期顺序摇出的5个号码中 的前3个号码相同，且顺序一致，即为中奖，奖金 <em style="color:red;">'+rates.maxjj+'</em>元');
    gameNumber(syxw_x5qsfs,11,1);
    updateMaxJJ();
  }
  tabGameInit();
  getUserBetsListToday(lotteryname);
  

  if($('.selectMultipInput').val() <= 1){
    $('.reduce').addClass('noReduce');
  }

  //倍数减
  $('.reduce').on('click',function (){
    addAndSubtract('-');
    countMoney();
    updateMaxJJ();
  })
  //倍数加
  $('.selectMultiple .add').on('click',function (){
    addAndSubtract('+');
    countMoney();
    updateMaxJJ();
  })
  //倍数输入框
  $('.selectMultipInput').on('keyup change',function (){
    addAndSubtract();
    countMoney();
    updateMaxJJ();
  })
  
  //人民币单位换算
  $('.selectMultipleCon').on('change',function (){
    countMoney();
  })

  //号码点击
  $('.g_Number_Section').on('click','.selectNumbers a',function (){
    if(_thisPlayid == 'zuxcsbd' || _thisPlayid == 'zuxzsbd' || _thisPlayid == 'zuxhsbd' ||  _thisPlayid == 'zuxcebd' || _thisPlayid == 'zuxhebd'){
      $(this).addClass('curr').siblings().removeClass('curr');
    }else{
      if($(this).hasClass('curr')){
        $(this).removeClass('curr');
      }else{  
        $(this).addClass('curr');
      if(_thisPlayid == 'x5qsdt' || _thisPlayid == 'x5qedt' || _thisPlayid == 'x5dt2z2' || _thisPlayid == 'x5dt3z3' || _thisPlayid == 'x5dt4z4' || _thisPlayid == 'x5dt5z5' || _thisPlayid == 'x5dt6z5' || _thisPlayid == 'x5dt7z5' || _thisPlayid == 'x5dt8z5'){
          var topDiv = $('.selectNumbers').eq(0);
          var bottomDiv = $('.selectNumbers').eq(1);
          var topCurr = topDiv.find('.curr');
          var topCurrTthisN = $(this).attr('data-number');
          if(_thisPlayid == 'x5qsdt' || _thisPlayid == 'x5dt3z3'){
            if(topCurr.length > 2){
              $(this).siblings('.curr').eq(1).removeClass('curr');
            }
          }else if(_thisPlayid == 'x5qedt' || _thisPlayid == 'x5dt2z2'){
            if(topCurr.length > 1){
              $(this).siblings('.curr').removeClass('curr');
            }
          }else if(_thisPlayid == 'x5dt4z4'){
            if(topCurr.length > 3){
              $(this).siblings('.curr').eq(2).removeClass('curr');
            }
          }else if(_thisPlayid == 'x5dt5z5'){
            if(topCurr.length > 4){
              $(this).siblings('.curr').eq(3).removeClass('curr');
            }
          }else if(_thisPlayid == 'x5dt6z5'){
            if(topCurr.length > 5){
              $(this).siblings('.curr').eq(4).removeClass('curr');
            }
          }else if(_thisPlayid == 'x5dt7z5'){
            if(topCurr.length > 6){
              $(this).siblings('.curr').eq(5).removeClass('curr');
            }
          }else if(_thisPlayid == 'x5dt8z5'){
            if(topCurr.length > 7){
              $(this).siblings('.curr').eq(6).removeClass('curr');
            }
          }
          
          $(this).parents('.selectNmuverBox').siblings('.selectNmuverBox').find('a[data-number="'+topCurrTthisN+'"]').removeClass('curr');
          //bottomDiv.find('a[data-number="'+topCurrTthisN+'"]').removeClass('curr');
        }   
      }
    }
    currNumber = currList();
    countFun()
    countMoney();
  })

  function countFun(){
    switch(_thisPlayid){
      case 'x5qsfs': 
        zhushus.length = syxwQsfs();
        break;
      case 'x5qszx':
        zhushus = combine(currNumber[0],3);
        break;
      case 'x5qsdt':
        zhushus.length = syxwzxbd();
        break;
      case 'x5qefs':
        zhushus.length = syxwqezxfs();
        break;
      case 'x5qezx':
        zhushus = combine(currNumber[0],2);
        break;
      case 'x5qedt':
        zhushus.length = syxwqezxbd();
        break;
      case 'x5bdwqs': case 'x5dwd': case 'x5dds': case 'x5czw':
        zhushus.length = $('.g_Number_Section').find('.curr').length;
        break;
      case 'x5rx1z1':
        zhushus.length = $('.g_Number_Section').find('.curr').length;
        break;
      case 'x5rx2z2':
        zhushus = combine(currNumber[0],2);
        break;
      case 'x5rx3z3':
        zhushus = combine(currNumber[0],3);
        break;
      case 'x5rx4z4':
        zhushus = combine(currNumber[0],4);
        break;
      case 'x5rx5z5':
        zhushus = combine(currNumber[0],5);
        break;
      case 'x5rx6z5':
        zhushus = combine(currNumber[0],6);
        break;
      case 'x5rx7z5':
        zhushus = combine(currNumber[0],7);
        break;
      case 'x5rx8z5':
        zhushus = combine(currNumber[0],8);
        break;
      case 'x5dt2z2':
        zhushus.length = syxwqezxbd();
        break;
      case 'x5dt3z3':
        zhushus.length = syxwzxbd();
        break;
      case 'x5dt4z4':
        zhushus.length = syxwtdszs();
        break;
      case 'x5dt5z5':
        zhushus.length = syxwtdwzw();
        break;
      case 'x5dt6z5':
        zhushus.length = syxwtdlzw();
        break;
      case 'x5dt7z5':
        zhushus.length = syxwtdqzw();
        break;
      case 'x5dt8z5':
        zhushus.length = syxwtdbzw();
        break;
    }
    //console.log(_thisPlayid,zhushus.length,currNumber);
  }

  function syxwtdbzw() {
    var selected_d_ball_array = [];
    var selected_t_ball_array = [];

    for(var ss = 0; ss< currNumber.length; ss++){
      for(var sss = 0; sss < currNumber[ss].length; sss++){
        if(ss == 0){
          selected_d_ball_array[parseInt(currNumber[ss][sss])] = currNumber[ss][sss];
        }else if(ss == 1){
          selected_t_ball_array[parseInt(currNumber[ss][sss])] = currNumber[ss][sss];
        }
      }   
    }

    var d_count=currNumber[0].length;
    var t_count=currNumber[1].length;

    var itemcount=0;

    if(d_count<=7&&d_count>0){
      var op_flag=false;
      for(var oo=0;oo<selected_d_ball_array.length;oo++){
        var temp_o_d_ball_number=selected_d_ball_array[oo];
        if(temp_o_d_ball_number!=undefined&&temp_o_d_ball_number!=""){
          for(var mm=0;mm<selected_t_ball_array.length;mm++){
            var temp_o_t_ball_number=selected_t_ball_array[mm];
            if(temp_o_t_ball_number!=undefined&&temp_o_t_ball_number!=""){
              if(eval(temp_o_d_ball_number)==eval(temp_o_t_ball_number)){
                op_flag=true;
                break;
              }
            }
          }
        }
        
        if(op_flag==true){
          break;
        }
      }
      
      if(op_flag==false){
        if(d_count==1){
          if(t_count>=7){
            itemcount=t_count*(t_count-1)*(t_count-2)*(t_count-3)*(t_count-4)*(t_count-5)*(t_count-6)/(7*6*5*4*3*2);
          }
        } else if(d_count==2){
          if(t_count>=6){
            itemcount=t_count*(t_count-1)*(t_count-2)*(t_count-3)*(t_count-4)*(t_count-5)/(6*5*4*3*2);
          }
        } else if(d_count==3){
          if(t_count>=5){
            itemcount=t_count*(t_count-1)*(t_count-2)*(t_count-3)*(t_count-4)/(5*4*3*2);
          }
        } else if(d_count==4){
          if(t_count>=4){
            itemcount=t_count*(t_count-1)*(t_count-2)*(t_count-3)/(4*3*2);
          }
        } else if(d_count==5){
          if(t_count>=3){
            itemcount=t_count*(t_count-1)*(t_count-2)/(3*2);
          }
        } else if(d_count==6){
          if(t_count>=2){
            itemcount=t_count*(t_count-1)/2;
          }
        } else if(d_count==7){
          if(t_count>=1){
            itemcount=t_count;
          }
        }
        }
    }
    return itemcount;
  }

  function syxwtdqzw(){
    var selected_d_ball_array = [];
    var selected_t_ball_array = [];

    for(var ss = 0; ss< currNumber.length; ss++){
      for(var sss = 0; sss < currNumber[ss].length; sss++){
        if(ss == 0){
          selected_d_ball_array[parseInt(currNumber[ss][sss])] = currNumber[ss][sss];
        }else if(ss == 1){
          selected_t_ball_array[parseInt(currNumber[ss][sss])] = currNumber[ss][sss];
        }
      }   
    }

    var d_count=currNumber[0].length;
    var t_count=currNumber[1].length;

    var itemcount=0;

    if(d_count<=6&&d_count>0){
      var op_flag=false;
      for(var oo=0;oo<selected_d_ball_array.length;oo++){
        var temp_o_d_ball_number=selected_d_ball_array[oo];
        if(temp_o_d_ball_number!=undefined&&temp_o_d_ball_number!=""){
          for(var mm=0;mm<selected_t_ball_array.length;mm++){
            var temp_o_t_ball_number=selected_t_ball_array[mm];
            if(temp_o_t_ball_number!=undefined&&temp_o_t_ball_number!=""){
              if(eval(temp_o_d_ball_number)==eval(temp_o_t_ball_number)){
                op_flag=true;
                break;
              }
            }
          }
        }
        
        if(op_flag==true){
          break;
        }
      }
      
      if(op_flag==false){
        if(d_count==1){
          if(t_count>=6){
            itemcount=t_count*(t_count-1)*(t_count-2)*(t_count-3)*(t_count-4)*(t_count-5)/(6*5*4*3*2);
          }
        } else if(d_count==2){
          if(t_count>=5){
            itemcount=t_count*(t_count-1)*(t_count-2)*(t_count-3)*(t_count-4)/(5*4*3*2);
          }
        } else if(d_count==3){
          if(t_count>=4){
            itemcount=t_count*(t_count-1)*(t_count-2)*(t_count-3)/(4*3*2);
          }
        } else if(d_count==4){
          if(t_count>=3){
            itemcount=t_count*(t_count-1)*(t_count-2)/(3*2);
          }
        } else if(d_count==5){
          if(t_count>=2){
            itemcount=t_count*(t_count-1)/2;
          }
        } else if(d_count==6){
          if(t_count>=1){
            itemcount=t_count;
          }
        }
        }
    }

    return itemcount;
  }

  function syxwtdlzw() {
    var selected_d_ball_array = [];
    var selected_t_ball_array = [];

    for(var ss = 0; ss< currNumber.length; ss++){
      for(var sss = 0; sss < currNumber[ss].length; sss++){
        if(ss == 0){
          selected_d_ball_array[parseInt(currNumber[ss][sss])] = currNumber[ss][sss];
        }else if(ss == 1){
          selected_t_ball_array[parseInt(currNumber[ss][sss])] = currNumber[ss][sss];
        }
      }   
    }

    var d_count=currNumber[0].length;
    var t_count=currNumber[1].length;

    var itemcount=0;
													
    if(d_count<=5&&d_count>0){
      var op_flag=false;
      for(var oo=0;oo<selected_d_ball_array.length;oo++){
        var temp_o_d_ball_number=selected_d_ball_array[oo];
        if(temp_o_d_ball_number!=undefined&&temp_o_d_ball_number!=""){
          for(var mm=0;mm<selected_t_ball_array.length;mm++){
            var temp_o_t_ball_number=selected_t_ball_array[mm];
            if(temp_o_t_ball_number!=undefined&&temp_o_t_ball_number!=""){
              if(eval(temp_o_d_ball_number)==eval(temp_o_t_ball_number)){
                op_flag=true;
                break;
              }
            }
          }
        }
        
        if(op_flag==true){
          break;
        }
      }
      
      if(op_flag==false){
        if(d_count==1){
          if(t_count>=5){
            itemcount=t_count*(t_count-1)*(t_count-2)*(t_count-3)*(t_count-4)/(5*4*3*2);
          }
        } else if(d_count==2){
          if(t_count>=4){
            itemcount=t_count*(t_count-1)*(t_count-2)*(t_count-3)/(4*3*2);
          }
        } else if(d_count==3){
          if(t_count>=3){
            itemcount=t_count*(t_count-1)*(t_count-2)/(3*2);
          }
        } else if(d_count==4){
          if(t_count>=2){
            itemcount=t_count*(t_count-1)/2;
          }
        } else if(d_count==5){
          if(t_count>=1){
            itemcount=t_count;
          }
        }
        }
    }

    return itemcount;
  }

  function syxwtdwzw() {
    var selected_d_ball_array = [];
    var selected_t_ball_array = [];

    for(var ss = 0; ss< currNumber.length; ss++){
      for(var sss = 0; sss < currNumber[ss].length; sss++){
        if(ss == 0){
          selected_d_ball_array[parseInt(currNumber[ss][sss])] = currNumber[ss][sss];
        }else if(ss == 1){
          selected_t_ball_array[parseInt(currNumber[ss][sss])] = currNumber[ss][sss];
        }
      }   
    }

    var d_count=currNumber[0].length;
    var t_count=currNumber[1].length;

    var itemcount=0;

    if(d_count<=4&&d_count>0){
      
      var op_flag=false;
      
      for(var oo=0;oo<selected_d_ball_array.length;oo++){
        
        var temp_o_d_ball_number=selected_d_ball_array[oo];
        
        if(temp_o_d_ball_number!=undefined&&temp_o_d_ball_number!=""){
          
          for(var mm=0;mm<selected_t_ball_array.length;mm++){
            
            var temp_o_t_ball_number=selected_t_ball_array[mm];
            
            if(temp_o_t_ball_number!=undefined&&temp_o_t_ball_number!=""){
              if(eval(temp_o_d_ball_number)==eval(temp_o_t_ball_number)){
                
                op_flag=true;
                break;
              }
            }
          }
        }
        
        if(op_flag==true){
          break;
        }
      }
      
      if(op_flag==false){
        if(d_count==1){
          if(t_count>=4){
            itemcount=t_count*(t_count-1)*(t_count-2)*(t_count-3)/(4*3*2);
          }
        } else if(d_count==2){
          if(t_count>=3){
            itemcount=t_count*(t_count-1)*(t_count-2)/(3*2);
          }
        } else if(d_count==3){
          if(t_count>=2){
            itemcount=t_count*(t_count-1)/2;
          }
        } else if(d_count==4){
          if(t_count>=1){
            itemcount=t_count;
          }
        }
        }
    }

    return itemcount;
  }

  function syxwtdszs(){
    var selected_d_ball_array = [];
    var selected_t_ball_array = [];

    for(var ss = 0; ss< currNumber.length; ss++){
      for(var sss = 0; sss < currNumber[ss].length; sss++){
        if(ss == 0){
          selected_d_ball_array[parseInt(currNumber[ss][sss])] = currNumber[ss][sss];
        }else if(ss == 1){
          selected_t_ball_array[parseInt(currNumber[ss][sss])] = currNumber[ss][sss];
        }
      }   
    }

    var d_count=currNumber[0].length;
    var t_count=currNumber[1].length;

    var itemcount=0;
					
    if(d_count<=3&&d_count>0){
      
      var op_flag=false;
      
      for(var oo=0;oo<selected_d_ball_array.length;oo++){
        
        var temp_o_d_ball_number=selected_d_ball_array[oo];
        
        if(temp_o_d_ball_number!=undefined&&temp_o_d_ball_number!=""){
          
          for(var mm=0;mm<selected_t_ball_array.length;mm++){
            
            var temp_o_t_ball_number=selected_t_ball_array[mm];
            
            if(temp_o_t_ball_number!=undefined&&temp_o_t_ball_number!=""){
              if(eval(temp_o_d_ball_number)==eval(temp_o_t_ball_number)){
                
                op_flag=true;
                break;
              }
            }
          }
        }
        
        if(op_flag==true){
          break;
        }
      }
      
      if(op_flag==false){
        if(d_count==1){
          if(t_count>=3){
            itemcount=t_count*(t_count-1)*(t_count-2)/(3*2);
          }
        } else if(d_count==2){
          if(t_count>=2){
            itemcount=t_count*(t_count-1)/2;
          }
        } else if(d_count==3){
          if(t_count>=1){
            itemcount=t_count;
          }
        }
        }
    }

    return itemcount;
  }

  function syxwqezxbd(){
    var balld = [];
    var ballt = [];

    for(var ss = 0; ss< currNumber.length; ss++){
      for(var sss = 0; sss < currNumber[ss].length; sss++){
        if(ss == 0){
          balld[parseInt(currNumber[ss][sss])] = currNumber[ss][sss];
        }else if(ss == 1){
          ballt[parseInt(currNumber[ss][sss])] = currNumber[ss][sss];
        }
      }   
    }

    var d_count=currNumber[0].length;
    var t_count=currNumber[1].length;

    var itemcount=0;
    var b=true;
    for (var i = 0; i < ballt.length; i++) {
      if(ballt[i]!=""){
        for(var j=0;j<balld.length;j++)
              if(ballt[i]==balld[j]&&balld[j]!=null){
                b=false;
                break;
              }
      }
    }
    if(b){
      if(d_count==1&&t_count>=1){
        itemcount=parseInt(t_count);
      }
    }

    return itemcount;
  }

  function syxwqezxfs(){
    var ballw = [];
    var ballq = [];
    for(var ss = 0; ss< currNumber.length; ss++){
      for(var sss = 0; sss < currNumber[ss].length; sss++){
        if(ss == 0){
          ballw[parseInt(currNumber[ss][sss])] = currNumber[ss][sss];
        }else if(ss == 1){
          ballq[parseInt(currNumber[ss][sss])] = currNumber[ss][sss];
        }
      }   
    }
    var itemcount = 0;
    for (var i = 0; i < ballw.length; i++) {
        for (var j = 0; j < ballq.length; j++) {
              if(ballw[i]!=undefined&&ballq[j]!=undefined&&ballw[i]!=""&&ballq[j]!=""){
                  if (ballw[i] != ballq[j]) {
                    itemcount++;
                  }
              }
        }
    }
    return itemcount;
  }

  function syxwzxbd(){
    var balld = [];
    var ballt = [];
    for(var ss = 0; ss< currNumber.length; ss++){
      for(var sss = 0; sss < currNumber[ss].length; sss++){
        if(ss == 0){
          balld[parseInt(currNumber[ss][sss])] = currNumber[ss][sss];
        }else if(ss == 1){
          ballt[parseInt(currNumber[ss][sss])] = currNumber[ss][sss];
        }
      }   
    }
    var d_count=currNumber[0].length;
    var t_count=currNumber[1].length;
    var itemcount=0;
    var b=true;
    for (var i = 0; i < ballt.length; i++) {
      if(ballt[i]!=""){
        for(var j=0;j<balld.length;j++)
              if(ballt[i]==balld[j]&&balld[j]!=null){
                b=false;
                break;
              }
      }
      }
    if(b){
      if(d_count==1&&t_count>1){
        itemcount=parseInt(t_count)*(parseInt(t_count)-1)/2;
      }
      if(d_count==2&&t_count>=1){
        itemcount=parseInt(t_count);
      }
    }
    return itemcount;
  }

  function syxwQsfs(){
    var ballw = [];
    var ballq = [];
    var ballb = [];
    for(var ss = 0; ss< currNumber.length; ss++){
      for(var sss = 0; sss < currNumber[ss].length; sss++){
        if(ss == 0){
          ballw[parseInt(currNumber[ss][sss])] = currNumber[ss][sss];
        }else if(ss == 1){
          ballq[parseInt(currNumber[ss][sss])] = currNumber[ss][sss];
        }else if(ss == 2){
          ballb[parseInt(currNumber[ss][sss])] = currNumber[ss][sss];
        }
      }   
    }
    
    var itemcount = 0;
    for (var i = 0; i < ballw.length; i++) {
        for (var j = 0; j < ballq.length; j++) {
            for (var k = 0; k < ballb.length; k++) {
              if(ballw[i]!=undefined&&ballq[j]!=undefined&&ballb[k]!=undefined&&ballw[i]!=""&&ballq[j]!=""&&ballb[k]!=""){
                  if (ballw[i] != ballq[j] && ballw[i] != ballb[k] && ballq[j] != ballb[k]) {
                    itemcount++;
                  }
              }
            }
        }
    }
    return itemcount;
  }

  var d_balls = [];
  var t_balls = [];
  var d_count = 0;
  var t_count = 0;
  function combineArrUpdata(){
    d_balls = [];
    t_balls = [];
    d_count = 0;
    t_count = 0;
    for(var i = 0; i < currNumber.length; i++){
      for(var j = 0; j < currNumber[i].length; j++){
        if(i == 0){
          d_balls[currNumber[i][j]] = currNumber[i][j]
        }else{
          t_balls[currNumber[i][j]] = currNumber[i][j]
        }
      }
      if(i == 0){
        d_count = currNumber[i].length;
      }else{
        t_count = currNumber[i].length;
      }
    }
  }

  var arrexzuxhz = [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 4, 4, 3, 3, 2, 2, 1, 1];
  function exzuxhz() {
    var itemcount = 0;
    var vballs = [];
    for(var i = 0; i < currNumber.length; i++){
      for(var k = 0; k < currNumber[i].length; k++){
          vballs[currNumber[i][k]] = currNumber[i][k]
      }
    }
    for (j = 0; j < vballs.length; j++) {
      if (vballs[j] != "" && !isNaN(vballs[j])) {
        itemcount += arrexzuxhz[parseInt(vballs[j])];
      }
    }
    return itemcount;
  }

  var arrkuaduex = [10, 18, 16, 14, 12, 10, 8, 6, 4, 2];
  function exkuadu() {
    var itemcount = 0;
    var vballs = [];
    for(var i = 0; i < currNumber.length; i++){
      for(var k = 0; k < currNumber[i].length; k++){
          vballs[currNumber[i][k]] = currNumber[i][k]
      }
    }
    for (j = 0; j < vballs.length; j++) {
      if (vballs[j] != "" && !isNaN(vballs[j])) {
        itemcount += arrkuaduex[parseInt(vballs[j])];
      }
    }
    return itemcount;
  }

  var arrzxhzex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  function hezxhz(){
    var itemcount = 0;
    var vballs = [];
    for(var i = 0; i < currNumber.length; i++){
      for(var k = 0; k < currNumber[i].length; k++){
          vballs[currNumber[i][k]] = currNumber[i][k]
      }
    }
    for (j = 0; j < vballs.length; j++) {
      if (vballs[j] != "" && !isNaN(vballs[j])) {
        itemcount += arrzxhzex[parseInt(vballs[j])];
      }
    }

    return itemcount;
  }  

  var arrzuxhz = [1, 2, 2, 4, 5, 6, 8, 10, 11, 13, 14, 14, 15, 15, 14, 14, 13, 11, 10, 8, 6, 5, 4, 2, 2, 1];
  function qszuxhzCombine(){
    var itemcount = 0;
    var vballs = [];
    var string = [];
    for(var i = 0; i < currNumber.length; i++){
      for(var k = 0; k < currNumber[i].length; k++){
          vballs[currNumber[i][k]] = currNumber[i][k];
      }
    }
    for (j = 0; j < vballs.length; j++) {
      if (vballs[j] != "" && !isNaN(vballs[j])) {
        
        itemcount += parseInt(arrzuxhz[parseInt(vballs[j]) - 1]);
      }
    }
    return itemcount;
  }

  var arrkuadusx = [10, 54, 96, 126, 144, 150, 144, 126, 96, 54];
  function qskdCombine(){
    var itemcount = 0;
    var vballs = [];
    for(var i = 0; i < currNumber.length; i++){
      for(var k = 0; k < currNumber[i].length; k++){
          vballs[currNumber[i][k]] = currNumber[i][k]
      }
    }
    for (j = 0; j < vballs.length; j++) {
      if (vballs[j] != "" && !isNaN(vballs[j])) {
        itemcount += arrkuadusx[parseInt(vballs[j])];
      }
    }

    return itemcount;
  }

  var arrzxhz = [1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 63, 69, 73, 75, 75, 73, 69, 63, 55, 45, 36, 28, 21, 15, 10, 6, 3, 1];
  function qszxhzCombine(){
    var itemcount = 0;
    var vballs = [];
    for(var i = 0; i < currNumber.length; i++){
      for(var k = 0; k < currNumber[i].length; k++){
          vballs[currNumber[i][k]] = currNumber[i][k]
      }
    }
    for (var j = 0; j < vballs.length; j++) {
      if (vballs[j] != "" && !isNaN(vballs[j])) {
        itemcount += arrzxhz[parseInt(vballs[j])];
      }
    }

    return itemcount;
  }

  function sxCombine4(){
    combineArrUpdata();
    var itemcount = 0;
    if(d_count > 0 && t_count > 0) {
      for(var i = 0; i < d_balls.length; i++) {
        if(d_balls[i] != undefined && d_balls[i] != "") {
          if(t_balls[i] != undefined && t_balls[i] != "") {
            if(t_count > 1) {
              itemcount += t_count-1;
            }
          } else {
            itemcount += t_count;
          }
        }
      }
    }
    return itemcount;
  }

  function sxCombine12(){
    combineArrUpdata();
    var itemcount = 0;	
    if(d_count > 0 && t_count > 1) {
      for(var i = 0; i < d_balls.length; i++) {
        if(d_balls[i] != undefined && d_balls[i] != "") {
          if(t_balls[i] != undefined && t_balls[i] != "") {
            if(t_count > 2) {
              itemcount += (t_count-1)*(t_count-2)/2;
            }
          } else {
            itemcount += t_count*(t_count-1)/2;
          }
        }
      }
    }
    return itemcount;
  }

  function combine5(){
    combineArrUpdata();
    var itemcount = 0;
    if(d_count > 0 && t_count > 0) {
      for(var i = 0; i < d_balls.length; i++) {
        if(d_balls[i] != undefined && d_balls[i] != "") {
          if(t_balls[i] != undefined && t_balls[i] != "") {
            if(t_count > 1) {
              itemcount += t_count-1;
            }
          } else {
            itemcount += t_count;
          }
        }
      }
    }
    return itemcount;
  }

  function combine10(){
    combineArrUpdata();
    var itemcount = 0;	
    if(d_count > 0 && t_count > 0) {
      for(var i = 0; i < d_balls.length; i++) {
        if(d_balls[i] != undefined && d_balls[i] != "") {
          if(t_balls[i] != undefined && t_balls[i] != "") {
            if(t_count > 1) {
              itemcount += t_count-1;
            }
          } else {
            itemcount += t_count;
          }
        }
      }
    }
    return itemcount;
  }

  function combine20(){
    combineArrUpdata();
    var itemcount = 0;
    if(d_count > 0 && t_count > 1) {
      for(var i = 0; i < d_balls.length; i++) {
        if(d_balls[i] != undefined && d_balls[i] != "") {
          if(t_balls[i] != undefined && t_balls[i] != "") {
            if(t_count > 2) {
              itemcount += (t_count-1)*(t_count-2)/2;
            }
          } else {
            itemcount += t_count*(t_count-1)/2;
          }
        }
      }
    }
    return itemcount;
  }

  function combine30(){
    combineArrUpdata();
    var itemcount = 0;
    if(d_count > 1 && t_count > 0 ) {
      for(var i = 0; i < t_balls.length; i++) {
        if(t_balls[i] != undefined && t_balls[i] != "") {
          if(d_balls[i] != undefined && d_balls[i] != "") {
            if(d_count > 2) {
              itemcount += (d_count-1)*(d_count-2)/2;
            }
          } else {
            itemcount += d_count*(d_count-1)/2;
          }
        }
      }
    }
    return itemcount;
  }

  function combine60(){
    combineArrUpdata();
    var recount = 0; //重复数
    if (d_balls && d_balls.length > 0 && t_balls && t_balls.length > 0) {
      for (i = 0; i < d_balls.length; i++) {
        for (j = 0; j < t_balls.length; j++){
          if (t_balls[j] && t_balls[j] == d_balls[i]) {
            recount++;
          }
        }
      }
    } 

    var itemcount = 0;
    if( t_count>=3 && d_count>=1) {
      for(d_count; d_count>0; d_count--) {
        if(recount>0) {
          var diffcount = t_count-4;
          var topcount = t_count-1;
          var subcount =  t_count-4;
          if(diffcount > 0) {
            var temp = t_count-1;
            while( diffcount>1 ) {
              diffcount--;
              temp--;
              topcount =  topcount * temp;
              subcount = subcount * diffcount;
            }
            itemcount += (topcount/subcount);
          }else if(diffcount < 0) {
            
          }else {
            itemcount += 1;
          }
          recount--;
        }else {
          var diffcount = t_count-3;
          var topcount = t_count;
          var subcount =  t_count-3;
          if(diffcount > 0) {
            var temp = t_count;
            while( diffcount>1 ) {
              diffcount--;
              temp--;
              topcount =  topcount * temp;
              subcount = subcount * diffcount;
            }
            itemcount += (topcount/subcount);
          }else {
            itemcount += 1;
          }
        }
      }
    }
    return itemcount;
  }

  //投注区删除单个
  $('.yBettingLists').on('click','.sc',function (){
    var len = $('.yBettingLists').find('.yBettingList');
    var _id = $(this).parent().attr('id');
    var indexs = 0;
    len.each(function (i){
      if(_id == orderList[i].trano){
        indexs = i;
      }
    });
    orderList.splice(indexs,1);
    $(this).parents('.yBettingList').remove();
    //console.log(orderList);
    countAll();
  })

  //少于一注
  $('.yBettingLists').on('click','.numberInfo',function(){
    var text = $(this).siblings('.number').find('em').text();
    alt(text);
  })

  //清空单号
  $('#orderlist_clear').on('click',function (){
    $('.yBettingLists').html('');
    orderList = [];
    countAll();
  })

  //单式textarea框
  $('.g_Number_Section').on('change keyup','#text',function (){
    chkPrice(this);
    chkLast(this);
    var text = $('#text').val();
    checkNumber(text,danshiNumberL);
    yesArr = unique1(yesArr);
    currNumber = yesArr;
    zhushus = yesArr;
    countMoney();
  })

  //去重数组
  function unique1(args){
    var str1 = [];
    for(var i=0;i<args.length;i++){
      if(str1.indexOf(args[i])<0){
          str1.push(args[i])
      }
    }
    return str1;
  }

  //删除错误项
  $('.g_Number_Section').on('click','.remove_btn',function (){
    var text = $('#text').val();
    checkNumber(text,danshiNumberL,'remove');
  })

  //检查格式是否正确
  $('.g_Number_Section').on('click','.test_istrue',function (){
    var text = $('#text').val();
    checkNumber(text,danshiNumberL,'test');
  })

  //清空文本
  $('.g_Number_Section').on('click','.empty_text',function (){
    $('#text').val('');
    currNumber = [];
    zhushus = []; 
    countMoney();
  })

  //玩法内容切换
  $('.bet_filter_box').on('click','.bet_options',function (){
    var _thisType = $(this).attr('lottery_code_two');
    $('#bet_filter').find('.bet_options').removeClass('curr');
    $(this).addClass('curr');
    $('.g_Number_Section').html('');
    currNumber = [];
    zhushus = []; 
    countMoney();
    _thisPlayid = _thisType;
    rates = yrates[_thisPlayid];
  
    switch(_thisType){
      case 'x5qsfs':
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从01-11共11个号码中选择3个不重复的号码组成一注，所选号码与当期顺序摇出的5个号码中 的前3个号码相同，且顺序一致，即为中奖，奖金 <em style="color:red;">'+rates.maxjj+'</em>元');
        gameNumber(syxw_x5qsfs,11,1);
        break;
      case 'x5qsds':
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('手动输入3个号码组成一注，所输入的号码与当期顺序摇出的5个号码中 的前3个号码相同，且顺序一致，即为中奖，奖金 <em style="color:red;">'+rates.maxjj+'</em>元');
        danshiNumberL = 2;
        danshiGame();
        break;
      case 'x5qszx':
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从01-11共11个号码中选择3个不重复的号码组成一注，所选号码与当期顺序摇出的5个号码中 的前3个号码相同，且顺序不限，即为中奖，奖金 <em style="color:red;">'+rates.maxjj+'</em>元');
        gameNumber(syxw_x5qszx,11,1);
        break;
      case 'x5qszxds':
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('手动输入3个号码组成一注，所输入的号码与当期顺序摇出的5个号码中 的前3个号码相同，且顺序不限，即为中奖，奖金 <em style="color:red;">'+rates.maxjj+'</em>元');
        danshiNumberL = 2;
        danshiGame();
        break;
      case 'x5qsdt':
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从01-11共11个号码中至少选择3个以上号码进行投注，每注需至少包括1个胆码及2个拖码。只要当期的前三位开奖号码中有3个包含所选号码（每注包含3个号码），即为中奖，奖金 <em style="color:red;">'+rates.maxjj+'</em>元');
        gameNumber(syxw_x5qsdt,11,1);
        break;
      case 'x5qefs':
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从01-11共11个号码中选择2个不重复的号码组成一注，所选号码与当期顺序摇出的5个号码中 的前2个号码相同，且顺序一致，即为中奖，奖金  <em style="color:red;">'+rates.maxjj+'</em>元');
        gameNumber(syxw_x5qefs,11,1);
        break;
      case 'x5qeds':
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('手动输入2个号码组成一注，所输入的号码与当期顺序摇出的5个号码中 的前2个号码相同，且顺序一致，即为中奖，奖金  <em style="color:red;">'+rates.maxjj+'</em>元');
        danshiNumberL = 2;
        danshiGame();
        break;
      case 'x5qezx':
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从01-11共11个号码中选择2个不重复的号码组成一注，所选号码与当期顺序摇出的5个号码中 的前2个号码相同，且顺序不限，即为中奖，奖金  <em style="color:red;">'+rates.maxjj+'</em>元');
        gameNumber(syxw_x5qezx,11,1);
        break;
      case 'x5qezxds':
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('手动输入2个号码组成一注，所输入的号码与当期顺序摇出的5个号码中 的前2个号码相同，且顺序不限，即为中奖，奖金  <em style="color:red;">'+rates.maxjj+'</em>元');
        danshiNumberL = 2;
        danshiGame();
        break;
      case 'x5qedt':
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从01-11共11个号码中至少选择2个以上号码进行投注，每注需至少包括1个胆码及1个拖码。只要当期的前二位开奖号码中有2个包含所选号码（每注包含2个号码），即为中奖，奖金   <em style="color:red;">'+rates.maxjj+'</em>元');
        gameNumber(syxw_x5qedt,11,1);
        break;
      case 'x5bdwqs':
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从01-11共11个号码中选择1个号码，每注由1个号码组成，只要当期顺序摇出的第一位、第二位、第三位开奖号码中包含所选号码，奖金   <em style="color:red;">'+rates.maxjj+'</em>元');
        gameNumber(syxw_x5bdwqs,11,1);
        break;
      case 'x5dwd':
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从第一位、第二位、第三位任意1个位置或多个位置上选择1个号码，所选号码与相同位置上的开奖号码一致，奖金   <em style="color:red;">'+rates.maxjj+'</em>元');
        gameNumber(syxw_x5dwd,11,1);
        break;
      case 'x5dds':

        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从6种单双个数组合中选择1种组合，当开奖号码的单双个数与所选单双组合一致   <span class="moneyInfo">奖金详情</span>');
        addMoneyInfo(syxw_x5dds,rates.maxjj);
        gameNumberQw(syxw_x5dds);
        break;
      case 'x5czw':
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从3-9中选择1个号码进行购买，所选号码与5个开奖号码按照大小顺序排列后的第3个号码相同，即为中奖   <em style="color:red;">'+rates.maxjj+'</em>元');
        gameNumber(syxw_x5czw,9,3);
        break;
      case 'x5rx1z1':
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从01-11共11个号码中选择1个号码进行购买，当期的5个开奖号码中包含所选号码，奖金   <em style="color:red;">'+rates.maxjj+'</em>元');
        gameNumber(syxw_x5rx1z1,11,1);
        break;
      case 'x5rx2z2':
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从01-11共11个号码中选择2个号码进行购买，只要当期的5个开奖号码中包含所选号，奖金   <em style="color:red;">'+rates.maxjj+'</em>元');
        gameNumber(syxw_x5rx2z2,11,1);
        break;
      case 'x5rx3z3':
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从01-11共11个号码中选择3个号码进行购买，只要当期的5个开奖号码中包含所选号码，即为中奖，奖金  <em style="color:red;">'+rates.maxjj+'</em>元');
        gameNumber(syxw_x5rx3z3,11,1);
        break;
      case 'x5rx4z4':
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从01-11共11个号码中选择4个号码进行购买，只要当期的5个开奖号码中包含所选号码，即为中奖，奖金  <em style="color:red;">'+rates.maxjj+'</em>元');
        gameNumber(syxw_x5rx4z4,11,1);
        break;
      case 'x5rx5z5':
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从01-11共11个号码中选择5个号码进行购买，只要当期的5个开奖号码中包含所选号码，即为中奖，奖金  <em style="color:red;">'+rates.maxjj+'</em>元');
        gameNumber(syxw_x5rx5z5,11,1);
        break;
      case 'x5rx6z5':
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从01-11共11个号码中选择6个号码进行购买，只要当期的5个开奖号码中包含所选号码，即为中奖，奖金  <em style="color:red;">'+rates.maxjj+'</em>元');
        gameNumber(syxw_x5rx6z5,11,1);
        break;
      case 'x5rx7z5':
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从01-11共11个号码中选择7个号码进行购买，只要当期的5个开奖号码中包含所选号码，即为中奖，奖金  <em style="color:red;">'+rates.maxjj+'</em>元');
        gameNumber(syxw_x5rx7z5,11,1);
        break;
      case 'x5rx8z5':
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从01-11共11个号码中选择8个号码进行购买，只要当期的5个开奖号码中包含所选号码，即为中奖，奖金  <em style="color:red;">'+rates.maxjj+'</em>元');
        gameNumber(syxw_x5rx8z5,11,1);
        break;
      case 'x5rxds1z1':
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从01-11中手动输入1个号码进行购买，只要当期的5个开奖号码中包含所选号码，奖金  <em style="color:red;">'+rates.maxjj+'</em>元');
        danshiNumberL = 2;
        danshiGame();
        break; 
      case 'x5rxds2z2':
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从01-11中手动输入2个号码进行购买，只要当期的5个开奖号码中包含所选号码，奖金  <em style="color:red;">'+rates.maxjj+'</em>元');
        danshiNumberL = 2;
        danshiGame();
        break; 
      case 'x5rxds3z3':
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从01-11中手动输入3个号码进行购买，只要当期的5个开奖号码中包含所选号码，即为中奖，奖金  <em style="color:red;">'+rates.maxjj+'</em>元');
        danshiNumberL = 2;
        danshiGame();
        break; 
      case 'x5rxds4z4':
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从01-11中手动输入4个号码进行购买，只要当期的5个开奖号码中包含所选号码，即为中奖，奖金  <em style="color:red;">'+rates.maxjj+'</em>元');
        danshiNumberL = 2;
        danshiGame();
        break;
      case 'x5rxds5z5':
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从01-11中手动输入5个号码进行购买，只要当期的5个开奖号码中包含所选号码，即为中奖，奖金  <em style="color:red;">'+rates.maxjj+'</em>元');
        danshiNumberL = 2;
        danshiGame();
        break;
      case 'x5rxds6z5':
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从01-11中手动输入6个号码进行购买，只要当期的5个开奖号码中包含所选号码，即为中奖，奖金  <em style="color:red;">'+rates.maxjj+'</em>元');
        danshiNumberL = 2;
        danshiGame();
        break;
      case 'x5rxds7z5':
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从01-11中手动输入7个号码进行购买，只要当期的5个开奖号码中包含所选号码，即为中奖，奖金  <em style="color:red;">'+rates.maxjj+'</em>元');
        danshiNumberL = 2;
        danshiGame();
        break;
      case 'x5rxds8z5':
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从01-11中手动输入8个号码进行购买，只要当期的5个开奖号码中包含所选号码，即为中奖，奖金  <em style="color:red;">'+rates.maxjj+'</em>元');
        danshiNumberL = 2;
        danshiGame();
        break;
      case 'x5dt2z2':
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从01-11共11个号码中至少选择2个以上号码进行投注，每注需至少包括1个胆码及1个拖码。只要当期的5个开奖号码中有2个包含所选号码（每注包含2个号码），即为中奖，奖金  <em style="color:red;">'+rates.maxjj+'</em>元');
        gameNumber(syxw_rxtd_x5dt2z2,11,1);
        break;
      case 'x5dt3z3':
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从01-11共11个号码中至少选择3个以上号码进行投注，每注需至少包括1个胆码及2个拖码。只要当期的5个开奖号码中有3个包含所选号码（每注包含3个号码），即为中奖，奖金  <em style="color:red;">'+rates.maxjj+'</em>元');
        gameNumber(syxw_rxtd_x5dt2z2,11,1);
        break;
      case 'x5dt4z4':
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从01-11共11个号码中至少选择4个以上号码进行投注，每注需至少包括1个胆码及3个拖码。只要当期的5个开奖号码中有4个包含所选号码（每注包含4个号码），即为中奖，奖金  <em style="color:red;">'+rates.maxjj+'</em>元');
        gameNumber(syxw_rxtd_x5dt2z2,11,1);
        break;
      case 'x5dt5z5':
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从01-11共11个号码中至少选择5个以上号码进行投注，每注需至少包括1个胆码及4个拖码。只要所选的每注5个号码和当期的5个开奖号码全部相同，即为中奖，奖金  <em style="color:red;">'+rates.maxjj+'</em>元');
        gameNumber(syxw_rxtd_x5dt2z2,11,1);
        break;
      case 'x5dt6z5':
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从01-11共11个号码中至少选择6个以上号码进行投注，每注需至少包括1个胆码及5个拖码。只要所选的每注6个号码当中，有5个和当期的5个开奖号码全部相同，即为中奖，奖金  <em style="color:red;">'+rates.maxjj+'</em>元');
        gameNumber(syxw_rxtd_x5dt2z2,11,1);
        break;
      case 'x5dt7z5':
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从01-11共11个号码中至少选择7个以上号码进行投注，每注需至少包括1个胆码及6个拖码。只要所选的每注7个号码当中，有5个和当期的5个开奖号码全部相同，即为中奖，奖金  <em style="color:red;">'+rates.maxjj+'</em>元');
        gameNumber(syxw_rxtd_x5dt2z2,11,1);
        break;
      case 'x5dt8z5':
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从01-11共11个号码中至少选择8个以上号码进行投注，每注需至少包括1个胆码及7个拖码。只要所选的每注8个号码当中，有5个和当期的5个开奖号码全部相同，即为中奖，奖金  <em style="color:red;">'+rates.maxjj+'</em>元');
        gameNumber(syxw_rxtd_x5dt2z2,11,1);
        break;
    }
  })

  function addMoneyInfo(text,money) {

    if($('.moneyInfoHover').length > 0 ){
      $('.moneyInfoHover').remove();
    }
    var html = '<div class="moneyInfoHover" >'+
                  '<table class="moneyInfoTable" >'+
                    '<tr>'+
                      '<th>猜中</th>'+
                      '<th>单注最高奖金</th>'+
                    '</tr>';
                
    var moneyList = money.split('|');
    for(var i in text){
      html += '<tr><th>'+text[i]+'</th><th>'+moneyList[i]+'</th></tr>';
    }
    html += '</table></div>';
    $('.moneyInfo').append(html);

  }
  
  function updateMaxJJ() {

    var beishusss = parseInt($('.selectMultipInput').val());
    var newnewmaxJJs = 0;
    var MaxJJ = '';
    MaxJJ = rates.maxjj;
    MaxJJ = MaxJJ.split('|');
    newmaxJJ = '';
    for(var j = 0; j < MaxJJ.length; j++){
      newnewmaxJJs = (MaxJJ[j] * beishusss).toFixed(2);
      if(j == MaxJJ.length - 1){
        newmaxJJ += newnewmaxJJs;
      }else{
        newmaxJJ += newnewmaxJJs + '|';
      }
    }
  }

  function gameNumberQw(arr){
    var box = $('.g_Number_Section');
    var boxList = $('<div class="kl8_qw selectNumbers"></div>');

    for(var j in arr){
      boxList.append('<a href="javascript:void(0);" class="selectNumber kl8_qw_number" data-number="'+j+'">'+arr[j]+'</a>');
    }
    box.append(boxList);
  }
  
  function gameNumberZxbd(arr,type){
    var box = $('.g_Number_Section');
    var dxdsObj = {
      '0': '大',
      '1': '小',
      '2': '单',
      '3': '双'
    }
    for(var i = 0;i<arr.length;i++){
      var boxList = $('<div class="selectNmuverBox"></div>');
      if(type == 'dxds'){
        var boxNumber = $('<div class="selectNumbers" style="padding: 0 148px;"></div>');
      }else{
        var boxNumber = $('<div class="selectNumbers"></div>');
      }
      
      boxList.append('<span class="numberTitle">'+arr[i]+'</span>');
      boxList.append(boxNumber);
      if(type == 'dxds'){
        for(var j in dxdsObj){
          boxNumber.append('<a href="javascript:void(0);" class="selectNumber" data-number="'+j+'">'+dxdsObj[j]+'</a>');
        }
      }else{
        for(var j = 0;j<=9;j++){
          boxNumber.append('<a href="javascript:void(0);" class="selectNumber" data-number="'+j+'">'+j+'</a>');
        }
      }
      
      box.append(boxList);
    }
  }

  function xselectRmb(moneyStr,selectRmb) {
    var moneyListArr = moneyStr.split('|');
    var moneyListStr = '';
    for( var i = 0; i < moneyListArr.length; i++){
      if(i == moneyListArr.length - 1){
        moneyListStr += (moneyListArr[i] * selectRmb).toFixed(2);
      }else{
        moneyListStr += (moneyListArr[i] * selectRmb).toFixed(2) + '|';
      }
    }
    return moneyListStr;
  }

  //确认选号，添加到投注区
  $('.addtobetbtn').on('click',function (){
    var yBetting = $('.yBettingList');
    var menu0 = $('.play_select_tit').find('.curr').text();
    var menu1 = $('#bet_filter').find('.curr').parent().siblings('.title').text();
    var menu2 = $('#bet_filter').find('.curr').text();
    var times = $('.selectMultipInput').val();
    var selectRmb = $('.selectMultipleCon').val();
    var selectRmbStr = $('.selectMultipleCon').find('option:selected').text();
    var Numbers = '';
    var winningMoney = $('.play_select_prompt').find('span[way-data="tabDoc"] em').text();
    var winningMoneys = times * winningMoney * selectRmb;
    var bool = true;
    var trano= generateMixed(20);
    var rate = yrates[_thisPlayid];

    if(zhushus.length >= 1){
      for(var i = 0; i < currNumber.length; i++){
        for(var j = 0; j < currNumber[i].length; j++){
            if(typeof currNumber[i] == 'string'){
              currNumber[i] = currNumber[i].split(' ')
            }
            if((currNumber[i].length - 1) != j){
              Numbers += currNumber[i][j] +　' ';
            }else{
              Numbers += currNumber[i][j]
            }
        }
        if((currNumber.length - 1) != i){
          Numbers = Numbers + ',';
        }
      }
    
      yBetting.each(function (i) {
        var gameNumber = $(this).find('.number em').text();
        var gameNumberType = $(this).find('.number .yBettingType').text();
        var _thisType = '['+menu0+','+menu1+','+menu2+']';
        var _thisRmb = $(this).find('.rmb').text();
       
        if(gameNumber == Numbers && _thisRmb == selectRmbStr && gameNumberType == _thisType){
          bool = false;
          var _thisTimes =  parseInt($(this).find('.yBettingTimess').text()) + parseInt(times);
          winningMoneys = _thisTimes * winningMoney * selectRmb;
          winningMoneys = winningMoneys.toFixed(2);
          $(this).find('.yBettingTimess').text(_thisTimes);
          $(this).find('.maxMoneyNumber').text(winningMoneys+'元');
          $(this).find('#betting_money').text(zhushus.length * minMoney * _thisTimes *  selectRmb);
          orderList[i].beishu = _thisTimes;
          orderList[i].price = zhushus.length * minMoney * _thisTimes *  selectRmb;
        }
      })
      
      if(bool){
        
          
        var Numbersh = Numbers.replace(/,/g,'|');
            Numbersh = Numbersh.replace(/\s/g,',');

        // if(_thisPlayid == 'x5dds'){
        //   updateMaxJJ();
          
        //   var arr = {
        //     'trano': trano,
        //     'playtitle': rate.title,
        //     'playid': rate.playid,
        //     'number': Numbersh,
        //     'zhushu': zhushus.length,
        //     'price': lastMoney,
        //     'minxf': rate.minxf,
        //     'totalzs': rate.totalzs,
        //     'maxjj': xselectRmb(newmaxJJ,selectRmb),
        //     'minjj': xselectRmb(rate.minjj,selectRmb),
        //     'maxzs': rate.maxzs,
        //     'rate': xselectRmb(newmaxJJ,selectRmb),
        //     'beishu': parseInt(times),
        //     'yjf' : selectRmb
        //   }
          
        // }else{
          var arr = {
            'trano': trano,
            'playtitle': rate.title,
            'playid': rate.playid,
            'number': Numbersh,
            'zhushu': zhushus.length,
            'price': lastMoney,
            'minxf': rate.minxf,
            'totalzs': rate.totalzs,
            'maxjj': rate.maxjj,
            'minjj': rate.minjj,
            'maxzs': rate.maxzs,
            'rate': rate.maxjj,
            'beishu': parseInt(times),
            'yjf' : selectRmb
          }
        // }
        
        orderList.push(arr);
        if(_thisPlayid == 'x5dds'){
          var ss = Numbers.split(' ');
          var ssString = '';
          for(var x = 0; x < ss.length; x++){
            switch(ss[x]){
              case '0':
                ssString += '5单0双 ';
                break;
              case '1':
                ssString += '4单1双 ';
                break;
              case '2':
                ssString += '3单2双 ';
                break;
              case '3':
                ssString += '2单3双 ';
                break;
              case '4':
                ssString += '1单4双 ';
                break;
              case '5':
                ssString += '0单5双 ';
                break;
            }
          }
          Numbers = ssString;
        }
        
        var html = '<dd class="yBettingList" id="'+trano+'">'+
                      '<div class="numberBox yBettingDiv">'+
                        '<span class="number"><div class="yBettingType">['+menu0+','+menu1+','+menu2+']</div> <em>'+Numbers+'</em></span>'+
                        '<a href="javascript:void(0);" class="numberInfo">详细</a> '+
                      '</div>'+
                      '&nbsp;<div class="yBettingZhushu yBettingDiv">'+
                        '<em>'+zhushus.length+'</em>注'+
                      '</div>'+
                      '&nbsp;<div class="yBettingTimes yBettingDiv">'+
                        '<em class="yBettingTimess">'+times+'</em>倍'+
                      '</div>'+
                      '&nbsp;<div class="rmb yBettingDiv">'+
                        ''+selectRmbStr+''+
                      '</div>'+
                      '&nbsp;<div class="maxMoney yBettingDiv">'+
                        '可中金额'+
                        '<em class="maxMoneyNumber">'+winningMoneys.toFixed(2)+'元</em>'+
                      '</div>'+
                      '<div class="sc" style="float: right;padding-right: 5px;">'+
                        '<a href="javascript:void(0);">'+
                          '<i class="fa fa-times" style="color: red;"></i>'+
                        '</a>'+
                      '</div>'+
                      '<div id="betting_money" style="display: none;">'+lastMoney+'</div>'+
                  '</dd>';
        $('.yBettingLists').append(html);        
      }
      //console.log(orderList);
      $('.g_Number_Section').find('a').removeClass('curr');
      $('#text').val('');
      currNumber = [];
      zhushus = [];
      countMoney();
      countAll();
     }else{
       alt('最少选择一注')
     }

  })
  
  
  //确认投注
  $(document).on("click", "#f_submit_order", function() {
    if(orderList.length<1){
      alt('请选择投注号码',-1);
      return false;
    }
    var Orderdetaillist = '';
    var Orderdetailtotalprice    = 0;
    for (var i = 0; i < orderList.length; i++) {
        var cur_order = orderList[i];
        var rate = yrates[cur_order.playid];
        var oprice = Number(cur_order.price);
        var cur_number = cur_order.number;
        Orderdetailtotalprice += oprice;

        if(_thisPlayid == 'x5dds'){
          cur_number = cur_number.replace(/0/g,'5单0双');
          cur_number = cur_number.replace(/1/g,'4单1双');
          cur_number = cur_number.replace(/2/g,'3单2双');
          cur_number = cur_number.replace(/3/g,'2单3双');
          cur_number = cur_number.replace(/4/g,'1单4双');
          cur_number = cur_number.replace(/5/g,'0单5双');
        }else{
          cur_number = cur_order.number;
        }
        Orderdetaillist +="<p>"+rate.title+':<span class="mark">'+cur_number+'</span>&nbsp;&nbsp;注数:<span class="mark">'+cur_order.zhushu+'</span>&nbsp;&nbsp;金额:<span class="mark">'+oprice.toFixed(2)+"</span></p>";
    }
    $("#Orderdetaillist").html(Orderdetaillist);
    $("#Orderdetailtotalprice").text(Orderdetailtotalprice.toFixed(2));
      //console.log(orderList);
      artDialog({
        title:"投注详情<span style='margin-left:15px;'><img src='"+WebConfigs["ROOT"]+"/resources/images/icon/icon_09.png'>截至时间:<strong class='sty-h gametimes' style='font-weight:normal'>00:00:00</strong></span>",
        content:$("#submitComfirebox").html(),
        cancel:function(){},
        ok:function(){
          if(!user){
            alt('请先登陆',-1);
          }
          $.ajax({
            type : "POST",
            url  : apirooturl + 'cpbuy',
            data : {
              "orderList":orderList,
              'expect':lottery.currFullExpect,
              'lotteryname':lotteryname
            },
            beforeSend :  function () {
              $('.looding').show();
            },
            success : function (json) {
              if(json.sign){
                $("#orderlist_clear").click();
                alt('投注成功',1);
                getUserBetsListToday(lotteryname);
              }else{
                alt(json.message,-1);
              }
              $('.looding').hide();
            }
          })
        },
        lock:true
      });
});

  //玩法切换
  $(document).on('click','#j_play_select li',function () {
    var this_attr = $(this).attr('lottery_code');
    $(this).addClass('curr').siblings('li').removeClass('curr');
    $('.g_Number_Section').html('');
    switch(this_attr){
      case 'sm':
        $('#bet_filter').remove();
        gameSwitch($('.bet_filter_box'),syxw_sm_title,syxw_sm);
        _thisPlayid = 'x5qsfs';
        rates = yrates[_thisPlayid];
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('每位至少选择一个号码，竞猜开奖号码的全部五位，号码和位置都对应即中奖，奖金 <em style="color:red;">'+rates.maxjj+'</em>元');
        gameNumber(syxw_x5qsfs,11,1);
        break;
      case 'em':
        $('#bet_filter').remove();
        gameSwitch($('.bet_filter_box'),syxw_em_title,syxw_em);
        _thisPlayid = 'x5qefs';
        rates = yrates[_thisPlayid];
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从01-11共11个号码中选择2个不重复的号码组成一注，所选号码与当期顺序摇出的5个号码中 的前2个号码相同，且顺序一致，即为中奖，奖金 <em style="color:red;">'+rates.maxjj+'</em>元');
        gameNumber(syxw_x5qefs,11,1);
        break;
      case 'bdw':
        $('#bet_filter').remove();
        gameSwitch($('.bet_filter_box'),syxw_qsymbdw_title,syxw_qsymbdw);
        _thisPlayid = 'x5bdwqs';
        rates = yrates[_thisPlayid];
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从01-11共11个号码中选择1个号码，每注由1个号码组成，只要当期顺序摇出的第一位、第二位、第三位开奖号码中包含所选号码，奖金 <em style="color:red;">'+rates.maxjj+'</em>元');
        gameNumber(syxw_x5bdwqs,11,1);
        break;
      case 'dwd':
        $('#bet_filter').remove();
        gameSwitch($('.bet_filter_box'),syxw_dwd_title,syxw_dwd);
        _thisPlayid = 'x5dwd';
        rates = yrates[_thisPlayid];
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从第一位、第二位、第三位任意1个位置或多个位置上选择1个号码，所选号码与相同位置上的开奖号码一致，奖金 <em style="color:red;">'+rates.maxjj+'</em>元');
        gameNumber(syxw_x5dwd,11,1);
        break;
      case 'qw':
        $('#bet_filter').remove();
        gameSwitch($('.bet_filter_box'),syxw_qwx_title,syxw_qwx);
        _thisPlayid = 'x5dds';
        rates = yrates[_thisPlayid];
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从6种单双个数组合中选择1种组合，当开奖号码的单双个数与所选单双组合一致 <span class="moneyInfo">奖金详情</span>');
        addMoneyInfo(syxw_x5dds,rates.maxjj);
        gameNumberQw(syxw_x5dds);
        break;
      case 'rxfs':
        $('#bet_filter').remove();
        gameSwitch($('.bet_filter_box'),syxw_rxfs_title,syxw_rxfs);
        _thisPlayid = 'x5rx1z1';
        rates = yrates[_thisPlayid];
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从01-11共11个号码中选择1个号码进行购买，当期的5个开奖号码中包含所选号码，奖金  <em style="color:red;">'+rates.maxjj+'</em>元');
        gameNumber(syxw_x5rx1z1,11,1);
        break;
      case 'rxds':
        $('#bet_filter').remove();
        gameSwitch($('.bet_filter_box'),syxw_rxds_title,syxw_rxds);
        _thisPlayid = 'x5rxds1z1';
        rates = yrates[_thisPlayid];
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从01-11中手动输入1个号码进行购买，只要当期的5个开奖号码中包含所选号码，奖金 <em style="color:red;">'+rates.maxjj+'</em>元');
        danshiNumberL = 2;
        danshiGame();
        break;
      case 'rxtd':
        $('#bet_filter').remove();
        gameSwitch($('.bet_filter_box'),syxw_rxtd_title,syxw_rxtd);
        _thisPlayid = 'x5dt2z2';
        rates = yrates[_thisPlayid];
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
          .html('从01-11共11个号码中至少选择2个以上号码进行投注，每注需至少包括1个胆码及1个拖码。只要当期的5个开奖号码中有2个包含所选号码（每注包含2个号码），即为中奖，奖金 <em style="color:red;">'+rates.maxjj+'</em>元');
        gameNumber(syxw_rxtd_x5dt2z2,11,1);
        break;
    }
  })

  //全，大，小，奇，偶，清
  $('.g_Number_Section').on('click','.selectNumberFilters a',function(){
    var _thisAttr = $(this).attr('data-param');
    switch(_thisAttr){
      case 'js-btn-all':
            $(this).parent().siblings('.selectNumbers').find('a').addClass('curr');
            break;
      case 'js-btn-big':
            $(this).parent().siblings('.selectNumbers').find('a').each(function (i){
              if(i<5){
                $(this).removeClass('curr');
              }else{
                $(this).addClass('curr');
              }
            })
            break;
      case 'js-btn-small':
            $(this).parent().siblings('.selectNumbers').find('a').each(function (i){
              if(i>=5){
                $(this).removeClass('curr');
              }else{
                $(this).addClass('curr');
              }
            })
            break;
      case 'js-btn-odd':
             $(this).parent().siblings('.selectNumbers').find('a').each(function (i){
               if(parseInt($(this).text()) % 2 == 0){
                 $(this).removeClass('curr');
               }else{
                 $(this).addClass('curr');
               }
             });
            break;
      case 'js-btn-even':
            $(this).parent().siblings('.selectNumbers').find('a').each(function (i){
               if(parseInt($(this).text()) % 2 != 0){
                 $(this).removeClass('curr');
               }else{
                 $(this).addClass('curr');
               }
             });
            break;
      case 'js-btn-clean':
            $(this).parent().siblings('.selectNumbers').find('a').removeClass('curr');
            break;
    }
    currNumber = currList();
    countFun();
    countMoney();
    if(_thisPlayid == 'x5qsdt' || _thisPlayid == 'x5qedt' || _thisPlayid == 'x5dt2z2' || _thisPlayid == 'x5dt3z3' || _thisPlayid == 'x5dt4z4' || _thisPlayid == 'x5dt5z5' || _thisPlayid == 'x5dt6z5' || _thisPlayid == 'x5dt7z5' || _thisPlayid == 'x5dt8z5'){
      var topDiv = $('.selectNumbers').eq(0);
      var bottomDiv = $('.selectNumbers').eq(1);
      var topCurr = topDiv.find('.curr');
      var topCurrTthisN = 0;
      bottomDiv.find('.curr').each(function (i){
        topCurrTthisN = $(this).attr('data-number');
        $(this).parents('.selectNmuverBox').siblings('.selectNmuverBox').find('a[data-number="'+topCurrTthisN+'"]').removeClass('curr');
      })
    }

  });

  function util_unique (v, reg, digit, itemsort, baohao) {
	if(digit==undefined || digit==null) {
		digit = 1;
	}
	//v = v.replace(/ /g, ',');
	var sszz = new Array();
	var titems = {};
	var titem;
	while((titem = reg.exec(v)) != null) {
		var key = titem[0];
		if(itemsort) {
			if(digit == 1) {
				key = key.match(/./g).sort().join('');
			} else if(digit == 2) {
				key = key.match(/.{2}/g).sort().join(' ');
			} else {
				key = key.match(/./g).sort().join('');
			}
		} else {
			if(digit == 2) {
				key = key.match(/.{2}/g).join(' ');
			}
		}
		if(!titems[key]) {
			if(baohao) {
				// 去除豹子号如222，用户前三 中三 后三 任选三混合组选
				if(!(key.charAt(0) == key.charAt(1) && key.charAt(0) == key.charAt(2) && key.charAt(1) == key.charAt(2))) {
					titems[key] = 1;
					sszz.push(key);
				}
			} else {
				titems[key] = 1;
				sszz.push(key);
			}
		}
	}
	return sszz;
};
  function sortNumber(a,b){
    return a - b
  }
  //检测相同的数字
  function checkRepeat(str){
    var arr=str.split("");
    for(var i= 0,length=arr.length;i<length-1;i++){
      if(arr.slice(i+1).indexOf(arr[i])>=0){
        return true;
      }
    }
    return false;
  }

  function checkNumber(string,len,clickObj){
    var NumberArr = string.split(' ');
    var errArr = [];
    yesArr = [];
    var errString = '';
    var yesString = '';
    var itemcount = 0;
    for( var i = 0; i < NumberArr.length; i++){
      if(NumberArr[i].length > len || NumberArr[i].length < len){
        errArr.push(NumberArr[i]);
      }else{
        yesArr.push(NumberArr[i]);
      }
    }
    for(var j = 0; j < errArr.length; j++){
      errString += errArr[j] + ' ';
    }
    for(var k = 0; k < yesArr.length; k++){
      yesString += yesArr[k] + ' ';
    }

    if(_thisPlayid == 'x5rxds1z1'){
      var v=string;
      var reg=/(0[1-9]|1[01])/g;
      
      v = v.replace(/[^\d]/g, '');
      var sszz=util_unique(v, reg, 2,true);
      sszz = sszz.sort();
      if(sszz){
        itemcount=sszz.length;
        yesArr = sszz;
      }
    }

    if(_thisPlayid == 'x5rxds2z2'){
      var v=string;
      var reg=/(0[1-9]|1[01])(?!\1)(0[1-9]|1[01])/g;
      
      v = v.replace(/[^\d]/g, '');
      var sszz=util_unique(v, reg, 2,true);
      sszz = sszz.sort();
      if(sszz){
        itemcount=sszz.length;
        yesArr = sszz;
      }
    }

    if(_thisPlayid == 'x5rxds3z3'){
      var v=string;
      var reg=/(0[1-9]|1[01])(?!\1)(0[1-9]|1[01])(?!\1|\2)(0[1-9]|1[01])/g;
      
      v = v.replace(/[^\d]/g, '');
      var sszz=util_unique(v, reg, 2,true);
      sszz = sszz.sort();
      if(sszz){
        itemcount=sszz.length;
        yesArr = sszz;
      }
    }

    if(_thisPlayid == 'x5rxds4z4'){
      var v=string;
      var reg=/(0[1-9]|1[01])(?!\1)(0[1-9]|1[01])(?!\1|\2)(0[1-9]|1[01])(?!\1|\2|\3)(0[1-9]|1[01])/g;
      
      v = v.replace(/[^\d]/g, '');
      var sszz=util_unique(v, reg, 2,true);
      sszz = sszz.sort();
      if(sszz){
        itemcount=sszz.length;
        yesArr = sszz;
      }
    }

    if(_thisPlayid == 'x5rxds5z5'){
      var v=string;
      var reg=/(0[1-9]|1[01])(?!\1)(0[1-9]|1[01])(?!\1|\2)(0[1-9]|1[01])(?!\1|\2|\3)(0[1-9]|1[01])(?!\1|\2|\3|\4)(0[1-9]|1[01])/g;
      
      v = v.replace(/[^\d]/g, '');
      var sszz=util_unique(v, reg, 2,true);
      sszz = sszz.sort();
      if(sszz){
        itemcount=sszz.length;
        yesArr = sszz;
      }
    }

    if(_thisPlayid == 'x5rxds6z5'){
      var v=string;
      var reg=/(0[1-9]|1[01])(?!\1)(0[1-9]|1[01])(?!\1|\2)(0[1-9]|1[01])(?!\1|\2|\3)(0[1-9]|1[01])(?!\1|\2|\3|\4)(0[1-9]|1[01])(?!\1|\2|\3|\4|\5)(0[1-9]|1[01])/g;
      
      v = v.replace(/[^\d]/g, '');
      var sszz=util_unique(v, reg, 2,true);
      sszz = sszz.sort();
      if(sszz){
        itemcount=sszz.length;
        yesArr = sszz;
      }
    }

    if(_thisPlayid == 'x5rxds7z5'){
      var v=string;
      var reg=/(0[1-9]|1[01])(?!\1)(0[1-9]|1[01])(?!\1|\2)(0[1-9]|1[01])(?!\1|\2|\3)(0[1-9]|1[01])(?!\1|\2|\3|\4)(0[1-9]|1[01])(?!\1|\2|\3|\4|\5)(0[1-9]|1[01])(?!\1|\2|\3|\4|\5|\6)(0[1-9]|1[01])/g;
      
      v = v.replace(/[^\d]/g, '');
      var sszz=util_unique(v, reg, 2,true);
      sszz = sszz.sort();
      if(sszz){
        itemcount=sszz.length;
        yesArr = sszz;
      }
    }

    if(_thisPlayid == 'x5rxds8z5'){
      var v=string;
      var reg=/(0[1-9]|1[01])(?!\1)(0[1-9]|1[01])(?!\1|\2)(0[1-9]|1[01])(?!\1|\2|\3)(0[1-9]|1[01])(?!\1|\2|\3|\4)(0[1-9]|1[01])(?!\1|\2|\3|\4|\5)(0[1-9]|1[01])(?!\1|\2|\3|\4|\5|\6)(0[1-9]|1[01])(?!\1|\2|\3|\4|\5|\6|\7)(0[1-9]|1[01])/g;
      
      v = v.replace(/[^\d]/g, '');
      var sszz=util_unique(v, reg, 2,true);
      sszz = sszz.sort();
      if(sszz){
        itemcount=sszz.length;
        yesArr = sszz;
      }
    }

    if(_thisPlayid == 'x5qeds'){
      var v=string;
      var reg=/(0[1-9]|1[01])(?!\1)(0[1-9]|1[01])/g;
      
      v = v.replace(/[^\d]/g, '');
      var sszz=util_unique(v, reg, 2);
      sszz = sszz.sort();
      if(sszz){
        itemcount=sszz.length;
        yesArr = sszz;
      }
    }

    if(_thisPlayid == 'x5qsds'){
      var v=string;
      var reg=/(0[1-9]|1[01])(?!\1)(0[1-9]|1[01])(?!\1|\2)(0[1-9]|1[01])/g;
      
      v = v.replace(/[^\d]/g, '');
      var sszz=util_unique(v, reg, 2);
      sszz = sszz.sort();
      if(sszz){
        itemcount=sszz.length;
        yesArr = sszz;
      }
    }

    if(_thisPlayid == 'x5qszxds'){
      var v=string;
      var reg=/(0[1-9]|1[01])(?!\1)(0[1-9]|1[01])(?!\1|\2)(0[1-9]|1[01])/g;
      
      v = v.replace(/[^\d]/g, '');
      var sszz=util_unique(v, reg, 2,true);
      sszz = sszz.sort();
      if(sszz){
        itemcount=sszz.length;
        yesArr = sszz;
      }
    }

    if(_thisPlayid == 'x5qezxds'){
      var v=string;
      var reg=/(0[1-9]|1[01])(?!\1)(0[1-9]|1[01])/g;
      
      v = v.replace(/[^\d]/g, '');
      var sszz=util_unique(v, reg, 2,true);
      sszz = sszz.sort();
      if(sszz){
        itemcount=sszz.length;
        yesArr = sszz;
      }
    }
    
    if(clickObj == 'remove'){
      if(string == ''){
        alt('请投注');
        return;
      }
      if(errArr.length < 1){
        alt('全部投注格式正确');
      }else{
        $('#text').val(yesString);
        alt('以下投注格式不正确： <br /> '+errString+'');
      }
    }

    if(clickObj == 'test'){
      if(string == ''){
        alt('请投注');
        return;
      }
      if(errArr.length < 1){
        alt('全部投注格式正确');
      }else{
        alt('以下投注格式不正确： <br /> '+errString+'');
      } 
    }

  }

  function danshiGame(){
    var html = '<div class="g_text">'+
                  '<textarea name="" value="123456" id="text" cols="30" rows="10" placeholder="每注号码以空格进行分割"></textarea>'+
                  '<button type="button" class="remove_btn">删除错误项</button>'+
                  '<button type="button" class="test_istrue">检查格式是否正确	</button>'+
                  '<button type="button" class="empty_text">清空文本框</button>'+
                '</div>';
    $('.g_Number_Section').append(html);
  }
  
  //添加game号码区
  function gameNumber(arr,number,start){
    var box = $('.g_Number_Section');
    for(var i = 0;i<arr.length;i++){
      var filterHtml = '<div class="selectNumberFilters">'+
                          '<a href="javascript:void(0);" class="selectNumberFilter" data-param="js-btn-all">全</a>'+
                          '<a href="javascript:void(0);" class="selectNumberFilter" data-param="js-btn-big">大</a>'+
                          '<a href="javascript:void(0);" class="selectNumberFilter" data-param="js-btn-small">小</a>'+
                          '<a href="javascript:void(0);" class="selectNumberFilter" data-param="js-btn-odd">奇</a>'+
                          '<a href="javascript:void(0);" class="selectNumberFilter" data-param="js-btn-even">偶</a>'+
                          '<a href="javascript:void(0);" class="selectNumberFilter" data-param="js-btn-clean">清</a>'+
                        '</div>';
      var boxList = $('<div class="selectNmuverBox"></div>');
      if(_thisPlayid == 'x5czw'){
        var boxNumber = $('<div class="selectNumbers" style="max-width:550px;padding-left:78px;"></div>');
      }else{
        var boxNumber = $('<div class="selectNumbers" style="max-width:550px;"></div>');
      }
      
      boxList.append('<span class="numberTitle" style="margin-right:10px;">'+arr[i]+'</span>');
      boxList.append(boxNumber);
      if(arr[i] != '胆码'){
        boxList.append(filterHtml);
      }
      if(number && start){
        for(var j = start;j<=number;j++){
          if(j < 10){
            boxNumber.append('<a href="javascript:void(0);" class="selectNumber" data-number="0'+j+'">0'+j+'</a>');
          }else{
            boxNumber.append('<a href="javascript:void(0);" class="selectNumber" data-number="'+j+'">'+j+'</a>');
          }
        }
      }else if(number){
        for(var j = 0;j<=number;j++){
          boxNumber.append('<a href="javascript:void(0);" class="selectNumber" data-number="'+j+'">'+j+'</a>');
        }
      }else{
        for(var j = 0;j<=9;j++){
          boxNumber.append('<a href="javascript:void(0);" class="selectNumber" data-number="'+j+'">'+j+'</a>');
        }
      }
      
      box.append(boxList);
    }
  }

  //添加二级玩法切换
  function gameSwitch(obj,title_arr,option_arrs){
    var ul = $('<ul></ul>');
    var span = '';
    var bool = true;
    ul.attr('id','bet_filter');
  
    for( var i = 0;i< title_arr.length;i++) {
      var li = $('<li></li>');
      var betOptionDiv = $('<div class="bet_option"></div>'); 
      li.attr('class','bet_filter_item');
      li.append('<strong class="title">'+title_arr[i]+'</strong>');
      for( j in option_arrs[i]){
        if(bool){
          span = '<span class="bet_options curr" lottery_code_two="'+j+'">'+option_arrs[i][j]+'</span>';
          bool = false;
        }else{
          span = '<span class="bet_options" lottery_code_two="'+j+'">'+option_arrs[i][j]+'</span>';
        }
        betOptionDiv.append(span);
      } 
      li.append(betOptionDiv);
      ul.append(li);
    }
    $('.bet_filter_item').eq(0).find('.bet_options').eq(0).addClass('curr');
    obj.append(ul);
  }
  

  //倍数加减fn
  function addAndSubtract(string){
    inputVal = isNaN(parseInt($('.selectMultipInput').val()))?1:parseInt($('.selectMultipInput').val());
    if(inputVal <= 1){
      $('.selectMultipInput').val(1);
      $('.reduce').addClass('noReduce');
    }
    if(inputVal > 10000){
      $('.selectMultipInput').val(10000);
      $('.reduce').removeClass('noReduce');
      $('.selectMultiple .add').addClass('noReduce');
      return;
    }
    if('+' == string){
      inputVal++;
      if(inputVal >= 10000){
        $('.selectMultipInput').val(10000);
        $('.selectMultiple .add').addClass('noReduce');
        return;
      }
      $('.selectMultiple .add').removeClass('noReduce');
      $('.selectMultipInput').val(inputVal);
    }else if('-' == string){
      inputVal--;
      if(inputVal <= 1){
        $('.selectMultipInput').val(1);
        $('.reduce').addClass('noReduce');
        return;
      }
      $('.reduce').removeClass('noReduce');
      $('.selectMultipInput').val(inputVal);
    }   
    if(inputVal > 1 && inputVal < 10000){
      $('.reduce').removeClass('noReduce');
    }
    if(inputVal < 10000){
      $('.selectMultiple .add').removeClass('noReduce');
    }
  }

  //生成随机订单号
  var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  function generateMixed(n) {
      var res = "";
      for(var i = 0; i < n ; i ++) {
          var id = Math.ceil(Math.random()*35);
          res += chars[id];
      }
      return res;
  }
  //计算方案注数
  function countAll(){
    var eachZhushus = 0;
    var eachMoneys = 0;

    $('.yBettingList').each(function (i){
      var eachZhushu = parseInt($(this).find('.yBettingZhushu em').text());
      var eachMoney = parseFloat($(this).find('#betting_money').text());
      eachZhushus += eachZhushu;
      eachMoneys += eachMoney;
    })

    AllZhushu = eachZhushus;
    AllMoney = eachMoneys;
    $('#f_gameOrder_lotterys_num').text(AllZhushu);
    $('#f_gameOrder_amount').text(AllMoney.toFixed(2));
  }

  //计算选号金额
  function countMoney() {
    var currZhushu = parseInt(zhushus.length);
    var currTimes = parseInt($('.selectMultipInput').val());
    var currSlect = parseFloat($('.selectMultipleCon').val());
    var toTal = currZhushu * minMoney * currTimes *  currSlect;
    lastMoney = toTal.toFixed(2);
    $('.zhushu').text(currZhushu);
    $('.selectMultipleOldMoney').text(lastMoney);
  }

  //组合排列
  function combination(arr){
    var sarr = [[]];
  
    for(var i = 0; i < arr.length; i++){
      var sta = [];
      for(var j = 0; j < sarr.length; j++){
        for(var k = 0; k < arr[i].length; k++){
          sta.push(sarr[j].concat(arr[i][k]));
        }
      }
      sarr = sta;
    }
    return sarr;
  }

  //组合算法
  function combine(arr, num) {
    var r = [];
    (function f(t, a, n) {
      if (n == 0) return r.push(t);
      for (var i = 0, l = a.length; i <= l - n; i++) {
        f(t.concat(a[i]), a.slice(i + 1), n - 1);
      }
    })([], arr, num);
    return r;
  }

  //获取每个位数选中的数
  function currList() {
    var currArr = [];
    $('.selectNumbers').each(function (i){
      var acArr = [];
      $(this).find('.curr').each(function (i){
        acArr.push($(this).attr('data-number'));
      })
      currArr.push(acArr);
    })
    return currArr;
  }
  //验证数字空格
  function chkPrice(obj){ 
    obj.value = obj.value.replace(/[^\d.\s*]/g,""); 
    //必须保证第一位为数字而不是. 
    obj.value = obj.value.replace(/^\./g,""); 
    //保证只有出现一个.而没有多个. 
    obj.value = obj.value.replace(/\.{2,}/g,"."); 
    //保证.只出现一次，而不能出现两次以上 
    obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
  } 
  //非法字符截取
  function chkLast(obj){  
    if(obj.value.substr((obj.value.length - 1), 1) == '.') 
    obj.value = obj.value.substr(0,(obj.value.length - 1)); 
  } 

})