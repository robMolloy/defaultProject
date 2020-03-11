async function getUserObject(){
	return initJson(await ajax({'file':'nav/user.nav.php?nav=getUserObject'}));
}

async function userIsLoggedIn(){
	return parseInt(await ajax({'file':'nav/user.nav.php?nav=userIsLoggedIn'}))>0 ? true : false;
}

async function getUserId(){
	return initJson(await ajax({'file':'nav/user.nav.php?nav=getUserId'}));
}

async function getUserFirstName(){
	return initJson(await ajax({'file':'nav/user.nav.php?nav=getUserFirstName'}));
}

async function getUserLastName(){
	return initJson(await ajax({'file':'nav/user.nav.php?nav=getUserLastName'}));
}    

async function getUserEmail(){
	return initJson(await ajax({'file':'nav/user.nav.php?nav=getUserEmail'}));
}
