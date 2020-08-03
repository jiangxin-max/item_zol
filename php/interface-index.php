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

if($connect->connect_error){
    die('数据库连接失败'.$connect->connect_error);
}else{
    $data = $connect->query ("SELECT * FROM zol_index"); //Changes may be required
    $arr = array();
    for($i = 0;$i<$data->num_rows;$i++){
        $arr[$i] = $data->fetch_assoc();
    }
    echo json_encode($arr);//Generate simple interfaces
}


// class interfaceComplex {

// }

// $inter = new interfaceComplex();

// $inter->m1 = $arr1;//data
// $inter->m2 = $arr2;//data
// $inter->m3 = $arr3;//data

// echo json_encode($inter);//Generate complex interfaces
?>
