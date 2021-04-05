<?php
spl_autoload_register('route_database');
class postMiddlewareData extends database { 
    public function postCore($data){
        if($_SERVER["REQUEST_METHOD"] == "POST") { 
            $registerQuery = "CALL sp_register(:fname, :lname, :gender, :address, :username, :password)";
            if($this->querystring($registerQuery)) { 
                $this->bind(":fname", $data['data1']);
                $this->bind(":lname", $data['data2']);
                if(empty($data['data7']) || $data['data7'] == "") { 
                    $this->bind(":gender", $data['data8']);
                }else { 
                    $this->bind(":gender", $data['data7']);
                }
                $this->bind(":address", $data['data3']);
                $this->bind(":username", $data['data4']);
                $this->bind(":password", password_hash($data['data5'], PASSWORD_DEFAULT));
                if($this->execution()) { 
                    echo json_encode(array("statusCode" => 200));
                }
            }
        }
    }
    public function signincore($credentials) {
        include ('../Queries/queries.php');
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $normalpassword = $credentials['sign2'];
            if ($this->querystring($queries_indicator['api/signinquery'])) {
                $this->bind(':username', $credentials['sign1']);
                $this->execution();
                if ($this->dataCount()) {
                    if ($row = $this->datafetching()) {
                        $id = $row['id'];
                        $firstname = $row['firstname'];
                        $lastname = $row['lastname'];
                        $istype = $row['istype'];
                        $origpassword = $row['password'];
                        if ($this->passworddecryptor($normalpassword, $origpassword)){
                            session_start();
                            if ($istype == 1) {
                                $_SESSION['fname'] = $firstname;
                                $_SESSION['id'] = $id;
                                $_SESSION['lname'] = $lastname;
                                $_SESSION['access'] = true;
                                echo json_encode(array('statusCode' => 200)); //success sign in
                            }
                        }else {
                            echo json_encode(array('statusCode' => 201)); //invalid password
                        }
                    }
                } else {
                    echo json_encode(array('statusCode' => 202)); //username not found
                }
            }
        }
    }
    public function insertCore($datainsert) {
        include ('../Queries/queries.php');
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            if ($this->querystring($queries_indicator['api/insertquery'])) {
                $this->bind(':data1', $datainsert['data1']);
                if ($this->execution()) {
                    echo json_encode(array('statusCode' => 200));
                }
            }
        }
    }
    public function deletionCore($id) {
        include('../Queries/queries.php');
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            if($this->querystring($queries_indicator['api/deleteQuery'])) {
                $this->bind(':id', $id, 1);
                if ($this->execution()) {
                    echo json_encode(array('statusCode' => 200));
                }
            }
        }
    }
    public function updateselectionCore($id) {
        include('../Queries/queries.php');
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            if ($this->querystring($queries_indicator['api/updateselect'])) {
                $this->bind(':id', $id, 1);
                $this->execution();
                if ($this->dataCount()) {
                    if ($row = $this->datafetching()) {
                        echo json_encode(array(
                            'data1' => $row['data1']
                        ));
                    }
                }
            }
        }
    }
    public function finalUpdateCore($data) {
        include('../Queries/queries.php');
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            if ($this->querystring($queries_indicator['api/finalupdate'])) {
                $this->bind(':mydata', $data['data1']);
                $this->bind(':id', $data['id'], 1);
                if ($this->execution()) {
                    echo json_encode(array('statusCode' => 200));
                }
            }
        }
    }
}

function route_database() { 
    include("../web/route.php");
    include_once $router['database'];
}