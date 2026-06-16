import { type FC } from 'react';
import './UserDetails.scss';
import { useDispatch, useSelector } from 'react-redux';
import type { User } from '../../models/user.model';
import { setMessage } from '../../redux/slices/massage.slice';
import { setUser } from '../../redux/slices/user.slice';
import { useFormik } from 'formik';
import * as yup from 'yup'
import UserService from '../../services/user.service';
import { useNavigate } from 'react-router-dom';

interface UserDetailsProps { }

const UserDetails: FC<UserDetailsProps> = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state: User) => state.user.user)
  const myForm = useFormik({
    enableReinitialize: true, // ← חשוב! כדי שיטען את ערכי היוזר כשמגיעים
    initialValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      idNumber: user?.idNumber || '',
      email: user?.email || '',
      password: '',
    },
    onSubmit: async (values) => {
      const updatedUser: User = {
        ...user,
        firstName: values.firstName,
        lastName: values.lastName,
        idNumber: values.idNumber,
        email: values.email,
        ...(values.password && { password: values.password })
      };

      const result = await UserService.updateUser(updatedUser)
      if (!result) {
        dispatch(setMessage({ massage: 'העדכון נכשל', type: 'error' }))
      } else {
        dispatch(setUser(result))
        dispatch(setMessage({ massage: 'הפרטים עודכנו בהצלחה', type: 'sucsses' }))
      }
    },
    validationSchema: yup.object().shape({
      firstName: yup.string().min(2, 'לפחות 2 תווים').required('שדה חובה'),
      lastName: yup.string().min(2, 'לפחות 2 תווים').required('שדה חובה'),
      idNumber: yup.string().length(9, 'תעודת זהות חייבת להכיל 9 ספרות')
        .matches(/^\d+$/, 'ספרות בלבד').required('שדה חובה'),
      email: yup.string().email('אימייל לא תקין').required('שדה חובה'),
      password: yup.string().min(8, 'לפחות 8 תווים')
    })
  })

  return (
    <div className="UserDetails" dir="rtl">
      <div className="auth-container wide-container">
        <div className="auth-header">
          <h1 className="brand-title">Drive Go</h1>
          <h2>פרטים אישיים</h2>
          <div className="gold-bar"></div>
        </div>

        <form onSubmit={myForm.handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">שם פרטי</label>
              <input onChange={myForm.handleChange} value={myForm.values.firstName}
                type="text" className="form-control" name="firstName" id="firstName" />
              {myForm.errors.firstName && <p className="error-msg">{myForm.errors.firstName as string}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">שם משפחה</label>
              <input onChange={myForm.handleChange} value={myForm.values.lastName}
                type="text" className="form-control" name="lastName" id="lastName" />
              {myForm.errors.lastName && <p className="error-msg">{myForm.errors.lastName as string}</p>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="idNumber">תעודת זהות</label>
            <input onChange={myForm.handleChange} value={myForm.values.idNumber}
              type="text" className="form-control" name="idNumber" id="idNumber" maxLength={9} />
            {myForm.errors.idNumber && <p className="error-msg">{myForm.errors.idNumber as string}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">אימייל</label>
            <input onChange={myForm.handleChange} value={myForm.values.email}
              type="email" className="form-control" name="email" id="email" />
            {myForm.errors.email && <p className="error-msg">{myForm.errors.email as string}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">סיסמה חדשה (אופציונלי)</label>
            <input onChange={myForm.handleChange} value={myForm.values.password}
              type="password" className="form-control" name="password" id="password"
              placeholder="השאר ריק אם אינך רוצה לשנות" />
            {myForm.errors.password && <p className="error-msg">{myForm.errors.password}</p>}
          </div>

          <button type="submit" className="btn btn-primary submit-gold-btn"
            onClick={() => navigate('/')}>שמור שינויים</button>
        </form>
      </div>
    </div>
  )
};

export default UserDetails;

