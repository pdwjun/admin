<?php
/**
 * Created by PhpStorm.
 * User: -
 * Date: 17/10/2014
 * Time: 00:35
 */

$dom=new DOMDocument('1.0');
$dom->load('data/data.xml');
$roles=$dom->documentElement;
$a = $dom->getElementsByTagName('users')->item(0);
$a->parentNode->removeChild($a);

$new = $dom->createElement("users");
$x = $dom->getElementsByTagName("data")->item(0);
$x->appendChild($new);

$echo = "";
$data = $_POST['data'];
foreach($data as $key => $item){
    if($key != 0)
    {
        $newrole = $dom->createElement("user");
        $newrole->setAttribute('pwd', $item[0]);
        $newrole->setAttribute('role', $item[2]);
        $newrole->nodeValue=$item[1];
        $new->appendChild($newrole);
    }
}
$dom->save('data/data.xml');
//echo $_POST['pwd'];

echo '操作成功';
