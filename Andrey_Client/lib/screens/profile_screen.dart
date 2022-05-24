import 'package:ChocoChat/backend/auth/logout.dart';
import 'package:ChocoChat/backend/profile/profile.dart';
import 'package:flutter/material.dart';

class Profile extends StatelessWidget {
  const Profile({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
      return Scaffold(
      backgroundColor: Colors.grey[400],
      appBar: AppBar(
        leading: IconButton(
          icon: Icon(Icons.arrow_back_rounded),
          onPressed: () => Navigator.of(context, rootNavigator: true).pop()
        ),
        centerTitle: true,
        title: Text("Profile"),
      ),
      body: Column(children: [
        Padding(
        padding: const EdgeInsets.only(bottom: 40, top: 60),
        child: Align(
          alignment: Alignment.topCenter,
          child: MaterialButton(
            color: Colors.amberAccent,
            onPressed: ()=> profile(context),
            child: Text("test"),
          ),
        ),
      ),
        Padding(
        padding: const EdgeInsets.only(bottom: 40),
        child: Align(
          alignment: Alignment.bottomCenter,
          child: MaterialButton(
            color: Colors.amber,
            onPressed: ()=> logout(context),
            child: Text("Logout"),
          ),
        ),
      ),
      ],
      )
    );
  }
}