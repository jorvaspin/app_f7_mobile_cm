import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import 'dayjs/locale/es';
dayjs.locale('es');
dayjs.extend(relativeTime);
dayjs.extend(isSameOrAfter);

export default dayjs;