<?php
/**
 * Created by PhpStorm.
 * User: jason.wang
 * Date: 29/10/2014
 * Time: 10:49
 */
session_start();
$dom=new DOMDocument('1.0');
$dom->load('data/data.xml');
$a = $dom->getElementsByTagName('user');
foreach($a as $item) {
    if ($item->textContent==$_SESSION['userid']&&$item->getAttribute("role") == '管理员') {
        echo $_SESSION['userid'];
        return true;
    }
}