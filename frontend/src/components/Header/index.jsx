import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { logout, selectIsAuth } from '../../redux/slices/auth';
import {fetchNational} from "../../redux/slices/posts";
import MenuIcon from '@mui/icons-material/Menu';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const [age, setAge] = React.useState('');


  /*burger*/
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <div className={styles.mainLink}>
            <a className={styles.home} href="https://www.kazatomprom.kz/ru"></a>
            <a className={styles.kap} href="https://kaptechnology.kazatomprom.kz/ru"></a>
            <Link className={styles.logo} to="/">
              <Button variant="outlined">Главная</Button>
            </Link>
            <div className={styles.talentSelect}>
              <FormControl className={styles.formTalent} fullWidth size="small">
                <InputLabel className={styles.inputLabelTalent} id="demo-simple-select-label">Участники</InputLabel>
                <Select
                  SelectDisplayProps={{ style: { paddingTop: 6, paddingBottom: 7 } }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Участники"
                  value={age}
                  onChange={handleChange}
                  // className={styles.selectTalent}
                >
                  <MenuItem value="Все Участники">
                    <Link className={styles.menuItemLink} to="/posts">
                      Все Участники
                    </Link>
                  </MenuItem>
                  <MenuItem value="Вокал (эстрада+классика)">
                    <Link className={styles.menuItemLink} to="/voice">
                      Вокал (эстрада+классика)
                    </Link>
                  </MenuItem>
                  <MenuItem value="Танцы (все виды)">
                    <Link className={styles.menuItemLink} to="/dance">
                      Танцы (все виды)
                    </Link>
                  </MenuItem>
                  <MenuItem value="Групповое выступление">
                    <Link className={styles.menuItemLink} to="/group">
                      Групповое выступление
                    </Link>
                  </MenuItem>
                  <MenuItem value="Инструментальное выступление">
                    <Link className={styles.menuItemLink} to="/instrument">
                      Инструментальное выступление
                    </Link>
                  </MenuItem>
                  <MenuItem value="Народное пение">
                    <Link className={styles.menuItemLink} to="/national">
                      Народное пение
                    </Link>
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <Link className={styles.logo} to="/live">
              <Button variant="outlined">Трансляция</Button>
            </Link>
            <a href="https://instagram.com/kap_technology?igshid=MDM4ZDc5MmU=" className={styles.instagram}>
              <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path d="M14.5 0C18.3038 0 18.7784 0.0139999 20.2708 0.0839999C21.7618 0.154 22.7768 0.3878 23.67 0.735C24.594 1.0906 25.3724 1.5722 26.1508 2.3492C26.8627 3.04905 27.4135 3.89562 27.765 4.83C28.1108 5.7218 28.346 6.7382 28.416 8.2292C28.4818 9.7216 28.5 10.1962 28.5 14C28.5 17.8038 28.486 18.2784 28.416 19.7708C28.346 21.2618 28.1108 22.2768 27.765 23.17C27.4145 24.1049 26.8636 24.9517 26.1508 25.6508C25.4507 26.3624 24.6042 26.9133 23.67 27.265C22.7782 27.6108 21.7618 27.846 20.2708 27.916C18.7784 27.9818 18.3038 28 14.5 28C10.6962 28 10.2216 27.986 8.7292 27.916C7.2382 27.846 6.2232 27.6108 5.33 27.265C4.39526 26.9143 3.54854 26.3633 2.8492 25.6508C2.13717 24.9511 1.5863 24.1045 1.235 23.17C0.8878 22.2782 0.654 21.2618 0.584 19.7708C0.5182 18.2784 0.5 17.8038 0.5 14C0.5 10.1962 0.514 9.7216 0.584 8.2292C0.654 6.7368 0.8878 5.7232 1.235 4.83C1.58533 3.89505 2.13633 3.04825 2.8492 2.3492C3.54874 1.63692 4.3954 1.08602 5.33 0.735C6.2232 0.3878 7.2368 0.154 8.7292 0.0839999C10.2216 0.0181999 10.6962 0 14.5 0ZM14.5 7C12.6435 7 10.863 7.7375 9.55025 9.05025C8.2375 10.363 7.5 12.1435 7.5 14C7.5 15.8565 8.2375 17.637 9.55025 18.9497C10.863 20.2625 12.6435 21 14.5 21C16.3565 21 18.137 20.2625 19.4497 18.9497C20.7625 17.637 21.5 15.8565 21.5 14C21.5 12.1435 20.7625 10.363 19.4497 9.05025C18.137 7.7375 16.3565 7 14.5 7ZM23.6 6.65C23.6 6.18587 23.4156 5.74075 23.0874 5.41256C22.7593 5.08437 22.3141 4.9 21.85 4.9C21.3859 4.9 20.9408 5.08437 20.6126 5.41256C20.2844 5.74075 20.1 6.18587 20.1 6.65C20.1 7.11413 20.2844 7.55925 20.6126 7.88744C20.9408 8.21563 21.3859 8.4 21.85 8.4C22.3141 8.4 22.7593 8.21563 23.0874 7.88744C23.4156 7.55925 23.6 7.11413 23.6 6.65ZM14.5 9.8C15.6139 9.8 16.6822 10.2425 17.4698 11.0302C18.2575 11.8178 18.7 12.8861 18.7 14C18.7 15.1139 18.2575 16.1822 17.4698 16.9698C16.6822 17.7575 15.6139 18.2 14.5 18.2C13.3861 18.2 12.3178 17.7575 11.5302 16.9698C10.7425 16.1822 10.3 15.1139 10.3 14C10.3 12.8861 10.7425 11.8178 11.5302 11.0302C12.3178 10.2425 13.3861 9.8 14.5 9.8Z" fill="#f7a906"/>
                </g>
                {/*<defs>*/}
                {/*  <clipPath id="clip0_152_9972">*/}
                {/*    <rect width="28" height="28" fill="white" transform="translate(0.5)"/>*/}
                {/*  </clipPath>*/}
                {/*</defs>*/}
              </svg>
            </a>
            <a href="https://kaptechnology.kazatomprom.kz/ru" className={styles.web}>
              <svg fill="#f7a906" height="29" width="29" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 490 490">
                <path d="M245,0C109.69,0,0,109.69,0,245s109.69,245,245,245s245-109.69,245-245S380.31,0,245,0z M31.401,260.313h52.542
                c1.169,25.423,5.011,48.683,10.978,69.572H48.232C38.883,308.299,33.148,284.858,31.401,260.313z M320.58,229.688
                c-1.152-24.613-4.07-47.927-8.02-69.572h50.192c6.681,20.544,11.267,43.71,12.65,69.572H320.58z M206.38,329.885
                c-4.322-23.863-6.443-47.156-6.836-69.572h90.913c-0.392,22.416-2.514,45.709-6.837,69.572H206.38z M276.948,360.51
                c-7.18,27.563-17.573,55.66-31.951,83.818c-14.376-28.158-24.767-56.255-31.946-83.818H276.948z M199.961,229.688
                c1.213-24.754,4.343-48.08,8.499-69.572h73.08c4.157,21.492,7.286,44.818,8.5,69.572H199.961z M215.342,129.492
                c9.57-37.359,21.394-66.835,29.656-84.983c8.263,18.148,20.088,47.624,29.66,84.983H215.342z M306.07,129.492
                c-9.77-40.487-22.315-73.01-31.627-94.03c11.573,8.235,50.022,38.673,76.25,94.03H306.07z M215.553,35.46
                c-9.312,21.02-21.855,53.544-31.624,94.032h-44.628C165.532,74.13,203.984,43.692,215.553,35.46z M177.44,160.117
                c-3.95,21.645-6.867,44.959-8.019,69.572h-54.828c1.383-25.861,5.968-49.028,12.65-69.572H177.44z M83.976,229.688H31.401
                c1.747-24.545,7.481-47.984,16.83-69.572h46.902C89.122,181.002,85.204,204.246,83.976,229.688z M114.577,260.313h54.424
                c0.348,22.454,2.237,45.716,6.241,69.572h-47.983C120.521,309.288,115.92,286.115,114.577,260.313z M181.584,360.51
                c7.512,31.183,18.67,63.054,34.744,95.053c-10.847-7.766-50.278-38.782-77.013-95.053H181.584z M273.635,455.632
                c16.094-32.022,27.262-63.916,34.781-95.122h42.575C324.336,417.068,284.736,447.827,273.635,455.632z M314.759,329.885
                c4.005-23.856,5.894-47.118,6.241-69.572h54.434c-1.317,25.849-5.844,49.016-12.483,69.572H314.759z M406.051,260.313h52.548
                c-1.748,24.545-7.482,47.985-16.831,69.572h-46.694C401.041,308.996,404.882,285.736,406.051,260.313z M406.019,229.688
                c-1.228-25.443-5.146-48.686-11.157-69.572h46.908c9.35,21.587,15.083,45.026,16.83,69.572H406.019z M425.309,129.492h-41.242
                c-13.689-32.974-31.535-59.058-48.329-78.436C372.475,68.316,403.518,95.596,425.309,129.492z M154.252,51.06
                c-16.792,19.378-34.636,45.461-48.324,78.432H64.691C86.48,95.598,117.52,68.321,154.252,51.06z M64.692,360.51h40.987
                c13.482,32.637,31.076,58.634,47.752,78.034C117.059,421.262,86.318,394.148,64.692,360.51z M336.576,438.54
                c16.672-19.398,34.263-45.395,47.742-78.03h40.99C403.684,394.146,372.945,421.258,336.576,438.54z"/>
              </svg>
            </a>
          </div>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Добавить участника </Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>


          <Box className={styles.burger}>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}><MenuIcon /></Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose}>
              <Link to="/">
                <Button>Главная</Button>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/posts">
                <Button>Участники</Button>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/live">
                <Button>Трансляция</Button>
              </Link>
            </MenuItem>
            <Divider />
            <div>
              {isAuth ? (
                <>
                  <MenuItem onClick={handleClose}>
                    <Link to="/add-post">
                      <Button>Добавить участника</Button>
                    </Link>
                  </MenuItem>

                  <MenuItem onClick={handleClose}>
                    <Button onClick={onClickLogout} color="error">
                      Выйти
                    </Button>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={handleClose}>
                    <Link to="/login">
                      <Button>Войти</Button>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link to="/register">
                      <Button>Создать аккаунт</Button>
                    </Link>
                  </MenuItem>
                </>
              )}
            </div>

          </Menu>
        </div>
      </Container>
    </div>
  );
};
