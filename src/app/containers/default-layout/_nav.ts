import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Trang chủ',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' }

  },
  {
    name: 'Nhận nuôi',
    url: 'pages/adoption-request',
    iconComponent: { name: 'cil-chart-pie' }
  },
  {
    name: 'Đăng ký trại',
    url: 'pages/shelter-request',
    iconComponent: { name: 'cil-chart-pie' }
  },
];
