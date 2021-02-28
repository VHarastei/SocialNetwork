import React, { FC } from 'react';
import loadingSVG from '../../../assets/images/loading.svg';

const Preloader: FC = () => {
  return <img src={loadingSVG} alt='loading'></img>
}

export default Preloader