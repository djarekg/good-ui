import { CircularProgress } from '@mui/material';

const Loader = () => {
  return (
    <div style={{ display: 'grid', placeContent: 'center', width: '100%', height: '100%' }}>
      <CircularProgress color='primary' size={90} />
    </div>
  );
};

export default Loader;
