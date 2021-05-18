import { Formik, Form, Field } from 'formik';
import MyButton from '../components/MyButton/MyButton';
import { createUseStyles } from 'react-jss';
import { TextField } from 'formik-material-ui';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import operation from '../redux/operation';
import authSelectors from '../redux/selectors';

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
    backgroundColor: '#3f51b5',
    color: '#fff',
    marginTop: 10,
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

const LoginPage = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const users = useSelector(authSelectors.getUsers);
  const st = useStyles();
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        return setName(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  const resetForm = () => {
    setName('');
    setPassword('');
  };

  const handleSubmiting = e => {
    e.preventDefault();
    const userEmail = (Iname, pass) => {
      return users.find(
        ({ name, password }) => name === Iname && password === pass,
      );
    };

    if (name === '' && password === '') {
      return alert('Enter data please');
    } else if (userEmail(name, password)) {
      const currentName = name;
      const currentUser = users.find(user => user.name === currentName);
      dispatch(operation.signIn(currentUser));
      resetForm();
    } else {
      resetForm();
      return alert('user not exist');
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
            type="password"
            name="password"
            label="Password"
            variant="outlined"
            margin="dense"
            value={password}
          />
          <MyButton className={st.btn} value="Sing In" />
        </Form>
      </Formik>
    </div>
  );
};

export default LoginPage;
