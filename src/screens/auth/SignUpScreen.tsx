import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppSaveView from '../../components/views/AppSaveView'
import { sharedPaddingHorizontal } from '../../styles/SharedStyles'
import { IMAGES } from '../../constants/images-paths'
import { s, vs } from 'react-native-size-matters'
import AppTextInput from '../../components/inputs/AppTextInput'
import AppButton from '../../components/buttons/AppButton'
import { AppColors } from '../../styles/colors'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../../config/firebase'
import { showMessage } from 'react-native-flash-message'
import { Feather } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
const SignUpScreen = () => {
  const navigation = useNavigation()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    showMessage({
      message: t('You can now register!'),
      type: 'success',
    })
  }, [])

  const SignUpSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords do not match')
      .required('Confirm password is required'),
  }).required()

  const onSignUpPress = async (data: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    console.log(data)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)

      // ✅ Ajout du nom dans le profil Firebase
      await updateProfile(userCredential.user, {
        displayName: data.username,
      })

      showMessage({
        type: 'success',
        message: t("Registration successful!"),
        backgroundColor: '#28a745',
        color: '#fff',
      })

      navigation.navigate('MainAppBottomTabs')
    } catch (error: any) {
      let errorMessage = ""
      
        if (error.code === "auth/email-already-in-use") {
                  errorMessage = t("auth/email-already-in-use")
          } else if (error.code === "auth/invalid-email") {
            errorMessage = t("auth/invalid-email")
          } else if (error.code === "auth/weak-password") {
            errorMessage = t("auth/weak-password")
          } else {
            errorMessage = t("registration/generic-error")
          }


      showMessage({
        type: 'danger',
        message: errorMessage,
      })
    }
  };

  const { t } = useTranslation()
  return (
    <AppSaveView style={styles.container}>
      <Text style={styles.mainText}>Smart Home{'\n'}Personal Assistant</Text>
      <Image source={IMAGES.appLogo} style={styles.logo} />
      <Text style={styles.register}>{t("Register")}</Text> 
      <Text style={styles.Create}>{t("Create your account")}</Text>

      <Formik
        initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
        validationSchema={SignUpSchema}
        onSubmit={(values) => {
          console.log(values)
          onSignUpPress(values)
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <AppTextInput
              placeholder={t("Username")}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            {touched.username && errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}

            <AppTextInput
              placeholder={t("Email")}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <View style={{ width: '100%' }}>
              <AppTextInput
                placeholder={t("Password")}
                secureTextEntry={!showPassword}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Feather name={showPassword ? 'eye' : 'eye-off'} size={22} color="gray" />
              </TouchableOpacity>
            </View>
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <View style={{ width: '100%' }}>
              <AppTextInput
                placeholder={t("Confirm Password")}
                secureTextEntry={!showConfirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Feather name={showConfirmPassword ? 'eye' : 'eye-off'} size={22} color="gray" />
              </TouchableOpacity>
            </View>
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}

            <AppButton
              title={t("Sign Up")}
              style={styles.signUp}
              textColor={AppColors.pembe}
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>

      <Text style={styles.Down}>
        {t("Already have an account?")}{' '}
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={() => navigation.navigate('SignInScreen')}
        >
          <Text style={styles.link}>{t("Sign In")}</Text>
        </TouchableOpacity>
      </Text>
    </AppSaveView>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: sharedPaddingHorizontal,
  },
  logo: {
    height: 120,
    width: 120,
    justifyContent: 'center',
    marginTop: vs(5),
  },
  mainText: {
    fontSize: 27,
    color: '#007BFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  register: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: vs(5),
    color: '#007BFF',
    paddingTop: vs(16),
    textAlign: 'center',
  },
  Create: {
    fontSize: 16,
    color: '#007BFF',
    textAlign: 'center',
    marginBottom: vs(15),
  },
  Down: {
    margin: vs(15),
    fontSize: 16,
  },
  link: {
    color: '#007BFF',
    textDecorationLine: 'underline',
    marginBottom: vs(-3),
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    alignSelf: 'flex-start',
    marginBottom: vs(10),
    marginTop: -10,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: vs(15),
  },
})
