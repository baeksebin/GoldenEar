import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      
      {/* 1. 홈 화면 */}
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />

      {/* 2. 훈련 탭 (중요: 상세 페이지를 포함한 폴더 자체를 등록) */}
      <Tabs.Screen
        name="training" 
        options={{
          title: '훈련',
          tabBarIcon: ({ color }) => <TabBarIcon name="music" color={color} />,
        }}
      />

      {/* 3. MY 화면 */}
      <Tabs.Screen
        name="my/index"
        options={{
          title: 'MY',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}