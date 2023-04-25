import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../redux/slices/posts';

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center">
          {(isPostsLoading ?
            [...Array(5)] :
            posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                item xs={6}
                md={6}
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}` : ''}
                imgUrl={obj.imgUrl ? `${process.env.REACT_APP_API_URL}${obj.imgUrl}` : ''}
                age={obj.age}
                user={obj.user}
                text={obj.text}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
                key={index}
              />
            ),
          )}
      </Grid>
    </>
  );
};
