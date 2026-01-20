import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8f9fa' 
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  header: { 
    height: 56,
    flexDirection: 'row', 
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: { 
    width: 60, 
    justifyContent: 'center' 
  },
  backText: { 
    fontSize: 16, 
    color: '#000', 
    fontWeight: '600' 
  },
  headerTitleContainer: { 
    flex: 1, 
    alignItems: 'center' 
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  scrollContent: { 
    padding: 20 
  },
  // ⭐️ VexFlow 악보 카드 스타일 보정
  scoreCard: { 
    width: '100%', 
    // 실제 오선지 높이(actualStaffH)가 약 80~100px이므로 2.5배인 220~250px이 적당합니다.
    height: 240, 
    backgroundColor: '#fff', 
    borderRadius: 15,
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 20,
    borderWidth: 2, 
    borderColor: '#000', 
    overflow: 'hidden',
    // ⭐️ 웹 경고 해결: shadow 속성 분기 처리
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        // boxShadow를 직접 써서 entry.bundle 경고를 없앱니다.
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      }
    })
  },
  placeholderText: { 
    color: '#999',
    fontWeight: '500'
  },
  controlRow: { 
    flexDirection: 'row', 
    gap: 12, 
    marginBottom: 25 
  },
  btn: { 
    flex: 1, 
    height: 55, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center',
    // 버튼도 동일하게 플랫폼 대응
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
      }
    })
  },
  btnGreen: { 
    backgroundColor: '#4CAF50' 
  },
  btnBlue: { 
    backgroundColor: '#2196F3' 
  },
  btnText: { 
    color: '#fff', 
    fontWeight: '800', 
    fontSize: 16 
  },
  optionsGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    paddingBottom: 40 // 스크롤 하단 여유
  },
  optionItem: { 
    width: '23%', 
    aspectRatio: 1, 
    backgroundColor: '#fff', 
    borderRadius: 12,
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 12,
    borderWidth: 1.5, 
    borderColor: '#e0e0e0'
  },
  optionText: { 
    fontSize: 16, 
    fontWeight: '700',
    color: '#333'
  }
});