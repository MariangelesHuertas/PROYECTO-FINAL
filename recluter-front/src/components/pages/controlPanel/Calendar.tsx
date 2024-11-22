import React from 'react';
import "tailwindcss/tailwind.css";
import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn';
import { Calendar, Col, Radio, Row, Select, theme, Typography, Badge } from 'antd';
import type { CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';
import dayLocaleData from 'dayjs/plugin/localeData';
import { Moment } from 'moment';
import '../../../styles/components/calendar/Calendar.css'
import IconR from '../../../assets/icons/r.svg'
import IconL from '../../../assets/icons/l.svg'

dayjs.extend(dayLocaleData);
interface Event {
  type: 'success' | 'warning' | 'error';
  content: string;
}

const events: Record<string, Event[]> = {
  // '2024-10-20': [{ type: 'success', content: 'Evento 1' }],
  // '2024-10-21': [{ type: 'warning', content: 'Evento 2' }],
};

const Agenda: React.FC = () => {

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  const dateCellRender = (value: any) => {
    const formattedDate = value.format('YYYY-MM-DD');
    const listData = events[formattedDate] || [];
    const isToday = value.isSame(new Date(), 'day'); // Verifica si es el día actual

    return (
      <div className={`ant-picker-cell-inner ${isToday ? 'today' : ''}`}>
        <ul className="events">
          {listData.map((item, index) => (
            <li key={index}>
              <Badge status={item.type} text={item.content} />
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <Row>
      <Col xxl={24} xl={24}>
        <div style={{ padding: 16 }}>
          <Calendar
            fullscreen={false}
            dateCellRender={dateCellRender}
            headerRender={({ value, type, onChange, onTypeChange }) => {
              const start = 0;
              const end = 12;
              const monthOptions = [];

              let current = value.clone();
              const localeData = value.localeData();
              const months = [];
              for (let i = 0; i < 12; i++) {
                current = current.month(i);
                months.push(localeData.monthsShort(current));
              }

              for (let i = start; i < end; i++) {
                monthOptions.push(
                  <Select.Option key={i} value={i} className="month-item">
                    {months[i]}
                  </Select.Option>,
                );
              }

              const year = value.year();
              const month = value.month();
              const options = [];
              for (let i = year - 10; i < year + 10; i += 1) {
                options.push(
                  <Select.Option key={i} value={i} className="year-item">
                    {i}
                  </Select.Option>,
                );
              }

              return (
                <div style={{ padding: 8 }}>
                  <Row gutter={8}>
                    <Col xxl={8} xl={8}>
                      <div
                        // Retroceder 1 mes
                        onClick={() => {
                          const prevMonth = value.clone().subtract(1, 'month');
                          onChange(prevMonth);
                        }}
                        style={{
                          border: '1px solid #E1E1E2',
                          borderRadius: '15px',
                          width: '38px',
                          height: '38px',
                          placeContent: 'center',
                          display: 'flex',
                          cursor: 'pointer'
                        }}
                      >
                        <img
                          src={IconL}
                          style={{ width: '9px' }}
                        />
                      </div>
                    </Col>
                    <Col xxl={8} xl={8}>
                      <div
                        style={{
                          color: '#006497',
                          fontFamily: 'Inter',
                          fontSize: '16px',
                          fontWeight: 'medium',
                          textAlign: 'center'
                        }}
                      >
                        {`${value.format('D')} de ${months[month]}, ${year}`}
                      </div>
                    </Col>
                    <Col 
                      xxl={8} xl={8}
                      id="IconRight-Calendar"
                    >
                      <div
                        // Adelantar 1 mes
                        onClick={() => {
                          const nextMonth = value.clone().add(1, 'month');
                          onChange(nextMonth);
                        }}
                        style={{
                          border: '1px solid #E1E1E2',
                          borderRadius: '15px',
                          width: '38px',
                          height: '38px',
                          placeContent: 'center',
                          display: 'flex',
                          cursor: 'pointer'
                        }}
                      >
                        <img
                          src={IconR}
                          style={{ width: '9px' }}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
              );
            }}
            onPanelChange={(date, mode) => {
              console.log(date.format('YYYY-MM-DD'), mode);
            }}
          />
        </div>
      </Col>
    </Row>

  );
};

export default Agenda;
