const FranceFlag = ({ size = '26px' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 900 600'
      width={size}
      height={`calc(${size} / 1.9)`}
      preserveAspectRatio='xMidYMid meet'
    >
      <rect width='900' height='600' fill='#ED2939' />
      <rect width='600' height='600' fill='#fff' />
      <rect width='300' height='600' fill='#002395' />
    </svg>
  );
};

export default FranceFlag;
