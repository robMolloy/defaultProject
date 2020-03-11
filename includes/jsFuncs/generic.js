//~ ********** Generic functions - used on all pages ************* //
function getElementValues(params={}){
	let f = issetReturn(() => params.f,new FormData);
	let getValuesFrom = initElement(issetReturn(()=>params.getValuesFrom));
	
	if(getValuesFrom!=='' && getValuesFrom!==undefined && getValuesFrom!==null){
		let all = getValuesFrom.querySelectorAll('input,select,textarea');
		let valid;
		for(let i=0; i<all.length; i++){
			valid = true;
			if(all[i].name==''){valid=false;}
			if(all[i].type=='checkbox' && all[i].checked==false){valid=false;}
			if(valid){f.append(all[i].name,all[i].value);}
		}
	}
	return f;
}

function initFormData(f=''){
	return f=='' ? new FormData: f;
}

function initElement(element=''){
	element = element=='' ? document.createElement("div") : element;
	return element.nodeName==undefined ? document.getElementById(element) : element;
}

function getJsonFromGetArray(){
	var getArray = getGetArray();
	var json = issetReturn(()=>getArray.json,{});
	return decodeURI(json);
}

function getCurrentFilename(){
	return window.location.href.split('/').pop().split('?')[0];
}

function getGetArray(){
	var getString = window.location.search.substring(1);
	var getArray = {};
	
	if(getString.length>0){
		var getPairs = getString.split('&');
		for(key in getPairs){getArray[getPairs[key].split('=')[0]] = getPairs[key].split('=')[1];}
	}
	
	return getArray;
}

function isset(array){
	//~ TO USE: isset(() => arr1.json.datarow.wobble.blah) ? 'true' : 'false';
	try{return typeof array() !== 'undefined'}
	catch (e){return false;}
}

function issetReturn(array,value=''){
	//~ TO USE: issetReturn(() => arr1.json.datarow.wobble.blah,value);
	//~ CANNOT USE isset as a replacement for the next 3 lines of code - WHY??? WHO CARES!!!
	var istrue;
	try{istrue = typeof array() !== 'undefined';}
	catch (e){istrue = false;}
	
	return istrue ? array() : value;
}

function goto(file){
	window.location.href = file;
}

