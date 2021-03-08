import { configureStore } from '@reduxjs/toolkit';
import repository from '../features/repository/repositorySlice';

export default configureStore({
  reducer: {
    repository
  },
});
