<?php
/**
 * Created by PhpStorm.
 * User: -
 * Date: 27/10/2014
 * Time: 23:51
 */

$con = mysql_connect("localhost","dbuser","dbuserpassword");
//参数1：本地数据库，参数2：连接数据库的账号，参数3：该账号的密码
if (!$con)
{
    die('Could not connect: ' . mysql_error());
}

mysql_select_db('page', $con);