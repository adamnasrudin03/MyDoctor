import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Header, Profile, List, Gap} from '../../components';
import {colors} from '../../utils';
import {DummyUser} from '../../assets';

const UserProfile = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header title="Profile" onPress={() => navigation.goBack()} />
      <Gap height={10} />
      <Profile name="Adam Nasrudin" desc="Manager" avatar={DummyUser} />
      <Gap height={14} />
      <List
        icon="edit-profile"
        name="Edit Profil"
        desc="Last Update Yasterday"
        type="next"
        onPress={() => navigation.navigate('UpdateProfile')}
      />
      <List
        icon="language"
        name="Language"
        desc="Last Update Yasterday"
        type="next"
      />
      <List icon="rate" name="Rate" desc="Last Update Yasterday" type="next" />
      <List icon="help" name="Help" desc="Last Update Yasterday" type="next" />
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
