import {useLayoutEffect, useState} from 'react'

const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useLayoutEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    },[])

    return {
        width,
        isMobile: width <= 768,
        isTablet: width > 768 && width < 1280,
        isDesktop: width >= 1280
    };
}

export default useWindowWidth;