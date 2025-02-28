import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper'; // Correct import for Swiper v9
import MobileStepper from '@mui/material/MobileStepper';
import { Box, useTheme } from '@mui/material';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';

export const ProductBanner = ({ images }) => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: { xs: '300px', sm: '400px', md: '500px' }, // Responsive height
                overflow: 'hidden',
                borderRadius: theme.shape.borderRadius,
                backgroundColor: theme.palette.grey[100], // Fallback background
            }}
        >
            <Swiper
                modules={[Autoplay]}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                onSlideChange={(swiper) => setActiveStep(swiper.activeIndex)}
                loop={true}
                speed={800}
                style={{
                    width: '100%',
                    height: '100%',
                }}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <Box
                            component="img"
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                            }}
                            src={image}
                            alt={`Product ${index + 1}`}
                            loading="lazy" // Lazy loading for better performance
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* MobileStepper with better positioning and styling */}
            <MobileStepper
                variant="dots"
                steps={images.length}
                position="static"
                activeStep={activeStep}
                sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(4px)',
                    borderRadius: 4,
                    p: 1,
                    '& .MuiMobileStepper-dot': {
                        width: 10,
                        height: 10,
                        backgroundColor: theme.palette.grey[400],
                        margin: '0 4px',
                        transition: 'all 0.3s ease',
                    },
                    '& .MuiMobileStepper-dotActive': {
                        backgroundColor: theme.palette.primary.main,
                        transform: 'scale(1.2)',
                    }
                }}
            />
        </Box>
    );
};