import getOS from './useOS';

const getReadableShortcut = shortcut => {
  const { isMacOS } = getOS();

  return shortcut
    .split(',')[0]
    .replace(/\+/g, ' + ')
    .replace(/ctrl/g, isMacOS ? 'cmd' : 'ctrl')
    .replace(/alt/g, isMacOS ? 'option' : 'alt')
    .toUpperCase();
};

export default getReadableShortcut;
