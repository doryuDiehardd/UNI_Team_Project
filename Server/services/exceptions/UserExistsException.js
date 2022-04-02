function UserExistsException(msg){
    this.msg = msg;
    this.name = 'UserExistsException';
}

module.exports = UserExistsException;