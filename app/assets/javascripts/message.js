$(function(){

  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="contents__items">
          <div class="contents__items__user-name">
          ${message.user_name}
          </div>
          <div class="contents__items__date">
          ${message.created_at}
          </div>
       </div>
       <div class="contents__message">
          <img src=${message.image}>
       </div>`
      return html;
    } else {
      var html =
        `<div class="contents__items">
          <div class="contents__items__user-name">
          ${message.user_name}
          </div>
          <div class="contents__items__date">
          ${message.created_at}
          </div>
        </div>
        <div class="contents__message">
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
});