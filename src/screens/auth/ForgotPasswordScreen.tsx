import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import AppSaveView from '../../components/views/AppSaveView'
import AppTextInput from '../../components/inputs/AppTextInput'
import AppButton from '../../components/buttons/AppButton'
import { useNavigation } from '@react-navigation/native'
import { sharedPaddingHorizontal } from '../../styles/SharedStyles'
import { vs } from 'react-native-size-matters'
import { IMAGES } from '../../constants/images-paths'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../config/firebase'
import { showMessage } from 'react-native-flash-message'

const ForgotPasswordScreen = () => {
  const navigation = useNavigation()

  const ForgotSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
  })

  const onResetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email)
      showMessage({
        type: 'success',
        message: 'Reset email sent! Check your inbox.',
        backgroundColor: 'green',
        color: 'white',
      })
      navigation.goBack()
    } catch (error: any) {
      console.log(error)
      showMessage({
        type: 'danger',
        message: 'An error occurred. Try again.',
      })
    }
  }

  return (
    <AppSaveView style={styles.container}>
      <Text style={styles.mainText}>Smart Home{'\n'}Personal Assistant</Text>
      <Image source={IMAGES.appLogo} style={styles.logo} />
      <Text style={styles.header}>Forgot Password</Text>
      <Text style={styles.subText}>Enter your email to reset your password</Text>

      <Formik
        initialValues={{ email: '' }}
        validationSchema={ForgotSchema}
        onSubmit={(values) => onResetPassword(values.email)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <AppTextInput
              placeholder="Enter your email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <AppButton
              title="Reset Password"
              onPress={handleSubmit}
              textColor="white"
              style={styles.resetButton}
            />

            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.backText}>← Back to Login</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </AppSaveView>
  )
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: sharedPaddingHorizontal,
  },
  logo: {
    height: 100,
    width: 100,
    marginTop: vs(10),
  },
  mainText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#007BFF',
    textAlign: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: vs(10),
    color: '#007BFF',
  },
  subText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: vs(20),
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: -10,
    marginBottom: vs(10),
    alignSelf: 'flex-start',
  },
  resetButton: {
    marginVertical: vs(10),
  },
  backText: {
    color: '#007BFF',
    marginTop: vs(20),
    textDecorationLine: 'underline',
  },
})
