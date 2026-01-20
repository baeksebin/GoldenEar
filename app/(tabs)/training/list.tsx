import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CATEGORIES } from '@/constants/Categories';
import { styles as commonStyles } from '@/styles/index.style';
import { trainingStyles } from '@/styles/training.style';
// ⭐️ 외부 스타일 임포트
import { styles } from '@/styles/list.style';

export default function TrainingList() {
  const router = useRouter();
  const { domain, subId } = useLocalSearchParams<{ domain: string; subId?: string }>();

  const currentCategory = CATEGORIES.find((c) => c.id === domain);
  const currentSub = subId ? currentCategory?.items.find((i) => i.id === subId) : null;
  const displayItems = subId ? currentSub?.levels : currentCategory?.items;
  const headerTitle = subId ? currentSub?.title : currentCategory?.title;

  if (!displayItems) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>〈 뒤로</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>데이터를 찾을 수 없습니다.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>〈 뒤로</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle} numberOfLines={1}>{headerTitle}</Text>
        </View>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={trainingStyles.scrollContent}>
        {displayItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={trainingStyles.listCard}
            activeOpacity={0.8}
            onPress={() => {
              if ('levels' in item && item.levels) {
                router.push({ 
                  pathname: '/training/chapter', 
                  params: { domain, subId: item.id } 
                });
              } else {
                const targetFile = subId || item.id; 
                router.push({
                  pathname: `/training/${domain}/${targetFile}` as any, 
                  params: { type: item.id }
                });
              }
            }}
          >
            <View style={trainingStyles.cardTextContent}>
              <Text style={commonStyles.cardTitle}>{item.title}</Text>
            </View>
            <Text style={styles.chevron}>〉</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}