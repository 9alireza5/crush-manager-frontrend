import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify, type ThemeDefinition } from 'vuetify';


const light: ThemeDefinition = {
    dark: false,
    colors: {
       primary: '#FFDCDC',
        secondary: '#FFF2EB',
        accent: '#FFE8CD',
        background: '#FFD6BA',
    },
}

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        locale: 'fa',
        theme: {
            defaultTheme: 'light',
            themes: {
                light,
            },
        },
    })
    app.vueApp.use(vuetify)
})
