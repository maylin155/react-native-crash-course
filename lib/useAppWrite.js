import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

const useAppWrite = (fn) => {
  const [data, setData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Move fetchData outside of useEffect so it can be accessed by refetch
  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fn();
      setData(response);

    } catch (error) {
      Alert.alert('Error', error.message);

    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Call fetchData when component mounts
  }, []); // Dependency array is empty, so this runs only once

  const refetch = () => fetchData(); // refetch now calls fetchData

  return { data, isLoading, refetch };
};

export default useAppWrite;
