const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon');

router.post('/validate', async (req, res) => {
    try {
        const { code, cartTotal } = req.body;
        
        const coupon = await Coupon.findOne({ 
            code: code.toUpperCase(),
            isActive: true,
            expiryDate: { $gt: new Date() }
        });

        if (!coupon) {
            return res.status(404).json({ 
                message: 'Invalid or expired coupon code' 
            });
        }

        let discountAmount = 0;
        if (coupon.discountType === 'percentage') {
            discountAmount = (cartTotal * coupon.discountValue) / 100;
            if (coupon.maxDiscount) {
                discountAmount = Math.min(discountAmount, coupon.maxDiscount);
            }
        } else {
            discountAmount = Math.min(coupon.discountValue, cartTotal);
        }

        res.json({
            coupon,
            discountAmount: Math.round(discountAmount)
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error validating coupon' 
        });
    }
});

module.exports = router;