import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

import '../../config.dart';
import '../../screens/profile_screen.dart';

profile(context)async{
  SharedPreferences prefs = await SharedPreferences.getInstance();
  late http.Response res;
  Map <String, dynamic>? map;
  try {
    res = await http.get(Uri.parse("${baseUrl}profile/${prefs.getString('_id')}"),
    headers: <String, String>{
      "content-type" : "application/json",
      "accept" : "application/json",
      "charset": "utf-8"
    });
    print(res.body);
    map = jsonDecode(res.body);
    
    print(res.statusCode);
  } on FormatException catch(e){
    print("Exception: ${e.message}");
  } on SocketException catch(e) {
    print("Socket Exception: ${e.message} ${e.address}");
  } catch (e) {
    print("Error on connecting: $e");
  }

  if(res.statusCode == 200){
    Navigator.push(context, MaterialPageRoute(builder: (context) => Profile()));
  }
}

getUserByName(context, _username) async {
  http.Response? res;
  try {
    res = await http.get(Uri.parse("${baseUrl}profile/by_name/${_username}"),
    headers: <String, String>{
      "content-type" : "application/json",
      "accept" : "application/json",
      "charset": "utf-8"
    });
    print(jsonDecode(res.body)[0]['_id']);
   
    print(res.statusCode);
  } on FormatException catch(e){
    print("Exception: ${e.message}");
  } on SocketException catch(e) {
    print("Socket Exception: ${e.message} ${e.address}");
  } catch (e) {
    print("Error on connecting: $e");
  }
  if(res!.statusCode == 200){
    String result = jsonDecode(res.body)[0]['_id'];
    return result;
  }
}