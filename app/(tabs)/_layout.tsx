import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#6200EE' }}> 
      <Tabs.Screen name="index" options={{ title: '홈' }} />
      <Tabs.Screen name="training" options={{ title: '훈련' }} />
      <Tabs.Screen name="my" options={{ title: 'MY' }} />
    </Tabs>
  );
}