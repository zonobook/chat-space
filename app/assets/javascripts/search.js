$(function(){

var search_list = $("#user-search-result");
var add_user = $("#chat-group-users")
function appendUser(user){
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
              </div>`
  search_list.append(html);
}
function appendAdduser(name, id){
  var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value='${id}'>
                <p class='chat-group-user__name'>${name}</p>
                <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
              </div>`
  add_user.append(html);
}

function appendErrMsgToHTML(msg){
  var html = `<div class='chat-group-user clearfix'>${ msg }</div>`
  search_list.append(html);
}

  $("#user-search-field").on("keyup", function(e){
    e.preventDefault();
    $("#user-search-result").empty();
    var input = $(this).val();

    if (input.length == 0){
    
    } else {
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })

      .done(function(users){
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else{
          appendErrMsgToHTML("一致するユーザーはいません");
        }
      })
      .fail(function(){
        alert('ユーザー検索に失敗しました');
      })
    }
  });
  $("#user-search-result").on("click", ".user-search-add", function(){
    var name = $(this).data("user-name");
    var id = $(this).data("user-id");
    $(this).parent().remove();
    appendAdduser(name, id)
  });
  $(document).on("click",".user-search-remove",function(){
    $(this).parent().remove();
  });
});