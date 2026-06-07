import { type FC } from 'react';
import './SingUp.scss';
import UserService from '../../services/singIn.service';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import type { User } from "../../models/user.model"
import { setUser } from '../../redux/slices/user.slice';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../redux/slices/massage.slice';


interface SingUpProps { }

const SingUp: FC<SingUpProps> = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const myForm = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      idNumber: '',
      email: '',
      password: '',
      isAdmin: false,
      adminPassword: ''
    },
    onSubmit: async (value: any) => {
      const userModel: User = {
        firstName: value.firstName,
        lastName: value.lastName,
        idNumber: value.idNumber,
        email: value.email,
        password: value.password,
        isAdmin: value.isAdmin
      };

      let user = await UserService.addUser(userModel)
      if (user == null) {
        dispatch(setMessage({
          massage: ' המשתמש כבר רשום במערכת',
          type: 'error'
        }))
      }
      else {
        dispatch(setUser(user))
        dispatch(setMessage({
          massage: 'נרשם בהצלחה',
          type: 'sucsses'
        }))
        navigate('/')
      }
    },
    validationSchema: yup.object().shape({
      firstName: yup.string()
        .min(2, 'שם פרטי חייב להכיל לפחות 2 תווים')
        .required('שדה חובה'),
      lastName: yup.string()
        .min(2, 'שם משפחה חייב להכיל לפחות 2 תווים')
        .required('שדה חובה'),
      idNumber: yup.string()
        .length(9, 'תעודת זהות חייבת להכיל 9 ספרות')
        .matches(/^\d+$/, 'תעודת זהות חייבת להכיל ספרות בלבד')
        .required('שדה חובה'),
      email: yup.string()
        .email('אימייל לא תקין')
        .required('שדה חובה'),
      password: yup.string()
        .min(8, 'הסיסמה חייבת להכיל לפחות 8 תווים')
        .required('שדה חובה'),
      adminPassword: yup.string().when('isAdmin', {
        is: true,
        then: (schema) => schema
          .required('שדה חובה עבור מנהל')
          .test('check-admin-password', 'סיסמת מנהל שגויה', (value) => {
            return value === import.meta.env.VITE_ADMIN_PASSWORD;
          }),
        otherwise: (schema) => schema.notRequired()
      })
    })
  })

  return <div className="SingIn">
    <form onSubmit={myForm.handleSubmit}>

      <div className="form-group">
        <label htmlFor="firstName">שם פרטי</label>
        <input onChange={myForm.handleChange} type="text" className="form-control" name="firstName" id="firstName" />
        {myForm.errors.firstName && <p>{myForm.errors.firstName as string}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="lastName">שם משפחה</label>
        <input onChange={myForm.handleChange} type="text" className="form-control" name="lastName" id="lastName" />
        {myForm.errors.lastName && <p>{myForm.errors.lastName as string}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="idNumber">תעודת זהות</label>
        <input onChange={myForm.handleChange} type="text" className="form-control" name="idNumber" id="idNumber" />
        {myForm.errors.idNumber && <p>{myForm.errors.idNumber as string}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="email">אימייל</label>
        <input onChange={myForm.handleChange} type="email" className="form-control" name="email" id="email" />
        {myForm.errors.email && <p>{myForm.errors.email as string}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="password">סיסמה</label>
        <input onChange={myForm.handleChange} type="password" className="form-control" name="password" id="password" />
        {myForm.errors.password && <p>{myForm.errors.password as string}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="isAdmin">מנהל</label>
        <input onChange={myForm.handleChange} type="checkbox" name="isAdmin" id="isAdmin" />
      </div>

      {myForm.values.isAdmin &&
        <div className="form-group">
          <label htmlFor="adminPassword">הכנס סיסמת מנהל</label>
          <input onChange={myForm.handleChange} type="text" name="adminPassword" id="adminPassword" />
          {myForm.errors.adminPassword && (
            <p>{myForm.errors.adminPassword as string}</p>
          )}
        </div>
      }
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>
};

export default SingUp;
