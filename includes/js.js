    /*Generic functions - used on all pages*/
	function getElementValues(params={}){
		var f = ('f' in params && params.f!='' ? params.f : new FormData);
        var getValuesFrom = initElement('getValuesFrom' in params ? params.getValuesFrom : '');
		
		if(getValuesFrom!=='' && getValuesFrom!==undefined && getValuesFrom!==null){
            var all = getValuesFrom.querySelectorAll('input,select,textarea');
            
            var valid;
			for(var i=0; i<all.length; i++){
                valid = true;
				if(all[i].name==''){valid=false;}
                if(all[i].type=='checkbox' && all[i].checked==false){valid=false;}
                if(valid){f.append(all[i].name,all[i].value);}
            }
		}
		return f;
	}
	
    function initElement(element=''){
        return element.nodeName==undefined ? document.getElementById(element) : element;
    }
    
	function getJsonFromGetArray(){
		var getArray = getGetArray();
		var json = {};
		
		if(getArray!={}){
			var json = ('json' in getArray ? decodeURI(getArray.json) : getDefaultJsonString());
			json = initJson(json);
		}
		return json;
	}
	
	function getCurrentFilename(){
		return window.location.href.split('/').pop().split('?')[0];
	}
	
	function getGetArray(){
		var getString = window.location.search.substring(1);
		var getArray = {};
		
		if(getString.length!=0){
			var getPairs = getString.split('&');
			for(key in getPairs){getArray[getPairs[key].split('=')[0]] = getPairs[key].split('=')[1];}
		}
		
		return getArray;
	}
	
    function appendToWrapperMain(html){
        document.getElementById('wrapperMain').insertAdjacentHTML('beforeend',html);
    }
    
    function appendAboveNthPanelInWrapperMain(params={}){
        let html = params.html;
        let allPanels = document.getElementById('wrapperMain').querySelectorAll('.panel');
        
        let position = isset(()=>params.position) ? params.position : 0;
        position = position=='' || position=='first' ? 0 : position;
        position = position>=allPanels.length ? 'last' : position;
        
        if(position=='last'){appendToWrapperMain(html);}
        else{allPanels[position].insertAdjacentHTML('beforeBegin',html);}
    }
    
    function isset(array){
        //~ TO USE: isset(() => arr1.json.datarow.wobble.blah) ? 'true' : 'false';
        try{return typeof array() !== 'undefined'}
        catch (e){return false;}
    }
    
    function issetReturn(array){
        //~ TO USE: isset(() => arr1.json.datarow.wobble.blah);
        //~ CANNOT USE isset as a replacement for the next 3 lines of code - WHY??? WHO CARES!!!
        let tof;
        try {tof = typeof array()!=='undefined';}
        catch (e){tof = false;}
        
        return tof ? array() : '';
    }
    
    function goto(file){
        window.location.href = file;
    }
    
    //~ ************ Response Log Functions ***************/
	function createResponseLog(){
        if(!document.getElementById('responseLog')){
            var rLog = document.createElement("div");
            rLog.setAttribute("id", "responseLog");
            rLog.setAttribute("class", "hidden");
            document.body.appendChild(rLog);
        }
	}
	
    function showInResponseLog(json){
        document.getElementById('responseLog').innerHTML = prettifyJson(json);
    }
    
    function toggleResponseLog(){
        if(!document.getElementById('responseLog')){createResponseLog();}
        document.getElementById('responseLog').classList.toggle("hidden");
    }
    
    
    //~ ************ Json Functions ***************/
    function initJson(json){
        return (isJsonString(json) ? JSON.parse(json) : json);
    }
    
    function isJsonString(str) {
        try {JSON.parse(str);return true;} catch(e) {return false;}
    }
	
    function prettifyJson(json={}){
        json = isJsonString(json) ? JSON.parse(json) : json;
        return '<pre>' + JSON.stringify(json,null,4) + '</pre>';
    }
    
	function getDefaultJsonString(){
		return JSON.stringify({
			exists:false,
			success:false,
			valid:false,
			newlyAdded:false,
			datarow:{},
			labelrow:{},
			errors:{}
		});
	}
	
	function getDefaultJsonObject(){
		return JSON.parse(getDefaultJsonString());
	}
    
    
    //~ ************ Date Functions ***************/
    function toShortDate(timestamp){
        let dt = new Date(timestamp*1000);
        return dt.toLocaleDateString('en-GB');
    }
    
    function toShortTime(timestamp){
        let dt = new Date(timestamp*1000);
        return dt.toLocaleTimeString('en-GB').slice(0, -3);
    }
    
    function toShortDateTime(timestamp){
        return `${toShortDate(timestamp)} ${toShortTime(timestamp)}`;
    }
    
    function toFormattedDateTime(timestamp){
        return isToday(timestamp) ? toShortTime(timestamp) : toShortDate(timestamp);
    }
    
    function isToday(timestamp){
        let dtInput = new Date(timestamp*1000);
        var dtToday = new Date();
        return dtInput.setHours(0,0,0,0) == dtToday.setHours(0,0,0,0);
    }
    
	//~ ************ Login Functions ***************/
	function getLoginHtml(params={}){
        var json = ('json' in params ? params.json : getDefaultJsonString());
		json = initJson(json);
		
		var container = ('container' in params ? params.container : true);
		var useGet = ('useGet' in params ? params.useGet : false);
		
		if(useGet){
			json = getJsonFromGetArray();
		}
		
		return `${container ? '<div class="panel singleColumn"><h1>Log In</h1><div class="form singleColumn" id="loginForm">' : ''}
					${0 in json.errors ? json.errors[0].map((error)=>`<p>${error}</p>`).join('') : ``}
					${'usr_email' in json.errors ? json.errors.usr_email.map((error)=>`<p>${error}</p>`).join('') : ``}
					<input type="text" name="usr_email" placeholder="Email" value="${'usr_email' in json.datarow ? json.datarow.usr_email : ''}">
					
					${typeof(json.errors.usr_password)!=='undefined'? json.errors.usr_password.map((error)=>`<p>${error}</p>`).join(''): ``}
					<input type="password" name="usr_password" placeholder="Password" value="${'usr_password' in json.datarow ? json.datarow.usr_password : ''}">
					
					<div><button name="submitLogin" onclick="submitLogin();">Log In!</button></div>
				${container ? '</div></div>' : ''}`;
	}
	
    async function submitLogin(){
		let currentFile = getCurrentFilename();
        
        let file = 'nav/login.nav.php?nav=submitLogin';
        let f = getElementValues({'getValuesFrom':'loginForm'});
        
        let response = await ajax({'file':file,'f':f});
        json = initJson(response);
        console.log(json);
		
		let datarow = json.datarow;
		let success = (!json.valid || !json.exists ? false : true);
		let printTo = initElement('loginForm');
        
        if(success){goto('index.php');}
        else{printTo.innerHTML = getLoginHtml({'json':json,'container':false});}
        
    }
    
    //~ *********** Ajax Functions ************* //
    function ajax(params={}) {
        let file = ('file' in params ? params.file : ''); //~ !essential parameter!
        let f = ('f' in params ? params.f : new FormData());
        let nav = ('nav' in params ? params.nav : ''); //~ !pass in file or essential parameter!
        
        if(nav!=''){f.append('nav',nav);}
        
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open("POST", file);
            request.onload = (()=>{
                if (request.status == 200){
                    //~ ONLY TRUE IN DEV ////////////////////////////////////////////////////////////
                    if(true){createResponseLog();showInResponseLog(request.response);}
                    resolve(request.response);
                } 
                else {reject(Error(request.statusText));}
            });
            request.onerror = (()=>{reject(Error("Network Error"));});
            request.send(f);
        });
    }
    
    async function ajaxTarget(params={}){
        let file = ('file' in params ? params.file : ''); //~ !essential parameter!
        let f = ('f' in params ? params.f : new FormData());
        let getValuesFrom = ('getValuesFrom' in params ? params.getValuesFrom : ''); //~ getValuesFrom can pass idString or elm 
        
        f = getElementValues({'f':f,'getValuesFrom':getValuesFrom});
        let response = await ajax({'file':file,'f':f});
        return response;
    }
	
	/*Sign up functions*/
	function getSignupHtml(params={}){
		var json = ('json' in params ? params.json : getDefaultJsonString());
		json = initJson(json);
		var container = ('container' in params ? params.container : true);
		var useGet = ('useGet' in params ? params.useGet : false);
		
		if(useGet){
			var getArray = getGetArray();
			for(key in getArray){json.datarow[key] = getArray[key]}
		}
		
		return `${container ? '<div class="panel"><h1>Sign Up</h1><div class="form singleColumn" id="signupForm">' : ''}
					${0 in json.errors ? json.errors[0].map((error)=>`<p>${error}</p>`).join('') : ``}
					${'usr_first_name' in json.errors ? json.errors['usr_first_name'].map((error)=>`<p>${error}</p>`).join('') : ``}
					<input type="text" name="usr_first_name" placeholder="First Name" value="${'usr_first_name' in json.datarow ? json.datarow.usr_first_name : ``}">
					
					${'usr_last_name' in json.errors ? json.errors['usr_last_name'].map((error)=>`<p>${error}</p>`).join('') : ``}
					<input type="text" name="usr_last_name" placeholder="Last Name" value="${'usr_last_name' in json.datarow ? json.datarow.usr_last_name : ``}">
					
					${'usr_email' in json.errors ? json.errors['usr_email'].map((error)=>`<p>${error}</p>`).join('') : ``}
					<input type="text" name="usr_email" placeholder="Email" value="${'usr_email' in json.datarow ? json.datarow.usr_email : ``}">
					
					${'usr_password' in json.errors ? json.errors['usr_password'].map((error)=>`<p>${error}</p>`).join('') : ``}
					<input type="password" name="usr_password" placeholder="Password" value="">
					<input type="password" name="usr_password_repeat" placeholder="Confirm Password" value="">
		
					<div><button name="submitSignup" onclick="submitSignup();" >Sign Up!</button></div>
				${container ? '</div></div>' : ''}`;
		
	}
    
    async function submitSignup(){
        let response = await ajaxTarget({'file':'nav/signup.nav.php?nav=submitSignup', 'getValuesFrom':'signupForm'});
        let json = initJson(response);
        
		var success = (!json.valid || !json.exists ? false : true);
		
		if(!success){
			document.getElementById('signupForm').innerHTML = getSignupHtml({'json':json,'container':false});
			return;
		} else {
			window.location.href = `login.php?json=${encodeURI(JSON.stringify(json))}`;
		}
    }
	
    async function logout(){
        let response = await ajax({'file':'nav/login.nav.php?nav=submitLogout'});
        let json = initJson(response);
        goto('index.php');
    }
	
	function handleLogoutResponse(params={}){
		window.location.href = 'index.php';
	}
	
    //~ ******* Issue List Functions ********** //
    async function getIssueList(params={}){
        let order = ('order' in params ? params.order : 'isu_time_added');
        let direction = ('direction' in params ? params.direction : 'ASC');
        
        let f = new FormData();
        f.append('order',order);
        f.append('direction',direction);
        let response = await ajax({'file':'nav/issue.nav.php?nav=getIssueList','f':f});
        let json = initJson(response);
        return json;
    }
    
    async function showIssueListPanels(){
        let issueList = await getIssueList();
        let issues = issueList.objects;
        
        issues.forEach((issueJson)=>showIssueDisplayPanel(issueJson));
    }
    
    
    //~ ******* Issue Functions ********** //
    function showBlankIssueEditPanel(){
        showIssueEditPanel();
    }
    
    async function showIssueEditPanel(issueJson={}){
        issueJson = await initIssueJson(issueJson);
        
        let isu = new issue(issueJson);
        isu.showEditPanel();
    }
    
    async function showIssueDisplayPanel(issueJson={}){
        issueJson = await initIssueJson(issueJson);
        
        let isu = new issue(issueJson);
        isu.showDisplayPanel();
    }
    
    async function getIssueJson(isu_id=''){
        var f = new FormData(); 
        f.append('isu_id',isu_id);
        
        return await ajax({'file':'nav/issue.nav.php?nav=getIssueJson','f':f});
    }
    
    async function switchIssueDisplayPanelToEdit(issueJson={}){
        issueJson = await initIssueJson(issueJson);
        
        let isu = new issue(issueJson);
        isu.showEditPanel();
    }
    
    async function switchIssueEditPanelToDisplay(issueJson={}){
        issueJson = await initIssueJson(issueJson);
        
        let isu = new issue(issueJson);
        isu.showDisplayPanel();
    }
    
    async function initIssueJson(issueJson){
        //~ pass a isu_id or an object
        if(typeof(issueJson)!='object'){issueJson = await getIssueJson(issueJson);}
        issueJson = issueJson=='' ? {} : issueJson;
        return issueJson;
    }
    
    async function deleteIssue(isu_id=''){
        var f = new FormData();
        f.append('isu_id',`${isu_id}`);
        
        let response = await ajax({'file':'nav/issue.nav.php?nav=deleteIssue', 'f':f});
        let json = initJson(response);
        if(json.success){
            let isu = new issue(json);
            isu.removePanel();
        }
    }
    
    async function saveIssue(isu_id=''){
        var f = new FormData();
        f.append('isu_id',`${isu_id}`);
        
        let issuePanelId = `issuePanel${isu_id==`` ? `` : `_${isu_id}`}`;
        
        let response = await ajaxTarget({'file':'nav/issue.nav.php?nav=saveIssue', 'f':f, 'getValuesFrom':issuePanelId});
        let json = initJson(response);
        if(json.newlyAdded){
            let isu = new issue(json);
            isu.buildPanel(1);
            isu.showDisplayPanel();
            
            let isu2 = new issue();
            isu2.showEditPanel();
        }
    }
    
    
    class issue {
        
        constructor(object={}) {
            this.exists = false;
            this.newlyAdded = false;
            this.valid = false;
            this.success = false;
            
            this.datarow = {};
            this.errors = {};
            this.labelrow = {};
            this.table = {'name':'onb_issues','label':'issue','primarykey':'isu_id','userkey':'isu_usr_id'};
            
            this.panel = null;
            this.init(object);
        }
        
        init(object={}){
            object = initJson(object);
            let json = isset(()=>object.json) ? object.json : object;
            
            this.exists = isset(()=>json.exists) ? json.exists : this.exists;
            this.newlyAdded = isset(()=>json.newlyAdded) ? json.newlyAdded : this.newlyAdded;
            this.valid = isset(()=>json.valid) ? json.valid : this.valid;
            this.success = isset(()=>json.success) ? json.success : this.success;
            
            
            this.datarow = isset(()=>json.datarow) ? json.datarow : this.datarow;
            this.datarow = Object.keys(this.datarow).length==0 ? this.getEmptyDatarow() : this.datarow;
            
            this.labelrow = isset(()=>json.labelrow) ? json.labelrow : this.labelrow;
            
            this.errors = isset(()=>json.errors) ? json.errors : this.errors;
            this.populateErrors();
            
            //~ var fillInputs = (!json.exists && json.datarow.length>0 || json.exists && json.newlyAdded ? false : true);
            //~ var editMode = (!json.exists || json.exists && json.newlyAdded ? false : true);
            
            this.updatePanel();
        }
        
        populateErrors(){
            //~ requires populated datarow to work
            let datarowKeys = Object.keys(this.datarow);
            let errorKeys = datarowKeys.concat([0]);

            errorKeys.forEach((key) => this.errors[key]=(isset(()=>this.errors[key]) ? this.errors[key] : []));
        }
        
        getEmptyDatarow(){
            //~ echoed with php to window.issueDatarow;
            return emptyDatarows[this.table.label];
        }
        
        getEditPanelHtml(){
            let heading = 
                this.exists ? `Edit ${this.datarow.isu_title}`:`What are you grateful for today?`;
                
            let buttons = this.exists   
                ?  `<button name="displayIssue" onclick="showIssueDisplayPanel(${this.datarow.isu_id})">Back</button> 
                    <button name="saveIssue" onclick="saveIssue(${this.datarow.isu_id});">Save</button> 
                    <button name="deleteIssue" onclick="deleteIssue(${this.datarow.isu_id});">Delete</button>`
                
                :   `<button name="submitIssue" onclick="saveIssue();">Add</button>`;
            
            
            return `<div><h3>${heading}</h3></div>
                    ${this.success ? `${datarow.isu_title} ${editMode ? `edited` : `submitted`} successfully` : ``}
                    ${this.errors[0].map((error)=>`<p>${error}</p>`).join('')}
                    ${this.errors['isu_title'].map((error)=>`<p>${error}</p>`).join('')}
                    <div><input type="text" name="isu_title" placeholder="Title" value="${this.datarow.isu_title}"></div>
                        
                    ${this.errors['isu_description'].map((error)=>`<p>${error}</p>`).join('')}
                    <div><textarea name="isu_description" placeholder="Description">${this.datarow.isu_description}</textarea></div>
                    
                    <div class="buttonBar">${buttons}</div>`;
        }
        
        showEditPanel(){
            this.buildPanel();
            this.panel.innerHTML = this.getEditPanelHtml();
            this.panel.classList = 'panel editMode form';
            this.panel.querySelector('input,textarea').focus();
        }
        
        getDisplayPanelHtml(){
            return `<div class="titleBar">
                        <h3 id="isu_title_${this.datarow.isu_id}">${this.datarow.isu_title}</h3>
                        <h5>${toFormattedDateTime(this.datarow.isu_time_added)}</h5>
                    </div>
                    <div class="textBlock">${this.datarow.isu_description}</div>
                    <div class="buttonBar">
                        <button onclick="showIssueEditPanel(${this.datarow.isu_id});">edit</button>
                    </div>`;
                    
        }
        
        showDisplayPanel(){
            this.buildPanel();
            this.panel.innerHTML = this.getDisplayPanelHtml();
            this.panel.classList = 'panel displayMode';
        }
        
        getPanelId(){
            let id = `${this.table.label}Panel${this.datarow.isu_id==`` ? `` : `_${this.datarow.isu_id}`}`;
            return id;
        }
        
        getPanel(){
            return initElement(`${this.getPanelId()}`);
        }
        
        updatePanel(){
            this.panel = this.getPanel();
            
            return this.panel;
        }
        
        getPanelMode(){
            this.updatePanel();
            if(this.panel!=null){
                if(this.panel.classList.contains('editMode')){return 'edit';}
                else if(this.panel.classList.contains('displayMode')){return 'display';}
            }
            return '';
        }
        
        buildPanel(position=''){
            if(this.panel==null){
                let html = `<div class="panel" id="${this.getPanelId()}"></div>`
                if(position==''){
                    appendToWrapperMain(`<div class="panel" id="${this.getPanelId()}"></div>`);
                }else{
                    appendAboveNthPanelInWrapperMain({'html':html,'position':position});
                }
            }
            this.updatePanel();
        }
        
        removePanel(){
            if(this.panel!=null){
                this.panel.remove()
            }
            this.updatePanel();
        }
    }
