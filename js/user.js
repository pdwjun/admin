/**
 * Created by - on 16/10/2014.
 */
$(document).ready(function()
{
    $.get('data/data.xml', function(d){

        var roles = []
        var data = []
        $(d).find('role').each(function() {
            var $item = $(this)
            data.push( $item.text())
        })
        roles = data


        $(d).find('user').each(function(){
            var $item = $(this)
            //var id = $item.attr("id");
            var title = $item.text()
            var pwd = $item.attr("pwd")
            var role = $item.attr("role")
            var select = "<select name='role'>"
            $.each(roles,function(key,value){
                select += "<option value='"+value+"'"
                if(role==value)
                    select += " selected='true' "
                    select += ">"+value+"</option>"
            })
            select += "</select>"
            var table = "<tr><td>&nbsp;<input type='password' id='pwd' value='"+ pwd + "' /></td><td><input type='text' id='name' value='"+ title + "' /></td><td>"+ select + "</td><td><a href='#' onclick='rmRow(this)' >删除</a> </td></tr>"

            $('#data').append($(table));

        });
    });
});

var save = function(){
    var data = []
    $("#data tr").each(function(){
        data.push( Array($(this).find("#pwd").val(),$(this).find("#name").val(),$(this).find("select option:selected").text()));
    })
    var json = "{'data':["
    $.each(data,function(){
        json += "{'pwd':"+$(this).find("#pwd").val()+'}'
        json += "{'role':"+$(this).find("select option:selected").text()+'}'
        json += "{'name':"+$(this).find("#name").val()+'}'
    })
    json += "]}"
    $.ajax({
        url:'xml.php',
        type:"post",
        data: {'data': data},
        success:function(d){
        alert(d)
    }})

}

var rmRow = function(obj){
    obj.parentElement.parentElement.remove();
}

var addrow = function(){
    $.get('data/data.xml', function(d) {

        var roles = []
        var data = []
        $(d).find('role').each(function () {
            var $item = $(this)
            data.push($item.text())
        })
        roles = data
        var select = "<select name='role'>"
        $.each(roles, function (key, value) {
            select += "<option value='" + value + "'>" + value + "</option>"
        })
        select += "</select>"
        $("#data tr:last").after("<tr><td><input type='password' id='pwd' value='' /></td><td><input type='text' id='name' value='' /></td><td>" + select + "</td><td><a href='#' onclick='rmRow(this)' >删除</a> </td></tr>")

    })
}