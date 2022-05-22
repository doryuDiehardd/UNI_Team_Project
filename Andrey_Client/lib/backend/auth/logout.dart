import 'package:ChocoChat/screens/signin_screen.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

import '../../config.dart';

logout(context) async {
  late http.Response res;
  try {
    res = await http.get(Uri.parse("${baseUrl}auth/logout"),
      headers: <String, String> {
        "accept" : "application/json",
      }
    );
  } on FormatException catch(e){
    print("Exception: ${e.message}");
  } catch (e) {
    print("Exception: $e");
  }
  if(res.statusCode == 200){
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setBool('loggedin', false);
    prefs.setString('_id', '');
    print("successful logging out");
    return Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => SignIn()),
    );
  } else {
    print("Error when logout");
  }
}