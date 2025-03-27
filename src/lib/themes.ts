export type Theme = {
  id: string;
  name: string;
  colors: {
    body: {
      background: string;
      text: string;
    };
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
};

export const themes: Theme[] = [
  {
    id: 'theme1',
    name: 'Klasik',
    colors: {
      body: {
        background: 'bg-gray-900',
        text: 'text-white',
      },
      primary: 'bg-blue-500',
      secondary: 'bg-blue-300',
      background: 'bg-gray-50',
      text: 'text-gray-800',
    },
  },
  {
    id: 'theme2',
    name: 'Karanlık',
    colors: {
      body: {
        background: 'bg-gray-900',
        text: 'text-white',
      },
      primary: 'bg-gray-800',
      secondary: 'bg-gray-600',
      background: 'bg-gray-900',
      text: 'text-gray-100',
    },
  },
  {
    id: 'theme3',
    name: 'Pastel',
    colors: {
      body: {
        background: 'bg-gray-900',
        text: 'text-white',
      },
      primary: 'bg-pink-200',
      secondary: 'bg-purple-200',
      background: 'bg-white',
      text: 'text-gray-700',
    },
  },
];

export const getThemeById = (id: string): Theme => {
  return themes.find(theme => theme.id === id) || themes[0];
};