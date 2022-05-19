function init_chat_blocks_action_events(){
    const chat_blocks = Array.from(document.querySelectorAll('.chat'));

    chat_blocks.forEach(chat_block => {
        chat_block.addEventListener('click', async function () {
            const raw_chat_data = await fetch(`http://localhost:5000/chat/${ this.getAttribute('data-chat-id') }`);
            const chat_data = await raw_chat_data.json();

            console.log(chat_data);
        });
    });
}

init_chat_blocks_action_events();