import { useState, useEffect, useRef } from 'react';

export default function useOutsideElement(ref) {
  const [IsOutsideElement, setIsOutsideElement] = useState();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOutsideElement(true);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return [IsOutsideElement];
}
