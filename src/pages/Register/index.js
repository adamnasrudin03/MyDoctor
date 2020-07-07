import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Input, Button, Gap, Header, Loading} from '../../components';
import {colors, useForm, storeData} from '../../utils';
import Firebase from '../../config/Firebase';
import {showMessage, hideMessage} from 'react-native-flash-message';

const Register = ({navigation}) => {
  const [form, setForm] = useForm({
    fullName: '',
    profession: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const onContinue = () => {
    console.log(form);
    setLoading(true);

    Firebase.auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(success => {
        const data = {
          fullName: form.fullName,
          profession: form.profession,
          email: form.email,
          uid: success.user.uid,
        };
        Firebase.database()
          .ref(`users/${success.user.uid}/`)
          .set(data);
        storeData('user', data);
        setForm('reset');
        setLoading(false);
        navigation.navigate('UploadPhoto', data);
      })
      .catch(error => {
        const errorMessage = error.message;
        console.log('Register Error : ', errorMessage);
        showMessage({
          message: errorMessage,
          type: 'danger',
          backgroundColor: colors.error,
          color: colors.white,
        });
        setLoading(false);
      });
  };

  return (
    <>
      <View style={styles.page}>
        <Header title="Register" onPress={() => navigation.goBack()} />
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Input
              label="Full Name"
              value={form.fullName}
              onChangeText={value => setForm('fullName', value)}
            />
            <Gap height={24} />
            <Input
              label="Profession"
              value={form.profession}
              onChangeText={value => setForm('profession', value)}
            />
            <Gap height={24} />
            <Input
              label="E-mail"
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
            <Gap height={40} />
            <Button title="Countinue" onPress={onContinue} />
          </ScrollView>
        </View>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
});
