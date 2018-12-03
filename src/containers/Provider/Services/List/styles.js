/**
 * Created by vladtomsa on 29/11/2018
 */
import amber from '@material-ui/core/colors/amber';
import green from '@material-ui/core/colors/green';
import { PROVIDER_SERVICE_STATUSES } from 'constants/index';

const styles = (theme) => {
  return {
    [PROVIDER_SERVICE_STATUSES.ACTIVE]: {
      color: green[500],
    },
    [PROVIDER_SERVICE_STATUSES.INACTIVE]: {
      color: amber[500],
    },
  };
};

export default styles;
