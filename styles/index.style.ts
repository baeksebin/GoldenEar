import { Dimensions, Platform, StatusBar, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18, // 제목 크기 소폭 키움
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  grid: {
    // 그리드 영역을 60% 정도로 넓혀야 버튼이 숨을 쉽니다
    width: '40%', 
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15, // 버튼 사이 간격도 약간 확보
  },
  card: {
    // 2x2 배치를 유지하는 반응형 너비
    width: '45%',         
    aspectRatio: 1,      
    backgroundColor: '#FFF',
    
    // 모서리를 시원하게 둥글게 (둥근 정도를 15로 상향)
    borderRadius: 15,     
    
    justifyContent: 'center', // 텍스트 세로 중앙 정렬
    alignItems: 'center',     // 텍스트 가로 중앙 정렬
    
    borderWidth: 1,
    borderColor: '#F0F0F0',
    
    // 왼쪽 세로 포인트 선
    borderLeftWidth: 5, 
    
    // 둥근 모양에 어울리는 부드러운 그림자
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    
    // 둥근 모서리 안쪽으로 내용물(왼쪽 선 포함)이 잘리게 처리
    overflow: 'hidden', 
  },
  cardTitle: {
    // 폰트 크기를 가독성 좋게 살짝 상향
    fontSize: width * 0.025, 
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default styles;