import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import MobileStepper from '@mui/material/MobileStepper';
import { Box, useTheme } from '@mui/material';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';

export const ProductBanner = ({ images }) => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = images.length;

    const handleSlideChange = (swiper) => {
        setActiveStep(swiper.activeIndex);
    };

    return (
        <div style={{ 
            width: '100%', 
            height: '100%',
            position: 'relative',
            paddingBottom: theme.spacing(4) // Space for stepper
        }}>
            <Swiper
                modules={[Autoplay]}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                onSlideChange={handleSlideChange}
                loop={true}
                speed={800}
                spaceBetween={0}
                slidesPerView={1}
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: theme.shape.borderRadius,
                }}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <Box
                            component="img"
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                display: 'block',
                                aspectRatio: '16/9',
                            }}
                            src={image}
                            alt={`Product Image ${index + 1}`}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom styled MobileStepper */}
            <MobileStepper
                variant="dots"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(4px)',
                    borderRadius: theme.shape.borderRadius,
                    p: 1,
                    '& .MuiMobileStepper-dot': {
                        width: 10,
                        height: 10,
                        backgroundColor: theme.palette.grey[400],
                        margin: '0 4px',
                    },
                    '& .MuiMobileStepper-dotActive': {
                        backgroundColor: theme.palette.primary.main,
                    }
                }}
            />
        </div>
    );
};