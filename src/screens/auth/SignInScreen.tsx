import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
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
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase'
import { showMessage } from 'react-native-flash-message'
import { Feather } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'

const SignInScreen = () => {
  const navigation = useNavigation()
  const [showPassword, setShowPassword] = useState(false)

  const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  }).required()

  const onLoginPress = async (data: { email: string; password: string }) => {
    console.log(data)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)

      showMessage({
        type: 'success',
        message: t('Login successful'),
        backgroundColor: '#28a745',
        color: 'white',
      })

      navigation.navigate('MainAppBottomTabs')
      console.log(userCredential)
    } catch (error: any) {
      let errorMessage = ""
      console.log(error.code)

      if (error.code === "auth/user-not-found") {
        errorMessage = t("Wrong email. This email is not registered")
      } else if (error.code === "auth/invalid-credential") {
        errorMessage = t("Wrong email or Password. Please try again.")
      } else {
        errorMessage = t("An error occurred during login. Please try again.")
      }

      showMessage({
        type: 'danger',
        message: errorMessage,
      })
    }
  }

  const { t } = useTranslation()

  return (
    <AppSaveView style={styles.container}>
      <Text style={styles.mainText}>Smart Home{'\n'}Personal Assistant</Text>
      <Image source={IMAGES.appLogo} style={styles.logo} />
      <Text style={styles.Welcome}>{t("welcome")}</Text>
      <Text style={styles.Create}>{t("Login to your account")}</Text>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={SignInSchema}
        onSubmit={(values) => {
          console.log(values)
          onLoginPress(values)
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
                <Feather
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={22}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            {/* ✅ Forgot Password cliquable */}
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
              <Text style={styles.forgotText}>{t("Forgot password?")}</Text>
            </TouchableOpacity>

            <AppButton
              title={t("Login")}
              style={styles.signIn}
              textColor={AppColors.pembe}
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>

      <Text style={styles.Down}>
        {t("Don't have an account?")}{' '}
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={() => navigation.navigate('SignUpScreen')}
        >
          <Text style={styles.link}>{t("Sign Up")}</Text>
        </TouchableOpacity>
      </Text>
    </AppSaveView>
  )
}

export default SignInScreen

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
  Welcome: {
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
  forgotText: {
    color: '#007BFF',
    fontSize: 16,
    marginRight: 180,
    marginBottom: vs(18),
    fontWeight: '700',
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
