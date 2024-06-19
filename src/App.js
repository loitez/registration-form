import './App.css';
import styles from './App.module.css'
import {useState, useRef} from 'react'

export const App = () => {

    const submitButtonRef = useRef(null)

    const [emailError, setEmailError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)
    const [passwordRepeatError, setPasswordRepeatError] = useState(null)

    const initialFormDataState = {
        email: '',
        password: '',
        repeatPassword: ''
    }

    let hasError = !!(passwordError || emailError || passwordRepeatError)

    const [formData, setFormData] = useState(initialFormDataState)

    const onSubmit = (e) => {
        e.preventDefault()
        if (formData.password && formData.email && formData.repeatPassword) {
            console.log(formData)
            submitButtonRef.current.blur()
            setFormData(initialFormDataState)
        } else {
            for (let item in formData) {
                if (formData[item] === '') {
                    let error = 'Заполните поле'
                    switch (item) {
                        case 'email':
                            setEmailError(error)
                            break
                        case 'password':
                            setPasswordError(error)
                            break
                        case 'repeatPassword':
                            setPasswordRepeatError(error)
                    }
                }
            }
        }


    }

    const onInputChange = ({target}) => {
        setFormData({...formData, [target.name] : target.value})
        let error =  null;
        switch (target.name) {
            case 'email':
                if (!/.+@.+\..+/i.test(target.value) && target.value.length > 0) {
                    error = 'Неверный формат e-mail'
                }
                setEmailError(error)
                break
            case 'password':
                setPasswordError('')
                break
            case 'repeatPassword':
                if (target.value === formData.password) {
                    submitButtonRef.current.focus()
                }

        }
    }

    const onPasswordBlur = ({target}) => {
        setFormData({...formData, [target.name] : target.value})
        let error =  null;
        if (target.value !== formData.password && target.value.length > 0) {
            error = 'Пароли не совпадают'
        }
        setPasswordRepeatError(error)
    }

  return (
      <div className={styles.formWrapper}>
        <h1>Регистрация</h1>
          <form onSubmit={onSubmit}>
              <input type="email" name="email" className={styles.input} onChange={onInputChange} placeholder='Email' value={formData.email}/>
              {emailError && <p className={styles.errorMessage}>{emailError}</p>}
              <input type="password" name="password" className={styles.input} onChange={onInputChange} placeholder='Пароль' value={formData.password}/>
              {passwordError && <p className={styles.errorMessage}>{passwordError}</p>}
              <input type="password" name="repeatPassword" className={styles.input} onChange={onInputChange} onBlur={onPasswordBlur} placeholder='Повторите пароль' value={formData.repeatPassword}/>
              {passwordRepeatError && <p className={styles.errorMessage}>{passwordRepeatError}</p>}
              <button type="submit" className={styles.submitButton} disabled={hasError} ref={submitButtonRef}>Зарегистрироваться</button>
          </form>
      </div>
  )
}
