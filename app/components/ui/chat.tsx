import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

interface Message {
  sender: string;
  content: string;
}

interface ChatProps {
  messages: Message[];
  aiAvatarSrc: string;
}

export function Chat({ messages, aiAvatarSrc }: ChatProps) {
  return (
    <Card className="w-full bg-neutral-900/50 border-neutral-800">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="font-display text-lg sm:text-xl text-white/90 tracking-tight">
          Chat with Claude
        </CardTitle>
        <CardDescription className="font-sans text-xs sm:text-sm text-neutral-400">
          Discuss how Claude perceives and visualizes itself
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        <div className="h-[500px] sm:h-[600px] overflow-y-auto space-y-3 sm:space-y-4 p-3 sm:p-4 rounded-lg bg-neutral-950/50">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex flex-col gap-1 ${
                message.sender === "Claude3.5" ? "items-start" : "items-end"
              }`}
            >
              <div
                className={`flex gap-3 max-w-[85%] sm:max-w-[80%] rounded-lg p-2 sm:p-3 ${
                  message.sender === "Claude3.5"
                    ? "bg-neutral-800/50 text-neutral-200"
                    : "bg-purple-500/20 text-purple-100"
                }`}
              >
                {message.sender === "Claude3.5" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={aiAvatarSrc} alt="AI Avatar" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}
                <div className="space-y-1">
                  <p className="text-[10px] sm:text-xs font-display opacity-75 tracking-tight">
                    {message.sender}
                  </p>
                  <p className="text-xs sm:text-sm font-sans whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </p>
                </div>
                {message.sender !== "Claude3.5" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/Marcin.webp" alt="Marcin" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-4 sm:p-6 flex gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 rounded-lg bg-neutral-950/50 border border-neutral-800 px-3 sm:px-4 py-2 text-xs sm:text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
        />
        <Button
          variant="secondary"
          className="bg-neutral-800 hover:bg-neutral-700 text-white/90 px-3 sm:px-4 py-2 text-xs sm:text-sm h-auto"
        >
          Send
        </Button>
      </CardFooter>
    </Card>
  );
}
