import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f2f2f2' 
  },
  header: { 
    height: 56, 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 16, 
    backgroundColor: '#fff', 
    borderBottomWidth: 1, 
    borderBottomColor: '#eee' 
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
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  scrollContent: { 
    padding: 20 
  },
  accordionCard: { 
    backgroundColor: '#fff', 
    borderRadius: 15, 
    marginBottom: 15, 
    borderWidth: 1.5, 
    borderColor: '#000',
    overflow: 'hidden' 
  },
  chapterHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 20 
  },
  chapterLabel: { 
    fontSize: 12, 
    fontWeight: '700', 
    color: '#666', 
    marginBottom: 2 
  },
  chapterTitle: { 
    fontSize: 18, 
    fontWeight: '800', 
    color: '#000' 
  },
  progressCircle: { 
    width: 45, 
    height: 45, 
    borderRadius: 25, 
    borderWidth: 2.5, 
    borderColor: '#000', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  activeCircle: { 
    backgroundColor: '#000' 
  },
  progressText: { 
    fontSize: 12, 
    fontWeight: '900' 
  },
  activeText: { 
    color: '#fff' 
  },
  expandedArea: { 
    paddingHorizontal: 20, 
    backgroundColor: '#fff' 
  },
  levelButton: { 
    backgroundColor: '#fff', 
    paddingVertical: 18, 
    borderRadius: 10, 
    borderWidth: 1.5, 
    borderColor: '#e0e0e0', 
    marginBottom: 10, 
    alignItems: 'center' 
  },
  levelButtonText: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: '#333' 
  }
});