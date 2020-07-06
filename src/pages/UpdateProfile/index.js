import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Header, Gap, Profile, Input, Button} from '../../components';
import {colors} from '../../utils';
import {DummyUser} from '../../assets';

const UpdateProfile = ({navigation}) => {
  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title="Edit Profile" onPress={() => navigation.goBack()} />
        <View style={styles.content}>
          <Profile
            name="Adam Nasrudin"
            desc="Manager"
            avatar={DummyUser}
            isRemove
          />
          <Gap height={26} />
          <Input label="Full Name" />
          <Gap height={24} />
          <Input label="Profession" />
          <Gap height={24} />
          <Input label="E - Mail" />
          <Gap height={24} />
          <Input label="Password" />
          <Gap height={40} />
          <Button
            title=" Save Profile "
            onPress={() => navigation.goBack('UserProfile')}
          />
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
