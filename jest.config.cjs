const nextJest = require('next/jest');

// Proporciona la ruta a tu aplicación Next.js para cargar next.config.js y archivos .env en tu entorno de prueba
const createJestConfig = nextJest({
  dir: './',
});

// Configuración adicional para Jest
const customJestConfig = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};

// createJestConfig se exporta de esta manera para asegurar que next/jest pueda cargar la configuración de Next.js, que es asíncrona
module.exports = createJestConfig(customJestConfig);
