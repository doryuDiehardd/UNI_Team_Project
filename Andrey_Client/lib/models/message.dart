import 'package:ChocoChat/models/user.dart';

class Messages {
  String? sId;
  String? msg;
  User? ownerId;
  bool? isEdited;
  bool? isViewed;

  Messages({this.sId, this.msg, this.ownerId, this.isEdited, this.isViewed});

  Messages.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    msg = json['msg'];
    ownerId = json['owner_id'];
    isEdited = json['is_edited'];
    isViewed = json['is_viewed'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['_id'] = this.sId;
    data['msg'] = this.msg;
    data['owner_id'] = this.ownerId;
    data['is_edited'] = this.isEdited;
    data['is_viewed'] = this.isViewed;
    return data;
  }
}