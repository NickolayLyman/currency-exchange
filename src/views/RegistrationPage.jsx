import { Formik, Form, Field } from 'formik';
import MyButton from '../components/MyButton/MyButton';
import { createUseStyles } from 'react-jss';
import { TextField } from 'formik-material-ui';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import operation from '../redux/operation';
import authSelectors from '../redux/selectors';
import shortid from 'shortid';

const useStyles = createUseStyles({
  container: {
    position: 'relative',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    color: 'black',
  },
  form: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 8,
    width: 300,
    fontSize: 16,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    borderRadius: 7,
    opacity: 0.8,
    backdropFilter: 'blur(100px)',
    border: '1px solid #3f51b5',
  },
  btn: {
    marginTop: 10,
    backgroundColor: '#3f51b5',
    color: '#fff',
    padding: 10,
    borderRadius: 7,
    fontWeight: 500,
    border: '1px solid #3f51b5',
    '&:hover': {
      color: '#3f51b5',
      backgroundColor: '#fff',
      border: '1px solid #3f51b5',
      fontWeight: 800,
    },
  },
});

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const users = useSelector(authSelectors.getUsers);
  const st = useStyles();
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        return setName(value);
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleSubmiting = e => {
    e.preventDefault();

    const userEmail = (mail, usName) => {
      return users.find(({ name, email }) => name === usName || email === mail);
    };

    if (name === '' && email === '' && password === '') {
      return alert('Enter data please');
    } else if (!userEmail(name, email)) {
      dispatch(
        operation.registration({
          name,
          email,
          password,
          id: shortid.generate(),
        }),
      );
      resetForm();
    } else {
      resetForm();
      console.log(name);
      return alert('User alredy exist');
    }
  };

  return (
    <div className={st.container}>
      <Formik>
        <Form className={st.form} autoComplete="off" onSubmit={handleSubmiting}>
          <Field
            onChange={handleChange}
            component={TextField}
            type="text"
            name="name"
            label="Login"
            variant="outlined"
            margin="dense"
            value={name}
          />
          <Field
            onChange={handleChange}
            component={TextField}
            type="email"
            name="email"
            label="Email"
            variant="outlined"
            margin="dense"
            value={email}
          />
          <Field
            onChange={handleChange}
            component={TextField}
            type="password"
            name="password"
            label="Password"
            variant="outlined"
            margin="dense"
            value={password}
          />
          <MyButton className={st.btn} value="Register" />
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrationPage;
