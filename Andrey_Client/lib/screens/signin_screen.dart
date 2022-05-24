import 'package:ChocoChat/screens/signup_screen.dart';
import 'package:flutter/material.dart';

import '../backend/auth/login.dart';

class SignIn extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    late String _mail;
    String? _pwd;
    
    return Scaffold(
      backgroundColor: Colors.grey[300],
      appBar: AppBar(
        centerTitle: true,
        title: Text("SignIn")),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          Center(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(14.5),
                  color: Colors.grey[100],
                ),
                child: TextField(
                  keyboardType: TextInputType.emailAddress,
                  decoration: InputDecoration(
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(14.5)
                    ),
                    hintText: 'Mail',
                  ),
                  onChanged: (e) => _mail = e,
                ),
              ),
            ),
          ),
          Center(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(14.5),
                  color: Colors.grey[100],
                ),
                child: TextField(
                  obscureText: true,
                  enableSuggestions: false,
                  autocorrect: false,
                  decoration: InputDecoration(
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(14.5)
                    ),
                    hintText: 'Password',
                  ),
                  onChanged: (e) => _pwd = e,
                ),
              ),
            ),
          ),
          Center(
            child: MaterialButton(
              color: Colors.brown[400],
              child: Text("SignIn"),
              onPressed: () => login(context, _mail, _pwd),
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(70, 20, 0, 0),
            child: Row(children: [
              Text("Don't have an account?",style: TextStyle(fontSize: 15),),
              TextButton(
                onPressed: () => Navigator.push(
                  context, 
                  MaterialPageRoute(
                    builder: (context) => SignUp())), 
                    child: Text("SignUp", style: TextStyle(fontSize: 17,),)),
            ],),
          )
        ],
      ),
    );
  }
}