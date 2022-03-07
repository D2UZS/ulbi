import {
	createApp
} from 'vue'
import App from './App'
import components from '@/components/UI'
import router from '@/components/router/router';
import directives from '@/directives';
import store from '@/store';

const app = createApp(App);

// Подключаем глобально все UI компоненты, что бы не надо было подключать каждый отдельно
components.forEach(component => {
	app.component(component.name, component);
});

// Подключаем глобально все свои директивы
directives.forEach(directive => {
	app.directive(directive.name, directive);
});

app
	.use(router)
	.use(store)
	.mount('#app');