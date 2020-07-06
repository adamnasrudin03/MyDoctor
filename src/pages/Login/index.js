import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {ILLogo} from '../../assets';
import {Input, Button, Link, Gap} from '../../components/atoms';
import {colors, fonts} from '../../utils';

const Login = ({navigation}) => {
  return (
    <View style={styles.page}>
      <ILLogo />
      <Text style={styles.title}>Masuk dan mulai berkonsultasi</Text>
      <Input label="E-mail Adress" />
      <Gap height={24} />
      <Input label="Password" />
      <Gap height={10} />
      <Link size={12} title="Forgot My Password" />
      <Gap height={40} />
      <Button title="Sigin" onPress={() => navigation.replace('MainApp')} />
      <Gap height={30} />
      <Link
        onPress={() => navigation.navigate('Register')}
        size={16}
        title="Create New Account"
        align="center"
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: colors.white,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginVertical: 40,
    maxWidth: 153,
  },
});
