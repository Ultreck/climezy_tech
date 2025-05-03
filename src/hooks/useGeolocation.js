import { useEffect } from "react";

export const useGeolocation = (onSuccess) => {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        onSuccess({ latitude, longitude });
      });
    }
  }, []);
};