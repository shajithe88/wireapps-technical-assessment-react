import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from '../../services/productService';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (categoryName) => {
        const response = await productService.getProducts(categoryName);
        return response.data;
    }
);

export const fetchFlashProducts = createAsyncThunk(
    'products/fetchFlashProducts',
    async (categoryName) => {
        const response = await productService.getFlashProducts();
        console.log("response.data",response.data)
        return response.data;
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState: {
        flashItems:[],
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchFlashProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFlashProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.flashItems = action.payload;
            })
            .addCase(fetchFlashProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default productSlice.reducer;
