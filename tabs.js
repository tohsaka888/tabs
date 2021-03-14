import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {View, Text, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import {useSpring, animated, config, useTransition} from 'react-spring/native';

function Tabs(props) {
  const {width, height, scale} = Dimensions.get('window');
  const positionRef = useRef();
  const [current, setCurrent] = useState(0);
  const [preIndex, setPreIndex] = useState(0);
  const AnimatedView = animated(View);
  const AnimatedText = animated(Text);
  const selectedViewState = useSpring({
    from: {
      display: 'flex',
      marginLeft: 5,
      marginRight: 5,
      alignItems: 'center',
      alignContent: 'center',
    },
    to: {
      borderBottomWidth: 2,
      borderBottomColor: 'blue',
      alignItems: 'center',
      alignContent: 'center',
    },
    config: config.default && {duration: 500},
  });
  const selectedTextState = useSpring({
    from: {
      opacity: 1,
      color: '#cecece',
      fontWeight: 'normal',
      fontSize: 16,
    },
    to: {
      color: 'blue',
      opacity: 0.5,
      paddingBottom: 3,
      fontWeight: 'bold',
      fontSize: 18,
    },
    config: config.default,
  });
  const transitions = useTransition(current, p => p, {
    from: {
      opacity: 0,
      position: 'absolute',
      width: width,
      height: 50,
      translateX: current < preIndex ? -width : width,
      backgroundColor: 'blue',
      padding: 10,
    },
    enter: {
      translateX: 0,
      width: width,
      height: 50,
      position: 'absolute',
      opacity: 1,
      backgroundColor: 'white',
      padding: 10,
    },
    leave: {
      backgroundColor: 'red',
      position: 'absolute',
      width: width,
      height: 50,
      translateX: current < preIndex ? width : -width,
      opacity: 0,
      padding: 10,
    },
    opacity: 1,
    config: {duration: 500},
  });
  const renderItem = ({item, index}) => {
    return (
      <View>
        {current === index && (
          <AnimatedView key={index} style={selectedViewState}>
            <TouchableOpacity
              onPress={() => {
                positionRef.current.scrollToIndex({
                  animated: true,
                  index: index,
                  viewPosition: 0.5,
                });
              }}>
              <AnimatedText style={selectedTextState}>Hello</AnimatedText>
            </TouchableOpacity>
          </AnimatedView>
        )}
        {current !== index && (
          <View style={{marginLeft: 5, marginRight: 5}}>
            <TouchableOpacity
              onPress={() => {
                setPreIndex(current);
                setCurrent(index);
                positionRef.current.scrollToIndex({
                  animated: true,
                  index: index,
                  viewPosition: 0.5,
                });
              }}>
              <Text
                style={{
                  opacity: 1,
                  color: '#cecece',
                  fontSize: 16,
                  fontWeight: 'normal',
                }}>
                Hello
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        ref={positionRef}
        renderItem={renderItem}
        data={props.data}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
      />
      <View>
        {transitions.map(({item, props, key}) => {
          return (
            <AnimatedView style={props} key={key}>
              <Text style={{color: 'red'}}>{item}</Text>
            </AnimatedView>
          );
        })}
      </View>
    </View>
  );
}

Tabs.propTypes = {};

export default Tabs;
