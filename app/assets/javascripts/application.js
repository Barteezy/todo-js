// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery.turbolinks
//= require jquery_ujs
//= require turbolinks
//= require_tree .

$(document).ready(function () {
    var formhtml = "";
    formhtml += "<h1>Todoly</h1>";
    formhtml += "<form>";
    formhtml += "<input type='text' name='todo' id='todo'/>";
    formhtml += "<br><input type='submit' value='Create Todo' id='button'/>";
    formhtml += "</form>";

    var todoshtml = "";
    todoshtml += "<h2 id='flash-insert'>Todo</h2>";
    todoshtml += "<div id='todos'></div>";
    todoshtml += "<h2>Completed</h2>";
    todoshtml += "<div id='completed'></div>"


    var $new_task_div = $('body');

    $new_task_div.append(formhtml + todoshtml);

    var successMessage = "<div id='flash-message'>Todo created</div>";

    var deleteMessage = "<div id='delete-message'>Todo deleted</div>";

    var completeMessage = "<div id='complete-message'>Todo completed</div>";

    var $todos = $('#todos');
    var $name = $('#todo');

    var todoTemplate = ""
        todoTemplate += "<li>";
        todoTemplate += "<a>{{name}}</a><div data-id='{{id}}' class='remove'>X</div><div data-id='{{id}}' class='check'>√</div>";
        todoTemplate += "</li>";


    $.ajax({
        type: 'GET',
        url: '/todos',
        success: function (todos) {
            $.each(todos, function (i, todo) {
                $todos.append(Mustache.render(todoTemplate, todo));
            });
        }
    });

    $('#button').on('click', function (e) {
        e.preventDefault();
        var todo = {
            name: $name.val()
        };

        $.ajax({
            type: 'POST',
            url: '/todos',
            data: todo,
            success: function (newTodo) {
                $todos.append(Mustache.render(todoTemplate, newTodo));
            }
        });
        $('#flash-insert').append(successMessage);

        window.setTimeout(function () {
         $('#flash-message').remove() },1000);
    });

    $new_task_div.delegate('.remove','click', function() {
        var $li = $(this).closest('li');
        $.ajax({
            type: 'DELETE',
            url: 'todos/' + $(this).attr('data-id'),
            success:function () {
                $li.remove();
            }
        });
        $('#flash-insert').append(deleteMessage);

        window.setTimeout(function () {
            $('#delete-message').remove() },1000);
    });

    $todos.delegate('.check', 'click', function() {
        var $li = $(this).closest('li');
        $.ajax({
            type: 'PUT',
            url: '/todos/' + $(this).attr('data-id'),
            success:function () {
                $('#completed').append($li);
            }
        });
        $('#flash-insert').append(completeMessage);

        window.setTimeout(function () {
            $('#complete-message').remove() },1000);
    });

});
