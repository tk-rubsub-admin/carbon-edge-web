import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../context/Auth/Auth';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

export default function SellerLogin() {
  const { t } = useTranslation();
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUserToken, setUserDisplayName } = useContext(authContext);
  const navigate = useNavigate();

  const inputClassName =
    'w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-100';

  function handleLogin(data) {
    setIsLoading(true);
    const emailPrefix = data.email.split('@')[0] || 'Seller';
    const sellerDisplayName = `Seller ${emailPrefix}`;
    // axios
    //   .post('https://ecommerce.routemisr.com/api/v1/auth/signin', data)
    //   .then((res) => {
    setUserToken('seller-1234');
    setUserDisplayName(sellerDisplayName);
    localStorage.setItem('authToken', 'seller-1234');
    localStorage.setItem('userDisplayName', sellerDisplayName);
    setErr(null);
    setIsLoading(false);
    navigate('/');
    //     setErr(null);
    //     setIsLoading(false);
    //     if (res.data.message === 'success') {
    //       navigate('/');
    //     }
    //   })
    //   .catch((error) => {
    //     setIsLoading(false);
    //     setErr(error.response?.data?.message || t('auth.loginError'));
    //   });
  }

  const validate = Yup.object({
    email: Yup.string()
      .required(t('auth.validations.emailRequired'))
      .email(t('auth.validations.emailInvalid')),
    password: Yup.string().required(t('auth.validations.passwordRequired')),
  });

  const formik = useFormik({
    initialValues: {
      email: 'seller@carbon-edge.com',
      password: 'seller1234',
    },
    onSubmit: handleLogin,
    validationSchema: validate,
  });

  return (
    <>
      <Helmet>
        <title>{t('auth.sellerLoginTitle')}</title>
      </Helmet>

      <section className="px-4 py-10 md:px-6">
        <div className="mx-auto max-w-md rounded-[2rem] bg-white px-6 py-8 shadow-[0_20px_70px_rgba(15,23,42,0.08)] ring-1 ring-gray-100 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            {t('auth.sellerLoginTitle')}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {t('auth.sellerLoginSubtitle')}
          </p>

          {err && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {err}
            </div>
          )}

          <form
            method="post"
            className="mt-8 space-y-5"
            onSubmit={formik.handleSubmit}
          >
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                {t('auth.email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={t('auth.emailPlaceholder')}
                className={inputClassName}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="mt-2 text-sm text-red-600">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                {t('auth.password')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={t('auth.passwordPlaceholder')}
                className={inputClassName}
              />
              {formik.errors.password && formik.touched.password && (
                <p className="mt-2 text-sm text-red-600">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <Link
              to="/forgotPassword"
              className="block text-sm font-medium text-green-700 underline underline-offset-4"
            >
              {t('auth.forgotPassword')}
            </Link>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? t('auth.loginLoading') : t('auth.sellerLoginTitle')}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
