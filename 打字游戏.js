var letters=['A','B','C','D'];
function id(ID){
	return document.getElementById(ID);
}
function tag(name,father){
	father=father||document;
	return father.getElementsByTagName(name);
}
function changeArray(likeArray){
	var arr=[];
	for(var i=0;i<likeArray.length;i++){
		arr.push(likeArray[i]);
	}
	return arr;
}
function getLetter(){
	var i=Math.floor(Math.random()*letters.length);
	return letters[i];
}
function showNewLetter(){
	//创建一个span
	var span=document.createElement('span');
	//让新的span显示一个随机的字母
	span.innerHTML=getLetter();
	//设置水平随机位置
	span.style.left=Math.random()*750+'px';
	//将新span加入con中
	id('con').appendChild(span);
}
function fall(){
	//找到当前所有的span
	var spans=tag('span',id('con'));
	//判断本次下落有没有元素超出边界要干掉
	if(spans.length>0&&spans[0].offsetTop+50>=600)
		id('con').removeChild(spans[0]);
	//遍历每一个pan将top值自加自身高度
	for(var i=0;i<spans.length;i++){
		newTop=spans[i].offsetTop+50;
		spans[i].style.top=newTop+'px';
	}
}
function start(){
	//不断的自动创建新的字母显示并下落
	setInterval(function(){
		fall();
		showNewLetter();
	},1000);
	document.onkeyup=function(e){
		//如果有你点击的字母相关的span,则删除
		var spans=tag('span');
		spans=changeArray(spans);
		for(var i=0;i<spans.length;i++){
			if(spans[i].className!='dh'&&
				spans[i].innerText==letters[e.keyCode-65]){
				//添加消失动画
				spans[i].className='dh';
				setTimeout(function(){
					id('con').removeChild(spans[i]);
				},600);
				break;//跳出for循环
			}
		}
	};
}
window.onload=function(){
	start();
};
