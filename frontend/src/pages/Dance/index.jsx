import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchDance, fetchPosts, fetchTags} from '../../redux/slices/posts';
import Grid from "@mui/material/Grid";
import {Post} from "../../components";
export const Dance = () => {
  const dispatchD = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  React.useEffect(() => {
    dispatchD(fetchDance());
    dispatchD(fetchTags());
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
                createdAt={obj.createdAt}
                text={obj.text}
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