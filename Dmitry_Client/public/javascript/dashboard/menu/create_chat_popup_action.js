const inp_name = document.querySelector('.create-chat-popup #chat-name');

document.querySelector('.create-chat-popup button')
.addEventListener('click', async () => {
    const rawResponse = await fetch('http://localhost:5000/chat/create', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: inp_name.value,
            owner_id: user_id // user_id defined globally in html
        })
    });

    // ? use PUB SUB
    // emit 'chat created'
    // catch and update chats block
    
    if (rawResponse.status === 200){
        document.querySelector('.page-fade').click(); // Hide popup
        update_chats();
    }
});