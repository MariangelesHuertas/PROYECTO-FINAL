import React from 'react';
import { Card } from 'antd';
import Rating from '../../components/rating/Rating';

const ratings = [5, 4, 3, 2, 1, 0];

const RatingExample: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <Card className="w-full p-4">
        <div className="flex flex-col md:flex-row justify-around items-start md:space-x-15">
          {/* Primera sección */}
          <div className="flex flex-col items-start">
            {ratings.map((value) => (
              <div className="my-2" key={value}>
                <Rating value={value} size={24} />
              </div>
            ))}
          </div>

          {/* Segunda sección */}
          <div className="flex flex-col items-start">
            {ratings.map((value) => (
              <div className="my-2" key={value}>
                <Rating value={value} size={28} />
              </div>
            ))}
          </div>

          {/* Tercera sección */}
          <div className="flex flex-col items-start">
            {ratings.map((value) => (
              <div className="my-2" key={value}>
                <Rating value={value} size={32} />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RatingExample;
