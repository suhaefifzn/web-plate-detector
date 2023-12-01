import TemplateCreator from '../templates/template-creator';

const About = {
    async render() {
        return TemplateCreator.about();
    },

    async afterRender() {
        
    }
};

export default About;