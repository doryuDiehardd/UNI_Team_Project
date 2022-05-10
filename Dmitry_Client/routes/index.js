const router = require('express').Router();

router.get('/', (req, res) => {
    if (!req.user){
        res.redirect('/auth/register');
    }
    
    // show dashboard
});

module.exports = router;