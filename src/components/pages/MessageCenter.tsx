import { useState } from "react";
import { HomeHeader } from "@/components/home/HomeHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send } from "lucide-react";
import { useAuth } from "../../../supabase/auth";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
}

interface Conversation {
  id: string;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  lastMessage: string;
  lastMessageTime: Date;
  unread: number;
  messages: Message[];
}

export default function MessageCenter() {
  const { user } = useAuth();
  const [activeConversation, setActiveConversation] = useState<string | null>(
    null,
  );
  const [messageText, setMessageText] = useState("");

  // Mock data for conversations
  const conversations: Conversation[] = [
    {
      id: "1",
      user: {
        name: "John Smith",
        email: "john@example.com",
      },
      lastMessage: "Is the 1989 GT still available?",
      lastMessageTime: new Date(2023, 5, 15, 14, 30),
      unread: 2,
      messages: [
        {
          id: "m1",
          sender: "john@example.com",
          content: "Hi there, I saw your listing for the 1989 Fox Body GT.",
          timestamp: new Date(2023, 5, 15, 14, 25),
          isOwn: false,
        },
        {
          id: "m2",
          sender: "john@example.com",
          content: "Is the 1989 GT still available?",
          timestamp: new Date(2023, 5, 15, 14, 30),
          isOwn: false,
        },
      ],
    },
    {
      id: "2",
      user: {
        name: "Sarah Johnson",
        email: "sarah@example.com",
      },
      lastMessage: "Thanks for the information about the convertible.",
      lastMessageTime: new Date(2023, 5, 14, 9, 15),
      unread: 0,
      messages: [
        {
          id: "m3",
          sender: user?.email || "",
          content: "The convertible has a new top installed last year.",
          timestamp: new Date(2023, 5, 14, 9, 10),
          isOwn: true,
        },
        {
          id: "m4",
          sender: "sarah@example.com",
          content: "Thanks for the information about the convertible.",
          timestamp: new Date(2023, 5, 14, 9, 15),
          isOwn: false,
        },
      ],
    },
    {
      id: "3",
      user: {
        name: "Mike Wilson",
        email: "mike@example.com",
      },
      lastMessage: "Would you take $15,000 for the LX?",
      lastMessageTime: new Date(2023, 5, 13, 18, 45),
      unread: 1,
      messages: [
        {
          id: "m5",
          sender: "mike@example.com",
          content: "I'm interested in your 1992 LX 5.0.",
          timestamp: new Date(2023, 5, 13, 18, 40),
          isOwn: false,
        },
        {
          id: "m6",
          sender: "mike@example.com",
          content: "Would you take $15,000 for the LX?",
          timestamp: new Date(2023, 5, 13, 18, 45),
          isOwn: false,
        },
      ],
    },
  ];

  const getActiveConversation = () => {
    return conversations.find((conv) => conv.id === activeConversation) || null;
  };

  const handleSendMessage = () => {
    if (messageText.trim() === "") return;
    // In a real app, this would send the message to the backend
    setMessageText("");
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HomeHeader />
      <div className="container pt-24 pb-10">
        <h1 className="text-3xl font-bold mb-6">Message Center</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-3 h-[600px]">
          {/* Conversation List */}
          <div className="border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search conversations..."
                  className="pl-10 w-full"
                />
              </div>
            </div>
            <div className="overflow-y-auto h-[calc(600px-73px)]">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${activeConversation === conversation.id ? "bg-gray-100" : ""}`}
                  onClick={() => setActiveConversation(conversation.id)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${conversation.user.email}`}
                          alt={conversation.user.name}
                        />
                        <AvatarFallback>
                          {conversation.user.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">
                          {conversation.user.name}
                        </h3>
                        <p className="text-sm text-gray-500 truncate max-w-[180px]">
                          {conversation.lastMessage}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">
                        {formatDate(conversation.lastMessageTime)}
                      </p>
                      {conversation.unread > 0 && (
                        <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-black rounded-full">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Area */}
          <div className="col-span-2 flex flex-col">
            {activeConversation ? (
              <>
                <div className="p-4 border-b border-gray-200 flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${getActiveConversation()?.user.email}`}
                      alt={getActiveConversation()?.user.name}
                    />
                    <AvatarFallback>
                      {getActiveConversation()?.user.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-medium">
                    {getActiveConversation()?.user.name}
                  </h3>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {getActiveConversation()?.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${message.isOwn ? "bg-black text-white" : "bg-gray-100"}`}
                      >
                        <p>{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${message.isOwn ? "text-gray-300" : "text-gray-500"}`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center">
                    <Input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 mr-2"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="bg-black hover:bg-gray-800"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Select a conversation to start messaging
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
