import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Header, ChatItem, InputChat} from '../../components';
import {
  fonts,
  colors,
  getData,
  showError,
  getChatTime,
  setDateChat,
} from '../../utils';
import {Firebase} from '../../config';

const Chatting = ({navigation, route}) => {
  const dataDoctor = route.params;
  const [chatContent, setChatContent] = useState('');
  const [user, setUser] = useState({});

  useEffect(() => {
    getData('user').then(res => {
      setUser(res);
    });
  }, []);

  const chatSend = () => {
    setChatContent('');
    const today = new Date();

    const data = {
      sendBy: user.uid,
      chatDate: today.getTime(),
      chatTime: getChatTime(today),
      chatContent: chatContent,
    };
    const chatId = `${user.uid}_${dataDoctor.data.uid}`;
    const urlDatabase = `chatting/${chatId}/allchat/${setDateChat(today)}`;

    Firebase.database()
      .ref(urlDatabase)
      .push(data)
      .then(() => {
        setChatContent('');
      })
      .catch(error => {
        showError(error.messages);
      });
  };
  return (
    <View style={styles.page}>
      <Header
        title={dataDoctor.data.fullName}
        desc={dataDoctor.data.category}
        photo={{uri: dataDoctor.data.photo}}
        onPress={() => navigation.goBack()}
        type="dark-profile"
      />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.chatDate}>Kamis, 25 Juni, 2020</Text>
          <ChatItem isMe />
          <ChatItem />
          <ChatItem isMe />
        </ScrollView>
      </View>
      <InputChat
        value={chatContent}
        onChangeText={value => setChatContent(value)}
        onButtonPress={chatSend}
      />
    </View>
  );
};

export default Chatting;

const styles = StyleSheet.create({
  page: {backgroundColor: colors.white, flex: 1},
  content: {
    flex: 1,
  },
  chatDate: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    marginVertical: 20,
    textAlign: 'center',
    color: colors.text.secondary,
  },
});
