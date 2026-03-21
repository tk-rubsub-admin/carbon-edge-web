import logo from '../../assets/logo-carbon-edge.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { authContext } from '../../context/Auth/Auth';
import { initFlowbite } from 'flowbite';
import { productsContext } from '../../context/Products/Products';

export default function Navbar() {
  const { userToken, setUserToken } = useContext(authContext);
  const location = useLocation();
  const navigate = useNavigate();

  const { data = [], setSearchRes } = useContext(productsContext);

  // 🔥 filter state
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [province, setProvince] = useState('');

  function logout() {
    setUserToken(null);
    localStorage.removeItem('authToken');
  }

  // 🔍 search
  function handleSearch(e) {
    if (e.key === 'Enter') {
      const query = e.target.value.toLowerCase().trim();

      const filteredProducts = data.filter((product) =>
        product.nameTh?.toLowerCase().includes(query) ||
        product.nameEn?.toLowerCase().includes(query)
      );

      setSearchRes(filteredProducts);
      navigate('/search');
    }
  }

  // 🎯 filter
  function applyFilter() {
    let filtered = data;

    if (category) {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (province) {
      filtered = filtered.filter((p) => p.province === province);
    }

    if (minPrice) {
      filtered = filtered.filter((p) => p.price >= Number(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter((p) => p.price <= Number(maxPrice));
    }

    setSearchRes(filtered);
    navigate('/search');
  }

  useEffect(() => {
    initFlowbite();
  }, []);

  const getLinkClass = (path) => {
    return location.pathname === path
      ? 'block py-2 px-3 text-white bg-green-700 rounded lg:bg-transparent lg:text-green-700 lg:p-0'
      : 'block py-2 px-3 text-gray-900 rounded hover:text-green-700 lg:p-0';
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

        {/* LOGO */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} className="h-14" alt="Logo" />
        </Link>

        {/* RIGHT SECTION */}
        <div className="flex lg:order-2 items-center gap-2">

          {userToken && (
            <div className="hidden lg:flex flex-col">

              {/* 🔍 SEARCH */}
              <input
                type="text"
                onKeyUp={handleSearch}
                className="p-2 border rounded mb-2"
                placeholder="Search..."
              />

              {/* 🎯 FILTER */}
              <div className="flex gap-2">

                {/* Category */}
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="">Category</option>
                  <option value="ผ้า">ผ้า</option>
                  <option value="อาหาร">อาหาร</option>
                  <option value="งานคราฟต์">งานคราฟต์</option>
                </select>

                {/* Province */}
                <select
                  onChange={(e) => setProvince(e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="">จังหวัด</option>
                  <option value="บึงกาฬ">บึงกาฬ</option>
                </select>

                {/* Price */}
                <input
                  type="number"
                  placeholder="Min"
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="border p-1 w-20"
                />

                <input
                  type="number"
                  placeholder="Max"
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="border p-1 w-20"
                />

                {/* Button */}
                <button
                  onClick={applyFilter}
                  className="bg-green-600 text-white px-3 rounded"
                >
                  Filter
                </button>
              </div>
            </div>
          )}

        </div>

        {/* MENU */}
        <div className="hidden w-full lg:flex lg:w-auto lg:order-1">
          <ul className="flex flex-col lg:flex-row lg:space-x-8 font-medium">

            {userToken ? (
              <>
                <li>
                  <Link to="/" className={getLinkClass('/')}>
                    Home
                  </Link>
                </li>

                <li>
                  <Link to="/brands" className={getLinkClass('/brands')}>
                    Brands
                  </Link>
                </li>

                <li>
                  <Link to="/categories" className={getLinkClass('/categories')}>
                    Categories
                  </Link>
                </li>

                <li>
                  <Link
                    to="/login"
                    onClick={logout}
                    className={getLinkClass('/login')}
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className={getLinkClass('/login')}>
                    Login
                  </Link>
                </li>

                <li>
                  <Link to="/register" className={getLinkClass('/register')}>
                    Register
                  </Link>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}