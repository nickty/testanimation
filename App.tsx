import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const translateY = new Animated.Value(0);

  const [condi, setCondi] = useState(true)

  useEffect(() => {
    // Simulate a network request
    setTimeout(() => {
      setData([
        {id: '1', title: 'Item 1'},
        {id: '2', title: 'Item 2'},
        {id: '3', title: 'Item 3'},
        {id: '4', title: 'Item 4'},
        {id: '5', title: 'Item 5'},
      ]);
      setIsLoading(false);
    }, 3000); // Simulate a 3-second loading time

    // Start translateY animation after a short delay
    setTimeout(startAnimation, 500);
  }, []);

  const startAnimation = () => {
    Animated.timing(translateY, {
      toValue: 10,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const ListHeader = () => (
    <View style={styles.headerFooter}>
      <Text style={styles.headerFooterText}>This is the Header</Text>
    </View>
  );

  const ListFooter = () => (
    <View style={styles.headerFooter}>
      <Text style={styles.headerFooterText}>This is the Footer</Text>
    </View>
  );

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  const renderSkeleton = () => (
    <Animated.View
      style={{
        transform: [{translateY: condi ? interpolatedTranslateYOpp : interpolatedTranslateY}],
        backgroundColor: 'red',
      }}>
      {Array.from({length: 5}).map((_, index) => (
        <SkeletonPlaceholder.Item
          key={index}
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          marginTop={index === 0 ? 0 : 8}>
          <SkeletonPlaceholder.Item width="80%" height={24} borderRadius={4} />
        </SkeletonPlaceholder.Item>
      ))}
    </Animated.View>
  );

  const interpolatedTranslateY = translateY.interpolate({
    inputRange: [5, 10],
    outputRange: [700, 0], // Adjust the final position as needed
  });
  const interpolatedTranslateYOpp = translateY.interpolate({
    inputRange: [5, 10],
    outputRange: [0, 700], // Adjust the final position as needed
  });

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        renderSkeleton()
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListHeaderComponent={ListHeader}
          ListFooterComponent={ListFooter}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
  },
  headerFooter: {
    padding: 20,
    backgroundColor: '#6a51ae',
  },
  headerFooterText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default App;
