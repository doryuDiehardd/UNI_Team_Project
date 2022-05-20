// 
// Create chat button
// opens create chat prompt (popup)
// 

const create_chat_popup = document.querySelector('.create-chat-popup');
const page_fade = document.querySelector('.page-fade');

document.getElementById('menu-btn-create-chat').addEventListener('click', () => {
    create_chat_popup.style.display = 'block';
    page_fade.style.display = 'block';
});

page_fade.addEventListener('click', () => {
    create_chat_popup.style.display = 'none';
    page_fade.style.display = 'none';
});

// 
// 
// 