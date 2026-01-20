import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8f9fa' 
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
  chevron: { 
    fontSize: 18, 
    color: '#ccc', 
    marginLeft: 10 
  }
});