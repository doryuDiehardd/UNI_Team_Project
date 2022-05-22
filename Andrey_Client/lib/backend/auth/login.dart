import 'dart:io';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import '../../config.dart';
import '../../screens/home_screen.dart';

login(context, _mail, _pwd) async {

  http.Response? res;
  if (_mail.isNotEmpty && _pwd.isNotEmpty) {
  try {
    res = await http.post(Uri.parse("${baseUrl}auth/login"),
      headers: <String, String>{
        "content-type" : "application/json",
        "accept" : "application/json",
      },
      body: jsonEncode({
        "username": "null",
        "email": _mail,
        "password": _pwd,
      })
      );
      print(res.body);
    
      print(res.statusCode);
  } on SocketException catch(e) {
    print("Socket Exception: ${e.message}");
  }catch (e) {
    print("Error on connecting: $e");
  }

  print(jsonDecode(res!.body)["_id"].toString());
  if (res.statusCode == 200) {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setBool('loggedin', true);
    prefs.setString('mail', _mail);
    prefs.setString('_id', jsonDecode(res.body)["_id"].toString());
    prefs.setString('username', jsonDecode(res.body)["username"].toString());
    return Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => HomeScreen()),
    );
  } else {
    print("Error signing signing up");
  }
  } else {
  print("Password are not equal");
  }
}