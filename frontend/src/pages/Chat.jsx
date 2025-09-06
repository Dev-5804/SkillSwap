import React, { useState } from 'react';
import { Send, MessageCircle, Search, MoreVertical, Sparkles, Heart, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { ScrollArea } from '../components/ui/scroll-area';
import { mockUsers, mockMessages, currentUser } from '../mock/data';

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);

  // Mock active chats (users with accepted requests)
  const activeChats = [
    { 
      id: 1, 
      user: mockUsers[1], 
      lastMessage: "Perfect! Saturday works great for me. 🎉", 
      timestamp: "2024-01-16T10:40:00Z",
      unreadCount: 0,
      isOnline: true
    },
    { 
      id: 2, 
      user: mockUsers[3], 
      lastMessage: "Thanks for accepting! Looking forward to learning. ✨", 
      timestamp: "2024-01-15T14:20:00Z",
      unreadCount: 2,
      isOnline: false
    },
    { 
      id: 3, 
      user: mockUsers[4], 
      lastMessage: "When would be a good time for our first session? 📅", 
      timestamp: "2024-01-14T09:30:00Z",
      unreadCount: 1,
      isOnline: true
    }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    const message = {
      id: messages.length + 1,
      senderId: currentUser.id,
      senderName: "You",
      text: newMessage,
      timestamp: new Date().toISOString(),
      isOwn: true
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  return (
    <div className="space-y-8" style={{backgroundColor: '#F9FAFB'}}>
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Messages 💬
        </h1>
        <p className="text-slate-600 text-lg">Continue your skill swap conversations</p>
      </div>

      {/* Chat Interface */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden" style={{ height: '700px' }}>
        <div className="flex h-full">
          {/* Chat List */}
          <div className="w-1/3 border-r border-gray-100 flex flex-col bg-gradient-to-b from-gray-50 to-white">
            {/* Search */}
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center">
                  <Search className="w-3 h-3 text-white" />
                </div>
                <Input
                  type="text"
                  placeholder="Search conversations... 🔍"
                  className="pl-12 rounded-xl border-gray-200 focus:border-indigo-300 focus:ring-indigo-200 bg-white"
                />
              </div>
            </div>

            {/* Active Chats */}
            <ScrollArea className="flex-1">
              <div className="divide-y divide-gray-50">
                {activeChats.map(chat => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat)}
                    className={`p-5 cursor-pointer hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 group ${
                      selectedChat?.id === chat.id ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-r-4 border-indigo-500' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Avatar className="w-14 h-14 ring-2 ring-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <AvatarImage src={chat.user.avatar} alt={chat.user.name} />
                          <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-purple-500 text-white font-semibold">
                            {chat.user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {chat.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-emerald-400 to-emerald-500 border-2 border-white rounded-full flex items-center justify-center shadow-lg">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-bold text-slate-800 truncate group-hover:text-indigo-600 transition-colors duration-300">
                            {chat.user.name}
                          </h3>
                          <span className="text-xs text-slate-500 font-medium">
                            {formatTimestamp(chat.timestamp)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-slate-600 truncate leading-relaxed">{chat.lastMessage}</p>
                          {chat.unreadCount > 0 && (
                            <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
                              {chat.unreadCount}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-indigo-50 via-purple-50 to-emerald-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Avatar className="w-12 h-12 ring-2 ring-white shadow-lg">
                          <AvatarImage src={selectedChat.user.avatar} alt={selectedChat.user.name} />
                          <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-purple-500 text-white font-semibold">
                            {selectedChat.user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {selectedChat.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-emerald-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg">{selectedChat.user.name}</h3>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${selectedChat.isOnline ? 'bg-emerald-400' : 'bg-slate-400'}`}></div>
                          <p className="text-sm text-slate-600 font-medium">
                            {selectedChat.isOnline ? '🟢 Online' : '⚪ Last seen recently'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="hover:bg-indigo-100 rounded-xl">
                      <MoreVertical className="w-5 h-5 text-slate-600" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-6 bg-gradient-to-b from-gray-50/30 to-white">
                  <div className="space-y-6">
                    {messages.map(message => (
                      <div
                        key={message.id}
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md px-5 py-3 rounded-2xl shadow-sm ${
                          message.isOwn
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                            : 'bg-white text-slate-800 border border-gray-100'
                        }`}>
                          <p className="text-sm leading-relaxed">{message.text}</p>
                          <p className={`text-xs mt-2 ${
                            message.isOwn ? 'text-indigo-100' : 'text-slate-500'
                          }`}>
                            {formatTimestamp(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-6 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-indigo-50">
                  <form onSubmit={handleSendMessage} className="flex space-x-4">
                    <Input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message... ✨"
                      className="flex-1 rounded-2xl border-gray-200 focus:border-indigo-300 focus:ring-indigo-200 bg-white h-12"
                    />
                    <Button 
                      type="submit" 
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-2xl px-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              /* No Chat Selected */
              <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-indigo-50">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <MessageCircle className="w-12 h-12 text-indigo-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">
                    Select a conversation 💬
                  </h3>
                  <p className="text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Choose a chat from the list to start messaging and continue your skill swapping journey
                  </p>
                  <div className="flex items-center justify-center space-x-2 mt-4">
                    <Sparkles className="w-5 h-5 text-indigo-500" />
                    <Heart className="w-5 h-5 text-emerald-500" />
                    <Zap className="w-5 h-5 text-purple-500" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;