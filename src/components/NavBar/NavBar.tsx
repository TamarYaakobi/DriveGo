import { useEffect, useState, type FC } from 'react';
import './NavBar.scss';
import { useSelector } from 'react-redux';
import type { User } from '../../models/user.model';
import { useNavigate } from 'react-router-dom';
import carService from '../../services/car.service';
import type { Category } from '../../models/category.model';

interface NavBarProps { }

const NavBar: FC<NavBarProps> = () => {
  const user = useSelector((state: User) => state.user.user)
  const [showCategories, setShowCategories] = useState(false);
  const navigate = useNavigate()
  const [categories, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    carService.getCategories().then(data => setCategories(data));
  }, []);

  return <div className="NavBar">

    <nav
      dir="rtl"
      className='nav-bar'
    >
      <ul className='nav-ul'>
        <li onClick={() => navigate('/')} className='nav-link'>דף הבית</li>
        <li onClick={() => navigate('/AboutUs')} className='nav-link'>עלינו</li>


        <li
          className='nav-link'
          onMouseEnter={() => setShowCategories(true)}
          onMouseLeave={() => setShowCategories(false)}
        >
          <span onClick={() => navigate('/Cars')}>המכוניות שלנו</span>

          {showCategories && (
            <ul className='dropdown'>
              <li onClick={() => navigate('/Cars')}>כל המכוניות</li>
              {categories && categories.map(cat => (
                <li key={cat.id} onClick={() => navigate(`/Cars/${cat.name}`)}>
                  {cat.name}
                </li>
              ))}
            </ul>
          )}
        </li>
        <li onClick={() => { }} className='nav-link'>צור קשר</li>
        <li onClick={() => navigate('/SingIn')} className='nav-link'>כניסה</li>
        <li onClick={() => navigate('/SingUp')} className='nav-link'>הרשמה</li>
        <li style={{ color: "#1c1606", fontSize: "14px", textDecoration: "none", padding: "6px 14px", display: "block" }}>{user ? user.firstName : 'אורח'}</li>
      </ul>
    </nav>
  </div>
};

export default NavBar;
