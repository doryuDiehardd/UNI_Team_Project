import 'dart:io';

import 'package:ChocoChat/backend/chat/chatRoutes.dart';
import 'package:ChocoChat/backend/profile/getProfileData.dart';
import 'package:ChocoChat/backend/profile/profile.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ChatScreen extends StatefulWidget {
  ChatScreen({Key? key}) : super(key: key);

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  List<dynamic> _messages = [];
  final myController = TextEditingController();
  String? tempMsg;
  String? _username;

  @override
  void initState() {
    super.initState();
    _load();
  }

  @override
  void dispose() {
    // Clean up the controller when the widget is disposed.
    myController.dispose();
    super.dispose();
  }

  void _handleSendPressed(message) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();   
    
    sentMessage(context, message.toString(), prefs.getString('_id'));
    await Future.delayed(Duration(milliseconds: 70));
    _load();
  }

  void _load() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    List messages = [];
    messages.addAll(await getChatMessages(context, int.parse(prefs.getString('currentChatNum')!)));
    setState((){
      _messages = messages;
    });
  }

Future<bool> _isMe(index) async{
    final message = _messages[index!]['owner_id'];;
    bool isMe = message.toString() == await getUserId(context);
    return isMe ? true : false;
  }

  Future inviteUser() => showDialog(
    context: context, 
    builder: (context) => AlertDialog(
    title: Text("Invite User"),
    content: TextField(
      decoration: InputDecoration(hintText: "Enter username"),
      onChanged: (e) => _username = e,
    ),
    actions: [
      TextButton(
      onPressed: () async {
        SharedPreferences prefs = await SharedPreferences.getInstance();
        String chatnum = prefs.getString('currentChatNum')!;
        putNewUser(context, chatnum, _username);
        Navigator.of(context, rootNavigator: true).pop();
      }, 
      child: Text("SUBMIT"))
    ],
    )
  );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
              alignment: Alignment.centerLeft,
              icon: Icon(Icons.arrow_back_rounded),
              onPressed: () => Navigator.of(context, rootNavigator: true).pop()
            ),
        centerTitle: true,
        title: Text('chat'),
        actions: [
        IconButton(
          onPressed: () => inviteUser(),
          icon: Icon(Platform.isAndroid ? Icons.more_vert : Icons.more_horiz),
        ),
      ],
      ),
      body:
        Column(
          children: [
            Expanded(
              flex: 9,
              child: ListView.builder(
                itemCount: _messages.length,
                scrollDirection: Axis.vertical,
                shrinkWrap: false,
                itemBuilder: (BuildContext context, int? index) {
                  bool isMe = true;
                  _isMe(index).then((val) => isMe = val);
                  return Container(
                    margin: EdgeInsets.only(top: 7),
                    child: Column(
              children: [
                Row(
                  mainAxisAlignment:
                      isMe ? MainAxisAlignment.end : MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    if (!isMe)
                      Icon(Icons.account_circle),
                    SizedBox(
                      width: 10,
                    ),
                    Container(
                      padding: EdgeInsets.all(10),
                      constraints: BoxConstraints(
                          maxWidth: MediaQuery.of(context).size.width * 0.6),
                      decoration: BoxDecoration(
                          color: isMe ? Colors.amber : Colors.grey[200],
                          borderRadius: BorderRadius.only(
                            topLeft: Radius.circular(16),
                            topRight: Radius.circular(16),
                            bottomLeft: Radius.circular(isMe ? 12 : 0),
                            bottomRight: Radius.circular(isMe ? 0 : 12),
                          )),
                      child: Text(
                        _messages[index!]['msg'],
                        style: TextStyle(
                            color: isMe ? Colors.white : Colors.grey[800]),
                      ),
                    ),
                  ],
                ),
                Padding(
                  padding: const EdgeInsets.only(top: 5),
                  child: Row(
                    mainAxisAlignment:
                        isMe ? MainAxisAlignment.end : MainAxisAlignment.start,
                    children: [
                      if (!isMe)
                        SizedBox(
                          width: 40,
                        ),
                    ],
                  ),
                )
              ],
            ),
                  );},
              ),
            ),
        Align(
          alignment: Alignment.bottomLeft,
          child: Container(
            padding: EdgeInsets.only(left: 10,bottom: 10,top: 10),
            height: 60,
            width: double.infinity,
            color: Colors.grey[300],
            child: Row(
              children: <Widget>[
                SizedBox(width: 15),
                Expanded(
                  flex: 1,
                  child: TextField(
                    decoration: InputDecoration(
                      hintText: "Write message",
                      hintStyle: TextStyle(color: Colors.black54),
                      border: InputBorder.none,
                    ),
                    controller: myController,
                    onChanged: (val) => tempMsg = val,
                  ),
                ),
                SizedBox(width: 15,),
                FloatingActionButton(
                  onPressed: (){
                    if(tempMsg == null){}
                    else{
                      _handleSendPressed(tempMsg);
                    myController.clear();
                    }
                    
                  },
                  child: Icon(Icons.send,color: Colors.white,size: 18,),
                  backgroundColor: Colors.blue,
                  elevation: 0,
                ),
              ],
            ),
          ),
        ),
      ],
    ),
  );
}}