const inp_message = document.getElementById('inp-message');

document.getElementById('btn-send-message')
.addEventListener('click', async () => {
    if (!inp_message.value){
        return;
    }

    const rawResponse = await fetch(`http://localhost:5000/chat/${active_chat_id}/messages`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            msg: inp_message.value,
            owner_id: user_id
        })
    });

    console.log(rawResponse.status);
});