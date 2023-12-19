// assets
import { IconHistory, IconReportMoney, IconReportAnalytics } from '@tabler/icons';

// constant
const icons = { IconHistory, IconReportMoney, IconReportAnalytics };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'UT Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Reports History',
      type: 'collapse', 
      icon: icons.IconHistory,
      children: [
        {
          id: 'merchantreports',
          title: 'Merchants Reports',
          type: 'item',
          url: '/dashboard/merchantreports',
          icon: icons.IconReportMoney,
          breadcrumbs: false
        },
        {
          id: 'operatorsreport',
          title: 'Operators Reports',
          type: 'item',
          url: '/dashboard/operatorsreport',
          icon: icons.IconReportAnalytics,
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default dashboard;