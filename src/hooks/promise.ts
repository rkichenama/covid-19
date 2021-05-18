import { useState, useEffect } from 'react';

const updateStateOnMount = (promise, setStatus) => useEffect(() => {
  Promise.resolve(promise).then(
    data => { setStatus({ isLoading: false, isError: false, data }); },
    isError => { setStatus({ isLoading: false, isError, data: undefined }); }
  );
}, []);
const updateStateOnPromise = (promise, setStatus, data) => useEffect(() => {
  setStatus({ data, isLoading: true, isError: false });
  Promise.resolve(promise).then(
    d => { setStatus({ isLoading: false, isError: false, data: d }); },
    isError => { setStatus({ isLoading: false, isError, data: undefined }); }
  );
}, [ promise ]);

export const usePromise = <T extends any>(promise: Promise<T>) => {
  const [ { isLoading, isError, data }, setStatus ] = useState({
    isLoading: true, isError: false as any,
    data: undefined as T
  });
  updateStateOnMount(promise, setStatus);
  return { isLoading, isError, data };
};

export const useReplaceablePromise = <T extends any>() => {
  const [ promise, replace ] = useState(Promise.resolve(undefined as T));
  const [ { isLoading, isError, data }, setStatus ] = useState({
    isLoading: false, isError: false as any,
    data: undefined as T
  });
  updateStateOnPromise(promise, setStatus, data);
  return { isLoading, isError, data, replace };
};
