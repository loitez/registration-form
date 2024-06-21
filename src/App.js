import './App.css';
import styles from './App.module.css'
import {useRef} from 'react'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export const App = () => {
    const submitButtonRef = useRef(null)

    const schema = yup.object()
        .shape({
        email: yup
            .string()
            .required('Обязательное поле')
            .matches(/.+@.+\..+/i, 'Введите корректный email'),
        password: yup
            .string()
            .required('Обязательное поле')
            .min(8, 'Минимальная длина пароля - 8 символов'),

        repeatPassword: yup
            .string()
            .required('Обязательное поле')
            .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
            repeatPassword: ''
        },
        resolver: yupResolver(schema)
    })

    const emailError = errors.email?.message
    const passwordError = errors.password?.message
    const passwordRepeatError = errors.repeatPassword?.message

    let hasError = !!(emailError || passwordError || passwordRepeatError)


    const sendFormData = (formData) => {
        console.log(formData)
    }


  return (
      <div className={styles.formWrapper}>
        <h1>Регистрация</h1>
          <form onSubmit={handleSubmit(sendFormData)}>
              <input type="email" name="email" className={styles.input} placeholder='Email' {...register('email')} />
              {emailError && <p className={styles.errorMessage}>{emailError}</p>}
              <input type="password" name="password" className={styles.input} placeholder='Пароль' {...register('password')}/>
              {passwordError && <p className={styles.errorMessage}>{passwordError}</p>}
              <input type="password" name="repeatPassword" className={styles.input} placeholder='Повторите пароль' {...register('repeatPassword')}/>
              {passwordRepeatError && <p className={styles.errorMessage}>{passwordRepeatError}</p>}
              <button type="submit" className={styles.submitButton} ref={submitButtonRef} disabled={hasError}>Зарегистрироваться</button>
          </form>
      </div>
  )
}


// auto-focus on submit btn when validation is ok (hasError is false? other fields have values?)