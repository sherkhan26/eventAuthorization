import React from 'react';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from '@mui/material/FormControl';

import 'easymde/dist/easymde.min.css';
import { selectIsAuth } from '../../redux/slices/auth';
import axios from '../../axios';
import styles from './AddPost.module.scss';
import ReactPlayer from 'react-player';

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

export const AddPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setLoading] = React.useState(false);
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const [imgUrl, setImgUrl] = React.useState('');
  const [age, setAge] = React.useState('');
  const inputFileRef = React.useRef(null);
  const inputImgRef = React.useRef(null);

  const isEditing = Boolean(id);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('video', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при загрузке файла!');
    }
  };

    const handleChangeImg = async (event) => {
        try {
            const formData = new FormData();
            const file = event.target.files[0];
            formData.append('image', file);
            const { data } = await axios.post('/uploadImg', formData);
            setImgUrl(data.url);
        } catch (err) {
            console.warn(err);
            alert('Ошибка при загрузке фото!');
        }
    };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onClickRemoveImg = () => {
      setImgUrl('');
  }

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true);

      const fields = {
        title,
        imageUrl,
        imgUrl,
        age,
        tags,
        text,
      };

      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields);

      const _id = isEditing ? id : data._id;

      navigate(`/posts/${_id}`);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при создании!');
    }
  };

  React.useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setText(data.text);
          setImageUrl(data.imageUrl);
          setImgUrl(data.imgUrl);
          setAge(data.age);
          setTags(data.tags.join(','));
        })
        .catch((err) => {
          console.warn(err);
          alert('Ошибка при получении!');
        });
    }
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button className={styles.video} onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить видео участника
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
        {imageUrl && (
          <>
            <Button variant="contained" color="error" onClick={onClickRemoveImage}>
              Удалить
            </Button>
            <ReactPlayer
              url={`${process.env.REACT_APP_API_URL}${imageUrl}`}
              width='100%'
              height='600px'
              controls
            />
          </>
        )}

      <Button onClick={() => inputImgRef.current.click()} variant="outlined" size="large">
        Загрузить фото участника
      </Button>
      <input ref={inputImgRef} type="file" onChange={handleChangeImg} hidden />

      {imgUrl && (
          <>
              <Button variant="contained" color="error" onClick={onClickRemoveImg}>
                  Удалить
              </Button>
              <img
                className={styles.image}
                src={`${process.env.REACT_APP_API_URL}${imgUrl}`}
                alt="Uploaded"
              />
          </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Полное имя участника"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <div className={styles.talentAge}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Возраст участника</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Возраст участника"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            MenuProps={MenuProps}
          >
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="6">6</MenuItem>
            <MenuItem value="7">7</MenuItem>
            <MenuItem value="8">8</MenuItem>
            <MenuItem value="9">9</MenuItem>
            <MenuItem value="10">10</MenuItem>
            <MenuItem value="11">11</MenuItem>
            <MenuItem value="12">12</MenuItem>
            <MenuItem value="13">13</MenuItem>
            <MenuItem value="14">14</MenuItem>
            <MenuItem value="15">15</MenuItem>
            <MenuItem value="16">16</MenuItem>
            <MenuItem value="17">17</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/*<select*/}
      {/*  value={tags}*/}
      {/*  onChange={(e) => setTags(e.target.value)}*/}
      {/*  placeholder="Вид таланта"*/}
      {/*>*/}
      {/*  <option value="Вокал (эстрада+классика)">Вокал (эстрада+классика)</option>*/}
      {/*  <option value="Танцы (все виды)">Танцы (все виды)</option>*/}
      {/*  <option value="Групповое выступление  (Ансамбль, дуэт, трио, квартет)">Групповое выступление  (Ансамбль, дуэт, трио, квартет)</option>*/}
      {/*  <option value="Инструментальное выступление (все виды инструменталки)">Инструментальное выступление (все виды инструменталки)</option>*/}
      {/*  <option value="Народное пение">Народное пение</option>*/}
      {/*</select>*/}

      <div className={styles.talentType}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Вид таланта</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Вид таланта"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          >
            <MenuItem value="Вокал (эстрада+классика)">Вокал (эстрада+классика)</MenuItem>
            <MenuItem value="Танцы (все виды)">Танцы (все виды)</MenuItem>
            <MenuItem value="Групповое выступление">Групповое выступление (Ансамбль, дуэт, трио, квартет)</MenuItem>
            <MenuItem value="Инструментальное выступление (все виды инструменталки)">Инструментальное выступление (все виды инструменталки)</MenuItem>
            <MenuItem value="Народное пение">Народное пение</MenuItem>
          </Select>
        </FormControl>
      </div>


      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? 'Сохранить' : 'Опубликовать'}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
