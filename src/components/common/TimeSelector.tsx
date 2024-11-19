import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

interface TimeSelectorProps {
    initOpenTime: Dayjs;
    initCloseTime: Dayjs;
    setOpenTime: (time: Dayjs) => void;
    setCloseTime: (time: Dayjs) => void;
}

export default function TimeSelector({initOpenTime,initCloseTime, setOpenTime, setCloseTime }: TimeSelectorProps) {
    return (
        <div className='flex space-x-4'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileTimePicker
                    label="Open Time"
                    value={initOpenTime}
                    onChange={(newValue) => {
                        console.log('Selected open time:', newValue);
                        if (newValue) {
                            setOpenTime(newValue);
                        }
                    }}
                />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileTimePicker
                    label="Close Time"
                    value={initCloseTime}
                    onChange={(newValue) => {
                        console.log('Selected close time:', newValue);
                        if (newValue) {
                            setCloseTime(newValue);
                        }
                    }}
                />
            </LocalizationProvider>
        </div>
    );
}
