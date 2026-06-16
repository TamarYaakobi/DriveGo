import { type FC } from 'react';
import './AddCar.scss';
import * as yup from 'yup'
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../redux/slices/message.slice';
import type { Car } from '../../models/car.model';
import carService from '../../services/car.service';
import { useNavigate } from 'react-router-dom';

interface AddCarProps { }

const AddCar: FC<AddCarProps> = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const myForm = useFormik({
    initialValues: {
      categoryId: '',
      companyId: '',
      seats: '',
      description: '',
      year: '',
      imageUrl: ''
    },
    onSubmit: async (values) => {
      const car: Car = {
        categoryId: values.categoryId,
        companyId: values.companyId,
        seats: Number(values.seats),
        description: values.description,
        year: Number(values.year),
        imageUrl: values.imageUrl
      }

      const result = await carService.addCar(car)
      if (!result) {
        dispatch(setMessage({ message: 'הוספת הרכב נכשלה', type: 'error' }))
      } else {
        dispatch(setMessage({ message: 'הרכב נוסף בהצלחה', type: 'sucsses' }))
        navigate('/Cars')
      }
    },
    validationSchema: yup.object().shape({
      categoryId: yup.string().required('שדה חובה'),
      companyId: yup.string().required('שדה חובה'),
      seats: yup.number().min(1, 'מינימום מושב אחד').max(9, 'מקסימום 9 מושבות').required('שדה חובה'),
      description: yup.string().min(5, 'לפחות 5 תווים').required('שדה חובה'),
      year: yup.number().min(1900, 'שנה לא תקינה').max(new Date().getFullYear(), 'שנה לא תקינה').required('שדה חובה'),
      imageUrl: yup.string().url('קישור לא תקין').required('שדה חובה'),
    })
  })

  return (
    <div className="AddCar" dir="rtl">
      <div className="auth-container wide-container">
        <div className="auth-header">
          <h1 className="brand-title">Drive Go</h1>
          <h2>הוספת רכב חדש</h2>
          <div className="gold-bar"></div>
        </div>

        <form onSubmit={myForm.handleSubmit}>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="categoryId">מזהה קטגוריה</label>
              <input onChange={myForm.handleChange} value={myForm.values.categoryId}
                type="text" className="form-control" name="categoryId" id="categoryId" placeholder="לדוגמה: 1" />
              {myForm.errors.categoryId && <p className="error-msg">{myForm.errors.categoryId as string}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="companyId">מזהה חברה</label>
              <input onChange={myForm.handleChange} value={myForm.values.companyId}
                type="text" className="form-control" name="companyId" id="companyId" placeholder="לדוגמה: 1" />
              {myForm.errors.companyId && <p className="error-msg">{myForm.errors.companyId as string}</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="seats">מספר מושבות</label>
              <input onChange={myForm.handleChange} value={myForm.values.seats}
                type="number" className="form-control" name="seats" id="seats" min={1} max={9} placeholder="5" />
              {myForm.errors.seats && <p className="error-msg">{myForm.errors.seats as string}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="year">שנת יצור</label>
              <input onChange={myForm.handleChange} value={myForm.values.year}
                type="number" className="form-control" name="year" id="year" placeholder="2024" />
              {myForm.errors.year && <p className="error-msg">{myForm.errors.year as string}</p>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">תיאור הרכב</label>
            <input onChange={myForm.handleChange} value={myForm.values.description}
              type="text" className="form-control" name="description" id="description" placeholder="תאר את הרכב..." />
            {myForm.errors.description && <p className="error-msg">{myForm.errors.description as string}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">קישור לתמונה</label>
            <input onChange={myForm.handleChange} value={myForm.values.imageUrl}
              type="text" className="form-control" name="imageUrl" id="imageUrl" placeholder="https://..." />
            {myForm.errors.imageUrl && <p className="error-msg">{myForm.errors.imageUrl as string}</p>}
          </div>

          {myForm.values.imageUrl && !myForm.errors.imageUrl && (
            <div className="image-preview">
              <img src={myForm.values.imageUrl} alt="תצוגה מקדימה" />
            </div>
          )}

          <button type="submit" className="btn btn-primary submit-gold-btn">הוסף רכב</button>
        </form>
      </div>
    </div>
  )
};

export default AddCar;
