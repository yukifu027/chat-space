$(function(){

  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="contents__items" data-message-id='${message.id}'>
          <div class="contents__items__user-name">
          ${message.user_name}
          </div>
          <div class="contents__items__date">
          ${message.created_at}
          </div>
       </div>
       <div class="contents__message" data-message-id='${message.id}'>
          <p>
          ${message.body}
          </p>
          <img src=${message.image}>
       </div>`
      return html;
    } else {
      var html =
        `<div class="contents__items" data-message-id='${message.id}'>
          <div class="contents__items__user-name">
          ${message.user_name}
          </div>
          <div class="contents__items__date">
          ${message.created_at}
          </div>
        </div>
        <div class="contents__message" data-message-id='${message.id}'>
          <p>
          ${message.body}
          </p>
        </div>`
      return html;
    };
  }

  $("#new_message").on("submit", function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".contents").append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $("form")[0].reset();
      $('.send-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });

  var reloadMessages = function() {
    var last_message_id = $('.contents__message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(contents) {
      if (contents.length !== 0) {
        var insertHTML = '';
        $.each(contents, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.contents').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});