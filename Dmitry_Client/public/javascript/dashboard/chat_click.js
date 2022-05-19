function init_chat_blocks_action_events(){
    const chat_blocks = Array.from(document.querySelectorAll('.chat'));

    chat_blocks.forEach(chat_block => {
        chat_block.addEventListener('click', () => {
            console.log('click');
        });
    });
}

init_chat_blocks_action_events();