<?php

$queries_indicator = [
    'api/signinquery' => 'select * from users where username =:username',
    'api/insertquery' => 'insert into tbdata values(default, :data1, current_timestamp)',
    'api/selectQueries' => 'select * from tbdata order by id desc',
    'api/deleteQuery' => 'delete from tbdata where id=:id',
    'api/updateselect' => 'select * from tbdata where id=:id',
    'api/finalupdate' => 'update tbdata set data1=:mydata where id=:id'
];