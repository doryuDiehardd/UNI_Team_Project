import 'dart:io';

import 'package:ChocoChat/screens/signin_screen.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import '../../config.dart';

register(context, _mail, _username, _pwd, _cpwd) async {
  //Creating user object
  // Check if email is valid.
  bool isValid = RegExp(
          r"^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+")
      .hasMatch(_mail);
  //Creating response variable
  late http.Response res;
  // Check if email is valid
  if (isValid == true) {
    if (_pwd == _cpwd) {
      try {
        res = await http.post(Uri.parse("${baseUrl}auth/register"),
        headers: <String, String>{
          "content-type" : "application/json",
          "accept" : "application/json",
        },
        body: jsonEncode({
          "username": _username,
          "email": _mail,
          "password": _pwd,
        }));
      
        print(res.body);
        print(res.statusCode);
      } on SocketException catch(e) {
        print("Socket Exception: ${e.message}");
      } catch (e) {
        print("Error on connecting: $e");
      }
        if (res.statusCode == 200) {
          print("successful signing up");
          return Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => SignIn()),
          );
        } else {
          print("Error signing up");
        }
    } else {
      print("Password are not equal");
    }
  } else {
    print("email is false");
  }
}