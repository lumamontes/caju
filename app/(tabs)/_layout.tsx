import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { Feather } from '@expo/vector-icons';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Feather>["name"];
  color: string;
}) {
  return <Feather size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: Colors["light"].tint,
      headerShown: false,
    }}
  >
    <Tabs.Screen
      name="index"
      options={{
        title: "Benefícios",
        tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
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
        tabBarIcon: ({ color }) => <TabBarIcon name="shopping-bag" color={color} />,
      }}
    />
    <Tabs.Screen
      name="cartoes"
      options={{
        title: "Cartões",
        tabBarIcon: ({ color }) => <TabBarIcon name="credit-card" color={color} />,
      }}
    />
  </Tabs>
  )
}
