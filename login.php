<?php
/**
 * Created by PhpStorm.
 * User: jason.wang
 * Date: 29/10/2014
 * Time: 10:03
 */
session_start();
if($_GET['action'] == "logout"){
    unset($_SESSION['userid']);
    echo '注销登录成功！点击此处 <a href="login.html">登录</a>';
    exit;
}
if(!isset($_POST['submit'])){
    exit('非法访问!');
}
$username = htmlspecialchars($_POST['username']);
$password = $_POST['password'];

//包含数据库连接文件
//include('conn.php');
////检测用户名及密码是否正确
//$check_query = mysql_query("select uid from user where username='$username' and password='$password' limit 1");

$dom=new DOMDocument('1.0');
$dom->load('data/data.xml');
$a = $dom->getElementsByTagName('user');
foreach($a as $item){
    if($item->getAttribute("pwd")==$password){
        session_start();
        $_SESSION['userid'] = $username;
        echo $_SESSION['userid'],$_SESSION['username'],' 欢迎你！进入 <a href="index.html">首页</a><br />';
        echo '点击此处 <a href="login.php?action=logout">注销</a> 登录！<br />';
        exit;
    }

}

exit('登录失败！点击此处 <a href="javascript:history.back(-1);">返回</a> 重试');
//if($result = mysql_fetch_array($check_query)){
//    //登录成功
//    $_SESSION['username'] = $username;
//    $_SESSION['userid'] = $result['uid'];
//    echo $username,' 欢迎你！进入 <a href="my.php">用户中心</a><br />';
//    echo '点击此处 <a href="login.php?action=logout">注销</a> 登录！<br />';
//    exit;
//} else {
//    exit('登录失败！点击此处 <a href="javascript:history.back(-1);">返回</a> 重试');
//}

//注销登录