import 'package:ChocoChat/screens/signin_screen.dart';
import 'package:flutter/material.dart';

import '../backend/auth/register.dart';

class SignUp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    String _mail = '';
    String _user = '';
    String _pwd = '';
    String _cpwd = '';

    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: Text("Signup")),
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
                  decoration: InputDecoration(
                    border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(14.5)
                        ),
                    hintText: 'Username',
                  ),
                  onChanged: (e) => _user = e,
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
                    hintText: 'Confirm password',
                  ),
                  onChanged: (e) => _cpwd = e,
                ),
              ),
            ),
          ),
          Center(
            child: MaterialButton(
              color: Colors.brown[400],
              child: Text("Sign up"),
              onPressed: () => register(context, _mail, _user, _pwd, _cpwd),
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(95, 20, 0, 0),
            child: Row(children: [
              Text("Already have an account?",style: TextStyle(fontSize: 20),),
              TextButton(
                onPressed: () => Navigator.push(
                  context, 
                  MaterialPageRoute(
                    builder: (context) => SignIn())), 
                    child: Text("SignIn", style: TextStyle(fontSize: 20),)),
            ],),
          )
        ],
      ),
    );
  }
}