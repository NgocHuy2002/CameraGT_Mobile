import React from 'react';
import { Image, StyleSheet } from 'react-native';

import Bars from '@assets/icons/bars.svg';
import Database from '@assets/icons/database.svg';
import News from '@assets/icons/news.svg';
import TrangChuIcon from '@assets/icons/trang_chu.svg';

import ArrowLeftIcon from '../../assets/icons/arrow-left.svg';
import ArrowRightIcon from '../../assets/icons/arrow-right.svg';
import ClockIcon from '../../assets/icons/clock.svg';
import CommnetIcon from '../../assets/icons/comment.svg';
import DoctorIcon from '../../assets/icons/doctor.svg';
import EmailIcon from '../../assets/icons/email.svg';
import EventIcon from '../../assets/icons/event.svg';
import EyeCloseIcon from '../../assets/icons/eye-close.svg';
import EyeIcon from '../../assets/icons/eye.svg';
import HelpIcon from '../../assets/icons/help.svg';
import HomeIcon from '../../assets/icons/home.svg';
import LocationIcon from '../../assets/icons/local.svg';
import ManageIcon from '../../assets/icons/manager.svg';
import MapIcon from '../../assets/icons/map.svg';
import MedicalHistoryIcon from '../../assets/icons/medical-history.svg';
import NotifitionIcon from '../../assets/icons/notification.svg';
import PhoneCallOutlineIcon from '../../assets/icons/phone-call-outline.svg';
import PhoneCallIcon from '../../assets/icons/phone-call.svg';
import PillIcon from '../../assets/icons/pill.svg';
import RecordsIcon from '../../assets/icons/records.svg';
import SalineIcon from '../../assets/icons/saline.svg';
import SearchIcon from '../../assets/icons/search.svg';
import StatisticsIcon from '../../assets/icons/statistics.svg';

const SvgProvider = (SvgIcon) => ({
  toReactElement: (props) => {
    const { fill, style, ...restProps } = props;

    const { width, height } = StyleSheet.flatten([style, props]);
    const { tintColor, ...restStyle } = StyleSheet.flatten(style || {});

    return (
      <SvgIcon
        {...restProps}
        fill={fill || tintColor}
        style={restStyle}
        width={width}
        height={height}
      />
    );
  },
});

const ImageProvider = (source) => ({
  toReactElement: (props) => {
    return <Image {...props} source={source} resizeMode="contain" />;
  },
});

const AppIconsPack = {
  name: 'app',
  icons: {
    'arrow-left': SvgProvider(ArrowLeftIcon),
    'arrow-right': SvgProvider(ArrowRightIcon),
    clock: SvgProvider(ClockIcon),
    comment: SvgProvider(CommnetIcon),
    doctor: SvgProvider(DoctorIcon),
    event: SvgProvider(EventIcon),
    eye: SvgProvider(EyeIcon),
    map: SvgProvider(MapIcon),
    'eye-close': SvgProvider(EyeCloseIcon),
    help: SvgProvider(HelpIcon),
    home: SvgProvider(HomeIcon),
    bars: SvgProvider(Bars),
    database: SvgProvider(Database),
    news: SvgProvider(News),
    'medical-history': SvgProvider(MedicalHistoryIcon),
    'phone-call': SvgProvider(PhoneCallIcon),
    'phone-call-outline': SvgProvider(PhoneCallOutlineIcon),
    pill: SvgProvider(PillIcon),
    records: SvgProvider(RecordsIcon),
    saline: SvgProvider(SalineIcon),
    search: SvgProvider(SearchIcon),
    statistics: SvgProvider(StatisticsIcon),
    email: SvgProvider(EmailIcon),
    location: SvgProvider(LocationIcon),
    manage: SvgProvider(ManageIcon),
    notifition: SvgProvider(NotifitionIcon),
  },
};

export default AppIconsPack;
