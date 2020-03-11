function showInfoBar(text=''){
	let id = `infoBar${new Date().getMilliseconds()}`;
	let html = `<div id="${id}" class="infoBar"><div>${text}</div></div>`
	document.querySelector('body').insertAdjacentHTML('afterbegin',html);
	setTimeout(()=>document.getElementById(id).remove(),3000);
}
