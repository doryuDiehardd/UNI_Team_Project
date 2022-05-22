import 'dart:io';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import '../../config.dart';

getUserId(context)async{
  SharedPreferences prefs = await SharedPreferences.getInstance();
  http.Response res;
  Map <String, dynamic>? _map;
  try {
    res = await http.get(Uri.parse("${baseUrl}profile/${prefs.getString('_id')}"),
    headers: <String, String>{
      "content-type" : "application/json",
      "accept" : "application/json",
      "charset": "utf-8"
    });
    _map = jsonDecode(res.body);
    //print(map['_id']);
    print("getting userID status code: ${res.statusCode}");
  } on FormatException catch(e){
    print("Exception: ${e.message}");
  } on SocketException catch(e) {
    print("Socket Exception: ${e.message} ${e.address}");
  } catch (e) {
    print("Error on connecting: $e");
  }
    return _map!['_id'].toString();
}

getUsername(context) async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  http.Response res;
  Map <String, dynamic>? _map;
  try {
    res = await http.get(Uri.parse("${baseUrl}profile/${prefs.getString('_id')}"),
    headers: <String, String>{
      "content-type" : "application/json",
      "accept" : "application/json",
      "charset": "utf-8"
    });
    _map = jsonDecode(res.body);
    print("getting username status code: ${res.statusCode}");
  } on FormatException catch(e){
    print("Exception: ${e.message}");
  } on SocketException catch(e) {
    print("Socket Exception: ${e.message} ${e.address}");
  } catch (e) {
    print("Error on connecting: $e");
  }
    return await _map!['username'].toString();
}

getEmail(context)async{
  SharedPreferences prefs = await SharedPreferences.getInstance();
  http.Response res;
  Map <String, dynamic>? map;
  try {
    res = await http.get(Uri.parse("${baseUrl}profile/${prefs.getString('_id')}"),
    headers: <String, String>{
      "content-type" : "application/json",
      "accept" : "application/json",
      "charset": "utf-8"
    });
    map = jsonDecode(res.body);
    print("getting user_mail status code: ${res.statusCode}");
    
  } on FormatException catch(e){
    print("Exception: ${e.message}");
  } on SocketException catch(e) {
    print("Socket Exception: ${e.message} ${e.address}");
  } catch (e) {
    print("Error on connecting: $e");
  }
    return map!['email'].toString();
}