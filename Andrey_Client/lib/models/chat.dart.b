class Chat {
  List<Chats>? chats;

  Chat({this.chats});

  Chat.fromJson(Map<String, dynamic> json) {
    if (json['chats'] != null) {
      chats = <Chats>[];
      json['chats'].forEach((v) {
        chats!.add(new Chats.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    if (this.chats != null) {
      data['chats'] = this.chats!.map((v) => v.toJson()).toList();
    }
    return data;
  }
}

class Chats {
  String? sId;
  String? name;
  String? picPath;
  String? ownerId;
  List<Null>? messages;
  List<String>? relatedUsers;
  List<Null>? kickedUsers;
  List<Null>? joinRequests;
  int? iV;

  Chats(
      {this.sId,
      this.name,
      this.picPath,
      this.ownerId,
      this.messages,
      this.relatedUsers,
      this.kickedUsers,
      this.joinRequests,
      this.iV});

  Chats.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    name = json['name'];
    picPath = json['pic_path'];
    ownerId = json['owner_id'];
    if (json['messages'] != null) {
      messages = <Null>[];
      json['messages'].forEach((v) {
        messages!.add(new Null.fromJson(v));
      });
    }
    relatedUsers = json['related_users'].cast<String>();
    if (json['kicked_users'] != null) {
      kickedUsers = <Null>[];
      json['kicked_users'].forEach((v) {
        kickedUsers!.add(new Null.fromJson(v));
      });
    }
    if (json['join_requests'] != null) {
      joinRequests = <Null>[];
      json['join_requests'].forEach((v) {
        joinRequests!.add(new Null.fromJson(v));
      });
    }
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['_id'] = this.sId;
    data['name'] = this.name;
    data['pic_path'] = this.picPath;
    data['owner_id'] = this.ownerId;
    if (this.messages != null) {
      data['messages'] = this.messages!.map((dynamic v) => v.toJson()).toList();
    }
    data['related_users'] = this.relatedUsers;
    if (this.kickedUsers != null) {
      data['kicked_users'] = this.kickedUsers!.map((dynamic v) => v.toJson()).toList();
    }
    if (this.joinRequests != null) {
      data['join_requests'] =
          this.joinRequests!.map((dynamic v) => v.toJson()).toList();
    }
    data['__v'] = this.iV;
    return data;
  }
}
