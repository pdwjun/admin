/**
 * Created by - on 16/10/2014.
 */
$(document).ready(function()
{
    test()
    $.get('data/admin.xml', function(d){
        $('body').append('<h1> Saturn给你推荐几本书： </h1>');
        $('body').append('<dl />');

        $(d).find('book').each(function(){

            var $book = $(this);
            var title = $book.attr("title");
            var description = $book.text();
            var imageurl = $book.attr('imageurl');

            var html = '<dt> <img class="bookImage" alt="" src="' + imageurl + '" /> </dt>';
            html += '<dd> <span class="loadingPic" alt="Loading" />';
            html += '<p class="title">' + title + '</p>';
            html += '<p> ' + description + '</p>' ;
            html += '</dd>';

            $('dl').append($(html));

            $('.loadingPic').fadeOut(2000);
        });
    });
});

var test = function(){
}