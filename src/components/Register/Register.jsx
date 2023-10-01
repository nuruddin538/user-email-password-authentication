import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import auth from '../../firebase/firebase.config';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Register = () => {
  const [registerError, setRegisterError] = useState(' ');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleRegister = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;
    console.log(name, email, password, accepted);

    setRegisterError('');
    setSuccess('');

    if (password.length < 6) {
      setRegisterError('Password should be at least 6 characters or longer');
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError(
        'Your password should have at least one upper case characters'
      );
      return;
    } else if (!accepted) {
      setRegisterError('Please accept our terms and conditions!');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        console.log(result.user);
        setSuccess('User Created Successfully.');

        updateProfile(result.user, {
          displayName: name,
          photoURL: 'https://example.com/jane-q-user/profile.jpg',
        });
        .then(() =>
          console.log('profile updated')
        )
        .catch()

        sendEmailVerification(result.user).then(() => {
          alert('Please check your email and verify your account');
        });
      })
      .catch(error => {
        console.error(error);
        setRegisterError(error.message);
      });
  };
  return (
    <div className="mx-auto flex justify-center">
      <div className="mx-auto">
        <h2 className="text-3xl mb-5">Please Register</h2>
        <form onSubmit={handleRegister}>
          <input
            className="w-96 mb-4 px-5 py-3"
            type="email"
            name="email"
            placeholder="Email Address"
            required
          />
          <br />
          <input
            className="w-96 mb-4 px-5 py-3"
            type="text"
            name="name"
            placeholder="Your Name"
            required
          />
          <br />
          <div className="relative">
            <input
              className="w-96 px-5 py-3"
              type={showPassword ? 'text' : 'password'}
              name="password"
              id=""
              placeholder="Password"
            />
            <span
              className="absolute top-3 right-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
            </span>
            <br />
            <div className="mb-2">
              <input type="checkbox" name="terms" id="terms" />
              <label htmlFor="terms">
                Accept our <a href="#">Terms and Conditons</a>
              </label>
            </div>
            <br />
            <input
              className="w-96 btn btn-secondary mt-5"
              type="submit"
              value="Register"
            />
          </div>
        </form>
        {registerError && <p className="text-red-700">{registerError}</p>}
        {success && <p className="text-green-700">{success}</p>}
        <p>
          Already have an account? Please <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
