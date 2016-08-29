function getStyle(elem,prop){
	if(elem.currentStyle){
		return elem.currentStyle[prop];
	}else{
		return getComputedStyle(elem,null)[prop];
	}
};
function setCss(elem, attr, value){
	switch(attr){
		case 'width':
		case 'height':
		case 'padding':
		case 'paddingLeft':
		case 'paddingRight':
		case 'paddingBottom':
		case 'paddingTop':
			value = /\%/.test(value)?value:Math.max(parseInt(value),0) +'px';
			break;
		case 'left':
		case 'top':
		case 'bottom':
		case 'right':
		case 'margin':
		case 'marginLeft':
		case 'marginRight':
		case 'marginTop':
		case 'marginBottom':
			value = /\%/.test(value)?value:parseInt(value) + 'px';
			break;
	}
	elem.style[attr] = value;
};
function IQuery(arg){
	this.elements = [];
	switch(typeof arg){
		case 'string'://selector:#, ., 标签tag
			var prefix = arg.charAt(0);
			switch(prefix){
				case '#'://id
					var domObj = document.getElementById(arg.substring(1));
					if(domObj){
						this.elements.push(domObj);
					}
				break;
				case '.'://class
					this.elements = document.getElementsByClassName(arg.substring(1));
					break;

				default://tag
					this.elements = document.getElementsByTagName(arg);
			}
			break;
		case 'object':
			this.elements.push(arg);
			break;
		case 'function':
			window.addEventListener('load', arg, false );
			break;
	}
};

IQuery.prototype.click = function(fn){
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].addEventListener('click',fn, false);
	}
	return this;
};
IQuery.prototype.mouseover = function(fn){
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].addEventListener('click',fn, false);
	}
	return this;
};
IQuery.prototype.on = function(type, selector ,fn){
	if (typeof selector == 'string') {
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].addEventListener(type,function(e){
				var prefix = selector.charAt(0);
				switch(prefix){
					case '#':
						if(e.target.id == selector.substring(1)){
							fn.call(e.target)
						}
						break;
					case '.':
						if(e.target.className == selector.substring(1)){
							fn.call(e.target)
						}
						break;
					default:
						break;
				}
			},false);
		}else{
			for (var i = 0; i < this.elements.length; i++) {
				fn = selector;
				this.elements[i].addEventListener(type, fn, false);
			}
		}
	}
	return this;
};
IQuery.prototype.css = function(propertyName,value){
	if(value){
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].style[propertyName] = value;
		}
	}else{
		if(typeof propertyName == String){
			return getStyle(this.elements[0], propertyName);
		}else{
			for(var p in propertyName){
				for (var i = 0; i < this.elements.length; i++) {
					setCss(this.elements[i],p,propertyName[p])
				}
			}
		}
	}
	return this;
};
IQuery.prototype.offset = function(coordinates){
	if(coordinates){//要设置元素的coordinates位置
		for(var i=0; i<this.elements.length; i++){
			//this.elements[i].style.left = coordinates.left
			var position = getStyle(this.elements[i], 'position');
			if(position == 'static'){
				this.elements[i].style.position = 'relative';
			}
			setCss(this.elements[i], 'left', coordinates.left);
			setCss(this.elements[i], 'top', coordinates.top);
		}
	}else{//获得匹配元素中第一个元素的位置，相对于文档
		var iTop = iLeft = 0;
		var elem = this.elements[0];
		do{
			iTop += elem.offsetTop;
			iLeft += elem.offsetLeft;
			elem = elem.offsetParent;
			// console.log(elem);
		}while(elem);
		return {
			left: iLeft,
			top: iTop
		};
	}
	return this;
};

IQuery.prototype.hover = function(fnOver, fnOut){
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].addEventListener('mouseover', fnOver, false );
		this.elements[i].addEventListener('mouseout', fnOut, false);
	}
};

function $(arg){
	return new IQuery(arg);
};