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
  {
    name: 'Quỹ cứu trợ',
    iconComponent: { name: 'cil-chart-pie' },
    children: [
      {
        name: 'Quản lý quỹ',
        url: 'pages/donation',
      },
      {
        name: 'Danh sách ủng hộ',
        url: 'pages/donation-request',
      },
      {
        name: 'Yêu cầu hỗ trợ',
        url: 'pages/fund-request',
      }
    ]
  },
  {
    name: 'Tin nhắn',
    url: 'pages/chat',
    iconComponent: { name: 'cil-chart-pie' }
  },
];
