function display_chat(chat_data){
    document.querySelector('.status-msg-container').style.display = 'none';

    if (!chat_data.messages.length){
        document.querySelector('.opened-chat').style.display = 'block';
        document.querySelector('.no-msgs-yet').style.display = 'flex';
    }

    // else 
    // clear prev chat content, if any
    // build_chat()
    document.querySelector('.opened-chat').style.display = 'block';
    document.querySelector('.all-messages-container').style.display = 'block';
    init_messages(chat_data.messages);
}