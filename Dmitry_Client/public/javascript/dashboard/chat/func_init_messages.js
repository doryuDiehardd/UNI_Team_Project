async function init_messages(messages){
    const owner_names = await _get_message_owner_names(messages);

    let prev_msg_owner_id;
    messages.forEach(message => {
        // insert into existing block
        if (prev_msg_owner_id === message.owner_id){
            let html = build_message(message.msg, owner_names[message.owner_id], 'half');
            document.querySelector('.messages:last-child').insertAdjacentHTML('beforeend', html);
        }
        // start new block
        else{
            let html = build_message(message.msg, owner_names[message.owner_id], message.owner_id === user_id ? 'my' : 'member');
            document.querySelector('.all-messages-container').insertAdjacentHTML('beforeend', html);
        }
    
        prev_msg_owner_id = message.owner_id;
    });
}

function build_message(msg_content, owner_name, type){
    if (type === 'half'){
        return `
            <div class="message-content">${msg_content}</div>
        `
    }

    if (type === 'my'){
        return `
        <div class="message-block my-message-block">
            <div class="name-container">
                <div class="circle"></div>
                <span class="name">${owner_name}</span>
            </div>
    
            <div class="messages">
                <div class="message-content">${msg_content}</div>
            </div>
        </div>
        `
    }

    if (type === 'member'){
        return `
        <div class="message-block member-message-block">
            <div class="name-container">
                <span class="name">${owner_name}</span>
                <div class="circle"></div>
            </div>

            <div class="messages">
                <div class="message-content">${msg_content}</div>
            </div>
        </div>
        `
    }
}

async function _get_message_owner_names(messages){
    // get only unique owner ids
    let msg_owner_ids = messages.map(a => a.owner_id);
    let unique_ids = [... new Set(msg_owner_ids)];
    
    let names = {};
    // for of instead of forEach bc forEach doesn't await 
    for (id of unique_ids){
        let user_data = await _get_user_data(id);
        names[id] = user_data.username;
    }

    return names;
}

async function _get_user_data(id){
    const rawResponse = await fetch(`http://localhost:5000/profile/${id}`);
    
    // returns null if no such user exists
    return rawResponse.json();
}