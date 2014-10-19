/**
 * Created by - on 16/10/2014.
 */
$(document).ready(function() {
    $.get('data/page.xml', function (d) {
        var account = 0
        var html = ""
        var tab = []
        var th = "<tr>"
        var tr = ""
        var users = []
        $.get('data/data.xml', function (f) {
            $(f).find('user').each(function () {
                users.push($(this).text())
            })
        })
        $.get('data/meta.xml', function (e) {



            $(e).find('meta').each(function () {
                var $item = $(this)

                var name = $item.attr("name")
                var width = $item.attr("width")
                var option = $item.attr("option")
                var type = $item.attr("type")

                tab.push(Array(name,width,option,type))
                th += '<th width="' + width + 'px">' + name + '</th>'
            })
            th += "<th>操作</th></tr>"
            html += th

            var step = 0
            $(d).find('item').each(function () {
                account++
                var first = 0
                var $item = $(this)
                var item_count = 0
                $item.find('list').each(function(){item_count++})
                var td = getTD(tab,$item,users,0)
                tr += '<tr class="main'+step+'"><td rowspan="'+item_count+'">'+td+'<br /><a href="#" onclick="rmRow(this)" >删除</a></td>'
                first ++
                $item.find('list').each(function(){
                    var $list = $(this)
                    var j = 0
                    $.each(tab,function(){
                        if(j==0&&first > 1)
                            tr += '<tr class="normal">'
                        if(j>0)
                        {
                            var td = ""
                            td = getTD(tab,$list,users,j)
                            tr += '<td>'+td+'</td>'

                        }
                        j++
                    })
                    tr += "<td><a href='#' onclick='addlist(this,"+step+")'>添加</a>&nbsp;&nbsp;&nbsp;<a href='#' onclick='rmList(this,"+step+")'>删除</a></td></tr>"
                })
                step++
            })
            html += tr
        })


        setTimeout(function () {
            $('#data').append(html)
            $(".form_datetime").datetimepicker();
            $("#account").val(account)
        }, 200);

    })
})

