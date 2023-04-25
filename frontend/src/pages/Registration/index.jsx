import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import styles from './Login.module.scss';
import { fetchAuth, fetchRegister, selectIsAuth } from '../../redux/slices/auth';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      company: '',
      jobTitle: '',
      phone: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      return alert('Не удалось регистрироваться!');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Укажите полное имя' })}
          className={styles.field}
          label="Ф.И.О. родителя"
          fullWidth
        />
        {/*<TextField*/}
        {/*  error={Boolean(errors.company?.message)}*/}
        {/*  helperText={errors.company?.message}*/}
        {/*  {...register('company', { required: 'Укажите полное компания' })}*/}
        {/*  className={styles.field}*/}
        {/*  label="Компания"*/}
        {/*  fullWidth*/}
        {/*/>*/}

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Компания</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Компания"
            className={styles.field}
            {...register('company', { required: 'Укажите полное компания' })}
            MenuProps={MenuProps}
          >
            <MenuItem value="АО «СП Заречное»">АО «СП Заречное»</MenuItem>
            <MenuItem value="АО «Волковгеология»">АО «Волковгеология»</MenuItem>
            <MenuItem value="АО «СП «Акбастау»">АО «СП «Акбастау»</MenuItem>
            <MenuItem value="АО «Ульбинский металлургический завод»">АО «Ульбинский металлургический завод»</MenuItem>
            <MenuItem value="ТОО «KAP Technology»">ТОО «KAP Technology»</MenuItem>
            <MenuItem value="ТОО «CK3-U»">ТОО «CK3-U»</MenuItem>
            <MenuItem value="ТОО «СП «Буденовское»">ТОО «СП «Буденовское»</MenuItem>
            <MenuItem value="ТОО «СП «КАТКО»">ТОО «СП «КАТКО»</MenuItem>
            <MenuItem value="ТОО «Qorğan Security»">ТОО «Qorğan Security»</MenuItem>
            <MenuItem value="ТОО «АППАК»">ТОО «АППАК»</MenuItem>
            <MenuItem value="ТОО «Байкен-U»">ТОО «Байкен-U»</MenuItem>
            <MenuItem value="ТОО «Добывающее предприятие «ОРТАЛЫК»">ТОО «Добывающее предприятие «ОРТАЛЫК»</MenuItem>
            <MenuItem value="ТОО «Институт высоких технологий»">ТОО «Институт высоких технологий»</MenuItem>
            <MenuItem value="ТОО «Каратау»">ТОО «Каратау»</MenuItem>
            <MenuItem value="ТОО «Кызылкум»">ТОО «Кызылкум»</MenuItem>
            <MenuItem value="ТОО «Хорасан-U»">ТОО «Хорасан-U»</MenuItem>
            <MenuItem value="ТОО «РУ-6»">ТОО «РУ-6»</MenuItem>
            <MenuItem value="ТОО «Семизбай-U»">ТОО «Семизбай-U»</MenuItem>
            <MenuItem value="ТОО «СП «Инкай»">ТОО «СП «Инкай»</MenuItem>
            <MenuItem value="ТОО «СП «ЮГХК»">ТОО «СП «ЮГХК»</MenuItem>
            <MenuItem value="ТОО «KAP Logistics»">ТОО «KAP Logistics»</MenuItem>
            <MenuItem value="ТОО «Уранэнерго»">ТОО «Уранэнерго»</MenuItem>
          </Select>
        </FormControl>

        {/*<TextField*/}
        {/*  error={Boolean(errors.jobTitle?.message)}*/}
        {/*  helperText={errors.jobTitle?.message}*/}
        {/*  {...register('jobTitle', { required: 'Укажите должность' })}*/}
        {/*  className={styles.field}*/}
        {/*  label="Должность"*/}
        {/*  fullWidth*/}
        {/*/>*/}

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Должность</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Должность"
            className={styles.field}
            {...register('jobTitle', { required: 'Укажите должность' })}
          >
            <MenuItem value="Работник офиса">Работник офиса</MenuItem>
            <MenuItem value="Работник производства">Работник производства</MenuItem>
          </Select>
        </FormControl>

        <TextField
          error={Boolean(errors.phone?.message)}
          helperText={errors.phone?.message}
          {...register('phone', { required: 'Укажите полное телефон' })}
          className={styles.field}
          label="Мобильный номер родителя"
          fullWidth
        />
        <TextField
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register('email', { required: 'Укажите почту' })}
          className={styles.field}
          label="E-Mail Родителя"
          fullWidth
        />
        <TextField
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type="password"
          {...register('password', { required: 'Укажите пароль' })}
          className={styles.field}
          label="Пароль"
          fullWidth
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
