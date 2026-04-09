import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export default function ForgotPassword() {
  const { t } = useTranslation();
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const inputClassName =
    'w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-100';

  function handleForgotPassword(data) {
    setIsLoading(true);

    axios
      .post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', data)
      .then((res) => {
        setErr(null);
        toast.success(t('auth.forgotPasswordSuccess'));
        setIsLoading(false);
        if (res.data.statusMsg === 'success') {
          localStorage.setItem('email', data.email);
          navigate('verifyCode');
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setErr(err.response?.data?.message || t('auth.forgotPasswordError'));
      });
  }

  const validate = Yup.object({
    email: Yup.string()
      .required(t('auth.validations.emailRequired'))
      .email(t('auth.validations.emailInvalid')),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: handleForgotPassword,
    validationSchema: validate,
  });

  return (
    <>
      <Helmet>
        <title>{t('auth.forgotPasswordTitle')}</title>
      </Helmet>

      <section className="px-4 py-10 md:px-6">
        <div className="mx-auto max-w-md rounded-[2rem] bg-white px-6 py-8 shadow-[0_20px_70px_rgba(15,23,42,0.08)] ring-1 ring-gray-100 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            {t('auth.forgotPasswordTitle')}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {t('auth.forgotPasswordSubtitle')}
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
                type="email"
                name="email"
                id="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={inputClassName}
                placeholder={t('auth.emailPlaceholder')}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="mt-2 text-sm text-red-600">
                  {formik.errors.email}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading
                ? t('auth.forgotPasswordLoading')
                : t('auth.forgotPasswordButton')}
            </button>
          </form>

          <Link
            to="/login"
            className="mt-6 block text-sm font-medium text-green-700 underline underline-offset-4"
          >
            {t('auth.loginLink')}
          </Link>
        </div>
      </section>
    </>
  );
}
