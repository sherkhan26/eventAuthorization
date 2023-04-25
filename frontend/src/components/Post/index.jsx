import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ReactPlayer from 'react-player';

import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { fetchRemovePost } from '../../redux/slices/posts';

export const Post = ({
  id,
  title,
  createdAt,
  imageUrl,
  imgUrl,
  age,
  user,
  viewsCount,
  text,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();
  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = () => {
    if (window.confirm('Вы действительно хотите удалить?')) {
      dispatch(fetchRemovePost(id));
    }
  };

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {
        isFullPost ?
          <ReactPlayer
            url={`${imageUrl}`}
            width='100%'
            height='100%'
            controls
          />
          :
          <img
            className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
            src={imgUrl}
            alt={title}
        />
      }
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h3 className={styles.title}>Ф.И.О. участника: <span className={styles.span}>{title}</span></h3>
          <h3 className={styles.title}>Возраст: <span className={styles.span}>{age}</span></h3>
          <ul className={styles.tags}>
            {tags.map((name) => (
              <li key={name}>
                {/*<Link to={`/tag/${name}`}>#{name}</Link>*/}
                <h3 className={styles.title}>Направление таланта: <span className={styles.span}>{name}</span></h3>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <h3 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? '' : <Link to={`/posts/${id}`}>Посмотреть видео участника</Link>}
          </h3>
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            {/*<li>*/}
            {/*  <CommentIcon />*/}
            {/*  <span>{commentsCount}</span>*/}
            {/*</li>*/}
          </ul>
        </div>
      </div>
    </div>
  );
};
