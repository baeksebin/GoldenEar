import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// ⭐️ 분리한 스타일 임포트
import { styles } from '@/styles/intervals.style';

export default function IntervalsSolve() {
  const router = useRouter();
  const { type } = useLocalSearchParams<{ type: string }>();
  
  const options = ['m2', 'M2', 'm3', 'M3', 'P4', 'P5', 'm6', 'M6'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>〈 뒤로</Text>
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{type || '음정'} 훈련</Text>
        </View>
        
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 악보 영역 */}
        <View style={styles.scoreCard}>
          <Text style={styles.placeholderText}>악보 렌더링 영역 (VexFlow)</Text>
        </View>

        {/* 컨트롤 버튼 */}
        <View style={styles.controlRow}>
          <TouchableOpacity style={[styles.btn, styles.btnGreen]}>
            <Text style={styles.btnText}>순차 재생</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btnBlue]}>
            <Text style={styles.btnText}>화성 재생</Text>
          </TouchableOpacity>
        </View>

        {/* 선택지 Grid */}
        <View style={styles.optionsGrid}>
          {options.map((opt) => (
            <TouchableOpacity key={opt} style={styles.optionItem} activeOpacity={0.6}>
              <Text style={styles.optionText}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}