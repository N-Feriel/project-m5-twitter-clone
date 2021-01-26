import React, {useState} from 'react';

import { useSpring, animated } from "react-spring";




const AnimationLoad = ({children}) => {

    const [resetOrbit, setResetOrbit] = useState(false)

    const style = useSpring({

        position: "absolute",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        from: {
            transform: "rotate(0deg)" ,
            transformOrigin: '0 0',
            color:'blue',
        },

        to: {
            transform: "rotateX(360deg)",
            transformOrigin: '0 0',
            color:'red',
        },
        onRest: ()=> setResetOrbit(state => !state),
        reset: resetOrbit
    
    });

    return (<animated.div style={style}>
        {children}
    </animated.div>  );
}

export default AnimationLoad;