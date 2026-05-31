import { useState, type FC } from 'react';
import './SingIn.scss';
import { useFormik } from 'formik';
import * as yup from 'yup'
import UserService from '../../services/singIn.service';
import { useNavigate } from 'react-router';

interface SingInProps { }

const SingIn: FC<SingInProps> = () => {

  const [singUp, setSingUp] = useState(false)
  const navigate=useNavigate()
  const myForm = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (value: any) => {
      let user = await UserService.getUserByEmail(value.email)
      if (user != null) {
        if (user.password == value.password) { }
        else {
        }
      }
      else {
        setSingUp(true)
      }
    },
    validationSchema: yup.object().shape({
      email: yup.string().email().required("שדה חובה"),
      password: yup.string().min(8, 'הסיסמה חייבת להכיל לפחות 8 תווים').required('שדה חובה')
    })
  })

  return <div className="SingIn">
    <form onSubmit={myForm.handleSubmit}>
      <div className="form-group">
        <label htmlFor="inputEmail">Email address</label>
        <input onChange={myForm.handleChange} type="email" className="form-control" name="email" id="inputEmail" aria-describedby="emailHelp" />
        {myForm.errors.email && <p>{myForm.errors.email as string}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="inputPassword">Password</label>
        <input onChange={myForm.handleChange} type="password" className="form-control" name="password" id="inputPassword" />
        {myForm.errors.password && <p>{myForm.errors.password as string}</p>}
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    {singUp &&
      <>
        <small>המשתמש אינו קיים במערכת נא בצע הרשמה</small>
        <button onClick={()=>navigate('/SingUp')}>עבור להרשמה</button>
      </>}
  </div>

};

export default SingIn;
