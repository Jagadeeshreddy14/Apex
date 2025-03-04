// frontend/src/features/checkout/CheckoutApi.jsx
import { axiosi } from '../../config/axios';

export const validateCoupon = async (data) => {
    try {
        const res = await axiosi.post('coupons/validate', data);
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};