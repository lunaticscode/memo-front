import { useCallback, useRef, useState } from "react";

const useControlledValue = <T = any>(
  controlledValue: T,
  defaultValue: T
): [T, (value: T) => void] => {
  const [uncontrolledValue, setUncontrolledValue] = useState<T>(defaultValue);
  const { current: isControlled } = useRef<T>(controlledValue);
  const value = isControlled ?? null ? controlledValue : uncontrolledValue;

  const setValue = useCallback(
    (newValue: T) => {
      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
    },
    [isControlled]
  );

  return [value, setValue];
};
export default useControlledValue;
