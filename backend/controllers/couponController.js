const Coupon = require('../models/Coupon');

exports.validateCoupon = async (req, res) => {
    try {
        const { code, cartTotal } = req.body;
        
        const coupon = await Coupon.findOne({ 
            code: code.toUpperCase(),
            isActive: true,
            expiryDate: { $gt: new Date() }
        });

        if (!coupon) {
            return res.status(404).json({ 
                success: false,
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

        res.status(200).json({
            success: true,
            coupon,
            discountAmount: Math.round(discountAmount)
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Error validating coupon' 
        });
    }
};