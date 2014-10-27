<?php
/**
 * Created by PhpStorm.
 * User: -
 * Date: 17/10/2014
 * Time: 00:35
 */

$dom=new DOMDocument('1.0');
$dom->load('data/meta.xml');
$roles=$dom->documentElement;
$a = $dom->getElementsByTagName('metas')->item(0);
$a->parentNode->removeChild($a);

$new = $dom->createElement("metas");
$x = $dom->getElementsByTagName("data")->item(0);
$x->appendChild($new);

$echo = "";
$data = $_POST['data'];
foreach($data as $key => $item){
    if($key != 0)
    {
        $newrole = $dom->createElement("meta");
        $newrole->setAttribute('id', $item[4]);
        $newrole->setAttribute('name', $item[0]);
        $newrole->setAttribute('width', $item[1]);
        $newrole->setAttribute('option', $item[2]);
        $newrole->setAttribute('type', $item[3]);
        $new->appendChild($newrole);
    }
}
$dom->save('data/meta.xml');
echo '操作成功';