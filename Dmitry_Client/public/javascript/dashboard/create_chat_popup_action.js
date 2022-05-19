const inp_name = document.querySelector('.create-chat-popup #chat-name');

document.querySelector('.create-chat-popup button')
.addEventListener('click', async () => {
    console.log('click');
    const rawResponse = await fetch('http://localhost:5000/chat/create', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: inp_name.value,
            owner_id: document.querySelector('.container-dashboard').getAttribute('data-user-id')
        })
    });

    const res = await rawResponse.json();
});