import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Header, Gap, Profile, Input, Button} from '../../components';
import {colors, getData} from '../../utils';
import {DummyUser, ILNullPhoto} from '../../assets';
import {Firebase} from './../../config';
import {showMessage} from 'react-native-flash-message';
import {Loading} from '../../components';

const UpdateProfile = ({navigation}) => {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    email: '',
    photo: ILNullPhoto,
  });
  const [password, setPassword] = useState('');

  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      res.photo = {uri: res.photo};
      setProfile(data);
    });
  }, []);

  const update = () => {
    const data = profile;
    data.photo = profile.photo.uri;
    Firebase.database()
      .ref(`users/${profile.uid}/`)
      .update(profile)
      .then(() => {
        console.log('succes');
      })
      .catch(error => {
        showMessage({
          message: error.message,
          type: 'danger',
          backgroundColor: colors.error,
          color: colors.white,
        });
      });
  };

  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };
  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title="Edit Profile" onPress={() => navigation.goBack()} />
        <View style={styles.content}>
          <Profile avatar={profile.photo} isRemove />

          <Gap height={26} />
          <Input
            label="Full Name"
            value={profile.fullName}
            onChangeText={value => changeText('fullName', value)}
          />
          <Gap height={24} />
          <Input
            label="Profession"
            value={profile.profession}
            onChangeText={value => changeText('profession', value)}
          />
          <Gap height={24} />
          <Input label="E - Mail" value={profile.email} disable />
          <Gap height={24} />
          <Input label="Password" value={password} />
          <Gap height={40} />
          <Button title=" Save Profile " onPress={update} />
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
});
