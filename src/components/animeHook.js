import React, {useEffect, useRef} from 'react'

export const useAnimationFrame = callback => {
 
    const requestRef = useRef();
    const previousTimeRef = React.useRef();
    
    const animate = time => {
      if (previousTimeRef.current != undefined) {
          const deltaTime = time - previousTimeRef.current;
          callback(deltaTime)
      }
      // Setimout to control speed
      setTimeout(() => { 
      previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
        
      }, 2000 /5)
    }
    
    useEffect(() => {
      requestRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(requestRef.current);
    }, []); // Make sure the effect runs only once
  }