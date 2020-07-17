import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts, getData} from '../../utils';
import {List} from '../../components/molecules';
import {Firebase} from '../../config';

const Messages = ({navigation}) => {
  const [user, setUser] = useState({});
  const [historyChat, setHistoryChat] = useState([]);

  useEffect(() => {
    getDataUserFromLokal();
    const urlHistory = `messages/${user.uid}/`;
    Firebase.database()
      .ref(urlHistory)
      .on('value', snapshot => {
        if (snapshot.val()) {
          const oldData = snapshot.val();
          const data = [];
          Object.keys(oldData).map(key => {
            data.push({
              id: key,
              ...oldData[key],
            });
          });
          console.log('history chat : ', data);
          setHistoryChat(data);
        }
      });
  }, [user.uid]);

  const getDataUserFromLokal = () => {
    getData('user').then(res => {
      setUser(res);
    });
  };

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>
        {historyChat.map(chat => {
          return (
            <List
              key={chat.id}
              profile={chat.uidPartner}
              name={chat.uidPartner}
              desc={chat.lastContentChat}
              onPress={() => navigation.navigate('Chatting')}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  page: {backgroundColor: colors.secondary, flex: 1},
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginLeft: 16,
  },
});
