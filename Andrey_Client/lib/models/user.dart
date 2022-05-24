class User {
  String? sId;
  String? username;
  String? picPath;
  String? email;
  String? password;

  User({this.sId, this.username, this.picPath, this.email, this.password});

  User.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    username = json['username'];
    picPath = json['pic_path'];
    email = json['email'];
    password = json['password'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['_id'] = this.sId;
    data['username'] = this.username;
    data['pic_path'] = this.picPath;
    data['email'] = this.email;
    data['password'] = this.password;
    return data;
  }
}