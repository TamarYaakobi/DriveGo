import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMessage } from '../../redux/slices/message.slice';
import './Toast.scss';

const Toast = () => {
  const dispatch = useDispatch()
  const { message, type } = useSelector((state: any) => state.message)

  useEffect(() => {
    if (!message) return
    const timer = setTimeout(() => {
      dispatch(setMessage({ message: '', type: '' }))
    }, 3000)

    return () => clearTimeout(timer)
  }, [message, dispatch])

  if (!message) return null

  const handleClose = () => {
    dispatch(setMessage({ message: '', type: '' }))
  }

  return (
    <div className={`Toast-wrapper`} dir="rtl">
      <div className={`Toast Toast--${type}`}>
        <div className="Toast__content">
          <span className="Toast__icon">
            {type === 'error' ? '✕' : '✓'}
          </span>
          <span className="Toast__text">{message}</span>
        </div>
        <button className="Toast__close-btn" onClick={handleClose} aria-label="סגור">
          &times;
        </button>
      </div>
    </div>
  )
}

export default Toast;