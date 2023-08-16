import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../api/api_index';
import { useTypedDispatch } from '../../redux/hooks';
import { IUser, setUser } from '../../redux/auth/slice';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';

function SignInView() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const dispatch = useTypedDispatch();
  const handleSubmit = async () => {
    try {
      const res = await login({ email: email, pass: pass }).unwrap();

      dispatch(
        setUser({
          name: res.user.name as string,
          email: res.user.email,
          id: res.user.id,
        }),
      );
      await localStorage.setItem('access_token', res.access_token);
      navigate('/account/');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Вход в аккаунт
            </h1>
            <form className="flex max-w-md flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email1" value="Ваш email" />
                </div>
                <TextInput
                  id="email1"
                  placeholder="Email"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password1" value="Пароль" />
                </div>
                <TextInput
                  id="password1"
                  required
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Запомнить меня</Label>
              </div>

              <Button
                type="submit"
                className="bg-primary-600"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}>
                Войти
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Еще нет аккаунта?{' '}
                <Link
                  to="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Зарегистрироваться
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignInView;
