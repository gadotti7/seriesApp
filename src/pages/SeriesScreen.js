import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import series from '../../series.json'; 
import SerieCard from '../components/SerieCard';
import AddSerieCard from '../components/AddSerieCard';

const isEven = number => number % 2 === 0;

const SeriesScreen = props => (
  <View>
    <FlatList 
      data={[...series, { isLast: true }]}
      renderItem = {({ item, index }) => (
          item.isLast 
            ? <AddSerieCard 
                isFirstColumn={isEven(index)} 
                onPress={() => props.navigation.navigate('SerieFormScreen')}
                  //props.navigation.navigate('SerieFormScreen')
              />
            : <SerieCard
              serie={item} 
              isFirstColumn={isEven(index)}
              onPress={() => props.navigation.navigate('SerieDetailsScreen', { serie: item })}
            />
      )}
      keyExtractor={ item => item.id }
      numColumns={2}
      ListHeaderComponent={props => (<View style={styles.marginTop}/>)}
      ListFooterComponent={props => (<View style={styles.marginBottom}/>)}
    />
  </View>
);

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: 5,
  },
  marginTop: {
    marginTop: 5,
  }
});

export default SeriesScreen;  
