/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'sigmar': ['Sigmar', 'cursive'],
        'BraahOne': ['Braah One', 'sans-serif'],
        'Righteous': ['Righteous', 'cursive']
      },
      textColor: {
        'normal': '#909BA1',
        'fighting': '#D0436A',
        'flying': '#8BACDE',
        'poison': '#A670C1',
        'ground': '#E57842',
        'rock': '#CAB98B',
        'bug': '#9ABF35',
        'ghost': '#436CA8',
        'steel': '#568FA9',
        'fire': '#FF9B52',
        'water': '#2E92D9',
        'grass': '#6FBA60',
        'electric': '#FCD23D',
        'psychic': '#F87578',
        'ice': '#73CEC0',
        'dragon': '#0371BC',
        'dark': '#5C5663',
        'fairy': '#EA93E6',
      },
      colors: {
        custom: {
          'normal': '#909BA1',
          'fighting': '#D0436A',
          'flying': '#8BACDE',
          'poison': '#A670C1',
          'ground': '#E57842',
          'rock': '#CAB98B',
          'bug': '#9ABF35',
          'ghost': '#436CA8',
          'steel': '#568FA9',
          'fire': '#FF9B52',
          'water': '#2E92D9',
          'grass': '#6FBA60',
          'electric': '#FCD23D',
          'psychic': '#F87578',
          'ice': '#73CEC0',
          'dragon': '#0371BC',
          'dark': '#5C5663',
          'fairy': '#EA93E6',
        }
      }
    },
    screens: {
      //sFHD: '1920px',
      sFHD: '1920px',
      // sHDplus: '1366px',
      sHDplus: '1366px',
      // sHD: '1280px',
      sHD: '1280px',
      // sTPROplus: '1024px',
      sTPROplus: '1024px',
      // sTPRO: '834px',
      sTPRO: '834px',
      // sT: '768px',
      sT: '768px',
      // sTMINI: '600px',
      sTMINI: '600px',
      // sCXSmax: '414px',
      sCXSmax: '414px',
      // sCXS: '375px',
      sCXS: '375px',
      // sCS: '360px',
      sCS: '360px',
      // sMINI: '240px',
      sMINI: '320px',
    }
  },
  plugins: [],
}
