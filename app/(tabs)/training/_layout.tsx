import { Stack } from 'expo-router';

export default function TrainingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* 1단계: 메인 */}
      <Stack.Screen name="index" /> 
      
      {/* 2단계: 주제 선택 */}
      <Stack.Screen name="list" /> 
      
      {/* 3단계: 챕터/아코디언  */}
      <Stack.Screen name="chapter" /> 
      
      {/* 4단계: 상세 문제 페이지들 */}
      <Stack.Screen name="ear/intervals" />
      <Stack.Screen name="ear/chords" />
      <Stack.Screen name="ear/scales" />
    </Stack>
  );
}