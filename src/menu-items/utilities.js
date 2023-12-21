// assets
import { IconUpload, IconBookUpload, IconShadow, IconWindmill } from '@tabler/icons';

// constant
const icons = {
  IconUpload,
  IconBookUpload,
  IconShadow,
  IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Tabs',
  type: 'group',
  children: [
    {
      id: 'util-UploadReports',
      title: 'Upload Reports',
      type: 'item',
      url: '/utils/util-UploadReports/:id',
      icon: icons.IconUpload,
      breadcrumbs: false
    },
    {
      id: 'util-UploadContract ',
      title: 'Upload Contracts',
      type: 'item',
      url: '/utils/util-UploadContract',
      icon: icons.IconBookUpload,
      breadcrumbs: false
    },
    {
      id: 'util-servicesInfo',
      title: 'Services Info',
      type: 'item',
      url: '/utils/util-servicesInfo',
      icon: icons.IconShadow,
      breadcrumbs: false
    },
    {
      id: 'util-merchantInfo',
      title: 'Merchant Info',
      type: 'item',
      url: '/utils/util-merchantInfo',
      icon: icons.IconShadow,
      breadcrumbs: false
    },
    {
      id: 'icons',
      title: 'Icons',
      type: 'collapse',
      icon: icons.IconWindmill,
      children: [
        {
          id: 'tabler-icons',
          title: 'Tabler Icons',
          type: 'item',
          url: '/icons/tabler-icons',
          breadcrumbs: false
        },
        {
          id: 'material-icons',
          title: 'Material Icons',
          type: 'item',
          external: true,
          target: '_blank',
          url: 'https://mui.com/material-ui/material-icons/',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default utilities;
