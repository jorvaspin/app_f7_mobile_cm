// import '../../assets/fontawesome/all';
// import '../../assets/fontawesome/fontawesome.min.js';
// import '../../assets/fontawesome/light.min.js';
// import '../../assets/fontawesome/regular.min.js';

import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
    faCalendarLines,
    faBookOpen,
    faChartColumn,
    faUser,
    faBell,
    faBellOn,
    faChevronLeft,
    faChevronRight as farChevronRight,
    faSwords,
    faCommentCheck,
    faCommentMinus,
    faInfoCircle,
    faMoon,
    faPencil,
    faSignOut,
    faCommentTimes,
    faMessages as farMessages,
    faHeart,
    faLongArrowRight,
    faXmark as farXmark,
    faVideo,
    faBookOpenReader,
    faEarListen,
    faSearchPlus,
    faCheck,
    faTimes,
    faMegaphone,
    faPartyHorn,
    faMonkey,
    faLanguage,
    faCheckCircle,
    faArrowsRotate,
    faSword,
    faTimer
} from '@fortawesome/pro-regular-svg-icons';
library.add(faCalendarLines, faBookOpen, faChartColumn, faUser, faBell, faBellOn, faChevronLeft, farChevronRight, faSwords, faSword, faCommentCheck, faCommentMinus, faCommentTimes, faInfoCircle, faMoon, faPencil, faSignOut, faHeart, faLongArrowRight, farXmark, faVideo, faBookOpenReader, faEarListen, faSearchPlus, faCheck, faTimes, farMessages, faMegaphone, faPartyHorn, faMonkey, faLanguage, faCheckCircle, faArrowsRotate, faTimer);

import { faBookOpenCover, faBoxesStacked, faCalendarCheck, faCalendarClock, faCalendarDay, faChevronRight as falChevronRight, faClock, faClockDesk, faCog, faComments, faCommentsAlt, faEarthAmericas, faEnvelope, faFileCertificate, faGraduationCap, faMinusCircle, faPauseCircle, faCirclePlay, faPlusCircle, faSchool, faStopCircle, faStore, faUserCircle, faVolume, faVolumeMute, faXmark as falXmark, faChartUser } from '@fortawesome/pro-light-svg-icons';

library.add(faEarthAmericas, falChevronRight, faCalendarDay, faMinusCircle, faPauseCircle, faCirclePlay, faPlusCircle, faStopCircle, faVolume, faVolumeMute, falXmark, faSchool, faEnvelope, faComments, faCommentsAlt, faClock, faUserCircle, faBoxesStacked, faStore, faCog, faBookOpenCover, faBell, faFileCertificate, faGraduationCap, faSchool, faCalendarCheck, faCalendarClock, faClockDesk, faChartUser);

import { faHeart as faHeartSolid, faTimer as faTimerSolid} from "@fortawesome/pro-solid-svg-icons";

library.add(faHeartSolid, faTimerSolid);

dom.watch();