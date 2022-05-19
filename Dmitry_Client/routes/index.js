const router = require('express').Router();

const axios = require('axios').default;

router.get('/', async (req, res) => {
    // if (!req.session.user){
    //     res.redirect('/auth/register');
    // }
    
    // get all chats related to user
    // render dashboard with those chats

    // ! Placeholder user
    const chats_get_result = await axios.get('/chat/related_to/62482ad51f5d80e4751e93cf');

    // console.log(chats_get_result.data.chats[0]);

    res.render('dashboard', {
        chats: chats_get_result.data.chats
    });
});

module.exports = router;