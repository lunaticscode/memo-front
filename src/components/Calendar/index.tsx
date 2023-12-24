import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import useControlledValue from "../../hooks/useControlledValue";
import CalendarBody from "./CalendarBody";
import CalendarNavigator from "./CalendarNavgiator";

export type DateCellType = "day" | "week" | "month" | "year";
interface CalendarProps {
  onChange?: (date?: Date) => void;
  defaultValue?: Date;
  value?: Date;
  type?: DateCellType;
}

interface CalendarContextProps extends CalendarProps {
  selectedDate?: Date;
  setType: Dispatch<SetStateAction<DateCellType>>;
  onClickDate: (date: Date) => void;
}

export const CalendarContext = createContext<CalendarContextProps>({
  onChange: () => {},
  defaultValue: undefined,
  value: undefined,
  type: undefined,
  setType: () => {},
  onClickDate: () => {},
});

const Calendar: FC<CalendarProps> = ({
  defaultValue: defaultValueProp,
  value: valueProp,
  onChange,
  type: typeProp = "day",
}) => {
  const [type, setType] = useState(typeProp);
  const [value, setValue] = useControlledValue(valueProp, defaultValueProp);

  const onClickDate = useCallback((date: Date) => {
    setValue(date);
    onChange?.(date);
  }, []);

  const contextValue = {
    value,
    setValue,
    onChange,
    onClickDate,
    type,
    setType,
  };

  return (
    <div className={"calendar-wrapper"}>
      <CalendarContext.Provider value={contextValue}>
        <CalendarNavigator />
        <CalendarBody />
      </CalendarContext.Provider>
    </div>
  );
};
export default Calendar;
