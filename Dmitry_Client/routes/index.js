const router = require('express').Router();

const axios = require('axios').default;

router.get('/', async (req, res) => {
    // if (!req.session.user){
    //     res.redirect('/auth/register');
    // }
    
    // get all chats related to user
    // render dashboard with those chats

    // ! Placeholder user
    // * use req.session.user._id instead
    const chats_get_result = await axios.get('/chat/related_to/627a50542b9cd30f7328c7a8');

    // console.log(chats_get_result.data.chats[0]);

    // ! Placeholder user,
    // * use req.session.user instead
    
    res.render('dashboard', {
        user: {_id: '627a50542b9cd30f7328c7a8'},
        chats: chats_get_result.data.chats
    });
});

module.exports = router;