var save = function(){
    var data = []
    $("#data tr").each(function(){
        data.push( Array($(this).find("#name").val(),$(this).find("#width").val(),$(this).find("#option option:selected").text(),$(this).find("#type option:selected").text()));
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
    var count = $(obj.parentElement).attr("rowspan")
    var $item = obj.parentElement.parentElement
    while(count-- >0){
        var $temp = $($item).next()
        $item.remove()
        $item = $temp
    }
}
var rmList = function(obj, step){
    if($(obj.parentElement.parentElement).attr("class")=='normal'){
        var id = ".main"+step+" td"
        var count = $(id).first().attr("rowspan")
        $(id).first().attr("rowspan", --count)
        obj.parentElement.parentElement.remove();
    }else{
        var id = ".main"+step+" td"
        var content = $(id).first().html()
        var count = $(id).first().attr("rowspan")
        $(".main"+step).next().children().first().before("<td>"+content+"</td>")
        $(".main"+step).next().children().first().attr("rowspan", --count)
        $(".main"+step).next().first().attr("class", "main"+step)
        obj.parentElement.parentElement.remove();
    }
}

var addRow = function(obj){

    var users = userList()
    var tab = []
    var tr = ""
    var main = 1
    main =  $("#account").val()
    $.get('data/meta.xml', function (e) {
        $(e).find('meta').each(function () {
            var $item = $(this)

            var name = $item.attr("name")
            var width = $item.attr("width")
            var option = $item.attr("option")
            var type = $item.attr("type")

            tab.push(Array(name,width,option,type))
        })
        var j = 0

        tr += '<tr class="main'+main+'">'
        $.each(tab,function(){
            var td = ""
            switch (tab[j][2]){
                case '文本':
                    td = '<input type="text" id="tab_'+j+'" value="" />'
                    break;
                case '时间':
                    td = '<input type="text" id="tab_'+j+'" readonly class="form_datetime" value="" />'
                    break;
                case '时间-自动':
                    td = '<input type="text" id="tab_'+j+'" readonly class="form_datetime" value="" />'
                    break;
                case '选择框':
                    td = '<input type="checkbox" name="checkbox" id="checkbox" />'
                    break;
                case '员工':
                    var select = "<select name='user'>"

                    $.each(users,function(key,value){
                        select += "<option value='"+value+"'>"+value+"</option>"
                    })
                    select += "</select>"
                    td = select
                    break;
            }
            if(j==0)
                tr += '<td rowspan="1">'+td+'</td>'
            else
            tr += '<td>'+td+'</td>'
            j++

        })
        tr += "<td><a href='#' onclick='addlist(this,"+main+")'>添加</a>&nbsp;&nbsp;&nbsp;<a href='#' onclick='rmList(this,"+main+")'>删除</a></td></tr>"
        $("#data tr:last").after(tr);
        $("#account").val(++main)
    })

}

var addlist = function (obj, step) {
    var users = userList()
    var tab = []
    var tr = ""
    $.get('data/meta.xml', function (e) {



        $(e).find('meta').each(function () {
            var $item = $(this)

            var name = $item.attr("name")
            var width = $item.attr("width")
            var option = $item.attr("option")
            var type = $item.attr("type")

            tab.push(Array(name,width,option,type))
        })
        var j = 0
        tr += '<tr class="normal">'
        $.each(tab,function(){
            var td = ""
            switch (tab[j][2]){
                case '文本':
                    td = '<input type="text" id="tab_'+j+'" value="" />'
                    break;
                case '时间':
                    td = '<input type="text" id="tab_'+j+'" readonly class="form_datetime" value="" />'
                    break;
                case '时间-自动':
                    td = '<input type="text" id="tab_'+j+'" readonly class="form_datetime" value="" />'
                    break;
                case '选择框':
                    td = '<input type="checkbox" name="checkbox" id="checkbox" />'
                    break;
                case '员工':
                    var select = "<select name='user'>"

                    $.each(users,function(key,value){
                        select += "<option value='"+value+"'>"+value+"</option>"
                    })
                    select += "</select>"
                    td = select
                    break;
            }
            if(j>0)
            tr += '<td>'+td+'</td>'
            j++

        })
        tr += "<td><a href='#' onclick='addlist(this,"+step+")'>添加</a>&nbsp;&nbsp;&nbsp;<a href='#' onclick='rmList(this,"+step+")'>删除</a></td></tr>"
        $(obj.parentElement.parentElement).after(tr);
        var id = ".main"+step+" td"
        var count = $(id).first().attr("rowspan")
        $(".main"+step).children().first().attr("rowspan", ++count)
    })
}

var userList = function(){

    var users = []
    $.get('data/data.xml', function (f) {
        $(f).find('user').each(function () {
            users.push($(this).text())
        })
    })
    return users;
}

var getTD = function(tab,$list, users,j){

    switch (tab[j][2]){
        case '文本':
            td = '<input type="text" id="tab_'+j+'" value="'+$list.attr(tab[j][0])+'" />'
            break;
        case '时间':
            td = '<input type="text" id="tab_'+j+'" readonly class="form_datetime" value="'+$list.attr(tab[j][0])+'" />'
            break;
        case '时间-自动':
            td = '<input type="text" id="tab_'+j+'" readonly class="form_datetime" value="'+$list.attr(tab[j][0])+'" />'
            break;
        case '选择框':
            var checked = ""
            if($list.attr(tab[j][0])==1)
                checked = "checked='checked'"
            td = '<input type="checkbox" name="checkbox" id="checkbox" '+checked+' />'
            break;
        case '员工':
            var select = "<select name='user'>"
            var user = $list.attr(tab[j][0])

            $.each(users,function(key,value){
                select += "<option value='"+value+"'"
                if(user==value)
                    select += " selected='true' "
                select += ">"+value+"</option>"
            })
            select += "</select>"
            td = select
            break;
    }
    return td;
}