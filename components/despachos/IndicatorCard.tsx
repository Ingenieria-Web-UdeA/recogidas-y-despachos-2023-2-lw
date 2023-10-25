interface IndicatorCardProps {
  title: string;
  value: number | string;
}

const IndicatorCard = ({ title, value }: IndicatorCardProps) => {
  return (
    <div className='flex flex-col items-center bg-gray-100 p-4 rounded-xl shadow-md w-72 gap-3'>
      <h4 className='text-gray-700 tracking-wider'>{title}</h4>
      <h2 className='text-indigo-500 tracking-wide'>{value}</h2>
    </div>
  );
};

export { IndicatorCard };
