import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from '@vkontakte/vk-mini-apps-router';

export const DEFAULT_ROOT = 'default_root';
export const DEFAULT_VIEW = 'default_view';
export const DEFAULT_VIEW_PANELS = { 
  HOME: 'home', 
  ACHIEVEMENTS: 'achievements',
  SETTINGS: 'settings'
};

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.HOME, '/', []),
      createPanel(DEFAULT_VIEW_PANELS.ACHIEVEMENTS, '/achievements', []),
      createPanel(DEFAULT_VIEW_PANELS.SETTINGS, '/settings', []),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());