import React, { useState, useEffect } from "react";
import ToggleSwitch from "../../toggleSwitch/ToggleSwitch";
import dayjs, { Dayjs } from "dayjs";
import CustomDatePicker from "../../../components/pages/myPortal/Date";

interface SwitchOptionsProps {
  visible: boolean;
  onClose: () => void;
  defaultWorking?: boolean;
  initialStartDate?: string | null;
  initialEndDate?: string | null;
  onStartDateChange: (date: string | null) => void;
  onEndDateChange: (date: string | null) => void;
  onCurrentlyWorkingChange: (isWorking: boolean) => void;
  titleText?: string;
}

const SwitchOptions: React.FC<SwitchOptionsProps> = ({
  visible,
  onClose,
  defaultWorking = false,
  initialStartDate = null,
  initialEndDate = null,
  onStartDateChange,
  onEndDateChange,
  onCurrentlyWorkingChange,
  titleText="¿Sigues trabajando aquí?"
}) => {
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(defaultWorking);
  const [startDate, setStartDate] = useState<Dayjs | null>(initialStartDate ? dayjs(initialStartDate) : null);
  const [endDate, setEndDate] = useState<Dayjs | null>(initialEndDate ? dayjs(initialEndDate) : null);

  useEffect(() => {
    setStartDate(initialStartDate ? dayjs(initialStartDate) : null);
    setEndDate(initialEndDate ? dayjs(initialEndDate) : null);
    setIsCurrentlyWorking(defaultWorking);
  }, [initialStartDate, initialEndDate, defaultWorking]);


  const handleStartDateChange = (date: Dayjs | null) => {
    if (date) {
      const formattedDate = date.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
      setStartDate(date);
      onStartDateChange(formattedDate);
      if (isCurrentlyWorking) {
        onEndDateChange(formattedDate);
      }
    }
  };

  const handleEndDateChange = (date: Dayjs | null) => {
    if (date && !isCurrentlyWorking) {
      const formattedDate = date.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
      setEndDate(date);
      onEndDateChange(formattedDate);
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="mb-3 text-body-md font-normal text-gray-800">
            {titleText}
          </h2>
          <ToggleSwitch
            defaultChecked={isCurrentlyWorking}
            size="small"
            customClass="switch-small-1"
            onChange={() => {
              const newWorkingStatus = !isCurrentlyWorking;
              setIsCurrentlyWorking(newWorkingStatus);
              onCurrentlyWorkingChange(newWorkingStatus);
              if (newWorkingStatus) {
                setEndDate(null);
                onEndDateChange(null);
              }
            }}
          />
        </div>

        {isCurrentlyWorking ? (
          <div className="flex items-center justify-between space-x-[80px]">
            <CustomDatePicker
              useInput={true}
              onChange={(date) => handleStartDateChange(date)}
              value={startDate ? dayjs(startDate) : null}
              placeholder="Desde"
            />
          </div>
        ) : (
          <div className="flex items-center justify-between space-x-[20px]">
            <CustomDatePicker
              useInput={false}
              onChange={(date) => handleStartDateChange(date)}
              value={startDate ? dayjs(startDate) : null}
              placeholder="Fecha de inicio"
            />
            <CustomDatePicker
              useInput={false}
              onChange={(date) => handleEndDateChange(date)}
              value={endDate ? dayjs(endDate) : null}
              placeholder="Fecha de fin"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default SwitchOptions;