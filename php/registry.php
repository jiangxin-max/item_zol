<?php
header('content-type:text/html;charset:utf-8;');

require "conn.php";

//先检测用户名是否重名
if(isset($_POST['tel'])){

    $user_tel = $_POST['tel'];  //ajax传输的数据
    
    $result=$connect->query("SELECT * FROM form1 WHERE tel = '$user_tel' ");//匹配数据库数据 
    if($result->fetch_assoc()){
        echo true;//用户名存在返回true - 对应显示1
    }else{
        echo false;//不存在返回false - 对应显示空白
    }
}

//再将数据提交到数据库保存，确定是否点击了submit按钮
if(isset($_POST['submit'])){
    $tel = $_POST['tel'];
    $password = sha1($_POST['password']);
    $connect -> query("INSERT form1 VALUES(null,'$tel','$password')");
    header('location:http://10.31.163.30/2004/Item_zol/src/login.html');
}