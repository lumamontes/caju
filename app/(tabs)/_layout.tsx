import React from "react";
import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Feather>["name"];
  color?: string;
}) {
  return <Feather size={28} color={"#3767E0"} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#3767E0",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Benefícios",
          tabBarIcon(props) {
            return <Feather size={28} name="home" color={props.color} />;
          },
        }}
      />
      <Tabs.Screen
        name="premiacoes"
        options={{
          title: "Premiacoes",
          tabBarIcon: ({ color }) => <TabBarIcon name="gift" color={color} />,
        }}
      />
      <Tabs.Screen
        name="feirinha"
        options={{
          title: "Feirinha",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="shopping-bag" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cartoes"
        options={{
          title: "Cartões",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="credit-card" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
