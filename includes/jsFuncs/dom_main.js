function appendToMain(html){
	document.querySelector('main').insertAdjacentHTML('beforeend',html);
}

function appendNthInMain(params){
    let html = params.html;
	let itemsInMain = document.querySelectorAll('main > *');
	
	let position = issetReturn(()=>params.position,0);
	position = position=='' || position=='first' ? 0 : position;
	position = position>=allPanels.length ? 'last' : position;
	
	if(position=='last'){appendToMain(html);}
	else{itemsInMain[position].insertAdjacentHTML('beforeBegin',html);}
}

function appendPanelInMain(txt){
    appendToMain(`<div class="panel">${txt}</div>`)
}

function clearMain(){
	document.querySelector('main').innerHTML = '';
}
