export type Theme = {
  id: string;
  name: string;
  colors: {
    body: {
      background: string;
      text: string;
    };
    notificationCard: {
      background: string;
      iconBackground: string;
      text: string;
    };
    primary: string;
    secondary: string;
    textPrimary: string;
    textSecondary: string;
  };
};

export const themes: Theme[] = [
  {
    id: 'theme1',
    name: 'Default',
    colors: {
      body: {
        background: 'bg-gray-900',
        text: 'text-white',
      },
      notificationCard: {
        background: 'bg-gray-800',
        iconBackground: 'bg-gray-700',
        text: 'text-gray-300',
      },
      primary: 'bg-gray-800',
      secondary: 'bg-gray-600',
      textPrimary: 'text-purple-400',
      textSecondary: 'text-gray-400',
    },
  },
  {
    id: 'theme2',
    name: 'Ocean Blue',
    colors: {
      body: {
        background: 'bg-blue-900',
        text: 'text-white',
      },
      notificationCard: {
        background: 'bg-blue-800',
        iconBackground: 'bg-blue-700',
        text: 'text-blue-200',
      },
      primary: 'bg-blue-800',
      secondary: 'bg-blue-600',
      textPrimary: 'text-cyan-400',
      textSecondary: 'text-blue-300',
    },
  },
  {
    id: 'theme3',
    name: 'Forest Green',
    colors: {
      body: {
        background: 'bg-green-900',
        text: 'text-white',
      },
      notificationCard: {
        background: 'bg-green-800',
        iconBackground: 'bg-green-700',
        text: 'text-green-200',
      },
      primary: 'bg-green-800',
      secondary: 'bg-green-600',
      textPrimary: 'text-emerald-400',
      textSecondary: 'text-green-300',
    },
  },
  {
    id: 'theme4',
    name: 'Sunset Orange',
    colors: {
      body: {
        background: 'bg-orange-900',
        text: 'text-white',
      },
      notificationCard: {
        background: 'bg-orange-800',
        iconBackground: 'bg-orange-700',
        text: 'text-orange-200',
      },
      primary: 'bg-orange-800',
      secondary: 'bg-orange-600',
      textPrimary: 'text-amber-400',
      textSecondary: 'text-orange-300',
    },
  },
];

export const getThemeById = (id: string): Theme => {
  return themes.find(theme => theme.id === id) || themes[0];
};