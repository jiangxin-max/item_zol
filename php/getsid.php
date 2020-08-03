<?php

header('content-type:text/html;charset:utf-8;');
/* Cross-domain requests are allowed */
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');

/* Connect to database */
define('HOST','localhost');//Host name
define('USERNAME','root');//User name
define('PASSWORD','root');//User password
define('DBNAME','2004');//Database name - Changes may be required

$connect = new mysqli(HOST,USERNAME,PASSWORD,DBNAME);//Connect to database

if(isset($_GET['sid'])){
    $sid = $_GET['sid'];
    $result=$connect->query("select * from zol_list where sid = $sid");
    echo json_encode($result->fetch_assoc());
}