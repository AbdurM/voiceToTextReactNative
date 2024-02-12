/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import Voice from '@react-native-community/voice';
import Lottie from 'lottie-react-native';
import recordButton from './assets/recordButton.json';
import recordingAnimation from './assets/recordingAnimation.json';
import stopButton from './assets/stopButton.json';
import clearTextButton from './assets/clearText.json';

function App() {
  const [recordedText, setRecordedText] = useState(
    'Speech to Text app created using React Native',
  );
  const [isRecording, setIsRecording] = useState(false);
  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;
    Voice.onSpeechError = onSpeechErrorHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStartHandler = e => {
    console.log('Recording started');
  };
  const onSpeechEndHandler = e => {
    console.log('Recording stopped');
  };
  const onSpeechResultsHandler = e => {
    console.log('I am in speech results handler');
    console.log('VoiceText: ', e);
    setRecordedText(e.value);
  };
  const onSpeechErrorHandler = e => {
    setIsRecording(false);
    console.log('Speech error', e);
  };

  const startRecording = () => {
    try {
      setRecordedText('');
      setIsRecording(true);
      Voice.start('en-UK');
    } catch (ex) {
      console.log(ex);
    }
  };

  const stopRecording = () => {
    Voice.stop();
    setIsRecording(false);
  };

  const clearText = () => {
    setRecordedText('');
    if (isRecording) {
      stopRecording();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        {isRecording ? (
          <Lottie
            source={recordingAnimation}
            autoPlay
            loop
            style={styles.recordingAnimation}
          />
        ) : (
          <Image
            style={styles.coverImage}
            source={require('./assets/coverImage.png')}
          />
        )}
        <Text style={styles.text}>{recordedText}</Text>
      </View>
      <View style={styles.bottomContainer}>
        {recordedText.length > 0 ? (
          <TouchableOpacity onPress={clearText}>
            <View style={styles.clearButtonContainer}>
              <Lottie
                source={clearTextButton}
                autoPlay
                loop
                style={styles.clearTextButton}
              />
              <Text style={styles.buttonTitle}>Clear</Text>
            </View>
          </TouchableOpacity>
        ) : null}
        <View style={styles.recordButtonContainer}>
          <TouchableOpacity
            onPress={isRecording ? stopRecording : startRecording}>
            <Lottie
              source={isRecording ? stopButton : recordButton}
              autoPlay
              loop
              style={styles.recordButton}
            />
          </TouchableOpacity>
          <Text style={styles.buttonTitle}>
            {isRecording ? 'Stop' : 'Start'}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#090E1F',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 100,
  },
  topContainer: {
    flex: 1,
  },
  coverImage: {
    height: 375,
    width: 400,
  },
  recordingAnimation: {
    height: 375,
    width: 400,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-evenly',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'ProtestRiot-Regular',
    fontSize: 23,
    paddingHorizontal: 15,
  },
  buttonTitle: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'ProtestRevolution-Regular',
    fontSize: 20,
  },
  clearTextButton: {
    height: 125,
    width: 125,
  },
  recordButtonContainer: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  recordButton: {
    height: 125,
    width: 125,
  },
});

export default App;
