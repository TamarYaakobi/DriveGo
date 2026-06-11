import { useEffect, type FC } from 'react';
import './AddCar.scss';
import * as yup from 'yup'
import { useFormik } from 'formik';
import { setMessage } from '../../redux/slices/massage.slice';
import type { Car } from '../../models/car.model';

interface AddCarProps { }

const AddCar: FC<AddCarProps> = () => {

  useEffect(()=>{
    
  },[])

  const myForm = useFormik({
    initialValues: {
      categoryId: '',
      companyId: '',
      seats: '',
      description: '',
      year: '',
      imageUrl: ''
    },
    onSubmit: async (value: any) => {
      const car: Car = {
        categoryId: value.categoryId,
        companyId: value.companyId,
        seats: value.seats,
        description: value.description,
        year: value.year,
        imageUrl: value.imageUrl

      }

    },
    validationSchema: yup.object().shape({
      description: yup.string().required('שדה חובה'),
      rating: yup.number()
        .min(1, 'מינימום 1')
        .max(5, 'מקסימום 5')
        .required('שדה חובה')

    })
  })

  return <div className="AddCar">
    <form onSubmit={myForm.handleSubmit}>

      <div className="form-group">
        <label htmlFor="description">הכנס חוות דעת</label>
        <input onChange={myForm.handleChange} type="text" className="form-control" name="description" id="description" />
        {myForm.errors.description && <p>{myForm.errors.description as string}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="rating">נקד אותנו</label>
        <input
          onChange={myForm.handleChange}
          type="number"
          className="form-control"
          name="rating"
          id="rating"
          min={1}
          max={5}
        />
        {myForm.errors.rating && <p>{myForm.errors.rating as string}</p>}
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>
};

export default AddCar;
