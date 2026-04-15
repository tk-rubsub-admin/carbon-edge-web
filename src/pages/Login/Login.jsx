import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../context/Auth/Auth';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const { t } = useTranslation();
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUserToken, setUserDisplayName, setUserEmail, setUserRole } =
    useContext(authContext);
  const navigate = useNavigate();

  const inputClassName =
    'w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-100';

  async function handleLogin(data) {
    setIsLoading(true);
    setErr(null);

    try {
      const res = await axios.post('http://localhost:8080/api/v1/auth/login', {
        email: data.email,
        password: data.password,
      });

      const responseBody = res.data ?? {};
      const responseData = responseBody?.data ?? {};
      const customer = responseData?.customer ?? {};
      const rawToken =
        responseBody?.accessToken ??
        responseBody?.token ??
        responseData?.accessToken ??
        responseData?.token;
      const normalizedToken = String(rawToken ?? '')
        .replace(/^Bearer\s+/i, '')
        .trim();
      const normalizedTokenType = String(responseBody?.tokenType || 'Bearer').trim();
      const emailPrefix = data.email.split('@')[0] || 'User';
      const displayName =
        customer?.displayName ??
        responseData?.displayName ??
        responseData?.name ??
        responseData?.user?.name ??
        localStorage.getItem('userDisplayName') ??
        emailPrefix;
      const userEmail =
        customer?.email ?? responseData?.email ?? responseData?.user?.email ?? data.email;
      const userRole =
        customer?.role ??
        responseData?.role ??
        responseData?.status ??
        customer?.status ??
        'general';

      if (!normalizedToken) {
        throw new Error('Missing token from login response');
      }

      setUserToken(normalizedToken);
      setUserDisplayName(displayName);
      setUserEmail(userEmail);
      setUserRole(userRole);

      localStorage.setItem('authToken', normalizedToken);
      localStorage.setItem('authTokenType', normalizedTokenType || 'Bearer');
      localStorage.setItem('authExpiresAt', responseBody?.expiresAt || '');
      localStorage.setItem('userDisplayName', displayName);
      localStorage.setItem('userEmail', userEmail);
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('userId', responseData?.userId || '');
      localStorage.setItem('customerId', responseData?.customerId || customer?.id || '');
      localStorage.setItem('userStatus', responseData?.status || customer?.status || '');
      localStorage.setItem('wishlistId', String(responseData?.wishlistId || ''));
      localStorage.setItem('cartId', String(responseData?.cartId || ''));

      navigate('/');
    } catch (error) {
      setErr(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          t('auth.loginError')
      );
    } finally {
      setIsLoading(false);
    }
  }

  const validate = Yup.object({
    email: Yup.string()
      .required(t('auth.validations.emailRequired'))
      .email(t('auth.validations.emailInvalid')),
    password: Yup.string().required(t('auth.validations.passwordRequired')),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: handleLogin,
    validationSchema: validate,
  });

  return (
    <>
      <Helmet>
        <title>{t('auth.loginTitle')}</title>
      </Helmet>

      <section className="px-4 py-10 md:px-6">
        <div className="mx-auto max-w-md rounded-[2rem] bg-white px-6 py-8 shadow-[0_20px_70px_rgba(15,23,42,0.08)] ring-1 ring-gray-100 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">{t('auth.loginTitle')}</h1>
          <p className="mt-2 text-sm text-gray-500">
            {t('auth.loginSubtitle')}
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
              {isLoading ? t('auth.loginLoading') : t('auth.loginButton')}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
