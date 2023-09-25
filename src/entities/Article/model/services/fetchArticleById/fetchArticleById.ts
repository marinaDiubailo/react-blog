import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from '../../types/article';

export const fetchArticleById = createAsyncThunk<
    Article,
    string | undefined,
    ThunkConfig<string>
>('article/fetchArticleById', async (articleId, thunkApi) => {
    const { rejectWithValue, extra } = thunkApi;

    if (!articleId) throw new Error('');

    try {
        const response = await extra.api.get<Article>(`/articles/${articleId}`);
        if (!response.data) throw new Error();
        return response.data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return rejectWithValue('error');
    }
});