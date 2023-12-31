import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import useControlledValue from "../../libs/hooks/useControlledValue";
import CalendarBody from "./CalendarBody";
import CalendarHeader from "./CalendarHeader";
import CalendarFooter from "./CalendarFooter";

export type DateCellType = "day" | "week" | "month" | "year";
interface CalendarProps {
  onChange?: (date: Date, type: DateCellType) => void;
  defaultValue?: Date;
  value?: Date;
  type?: DateCellType;
  calendarDataList?: Array<any>;
  onDoubleClickDate?: (date: Date) => void;
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
  onDoubleClickDate: () => {},
  calendarDataList: [],
});

const Calendar: FC<CalendarProps> = ({
  defaultValue: defaultValueProp, // api (Runtime)
  value: valueProp,
  onChange,
  onDoubleClickDate,
  calendarDataList,
  type: typeProp = "day",
}) => {
  const [type, setType] = useState(typeProp);
  const [value, setValue] = useControlledValue(valueProp, defaultValueProp);

  const onClickDate = useCallback(
    (date: Date) => {
      setValue(date);
      onChange?.(date, type);
    },
    [onChange, setValue, type]
  );

  const contextValue = {
    value,
    calendarDataList,
    setValue,
    onChange,
    onClickDate,
    onDoubleClickDate,
    type,
    setType,
  };

  return (
    <div className={"calendar-wrapper"}>
      <CalendarContext.Provider value={contextValue}>
        <CalendarHeader />
        <CalendarBody />
        <CalendarFooter />
      </CalendarContext.Provider>
    </div>
  );
};
export default Calendar;
