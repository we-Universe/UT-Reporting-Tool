import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// Importing Lazy-loaded components for the main application
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Form')));
const OperatorsReport = Loadable(lazy(() => import('views/utilities/Operator')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Contract')));
const UtilsServiceInfo = Loadable(lazy(() => import('views/utilities/ServicesInfo')));
const UtilsMerchantInfo = Loadable(lazy(() => import('views/utilities/MerchantInfo')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsUploadInvoice = Loadable(lazy(() => import('views/utilities/UploadInvoice')));
const UtilsConvertFileFormat = Loadable(lazy(() => import('views/utilities/ConvertFileFormat')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
const AddUserPage = Loadable(lazy(() => import('views/adduser-page')));
const UtilsRevenues = Loadable(lazy(() => import('views/utilities/Revenues')));

// Main Application Routes Configuration
const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      // Remove the default route
      path: '/',
      // Redirect to the dashboard page
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'merchantreports',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'operatorsreport',
          element: <OperatorsReport />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-UploadReports/:id',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-UploadContract',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-servicesInfo',
          element: <UtilsServiceInfo />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-merchantInfo',
          element: <UtilsMerchantInfo />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-uploadInvoice',
          element: <UtilsUploadInvoice />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-convertFileFormat',
          element: <UtilsConvertFileFormat />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'adduser-page',
      element: <AddUserPage />
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-revenues',
          element: <UtilsRevenues />
        }
      ]
    }
  ]
};

export default MainRoutes;
