<?php

class issue extends defaultObject {
    public $datarow = [];
    public $errors = [];
    public $exists = False;
    public $valid = False;
    public $success = False;
    public $newlyAdded = False;

    public $checks = ['user'=>True];
    public $labelrow = [];
    public $sensitivedatarow = [];
    public $table = ['name'=>'onb_issues','label'=>'issue','primarykey'=>'isu_id','userkey'=>'isu_usr_id'];
    
    function updateDatarowBeforeSave(){
        //~ edit datarow before save
        $this->datarow['isu_usr_id'] = getUserId();
		if($this->exists){
			
		} else {
			$this->datarow['isu_time_added'] = time();
            
            if($this->valid){
                
			}
		}
    }
    
    
    function updateValidityForSave(){
		$this->valid = True;
		$this->errors = [];
		
		if($this->datarow['isu_title']==''){
			$this->valid = False;
			$this->errors['isu_title'][] = $this->labelrow['isu_title'].' cannot be blank';
		}
		
		if($this->exists){}else{}
        
		return $this->valid;
    }
    
}

?>
