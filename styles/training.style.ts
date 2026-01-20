import { StyleSheet } from 'react-native';

export const trainingStyles = StyleSheet.create({
  // 스크롤 뷰 내부의 여백을 잡아주는 스타일
  scrollContent: {
    padding: 20,
    paddingBottom: 40, // 하단 탭 바에 가려지지 않게 여유를 줍니다
  },
  // 리스트의 각 항목 카드 스타일
  listCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    // 그림자 설정 (iOS/Android 공통)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTextContent: {
    flex: 1,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  // VexFlow 악보가 들어갈 미리보기 박스
  scorePreview: {
    width: 80,
    height: 60,
    backgroundColor: '#f1f3f5',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});