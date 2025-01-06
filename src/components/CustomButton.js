import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  Animated,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import {gray10} from 'src/configs/colors';

const SCREEN = Dimensions.get('window');

class ModalDefault extends React.Component {
  constructor(props) {
    super(props);
    const {visible, maxRatio, minRatio} = props;
    const opacity = visible ? 0.7 : 0;
    this.state = {
      visible: props.visible,
      opacity: new Animated.Value(opacity),
      heightView: 0,
      maxHeight: maxRatio * SCREEN.height,
      minHeight: minRatio * SCREEN.height,
    };
  }

  animation = (type = 'open', cb = () => {}) => {
    const toValue = type === 'open' ? 0.7 : 0;
    const duration = 350;
    Animated.timing(this.state.opacity, {
      toValue,
      duration,
      useNativeDriver: false,
    }).start(cb);
  };

  onShow = () => {
    this.animation();
  };

  componentDidUpdate(preProps) {
    const {visible} = this.props;
    // Close
    if (!visible && preProps.visible !== visible) {
      this.animation('close', () => this.updateVisible(visible));
    }
    // Open
    if (visible && preProps.visible !== visible) {
      this.updateVisible(visible);
    }
  }

  updateVisible = visible => {
    this.setState({visible});
  };

  render() {
    const {setModalVisible, keyboardView, children, maxRatio, minRatio, theme} =
      this.props;
    const {visible, opacity, heightView, maxHeight, minHeight} = this.state;
    const {colors} = theme;
    const bottom = opacity.interpolate({
      inputRange: [0, 0.7],
      outputRange: [-heightView, 0],
    });
    const content = (
      <View
        style={styles.container}
        onLayout={event => {
          let {height: heightFull} = event.nativeEvent.layout;
          const currentMaxHeight = heightFull * maxRatio;
          const currentMinHeight = heightFull * minRatio;
          const currentHeight =
            heightView < currentMinHeight
              ? currentMinHeight
              : heightView > currentMaxHeight
              ? currentMaxHeight
              : heightView;
          this.setState({
            maxHeight: heightFull * maxRatio,
            minHeight: heightFull * minRatio,
            heightView: currentHeight,
          });
        }}>
        <Animated.View
          style={[
            styles.viewOpacity,
            {
              backgroundColor: gray10,
              opacity: opacity,
            },
          ]}>
          <TouchableOpacity
            style={styles.touch}
            onPress={() => setModalVisible(false)}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.content,
            {
              bottom: bottom,
            },
          ]}>
          <View
            onLayout={event => {
              const {height} = event.nativeEvent.layout;
              this.setState({
                heightView:
                  height < minHeight
                    ? minHeight
                    : height > maxHeight
                    ? maxHeight
                    : height,
              });
            }}
            style={[
              styles.viewChildren,
              {
                backgroundColor: colors.modal,
                maxHeight,
                minHeight,
              },
            ]}>
            {children}
          </View>
        </Animated.View>
      </View>
    );

    return (
      <Modal
        visible={visible}
        transparent
        onRequestClose={() => setModalVisible(false)}
        onShow={this.onShow}>
        {keyboardView ? (
          <KeyboardAvoidingView
            behavior="height"
            enabled
            style={styles.container}>
            {content}
          </KeyboardAvoidingView>
        ) : (
          content
        )}
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewOpacity: {
    flex: 1,
  },
  touch: {
    flex: 1,
  },
  content: {
    justifyContent: 'flex-end',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  viewChildren: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 28,
  },
});

ModalDefault.propTypes = {
  visible: PropTypes.bool.isRequired,
  keyboardView: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  maxRatio: PropTypes.number,
  minRatio: PropTypes.number,
  children: PropTypes.node,
};
ModalDefault.defaultProps = {
  visible: false,
  keyboardView: false,
  maxRatio: 0.7,
  minRatio: 0,
  setModalVisible: (value = false) => {},
};

export default function ModalDefaultComponent(props) {
  const theme = useTheme();
  return <ModalDefault {...props} theme={theme} />;
}
