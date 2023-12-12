// import { lazy } from 'react';

// // project imports
// import MainLayout from 'layout/MainLayout';
// import Loadable from 'ui-component/Loadable';

// // dashboard routing
// const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// // utilities routing
// const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
// const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
// const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// // sample page routing
// const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// // ==============================|| MAIN ROUTING ||============================== //

// const MainRoutes = {
//   path: '/',
//   element: <MainLayout />,
//   children: [
//     {
//       path: '/',
//       element: <DashboardDefault />
//     },
//     {
//       path: 'dashboard',
//       children: [
//         {
//           path: 'default',
//           element: <DashboardDefault />
//         }
//       ]
//     },
//     {
//       path: 'utils',
//       children: [
//         {
//           path: 'util-typography',
//           element: <UtilsTypography />
//         }
//       ]
//     },
//     {
//       path: 'utils',
//       children: [
//         {
//           path: 'util-color',
//           element: <UtilsColor />
//         }
//       ]
//     },
//     {
//       path: 'utils',
//       children: [
//         {
//           path: 'util-shadow',
//           element: <UtilsShadow />
//         }
//       ]
//     },
//     {
//       path: 'icons',
//       children: [
//         {
//           path: 'tabler-icons',
//           element: <UtilsTablerIcons />
//         }
//       ]
//     },
//     {
//       path: 'icons',
//       children: [
//         {
//           path: 'material-icons',
//           element: <UtilsMaterialIcons />
//         }
//       ]
//     },
//     {
//       path: 'sample-page',
//       element: <SamplePage />
//     }
//   ]
// };

// export default MainRoutes;

import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// Importing Lazy-loaded components for the main application
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Form')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

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
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-UploadReports',
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
          path: 'util-shadow',
          element: <UtilsShadow />
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
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;