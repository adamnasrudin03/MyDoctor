import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {ILLogo} from '../../assets';
import {Input, Button, Link, Gap} from '../../components/atoms';
import {colors, fonts, useForm, storeData} from '../../utils';
import {Firebase} from './../../config';
import {showMessage} from 'react-native-flash-message';
import {Loading} from '../../components';

const Login = ({navigation}) => {
  const [form, setForm] = useForm({email: '', password: ''});

  const [loading, setLoading] = useState(false);
  const login = () => {
    setLoading(true);
    Firebase.auth()
      .signInWithEmailAndPassword(form.email, form.password)
      .then(res => {
        console.log('success :', res);

        Firebase.database()
          .ref(`users/${res.user.uid}/`)
          .once('value')
          .then(resDB => {
            console.log(' Data user : ', resDB.val());
            if (resDB.val()) {
              storeData('user', resDB.val());
              navigation.replace('MainApp');
            }
          });
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log('Error :', error);
        showMessage({
          message: error.message,
          type: 'danger',
          backgroundColor: colors.error,
          color: colors.white,
        });
      });
  };
  return (
    <>
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Gap height={40} />
          <ILLogo />
          <Text style={styles.title}>Masuk dan mulai berkonsultasi</Text>
          <Input
            label="E-mail Adress"
            value={form.email}
            onChangeText={value => setForm('email', value)}
          />
          <Gap height={24} />
          <Input
            label="Password"
            value={form.password}
            onChangeText={value => setForm('password', value)}
            secureTextEntry
          />
          <Gap height={10} />
          <Link size={12} title="Forgot My Password" />
          <Gap height={40} />
          <Button title="Sigin" onPress={login} />
          <Gap height={30} />
          <Link
            onPress={() => navigation.navigate('Register')}
            size={16}
            title="Create New Account"
            align="center"
          />
        </ScrollView>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 40,
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
