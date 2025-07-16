
import { createRoot } from 'react-dom/client';
import vkBridge from '@vkontakte/vk-bridge';
import { AppConfig } from './AppConfig';

vkBridge.send('VKWebAppInit')
  .then(() => console.log('VK Mini App initialized'))
  .catch(console.error);

const root = createRoot(document.getElementById('root'));
root.render(<AppConfig />);


