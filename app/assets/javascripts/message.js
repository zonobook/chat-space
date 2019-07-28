$(function(){
  function buildHTML(message){
    var content = message.content ? `<p class="lower-message__content">${message.content}</p>` :"";
    var img = message.image ? `<img src="${message.image}">` : "";
    var html = `<div class="message" data-id = "${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="lower-message">
                    ${content}
                    ${img}
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $('.form__submit').removeAttr('data-disable-with');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data)
      $('.messages').append(html)
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      $('.form__message').val('')
      $('.hidden').val('')
    })
    .fail(function(){
      alert('error');
    })
  })
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message :last').data('id');
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: location.pathname,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML = buildHTML(message)
        $('.messages').append(html)
      })
    })
    .fail(function() {
      console.log('error');
    });
  };
});
