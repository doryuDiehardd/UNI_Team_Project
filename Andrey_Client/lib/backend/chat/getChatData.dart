import 'package:ChocoChat/backend/chat/chatRoutes.dart';

getChatsName(context)async{
  Map <String, dynamic> chatmap = await getRelatedChats(context);
  List<String>? chatlist = [];
  for(int i = 0; i < chatmap['chats'].length; i++){
    chatlist.add(chatmap['chats'][i]['name']);
  }
  print(chatlist);
  if(chatlist.isEmpty){
    return null;
  }else{
    return chatlist;
  }
}
