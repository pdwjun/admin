/**
 * Created by - on 16/10/2014.
 */
$.ajaxSetup({
    async : false //取消异步
});
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


            var tab_count = 0
            $(e).find('meta').each(function () {
                var $item = $(this)

                var id = $item.attr("id")
                var name = $item.attr("name")
                var width = $item.attr("width")
                var option = $item.attr("option")
                var type = $item.attr("type")

                tab.push(Array(name,width,option,type,id))
                th += '<th width="' + width + 'px">' + name + '</th>'
                tab_count++
            })
            th += "</tr>"
            html += th

            $("#tab_count").val(tab_count)

            var step = 0
            $(d).find('item').each(function () {
                account++
                var first = 0
                var $item = $(this)
                var item_count = 0
                $item.find('list').each(function(){item_count++})
                var td = getTD(tab,$item,users,0)
                tr += '<tr class="main'+step+'"><td rowspan="'+item_count+'">'+td+'</td>'
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
                    tr += "</tr>"
                })
                step++
            })
            html += tr
        })


            $('#data').append(html)
            $(".form_datetime").datetimepicker();
            $("#account").val(account)
            $('.jqte-test').jqte();

            // settings of status
            var jqteStatus = true;
            $(".status").click(function()
            {
                jqteStatus = jqteStatus ? false : true;
                $('.jqte-test').jqte({"status" : jqteStatus})
            });

    })
})

var save = function(){
    var data = []
    $("#data tr").each(function(){
        var tab_count = $("#tab_count").val()
        var arr = []
        for(i=0;i<tab_count;i++){
            if($(this).find("#tab_"+i+"[name='checkbox']").length>0)
                arr.push($(this).find("#tab_"+i).is(":checked"))
            else
                arr.push($(this).find("#tab_"+i).val())
        }
        data.push(arr);
    })
    $.ajax({
        url:'page.php',
        type:"post",
        data: {'data': data},
        success:function(d){
            //$("body").html(d)
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
            var id = $item.attr("id")

            tab.push(Array(name,width,option,type,id))
        })
        var j = 0

        tr += '<tr class="main'+main+'">'
        $.each(tab,function(){
            var td = ""
            switch (tab[j][2]){
                case '文本':
                    td = '<input type="text" class="jqte-test" id="tab_'+j+'" value="" />'
                    break;
                case '时间':
                    td = '<input type="text" id="tab_'+j+'" readonly class="form_datetime" value="" />'
                    break;
                case '时间-自动':
                    td = '<input type="text" id="tab_'+j+'" readonly class="form_datetime" value="" />'
                    break;
                case '选择框':
                    td = '<input type="checkbox" name="checkbox" id="tab_'+j+'" />'
                    break;
                case '员工':
                    var select = "<select name='user' id='tab_'"+j+">"

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
                    td = '<input type="text" class="jqte-test" id="tab_'+j+'" value="" />'
                    break;
                case '时间':
                    td = '<input type="text" id="tab_'+j+'" readonly class="form_datetime" value="" />'
                    break;
                case '时间-自动':
                    td = '<input type="text" id="tab_'+j+'" readonly class="form_datetime" value="" />'
                    break;
                case '选择框':
                    td = '<input type="checkbox" name="checkbox" id="tab_'+j+'" />'
                    break;
                case '员工':
                    var select = "<select name='user' id='tab_'"+j+">"

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
            var value = ''
            $.ajax({
                url:'read.php',
                type:"post",
                async:false,//取消异步请求
                data: {'data': $list.attr('p'+tab[j][4])},
                success:function(d){
                    //$("body").html(d)
                    value = d;
                    //alert(d)
                }})
            td = value
            break;
        case '时间':
            td = '<input type="text" id="tab_'+j+'" readonly class="form_datetime" value="'+$list.attr('p'+tab[j][4])+'" />'
            break;
        case '时间-自动':
            td = '<input type="text" id="tab_'+j+'" readonly class="form_datetime" value="'+$list.attr('p'+tab[j][4])+'" />'
            break;
        case '选择框':
            var checked = ""
            if($list.attr('p'+tab[j][4])=="true")
                checked = "checked='checked'"
            td = '<input type="checkbox" name="checkbox" id="tab_'+j+'" '+checked+' />'
            break;
        case '员工':
            var select = "<select name='user' id='tab_"+j+"'>"
            var user = $list.attr('p'+tab[j][4])

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