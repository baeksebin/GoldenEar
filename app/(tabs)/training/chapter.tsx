import { CATEGORIES } from '@/constants/Categories';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Animated, Easing, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// ⭐️ 외부 스타일 임포트
import { styles } from '@/styles/chapter.style';

const AccordionItem = memo(({ chapter, index, isExpanded, onToggle, onPressItem }: any) => {
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: isExpanded ? 1 : 0,
      duration: 250,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: false,
    }).start();
  }, [isExpanded]);

  const heightInterpolate = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, (chapter.details?.length || 0) * 75 + 40],
  });

  return (
    <View style={styles.accordionCard}>
      <TouchableOpacity style={styles.chapterHeader} onPress={onToggle} activeOpacity={0.7}>
        <View>
          <Text style={styles.chapterLabel}>Chapter {index + 1}</Text>
          <Text style={styles.chapterTitle}>{chapter.title}</Text>
        </View>
        <View style={[styles.progressCircle, isExpanded && styles.activeCircle]}>
          <Text style={[styles.progressText, isExpanded && styles.activeText]}>99%</Text>
        </View>
      </TouchableOpacity>

      <Animated.View style={[styles.expandedArea, { height: heightInterpolate, opacity: animValue, overflow: 'hidden' }]}>
        {chapter.details?.map((detail: any) => (
          <TouchableOpacity key={detail.id} style={styles.levelButton} onPress={() => onPressItem(detail.id)}>
            <Text style={styles.levelButtonText}>{detail.title}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </View>
  );
});

export default function TrainingChapter() {
  const router = useRouter();
  const { domain, subId } = useLocalSearchParams<{ domain: string; subId: string }>();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const currentCategory = CATEGORIES.find(c => c.id === domain);
  const currentSub = currentCategory?.items.find(i => i.id === subId);
  const headerTitle = currentSub?.title || '훈련';

  if (!currentSub) return <View style={styles.center}><Text>데이터 없음</Text></View>;

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

      <ScrollView contentContainerStyle={styles.scrollContent} removeClippedSubviews={true}>
        {currentSub.levels?.map((chapter, index) => (
          <AccordionItem
            key={chapter.id}
            chapter={chapter}
            index={index}
            isExpanded={expandedId === chapter.id}
            onToggle={() => setExpandedId(expandedId === chapter.id ? null : chapter.id)}
            onPressItem={(type: string) => router.push({
              pathname: `/training/${domain}/${subId}` as any,
              params: { type }
            })}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}