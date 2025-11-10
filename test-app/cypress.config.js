const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // Permite imprimir en la consola del terminal
            on('task', {
                logTerminal(message) {
                    console.log('\x1b[33m%s\x1b[0m', message);
                    return null;
                },
            });
            return config;
        },
    },
});
