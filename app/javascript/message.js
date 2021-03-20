$(function (){
  function buildHTML(message){
    var html =
    `<div class="message">
    <div class="right_content">
     <ul class="menu">
      <% if message.user_id == current_user.id  %>
        <li><a href=""><i class="fas fa-angle-down fa-2x"></i></a>
            <ul>
              <li><%= link_to '削除', room_message_path(@room, message) , method: :delete, class: "right_list" %></li>
            </ul>
          </li>
        <% end %>
      </ul>
    </div>
    <div class="upper-message">
      <div class="message-user">
        <!-- 投稿したユーザー名情報を出力する -->
        <%= message.user.name %>
  
      </div>
      <div class="message-date">
        <!-- 投稿した時刻を出力する -->
        <%= l message.created_at, format: :short %>
  
      </div>
    </div>
    <div class="lower-message">
      <div class="message-content">
        <!-- 投稿したメッセージ内容を記述する -->
        <% if message.content %>
            <b><%= "支払額 #{@room.currency.name}" %><%= message.content.floor(2).to_s(:delimited) %></b><br>
          <% if @room.user_ids.length != 1 %>
            <b><%= "#{@room.number}人で割った1人分の金額は #{@room.currency.name}#{(message.content / @room.number).floor(2).to_s(:delimited)}" %></b>
          <% end %>
            <div class="lower-sub-message">
           <% if @room.currency_id != 10 %>
            <%= "支払いの換算額 ¥#{(message.content / @room.price * 100).floor(0).to_s(:delimited)}" %><br>
          <% end %>
          <% if @room.user_ids.length != 1 && @room.currency_id != 10 %>
            <%= "#{@room.number}人で割った1人分の換算額は ¥#{(message.content / @room.price * 100 / @room.number).floor().to_s(:delimited)}" %>
          <% end %>
        </div>
        <% end %>
      </div>
      <%= image_tag message.image.variant(resize: '300x400'), class: 'message-image' if message.image.attached? %>
    </div>
  </div>`
  return html;
  }

  $('#form').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message').prepend(html)
      $('.form-message').val("");
      $('.form_submit').prop('disabled',false);
    })
    .fail(function(){
      alert('error');
    })
  })
})
// function message() {
//   const formSubmit = document.getElementById("form-submit");
//   formSubmit.addEventListener("click",(e) => {
//     const formData = new FormData(document.getElementById("form"));
//     const XHR = new XMLHttpRequest();
//     XHR.open("POST", "/rooms", true);
//     XHR.responseType = "json";
//     XHR.send(formData);
//     XHR.onload = () => {
//       if (XHR.status != 200) {
//         alert(`Error ${XHR.status}: ${XHR.statusText}`);
//         return null;
//       }
//       const item = XHR.response.room.message;
//       const messages = document.getElementById("message");
//       const messageContent = document.getElementById("message_content");
//       const HTML = `
//         <div class="upper-message">
//           <div class="message-user">
//             ${item.user.name}
//           </div>
//           <div class="message-date">
//             ${item.created_at}
//           </div>
//         </div>
//         <div class="lower-message">
//           <div class="message-content">
//             <% if message.content %>
//             ${room.currency.name} ${item.content.to_s(delimited)}<br>
//             <div class="lower-sub-message">
//               "換算額は¥"${(item.content / room.price * 100).floor.to_s(delimited)}<br>
//               ${room.number}"人で割った1人分の金額は"${room.currency.name}${(item.content /room.number).to_s(delimited)}<br>
//               ${room.number}"人で割った1人分の換算額は¥"${(item.content / room.price * 100 / room.number).floor.to_s(delimited)}
//             <% end %></br>
//             </div>
//           </div>
//           <img src= ${item.image.variant(resize= '300x300')}, class: 'message-image' if message.image.attached? >
//         </div>
//       `;
//       messages.insertAdjacentHTML("afterbegin",HTML);
//       formText.value = "";
//     };
//     e.preventDefault();
//   });
// }
// window.addEventListener("load",message); %>