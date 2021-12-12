import getOS from './useOS';

const getReadableShortcut = shortcut => {
  const { isMacOS } = getOS();

  return shortcut
    .replace(/\+/g, ' + ')
    .replace(/ctrl/g, isMacOS ? 'command' : 'ctrl')
    .replace(/alt/g, isMacOS ? 'option' : 'alt')
    .toUpperCase();
};

export default getReadableShortcut;
