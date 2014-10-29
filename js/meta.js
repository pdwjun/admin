/**
 * Created by - on 16/10/2014.
 */
$(document).ready(function()
{
    var types = Array('2014年12月31日', '12月31日','2014.12.31','12.31','2014年12月31日59:59')
    $("div").delegate("select[id='option']","change",function(){
        if($(this).val()=="时间"||$(this).val()=="时间-自动"){

            var typeOption = "<select id='type'>"
            $.each(types,function(key,value){
                typeOption += "<option value='"+value+"'>"+value+"</option>"
            })
            typeOption += "</select>"
            $(this).parent().next().html(typeOption)
        }
        else{
            $(this).parent().next().html("")
        }

    })
        $.get('data/meta.xml', function(d){

            var data = []
            var html = ""
            var items = Array('时间','时间-自动','文本','选择框','员工')
            var first = 1
            var count = 0
            $(d).find('meta').each(function() {
                var meta = $(this)
                var select = "<select id='option'>"
                var option =  meta.attr('option')
                var type = meta.attr('type')

                $.each(items,function(key,value){
                    select += "<option value='"+value+"'"
                    if(option==value)
                        select += " selected='true' "
                    select += ">"+value+"</option>"
                })
                select += "</select>"
                var typeOption = ""
                if(option=="时间"||option=="时间-自动") {
                    typeOption = "<select id='type'>"
                    $.each(types, function (key, value) {
                        typeOption += "<option value='" + value + "'"
                        if (type == value)
                            typeOption += " selected='true' "
                        typeOption += ">" + value + "</option>"
                    })
                    typeOption += "</select>"
                }
                if(first==1)
                {
                    var main = '主标签'
                    first++
                }
                else
                    var main = '标签'+ first++
                html += "<tr><td>"+main+"</td><td>名称:<input type='text' id='name' value='"+meta.attr('name')+"'/></td>" +
                    "<td><input type='number' id='width' value='"+meta.attr('width')+"'/>px</td>" +
                    "<td>"+select+"</td><td>"+typeOption+"</td><td><a href='#' onclick='rmRow(this)' >删除</a>" +
                "<input id='id' type='hidden' value='"+meta.attr('id')+"' /> </td></tr>"
                count = parseInt(meta.attr('id')) + 1
            })
            $('#data').append(html);
            $("#count").val(count)
            $.ajax({
                url: 'access.php',
                success: function (d) {
                    if(d!=''){
                        var html = '<button type="button" class="btn btn-primary" onclick="save()">保存</button>'
                            +'<button type="button" class="btn btn-primary" onclick="addRow()">添加</button>'
                        $("#button").html(html)

                    }
                }
            })
    });
});

var save = function(){
    var data = []
    $("#data tr").each(function(){
        data.push( Array($(this).find("#name").val(),$(this).find("#width").val(),$(this).find("#option option:selected").text(),$(this).find("#type option:selected").text(),$(this).find("#id").val()));
    })
    $.ajax({
        url:'meta.php',
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
    $.get('data/meta.xml', function(d) {
        var items = Array('时间','时间-自动','文本','选择框','员工')
        var select = "<select name='option'>"
        $.each(items, function (key, value) {
            select += "<option value='" + value + "'>" + value + "</option>"
        })
        select += "</select>"

        var types = Array('2014年12月31日', '12月31日','2014.12.31','12.31','2014年12月31日59:59')
        var typeOption = "<select id='type'>"
        $.each(types,function(key,value){
            typeOption += "<option value='"+value+"'"
            if(type==value)
                typeOption += " selected='true' "
            typeOption += ">"+value+"</option>"
        })
        typeOption += "</select>"
        var count = $("#count").val()
        $("#data tr:last").after("<tr><td>新标签</td><td>名称:<input type='text' id='name' value='标签名称'/></td>" +
            "<td><input type='number' id='width' value=''/>px</td>" +
            "<td>"+select+"</td><td>"+typeOption+"</td><td><a href='#' onclick='rmRow(this)' >删除</a>" +
        "<input id='id' type='hidden' value='"+count+"' /> </td></tr>")
        $("#count").val(parseInt(count)+1)

    })
}