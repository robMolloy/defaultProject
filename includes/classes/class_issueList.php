<?php
class issueList extends defaultListObject {
    public $datarows = [];
    public $sensitivedatarow = [];
    public $labelrow = [];
    public $table = ['name'=>'onb_issues','label'=>'issue','primarykey'=>'isu_id','userkey'=>'isu_usr_id'];
    public $order = 'isu_time_added';
    public $direction = 'DESC';
    public $defaultFilters = [];
    public $filters = [];
    
    function setDefaultFilters(){
        $this->defaultFilters = ['='=>[$this->table['userkey']=>getUserId()]];
    }
}
?>
