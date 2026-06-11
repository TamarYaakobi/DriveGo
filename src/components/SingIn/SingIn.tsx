// import { useState, type FC } from 'react';
// import './SingIn.scss';
// import { useFormik } from 'formik';
// import * as yup from 'yup'
// import UserService from '../../services/user.service';
// import { useNavigate } from 'react-router';
// import { useDispatch } from 'react-redux';
// import { setUser } from '../../redux/slices/user.slice';
// import { setMessage } from '../../redux/slices/massage.slice';

// interface SingInProps { }

// const SingIn: FC<SingInProps> = () => {

//   const [singUp, setSingUp] = useState(false)
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const myForm = useFormik({
//     initialValues: {
//       email: '',
//       password: ''
//     },
//     onSubmit: async (value: any) => {
//       let user = await UserService.getUserByEmail(value.email)
//       if (user != null) {
//         if (user.password == value.password) {
//           dispatch(setUser(user))
//           navigate('/')
//         }
//         else {
//           dispatch(setMessage({
//             massage: 'הסיסמה שגויה',
//             type: 'error'
//           }))
//         }
//       }
//       else {
//         dispatch(setMessage({
//           massage: 'המשתמש אינו קיים במערכת, נא הרשם',
//           type: 'error'
//         }))
//         setSingUp(true)
//       }
//     },
//     validationSchema: yup.object().shape({
//       email: yup.string().email().required("שדה חובה"),
//       password: yup.string().min(8, 'הסיסמה חייבת להכיל לפחות 8 תווים').required('שדה חובה')
//     })
//   })

//   return <div className="SingIn">
//     <form onSubmit={myForm.handleSubmit}>
//       <div className="form-group">
//         <label htmlFor="inputEmail">Email address</label>
//         <input onChange={myForm.handleChange} type="email" className="form-control" name="email" id="inputEmail" aria-describedby="emailHelp" />
//         {myForm.errors.email && <p>{myForm.errors.email as string}</p>}
//       </div>
//       <div className="form-group">
//         <label htmlFor="inputPassword">Password</label>
//         <input onChange={myForm.handleChange} type="password" className="form-control" name="password" id="inputPassword" />
//         {myForm.errors.password && <p>{myForm.errors.password as string}</p>}
//       </div>
//       <button type="submit" className="btn btn-primary">Submit</button>
//     </form>
//     {singUp &&
//       <>
//         <button onClick={() => navigate('/SingUp')}>עבור להרשמה</button>
//       </>}
//   </div>

// };

// export default SingIn;

import { useState, type FC } from 'react';
import './SingIn.scss';
import { useFormik } from 'formik';
import * as yup from 'yup'
import UserService from '../../services/user.service';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/user.slice';
import { setMessage } from '../../redux/slices/massage.slice';

interface SingInProps { }

const SingIn: FC<SingInProps> = () => {

  const [singUp, setSingUp] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const myForm = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (value: any) => {
      let user = await UserService.getUserByEmail(value.email)
      if (user != null) {
        if (user.password == value.password) {
          dispatch(setUser(user))
          navigate('/')
        }
        else {
          dispatch(setMessage({
            massage: 'הסיסמה שגויה',
            type: 'error'
          }))
        }
      }
      else {
        dispatch(setMessage({
          massage: 'המשתמש אינו קיים במערכת, נא הרשם',
          type: 'error'
        }))
        setSingUp(true)
      }
    },
    validationSchema: yup.object().shape({
      email: yup.string().email().required("שדה חובה"),
      password: yup.string().min(8, 'הסיסמה חייבת להכיל לפחות 8 תווים').required('שדה חובה')
    })
  })

  return (
    <div className="SingIn" dir="rtl">
      <div className="auth-container">
        <div className="auth-header">
          <h1 className="brand-title">Drive Go</h1>
          <h2>כניסת לקוחות</h2>
          <div className="gold-bar"></div>
        </div>

        <form onSubmit={myForm.handleSubmit}>
          <div className="form-group">
            <label htmlFor="inputEmail">כתובת אימייל</label>
            <input 
              onChange={myForm.handleChange} 
              type="email" 
              className="form-control" 
              name="email" 
              id="inputEmail" 
              placeholder="הקש את האימייל שלך"
            />
            {myForm.errors.email && <p className="error-msg">{myForm.errors.email as string}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="inputPassword">סיסמה סודית</label>
            <input 
              onChange={myForm.handleChange} 
              type="password" 
              className="form-control" 
              name="password" 
              id="inputPassword" 
              placeholder="הקש את הסיסמה"
            />
            {myForm.errors.password && <p className="error-msg">{myForm.errors.password as string}</p>}
          </div>

          <button type="submit" className="btn btn-primary submit-gold-btn">התחבר למערכת</button>
        </form>

        {singUp && (
          <div className="redirect-section">
            <p>האימייל לא נמצא במערכת</p>
            <button className="switch-auth-btn" onClick={() => navigate('/SingUp')}>עבור להרשמה מהירה ←</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingIn;