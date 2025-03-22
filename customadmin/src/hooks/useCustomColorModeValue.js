const useCustomColorModeValue = (lightValue, darkValue) => {
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDark ? darkValue : lightValue;
  };
  
  export default useCustomColorModeValue;
  