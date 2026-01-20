import { styles } from '@/styles/intervals.style'; // intervals 스타일 재사용
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ScalesSolve() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>〈 뒤로</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>스케일 훈련</Text>
        </View>
        <View style={{ width: 60 }} />
      </View>
      <View style={styles.center}><Text>스케일 훈련 준비 중...</Text></View>
    </SafeAreaView>
  );
}