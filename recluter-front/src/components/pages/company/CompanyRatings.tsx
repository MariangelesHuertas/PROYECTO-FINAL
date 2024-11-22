import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import ChartDonut from '../../chartDonut/ChartDonut';
import LegendGroup from '../../legendGroup/LegendGroup';
import RatingBlue from '../../rating/RatingBlue';
import { GetCompanyRatingStatsAction, GetCompanyRatingsReducer } from '../../../redux/actions/pages/company/rating/GetRatingCompany';
import { AppDispatch, RootState } from '../../../redux/store/store';
import { ValoracionStatsDto } from '../../../constants/pages/company/rating/GetRatingCompany';

interface CompanyRatingsProps {
  empresaId: number;
  totalRatings: number;
  rating: number;
  labels: string[];
  recommendPercentage: number;
  recruiterScore: number;
}

const CompanyRatings: React.FC<CompanyRatingsProps> = ({
  empresaId,
  totalRatings,
  rating,
  labels,
  recommendPercentage,
  recruiterScore
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { rex_ratingStats, rex_promedioStats, rex_loadingStats } = useSelector((state: RootState) => state.valoraciones);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [donutData, setDonutData] = useState<{ name: string; value: number }[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    dispatch(GetCompanyRatingStatsAction(empresaId));
  }, [dispatch, empresaId]);

  useEffect(() => {
    if (rex_ratingStats) {
      updateDonutData(rex_ratingStats);
    }
  }, [rex_ratingStats, selectedRatings]);

  const updateDonutData = (stats: ValoracionStatsDto[]) => {
    let filteredStats = stats;
    if (selectedRatings.length > 0) {
      filteredStats = stats.filter(stat => selectedRatings.includes(stat.valoracion.toString()));
    }

    const newDonutData = filteredStats.map(stat => ({
      name: `${stat.valoracion} estrellas`,
      value: stat.porcentaje
    }));

    setDonutData(newDonutData);
    setTotalUsers(filteredStats.reduce((sum, stat) => sum + stat.cantidadUsuarios, 0));
  };

  const handleRatingSelection = (checkedValues: string[]) => {
    setSelectedRatings(checkedValues);
  };

  const options = rex_ratingStats?.map(stat => ({
    label: stat.valoracion.toString(),
    value: stat.valoracion.toString(),
    color: '#0778B1',
    size: '14px',
    fontWeight: 'bold'
  })) || [];

  const recommendData = [
    { name: 'Recomienda', value: recommendPercentage },
    { name: 'No Recomienda', value: 100 - recommendPercentage },
  ];

  const recruiterScoreData = [
    { name: 'Alta Nota', value: recruiterScore },
    { name: 'Baja Nota', value: 100 - recruiterScore },
  ];

  return (
    <div className="border border-blue3 bg-blue5 rounded-lg pt-[26px] pl-[32px] pb-[26px]">
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12} className="flex">
          <div className="flex items-center">
            <div>
              <h3 className="text-lg text-blue3 ml-1 mb-[-32px] text-left font-bold">
                Valoraciones
              </h3>
              <div className="flex justify-left items-center -ml-6 mt-4">
                <ChartDonut
                  data={donutData}
                  width={200}
                  height={200}
                  innerRadius={60}
                  outerRadius={75}
                  paddingAngle={1}
                  styleType="default"
                  text={totalUsers.toString()}
                  label="Valoraciones"
                  sections={5}
                  showContainer={false}
                />
              </div>
            </div>
            <div className="ml-4 mt-2 mr-[-40px] flex flex-col items-start">
            <Row gutter={[16, 16]}>
                <Col span={12}>
                  <LegendGroup
                    options={options}
                    defaultCheckedList={[]}
                    onChange={handleRatingSelection}
                  />
                </Col>
              </Row>
            </div>
          </div>
        </Col>

        <Col xs={24} md={12} className="flex flex-col items-start">
          <div className="flex items-center mb-4">
            <span className="text-xl font-bold ml-8 mb-4 mr-4">{rex_promedioStats.toFixed(1)}</span>
            <div className='mt-[-20px]'>
              <RatingBlue
                filledStars={rex_promedioStats}
                showRatingValue={false}
                filledStarSize={{ width: '20px', height: '20px', marginRight: '2px', marginTop: '2px' }}
                emptyStarSize={{ width: '24px', height: '24px', marginLeft: '-2px' }}
              />
            </div>
          </div>
          <div className="flex items-center mt-[-40px] mb-[-16px] ml-4">
            <ChartDonut
              data={recommendData}
              width={100}
              height={100}
              innerRadius={15}
              outerRadius={28}
              paddingAngle={1}
              styleType="default"
              text=""
              label=""
              sections={2}
              showContainer={false}
            />
            <div className="-ml-2 text-left flex items-center">
              <span className="font-medium text-lg mr-2">{recommendPercentage}%</span>
              <span className="text-sm text-black opacity-70">Recomienda<br />trabajar aquí</span>
            </div>
          </div>
          <div className="flex items-center ml-4">
            <ChartDonut
              data={recruiterScoreData}
              width={100}
              height={100}
              innerRadius={15}
              outerRadius={28}
              paddingAngle={1}
              styleType="default"
              text=""
              label=""
              sections={2}
              showContainer={false}
            />
            <div className="-ml-2 text-left flex items-center">
              <span className="font-medium text-lg mr-2">{recruiterScore}%</span>
              <span className="text-sm text-black opacity-70">Nota del<br />reclutador</span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CompanyRatings;