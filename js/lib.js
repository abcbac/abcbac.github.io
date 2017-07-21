window.AUI=function(){}
~(function(){
	  AUI.SScreen=function(){//动画库，辅助对象
	  this.canvasId='m_house';
	  this.context=null;
	  this.bgImg='img/idle.jpg';
	  this.bgSImg='img/pb.png';
	  this.transTime=15;
	  this.imgObj=null;
	  this.imgObjBg=null;
	  this.step={};
	  this.nowSetp={ x:870,y:339,w:0,h:0};
	  this.rects=[];
	  this.Rstep={};
	  this.currentx=880;
	  this.startX=880;
	  this.xStep=200;
	  this.bc=0;
	  this.rSpeedChenged=0.001;
	  this.rectCurrent={x:870,y:339,w:124,h:131,a:0.26};
	  this.nowRSetp=this.rectCurrent;
	  this.currentWitdh=1856;
	  this.currentHeight=768;
  };
  AUI.SScreen.prototype={
  init:function(){
    var mDom,context,mImg,mImgB;
	mDom=document.getElementById(this.canvasId);
	this.context=mDom.getContext("2d");
	context=this.context;
	mImgB=new Image();
	mImgB.src=this.bgSImg;
	mImg=new Image();
	mImg.src=this.bgImg;
	this.rects=[];	
	this.Rstep.x=this.transNumber(this.nowRSetp.x,0,this.transTime);
    this.Rstep.y=this.transNumber(this.nowRSetp.y,0,this.transTime);
    this.Rstep.w=this.transNumber(this.nowRSetp.w,this.currentWitdh,this.transTime);
    this.Rstep.h=this.transNumber(this.nowRSetp.h,this.currentHeight,this.transTime);
	this.Rstep.a=this.transNumber(this.nowRSetp.a,0,this.transTime);
	this.step.x=this.transNumber(this.nowSetp.x,0,this.transTime);
    this.step.y=this.transNumber(this.nowSetp.y,0,this.transTime);
    this.step.w=this.transNumber(this.nowSetp.w,this.currentWitdh,this.transTime);
    this.step.h=this.transNumber(this.nowSetp.h,this.currentHeight,this.transTime);
	this.rects.push({x:this.rectCurrent.x,y:this.rectCurrent.y,w:this.rectCurrent.w,h:this.rectCurrent.h,a:this.rectCurrent.a,s:{x:this.Rstep.x,y:this.Rstep.y,w:this.Rstep.w,h:this.Rstep.h,a:this.Rstep.a}});
	this.imgObj=mImg;
	this.imgObjBg=mImgB;
	var that=this;
    this.resetW();//调整屏幕为自适应
	window.addEventListener('resize',function(){
      that.resetW.call(that);
   });
	mImg.addEventListener('load',function(){
		setTimeout(function(){
		   that.nowSetp.x=that.nowSetp.x+that.step.x;
		   that.nowSetp.y=that.nowSetp.y+that.step.y;
		   that.nowSetp.w=that.nowSetp.w+that.step.w;
		   that.nowSetp.h=that.nowSetp.h+that.step.h;
		   //that.transImg.call(that,that.nowSetp.x,that.nowSetp.y,that.nowSetp.w,that.nowSetp.h);
		   that.transRect.call(that,that.nowRSetp.x,that.nowRSetp.y,that.nowRSetp.w,that.nowRSetp.h,that.nowRSetp.a);
		},this.transTime/30);
	});
    
  },
  resetSetp:function(){
    this.nowRSetp=this.rectCurrent;
  },
  transImg:function(x,y,w,h){//绘制逐步增大的图片
    var that=this;
       try{
       
	   this.context.drawImage(this.imgObjBg,0,0);
       this.context.drawImage(this.imgObj,x,y,w,h,x,y,w,h);
	   }catch(e){
	    that.transRect.call(that,that.nowRSetp.x,that.nowRSetp.y,that.nowRSetp.w,that.nowRSetp.h);
	   }
	   this.context.fillStyle='rgb(255,255,255)';
	   if(that.nowSetp.x>6){
	   this.context.strokeStyle='rgba(255,255,255,0.3)';
	   this.context.lineWidth =60;
	   this.context.strokeRect(x,y,w,h);
       }
	   if(this.nowSetp.x>0){
	     setTimeout(function(){
		   that.nowSetp.x=that.nowSetp.x+that.step.x;
		   that.nowSetp.y=that.nowSetp.y+that.step.y;
		   that.nowSetp.w=that.nowSetp.w+that.step.w;
		   that.nowSetp.h=that.nowSetp.h+that.step.h;
		   that.transImg.call(that,that.nowSetp.x,that.nowSetp.y,that.nowSetp.w,that.nowSetp.h);
		},1000/60);
	   }else{
	      that.transRect.call(that,that.nowRSetp.x,that.nowRSetp.y,that.nowRSetp.w,that.nowRSetp.h,that.nowRSetp.a);
	   }	   
  },
  transRect:function(x,y,w,h,a){//绘制页面不断扩大的长方形，原理为，先画背景，同时画长方形，下一幅长方形变化同时位移，形成动画效果。
       var step=this.rSpeedChenged;
       var rX=0;
	   var s={};
       var that=this,models=this.rects,i=0;
	   this.context.drawImage(this.imgObj,0,0,this.currentWitdh,this.currentHeight,0,0,this.currentWitdh,this.currentHeight);
	   var len=models.length;
       for(i=0;i<models.length;i++){
	       model=models[i];
		   if(model.a<0){
		      model.a=0;
		   }
           this.context.strokeStyle='rgba(255,255,255,'+model.a+')';
		   this.context.lineWidth =4;
   	       this.context.strokeRect(model.x,model.y,model.w,model.h);
           s=model.s;
		   s.x=s.x*(1-step);
		   s.y=s.y*(1-step);
		   s.w=s.w*(1-step);
		   s.h=s.h*(1-step);		   
		   model.x=model.x+s.x;
		   model.y=model.y+s.y;
		   model.w=model.w+s.w;
		   model.h=model.h+s.h;
		   model.a=model.a+s.a;
		   models.s=s;
		   rX=model.x;
		   if((this.startX-models[models.length-1].x)>this.xStep){
		     this.currentx=rX;
		     this.rects[models.length]={x:this.rectCurrent.x,y:this.rectCurrent.y,w:this.rectCurrent.w,h:this.rectCurrent.h,a:this.rectCurrent.a,s:{x:this.Rstep.x,y:this.Rstep.y,w:this.Rstep.w,h:this.Rstep.h,a:this.Rstep.a}};
			 models=this.rects;
		  }
		   models[i]=model;
		   if(model.x<60){
             models.splice(i,1);
		   }
		   this.rects=models;   
	   }

	   setTimeout(function(){
		   that.transRect.call(that,that.nowRSetp.x,that.nowRSetp.y,that.nowRSetp.w,that.nowRSetp.h,that.nowRSetp.a);

		},1000/60);
	   	
  },
  resetW:function(){//调整内容适应屏幕
	  var w=$(".warp");
	  w.width($(window).width());
	  w.height($(window).height());
	  if(w.width()<this.currentWitdh){
		$("#m_house").css({'margin-left':'-'+(this.currentWitdh-w.width())/2+'px'});
	  }else{
		$("#m_house").css({'margin-left':'auto'});
	  }
	  if(w.height()<this.currentHeight){
		  $("#m_house").css({'margin-top':'-'+(this.currentHeight-w.height())/2+'px'});
		  //w.find('div').css({'margin-top':'-'+(this.currentHeight-w.height())/2+'px'});
	  }else{
		//  w.find('div').css({'margin-top':''+(w.height()-this.currentHeight)/2+'px','margin-bottom':''+(w.height()-this.currentHeight)/2+'px'});
		  $("#m_house").css({'margin-top':''+(w.height()-this.currentHeight)/2+'px','margin-bottom':''+(w.height()-this.currentHeight)/2+'px'});
	  }
	  document.body.scroll ="no";
},
  transNumber:function(x,y,t){//获取每秒步进值，x为起始值，y为到达值,t为时间
    var m=y-x;
	t=t;
	return m/(t*30);
   }
  
  }

})();


