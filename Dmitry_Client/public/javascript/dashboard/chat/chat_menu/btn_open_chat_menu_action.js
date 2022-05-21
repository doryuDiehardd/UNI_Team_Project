const chat_menu = document.getElementById('chat-menu');

document.getElementById('btn-open-chat-menu')
.addEventListener('click', () => {
    if (getComputedStyle(chat_menu).getPropertyValue('display') === 'none'){
        chat_menu.style.display = 'block';
    }
    else{
        chat_menu.style.display = 'none';
    }
});