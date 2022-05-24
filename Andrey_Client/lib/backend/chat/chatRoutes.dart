import 'dart:convert';
import 'dart:io';

import 'package:ChocoChat/backend/profile/getProfileData.dart';
import 'package:ChocoChat/backend/profile/profile.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

import '../../config.dart';

Map <String?, String?> chatlist = {};

createChat(context, _name) async {
  late http.Response res;
  try {

    String userID = await getUserId(context);
    res = await http.post(Uri.parse("${baseUrl}chat/create"),
    headers: <String, String>{
      "content-type" : "application/json",
      "charset" : "utf-8",
    },
    body: await jsonEncode({
      "name" : _name,
      "owner_id": userID
    }));
    print("creating chat status code: ${res.statusCode}");

  } on SocketException catch(e) {
    print("Socket Exception: ${e.message}");
  }on FormatException catch(e) {
    print("Format Exception: ${e.message}");
  }catch (e) {
    print("Error on connecting: $e");
  }

}

getRelatedChats(context) async{
  http.Response? res;
  try {

    String usrID = await getUserId(context);
    res = await http.get(Uri.parse("${baseUrl}chat/related_to/$usrID"),
    headers: <String, String>{
        "content-type" : "application/json",
        "accept" : "application/json",
        "charset" : "utf-8",
    });
    print("getting related chats status code: ${res.statusCode}");

  } on SocketException catch(e) {
    print("Socket Exception: ${e.message}");
  } on FormatException catch(e) {
    print("Format Exception: ${e.message}");
  }catch (e) {
    print("Error: $e");
  }
  return jsonDecode(res!.body);
}

getChat(context,int  chatnum) async{
  Map <String, dynamic> chatmap = await getRelatedChats(context);
  String chat_id = chatmap['chats'][chatnum]['_id'];
  http.Response? res;
  try {

    res = await http.get(Uri.parse("${baseUrl}chat/$chat_id"),
    headers: <String, String>{
        "content-type" : "application/json",
        "accept" : "application/json",
        "charset" : "utf-8",
    });
    print("getting chat status code: ${res.statusCode}");

  } on SocketException catch(e) {
    print("Socket Exception: ${e.message}");
  } on FormatException catch(e) {
    print("Format Exception: ${e.message}");
  }catch (e) {
    print("Error: $e");
  }
  if(res!.statusCode == 200){
    return jsonDecode(res.body)['chats'][chatnum];
  }
}

getChatMessages(context, number) async{
  Map <String, dynamic> chatmap = await getRelatedChats(context);
  String chat_id = chatmap['chats'][number]['_id'];
  http.Response? res;
  try {

    res = await http.get(Uri.parse("${baseUrl}chat/$chat_id/messages"),
    headers: <String, String>{
        "content-type" : "application/json",
        "accept" : "application/json",
        "charset" : "utf-8",
    });
    print("getting chat msgs status code: ${res.statusCode}");

  } on SocketException catch(e) {
    print("Socket Exception: ${e.message}");
  } on FormatException catch(e) {
    print("Format Exception: ${e.message}");
  }catch (e) {
    print("Error: $e");
  }
  if(res!.statusCode == 200){
    List<dynamic> result = [];
    result = jsonDecode(res.body);
    return result;
  }
}

deleteChat(context) async{

}

updateChat(context) async{

}

sentMessage(context,String _msg, _owner_id) async {
  Map <String, dynamic> chatmap = await getRelatedChats(context);
  SharedPreferences prefs = await SharedPreferences.getInstance();
  int chatnum = int.parse(prefs.getString('currentChatNum')!);
  String chat_id = chatmap['chats'][chatnum]['_id'];

  http.Response? res;
  try {

    String userID = await getUserId(context);
    res = await http.post(Uri.parse("${baseUrl}chat/$chat_id/messages"),
    headers: <String, String>{
        "content-type" : "application/json",
        "charset" : "utf-8",
    },
    body: await jsonEncode({
      "msg" : _msg,
      "owner_id": userID
    }));
    print(res.body);
    print("sent message: ${res.statusCode}");

  } on SocketException catch(e) {
    print("Socket Exception: ${e.message}");
  }on FormatException catch(e) {
    print("Format Exception: ${e.message}");
  }catch (e) {
    print("Error on connecting: $e");
  }

}

putNewUser(context, chatnum, username)async{
  Map <String, dynamic> chatmap = await getRelatedChats(context);
  SharedPreferences prefs = await SharedPreferences.getInstance();
  int chatnum = int.parse(prefs.getString('currentChatNum')!);
  String chat_id = chatmap['chats'][chatnum]['_id'];
  String n_rel_user_id = await getUserByName(context, username);
  http.Response? res;
  try {

    res = await http.put(Uri.parse("${baseUrl}chat/$chat_id/related_users"),
    headers: <String, String>{
        "content-type" : "application/json",
        "charset" : "utf-8",
    },
    body: await jsonEncode({
      "new_related_user_id": n_rel_user_id,
    }));
    print(res.body);
    print("adding user: ${res.statusCode}");

  } on SocketException catch(e) {
    print("Socket Exception: ${e.message}");
  }on FormatException catch(e) {
    print("Format Exception: ${e.message}");
  }catch (e) {
    print("Error on connecting: $e");
  }
}