~(function(){
  AUI.Screen=function(){//程序主对象流程控制
     this.ver='beta1';
	 this.tmp={
	 0:'',
	 1:'<div class="hidden"><video id="Video" width="1856"      loop="loop" src=""></video></div>',
	 2:'<div class="hidden"><video id="Video" width="1856"      loop="loop" src="Lighthouse_background/5-1.mp4"></div>',
	 3:'<div class="hidden" style="width:1856px;height:768px;margin-left:auto;margin-right:auto;"></div>',
	 //3:'<div class="hidden"><video id="Video" width="1856" height="768" loop="loop" src="img/5-2.mp4"></div>',
	 4:'<div class="hidden" style="background-image:url(img/AzureBackScreenBackGround.jpg)"><video id="Video"  width="1856"       loop="loop" src="Azure_Video/4.mp4"></video></div>',
	 5:'<div class="hidden"><video id="Video" width="1856"    loop="loop" src="img/5.mp4"></video></div>',
	 6:'<div class="hidden" style="position:relative;"><video id="Video" width="1856"      src="traffic/61.mp4" style="position:absolute;z-index:10" ></video><video       width="1856" style="position:absolute;z-index:5" loop="loop"  src="traffic/62.mp4"></video></div>',
	 7:'<div class="hidden"><video id="Video" width="1856"   loop="loop" src="Sanddance/1.mp4"></video></div>',
	 8:'<div class="hidden"><video id="Video" width="1856"    loop="loop" src="Textflow/8.mp4"></video></div>',
	 9:'<div class="hidden"></div>',
	 10:'<div class="hidden"><video id="Video" width="1856"      loop="loop" src="Microsoft_China_Center_One/1.mp4"></video></div>',
         11:'<div class="hidden"><video id="Video" width="1856"    loop="loop" src="Real_estate/1.mp4"></video></div>'
	 
	 },
	 this.keyMap={
	 //48:'sScreen',
	 //49:'caVideo',
	 //50:'city',
	 //51:'black',
	 52:'agriculture',
	 53:'realEstate',
	 //54:'traffic',
	 //55:'qSanddance',
	 //56:'twitterTextflow',
	 //57:'gangnamStyle',
	 82:'feadIn',
	 83:'feadOut',
	 80:'pause',
	 76:'caVideo',
	 27:'closeWin'
	 },
	 this.cDom=null;
	 this.cVideo={length:0};
	 this.sCode=0;
	 this.kcO={'82':1,'83':1,'80':1,'27':1};//本页响应的按键，其他的刷新页面执行
  }
  AUI.Screen.prototype={
  init:function(){
     that=this;
	 this.sCode=AUI.SScreen.Scode;
	// if(location.href.indexOf("?")>-1){
   //     this.sCode=location.href.split("?")[1];
   //  }
	var sch=new AUI.SScreen();//实例化辅助对象

     this.cDom=document.getElementsByClassName('warp')[0];
	 this.buildEvent();
	 var fn;
	 if(this.sCode){	   
	    fn=this[this.sCode];
		if(fn){
           this[this.sCode]();
		}
	 }
	 sch.resetW();//调整屏幕为自适应
	window.addEventListener('resize',function(){
      sch.resetW();
    });

  },
  buildEvent:function(){
     var that=this;
	 var fn;
	document.addEventListener('keyup',function(e){
	    var kc=e.keyCode,eV,eDiv;
		fn=that.keyMap[kc];
	   if(that.kcO[kc]){
		   that[fn]();
		}else if(fn){
		    window.location.href=location.href.indexOf('?')>0?location.href.split("?")[0]+'?'+fn:location.href+"?"+fn;
		}
	 });
  },
  black:function(){
     var str_html=this.tmp[3];
	 this.cDom.innerHTML=str_html;
	 this.feadIn();	
  },
    city:function(){
     var str_html=this.tmp[2];
	 this.cDom.innerHTML=str_html;
	 this.feadIn();
	 var mV=$(this.cDom).find("video")[0];
	mV.play();	
  },
  agriculture:function(){
    var str_html=this.tmp[4];
	this.cDom.innerHTML=str_html;
	this.feadIn();
	var mV=$(this.cDom).find("video")[0];
	$(mV).hide();
       //mV.play();
  },
  realEstate:function(){
   var str_html=this.tmp[11];
   this.cDom.innerHTML=str_html;
   this.feadIn();
   var mV=$(this.cDom).find("video")[0];
   mV.play();
  },
  qSanddance:function(){
    var str_html=this.tmp[7];
	this.cDom.innerHTML=str_html;
	this.feadIn();
	var mV=$(this.cDom).find("video")[0];
	mV.play();
  },
  traffic:function(){
    var str_html=this.tmp[6];
	this.cDom.innerHTML=str_html;
	this.feadIn();
	var mV=$(this.cDom).find("video")[0];
	var msV=$(this.cDom).find("video")[1];
	mV.play();	
	$(mV).bind('ended',function(e){
      mV.style.zIndex=0;	
      msV.play();	  
	});
  },
  twitterTextflow:function(){
    var str_html=this.tmp[8];
	this.cDom.innerHTML=str_html;
	this.feadIn();
	var mV=$(this.cDom).find("video")[0];
	mV.play();
  },
  Microsoft_China_Center_One:function(){
    var str_html=this.tmp[10];
	this.cDom.innerHTML=str_html;
	this.feadIn();
	var mV=$(this.cDom).find("video")[0];
        $(mV).hide();
        setTimeout(function(){
            $(mV).fadeIn();    
            mV.play();
        },1000*30);
  },  
  gangnamStyle:function(){
    var str_html=this.tmp[9];
	this.cDom.innerHTML=str_html;
	this.feadIn();
  },
  feadIn:function(){
     var mDom=$(this.cDom).find("div").eq(0);
	 mDom.hide();
     mDom.fadeIn('slow');//待优化
	 var mV;
	 if(this.cVideo.length>0){
	    mV=this.cVideo[0];
	 }	 
	 if(mV){
	    if(mV.src.indexOf('img/s.mp4')>-1){
		window.location.href=window.location.href;
		return;
		}
	    mV.load();
	 }
	 
  },feadOut:function(){
     var mDom=$(this.cDom).find("div").eq(0);
	 mDom.show();
	 var mV=this.cVideo[0];
	 if(mV){
	    mV.pause();
	 }else{
	    mDom.fadeOut('slow');//待优化
	 }

  },
  closeWin:function(){
      window.close();
  },
  sScreen:function(){
    var that=this;
	if($(this.cDom).find("video").length==0){
	   var str_html=this.tmp[1];
	   this.cDom.innerHTML=str_html;
	}
	this.feadIn();
	this.cVideo=$(this.cDom).find("video");
	var mV=this.cVideo[0];
	mV.src='img/s.mp4';
	mV.play();

  },
  pause:function(){
    //单独处理云
    if(AUI.SScreen.Scode=="agriculture"){
        var mV=$(this.cDom).find("video")[0];
	var state=mV.paused;
	if(state){
	   mV.play();
           $(mV).fadeIn();
	}else{
           $(mV).fadeOut();
	   mV.pause();
	}
       return;
    }
    if($(this.cDom).find("video").length==0){return;}
	var mV=$(this.cDom).find("video")[0];
	var state=mV.paused;
	if(state){
	   mV.play();
	}else{
	   mV.pause();
	}
  },
  caVideo:function(){
       var mDom=document.getElementsByClassName('warp')[0];
	   mDom.innerHTML='<canvas width="1856px" class="cav" height="768px" id="m_house"></canvas>';
       var ss=new AUI.SScreen();
       ss.init();
  }
  }
})();


