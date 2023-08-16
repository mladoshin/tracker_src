import React, { useMemo, useState } from 'react';
import Datepicker from 'tailwind-datepicker-react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
interface IDatePicker {
  onChange: (date: Date) => void;
  title: string;
}

function DatePicker({ onChange, title }: IDatePicker) {
  const [show, setShow] = useState<boolean>(false);

  const handleClose = (state: boolean) => {
    setShow(state);
  };

  const options = useMemo(
    () => ({
      title,
      autoHide: true,
      todayBtn: true,
      todayBtnText: 'Сегодня',
      clearBtnText: 'Очистить',
      clearBtn: true,
      maxDate: new Date('2030-01-01'),
      minDate: new Date('1950-01-01'),
      theme: {
        background: '',
        todayBtn: '',
        clearBtn: '',
        icons: '',
        text: '',
        disabledText: '',
        input: '',
        inputIcon: '',
        selected: '',
      },
      icons: {
        // () => ReactElement | JSX.Element
        prev: () => <BsChevronLeft />,
        next: () => <BsChevronRight />
      },
      datepickerClassNames: 'top-12',
      language: 'ru',
    }),
    [],
  );

  return (
    <div>
      <Datepicker
        options={options}
        onChange={onChange}
        show={show}
        setShow={handleClose}
      />
    </div>
  );
}

export default DatePicker;
