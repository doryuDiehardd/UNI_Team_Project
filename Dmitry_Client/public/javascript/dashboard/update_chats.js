async function update_chats(){
    //  Fetch data
    
    const rawChats = await fetch(`http://localhost:5000/chat/related_to/${user_id}`);
    const chats_get_data = await rawChats.json();
    // console.log(chats_get_data.chats);

    // Update

    const container_all_chats = document.querySelector('.container-all-chats');

    container_all_chats.innerHTML = '';

    chats_get_data.chats.forEach(chat => {
        container_all_chats.insertAdjacentHTML('beforeend',
        `
        <div class="chat" data-chat-id="${ chat._id }">
            <div class="circle"></div>
            <p>${ chat.name }</p>
        </div>
        `
        );
    });
}