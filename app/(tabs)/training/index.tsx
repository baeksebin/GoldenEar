import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { CATEGORIES, CategoryItem } from '@/constants/Categories';
import { styles } from '@/styles/index.style';

export default function TrainingHome() {
  const router = useRouter();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.headerTitle}>훈련 종류</Text>
          
          <View style={styles.grid}>
            {CATEGORIES.map((item: CategoryItem) => (
              <TouchableOpacity 
                key={item.id}
                style={styles.card}
                activeOpacity={0.7}
                onPress={() => 
                  router.push({
                    pathname: '/training/list', // 공통 리스트 페이지로 이동
                    params: { domain: item.id } // 'ear' 또는 'rhythm' 등을 domain으로 전달
                  })
                } 
              >
                <Text style={styles.cardTitle}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}