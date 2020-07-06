import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../utils';
import {List} from '../../components/molecules';
import {
  DummyDoctor1,
  DummyDoctor3,
  DummyDoctor4,
  DummyDoctor5,
} from '../../assets';

const Messages = ({navigation}) => {
  const [doctors] = useState([
    {
      id: 1,
      profile: DummyDoctor1,
      name: 'Alifah Nurdianti',
      messge: 'baik bu, terimakasih atas waktunya...',
    },
    {
      id: 2,
      profile: DummyDoctor4,
      name: 'Bella Hayu Karima',
      messge: 'baik mas, terimakasih atas waktunya...',
    },
    {
      id: 3,
      profile: DummyDoctor3,
      name: 'Parwi Lestari',
      messge: 'baik pak, terimakasih atas waktunya...',
    },
    {
      id: 4,
      profile: DummyDoctor5,
      name: 'Arrisa Rahmawati',
      messge: 'baik pak, terimakasih atas waktunya...',
    },
  ]);
  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>
        {doctors.map(doctor => {
          return (
            <List
              key={doctor.id}
              profile={doctor.profile}
              name={doctor.name}
              desc={doctor.messge}
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
