<?php
spl_autoload_register('route_models');
if(isset($_POST['trigger']) == true) { 
    $callback = new post_Models();
    $callback->postModelWall();
}

if(isset($_POST['signinonstate']) == true) {
    $callback = new post_Models();
    $callback->siginModel();
}

if (isset($_POST['insertTrigger']) == true) {
    $callback = new post_Models();
    $callback->insertModel();
}

if (isset($_POST['deletionTrigger']) == true) {
    $callback = new post_Models();
    $callback->deletionModel();
}
if (isset($_POST['upselect']) == true) {
    $callback = new post_Models();
    $callback->updateselection();
}

if (isset($_POST['finalupdateTrigger']) == true) {
    $callback = new post_Models();
    $callback->finalUpModel();
}

function route_models() {
    include("../web/route.php");
    include_once $router['models'];
}