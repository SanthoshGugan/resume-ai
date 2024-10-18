import { useSelector } from 'react-redux';
import { userFlagsSelector } from '../store/selectors/userSelector';

const usePermissions = (flagsNeeded = []) => {
    const userFlags = useSelector(state => userFlagsSelector(state)) || {};
    
    const allowedFlags = flagsNeeded.reduce((acc, flag) => {
        const { name, defaultVal } = flag;
        acc[name] = userFlags[name] || defaultVal;
        return acc;
    }, {});

    return allowedFlags;
};

export default usePermissions;