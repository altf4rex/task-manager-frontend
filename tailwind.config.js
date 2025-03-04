// tailwind.config.js
export const content = [
    "./app/**/*.{js,ts,jsx,tsx}", // файлы в папке app (Next.js App Router)
    "./components/**/*.{js,ts,jsx,tsx}", // файлы в папке components
    "./pages/**/*.{js,ts,jsx,tsx}", // если используете pages
];
export const darkMode = "class";
export const theme = {
    extend: {
        // Можно добавить свои кастомные значения, например, цвета, отступы и т.п.
    },
};
export const plugins = [];
  