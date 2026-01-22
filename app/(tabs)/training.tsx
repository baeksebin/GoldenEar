import { Platform, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function HomeScreen() {
  console.log("DEV_URL 설정값:", process.env.EXPO_PUBLIC_WEB_URL_DEV);
  console.log("PROD_URL 설정값:", process.env.EXPO_PUBLIC_WEB_URL_PROD);

  const devUri = process.env.EXPO_PUBLIC_WEB_URL_DEV || ""; 
  const prodUri = Platform.OS === 'android' 
    ? process.env.EXPO_PUBLIC_WEB_URL_PROD || ""
    : './web-dist/index.html';

  const baseUri = __DEV__ ? devUri : prodUri;
  const uri = baseUri.includes('?') ? `${baseUri}&view=training` : `${baseUri}?view=training`;
  
  // const uri = prodUri; // apk 내장 배포
  console.log("PROD_URL 최종값:", uri);
  return (
    <View style={{ flex: 1 }}>
      <WebView 
        source={{ uri }} 
        originWhitelist={['*']}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        allowFileAccessFromFileURLs={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mixedContentMode="always"
      />
    </View>
  );
}