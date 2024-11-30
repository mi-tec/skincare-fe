import React, { useEffect, useState } from "react";
import {
  Bell,
  Check,
  Globe,
  Home,
  Keyboard,
  Link,
  Lock,
  Menu,
  MessageCircle,
  Paintbrush,
  Settings,
  Video,
} from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { io } from "socket.io-client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import axios from "axios";
import { mainServices } from "@/lib/content";

const socket = io(`${import.meta.env.VITE_BASE_URL}`);

const FormSchema = z.object({
  service: z.string({
    required_error: "Please select a Service to Start a conversation.",
  }),
  message: z.string({
    required_error: "Please enter a message to Start a conversation.",
  }),
});

const data = {
  nav: [
    { name: "Notifications", icon: Bell },
    { name: "Navigation", icon: Menu },
    { name: "Home", icon: Home },
    { name: "Appearance", icon: Paintbrush },
    { name: "Messages & media", icon: MessageCircle },
    { name: "Language & region", icon: Globe },
    { name: "Accessibility", icon: Keyboard },
    { name: "Mark as read", icon: Check },
    { name: "Audio & video", icon: Video },
    { name: "Connected accounts", icon: Link },
    { name: "Privacy & visibility", icon: Lock },
    { name: "Advanced", icon: Settings },
    { name: "Advanced", icon: Settings },
    { name: "Advanced", icon: Settings },
    { name: "Advanced", icon: Settings },
    { name: "Advanced", icon: Settings },
    { name: "Advanced", icon: Settings },
    { name: "Advanced", icon: Settings },
    { name: "Advanced", icon: Settings },
    { name: "Advanced", icon: Settings },
    { name: "Advanced", icon: Settings },
    { name: "Advanced", icon: Settings },
    { name: "Advanced", icon: Settings },
    { name: "Advanced", icon: Settings },
    { name: "Advanced", icon: Settings },
  ],
};

const ChatDialog = () => {
  const [open, setOpen] = useState(true);
  const [userId, setUserId] = useState(""); // Current user ID
  const [chatId, setChatId] = useState(null); // Current chat room
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [notifications, setNotifications] = useState([]);

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  const [receivers, setReceivers] = useState([]);

  useEffect(() => {
    (async function () {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_BASE_URL}api/v1/nurses`,
      });

      if (response?.data?.status === 1) {
        const list = response?.data?.data;

        const res = list.map((item) => {
          return item?.USERNAME;
        });
        setReceivers(res);
      }
    })();
  }, []);

  useEffect(() => {
    const userStorage = sessionStorage.getItem("user");
    const userData = JSON.parse(userStorage);

    setUserId(userData?.username);

    socket.emit("register", userData?.username);

    socket.on("receive_message", ({ chatId, senderId, message }) => {
      setMessages((prev) => [...prev, { chatId, senderId, message }]);
    });
  }, []);

  useEffect(() => {
    const handleMessageNotification = ({ chatId, message }) => {
      setNotifications((prev) => {
        return [...prev, { chatId, message }];
      });
    };

    socket.on("message_notification", handleMessageNotification);
  }, []);

  console.log("notifications ->", notifications);

  function onSubmit(data) {
    socket.emit("send_message", {
      chatId: chatId || data?.service,
      senderId: userId,
      receivers: receivers,
      message: data?.message,
    });
    setMessages((prev) => [
      ...prev,
      { chatId, senderId: userId, message: input, service: data?.service },
    ]);
    setInput("");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
        <SidebarProvider className="items-start">
          <Sidebar collapsible="none" className="hidden md:flex">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {data.nav.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          asChild
                          isActive={item.name === "Messages & media"}
                        >
                          <a href="#">
                            <item.icon />
                            <span>{item.name}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex h-[480px] flex-1 flex-col overflow-hidden">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">test</div>
            </header>
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
              <div>
                {notifications.map((n, i) => (
                  <div key={i}>
                    Chat {n.chatId}: {n.message}
                  </div>
                ))}
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-2/3 space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select a service</FormLabel>
                          <Select
                            onChange={(value) => {
                              setChatId(value);
                            }}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a service to start a conversation" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {mainServices.map((item, key) => {
                                return (
                                  <SelectItem value={item.slug} key={key}>
                                    {item.title}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Send us the message"
                              className="resize-none"
                              defaultValue={input}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Start a conversation</Button>
                  </form>
                </Form>
              </div>
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
};

export default ChatDialog;
