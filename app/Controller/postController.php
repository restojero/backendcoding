<?php
spl_autoload_register('route_middleware');
class postControllerData extends postMiddlewareData { 
    public function postWall($data){ 
         $this->postCore($data);   
    }
    public function signincontroller($credentals) {
        $this->signincore($credentals);
    }
    public function insertcontroller($datainsert) {
        $this->insertCore($datainsert);
    }
    public function deletionConroller($id) {
        $this->deletionCore($id);
    }
    public function updateselectController($id) {
        $this->updateselectionCore($id);
    }
    public function finalUpController($data) {
        $this->finalUpdateCore($data);
    }
}

function route_middleware(){ 
    include("../web/route.php");
    include_once $router['middleware'];
}