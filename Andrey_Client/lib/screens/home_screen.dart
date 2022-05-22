import 'package:ChocoChat/backend/chat/chatRoutes.dart';
import 'package:ChocoChat/backend/chat/getChatData.dart';
import 'package:ChocoChat/screens/chat_screen.dart';
import 'package:ChocoChat/screens/profile_screen.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {

  List _chatList = [];

  @override
  void initState() {
    super.initState();
    _loadData();
  }
  // Call this when the user pull down the screen
  Future<void> _loadData() async {
    try {
      List<String> _loadedChatNames = await getChatsName(context);
      setState(() {
        _chatList = _loadedChatNames;
      });
    } catch (e) {
      print("we hawe $e");
      rethrow;
    }
  }

 String? _chatname;
  Future openDialog() => showDialog(
    context: context, 
    builder: (context) => AlertDialog(
    title: Text("Create chat"),
    content: TextField(
      decoration: InputDecoration(hintText: "Enter chat name"),
      onChanged: (e) => _chatname = e,
    ),
    actions: [
      TextButton(
      onPressed: () { 
        createChat(context, _chatname);
        Navigator.of(context, rootNavigator: true).pop();
        _loadData();
      }, 
      child: Text("SUBMIT"))
    ],
    )
  );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[300],
      appBar: AppBar(
        leading: IconButton(
          icon: Icon(Icons.account_circle_outlined),
          onPressed: ()=> Navigator.push(context,
            MaterialPageRoute(builder: (context) => Profile())) ,
        ),
        actions: [
          IconButton(
            onPressed: _loadData, icon: Icon(Icons.replay_outlined))
        ],
        centerTitle: true,
        title: const Text("Conversations", 
          textAlign: TextAlign.center,)
      ),
      // drawer: Drawer(
      //   child: ListView.builder(
      //     itemCount: 1,
      //     itemBuilder: (BuildContext context, int index) {
      //       return Column(
      //         children: [
      //           ListTile(
      //             title: Text("Profile"),
      //             leading: Icon(Icons.account_box_rounded),
      //             onTap: ()=>Navigator.push(
      //               context,
      //               MaterialPageRoute(builder: (context) => Profile())
      //             ),
      //           ),
      //           Divider(),
      //           ListTile(
      //             title: Text("Logout"),
      //             leading: Icon(Icons.logout_rounded),
      //             onTap: ()=>logout(context),
      //           ),
      //         ],
      //       );
      //     }
      //   ),
      // ),
      body: RefreshIndicator(
        onRefresh: _loadData,
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            children: [
              //start of searchbar
              Padding(
                padding: const EdgeInsets.fromLTRB(10, 10, 10, 3),
                child: Container(
                  height: 35,
                  decoration: BoxDecoration(
                    color: Colors.grey[100],
                    borderRadius: BorderRadius.circular(20.0),
                  ),
                  child: const TextField(
                    textAlignVertical: TextAlignVertical.center,
                    autocorrect: false,
                    //TODO: work on search
                    decoration: InputDecoration(
                      contentPadding: EdgeInsets.symmetric(horizontal: 15, vertical: 1),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(20.0)),
                      ),
                      hintText: "Search",
                    ),
                    ),
                  ),
              ),
              ///////
              //------------
              //start of chat list
              Padding(
                padding: const EdgeInsets.all(10),
                child: Divider(),
              ),
              //ListView(),
              Expanded(
                flex: 1,
                child: ListView.builder(
                  itemCount: _chatList.length,
                  scrollDirection: Axis.vertical,
                  shrinkWrap: false,
                  itemBuilder: (BuildContext context, int index) {
                    return Column(
                      children: [
                        ListTile(
                          title: Text(_chatList[index]),
                          subtitle: Text('get related chat'),
                          leading: Icon(Icons.supervised_user_circle_sharp),
                          onTap: () async {
                            SharedPreferences prefs = await SharedPreferences.getInstance();
                            prefs.setString('currentChatNum', index.toString());
                            //getChat(context, int.parse(prefs.getString('currentChatNum')!));
                            
                            Navigator.push(context, 
                            MaterialPageRoute(builder: (context) => ChatScreen()));
                            },
                        ), 
                        Divider(),
                      ],
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
      floatingActionButton: IconButton(
        icon: Icon(Icons.create_rounded),
        onPressed: () => openDialog(),
        ),
    );
  }
}