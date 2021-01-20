import React from 'react';
import { useSpring, animated } from "react-spring";


const AnimateRetweet = ({children}) => {

    const style = useSpring({
        opacity: 1,
        position: "absolute",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        
        from: {
            opacity: 0,
            
        },

        config: {
            tension: 200,
            friction: 2,
        },
    });
    return (<animated.div style={style}>
        {children}
    </animated.div>  );
}

export default AnimateRetweet;