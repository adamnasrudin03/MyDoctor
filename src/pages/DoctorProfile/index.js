import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Header, Profile, ProfileItem, Button, Gap} from '../../components';
import {DummyDoctor4} from '../../assets';
import {colors} from '../../utils';

const DoctorProfile = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header title="Doctor Profile" onPress={() => navigation.goBack()} />
      <Profile
        name="Alifah Nurdianti"
        desc="Doctor Anak"
        avatar={DummyDoctor4}
      />
      <Gap height={10} />
      <ProfileItem label="Alumnus" value="Universitas Indonesia" />
      <ProfileItem
        label="Tempat Praktik"
        value="Rumah Sakit Umum Daerah Bekasi"
      />
      <ProfileItem label="No. STR" value="STR-0809900982772" />
      <View style={styles.action}>
        <Button
          title="Start Consultation"
          onPress={() => navigation.navigate('Chatting')}
        />
      </View>
    </View>
  );
};

export default DoctorProfile;

const styles = StyleSheet.create({
  page: {backgroundColor: colors.white, flex: 1},
  action: {paddingHorizontal: 40, paddingTop: 23},
});
