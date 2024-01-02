// assets
import { IconUpload, IconBookUpload, IconReportSearch, IconWindmill, IconTransform, IconZoomMoney, IconBuildingStore } from '@tabler/icons';

// constant
const icons = {
  IconUpload,
  IconBookUpload,
  IconWindmill,
  IconTransform,
  IconZoomMoney,
  IconReportSearch,
  IconBuildingStore
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
      icon: icons.IconReportSearch,
      breadcrumbs: false
    },
    {
      id: 'util-merchantInfo',
      title: 'Merchant Info',
      type: 'item',
      url: '/utils/util-merchantInfo',
      icon: icons.IconBuildingStore,
      breadcrumbs: false
    },
    {
      id: 'util-uploadInvoice',
      title: 'Upload Invoice Report',
      type: 'item',
      url: '/utils/util-uploadInvoice',
      icon: icons.IconUpload,
      breadcrumbs: false
    },
    {
      id: 'util-convertFileFormat',
      title: 'Convert File Format',
      type: 'item',
      url: '/utils/util-convertFileFormat',
      icon: icons.IconTransform,
      breadcrumbs: false
    },
    {
      id: 'util-revenues',
      title: 'Revenues',
      type: 'item',
      url: '/utils/util-revenues',
      icon: icons.IconZoomMoney,
      breadcrumbs: false
    }
  ]
};

export default utilities;
