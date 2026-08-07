import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Layout from './components/LayoutWrapper.vue'
import './custom.css'
import HeroSection from './components/HeroSection.vue'
import ImpactMetrics from './components/ImpactMetrics.vue'
import MissionFeatures from './components/MissionFeatures.vue'
import ExploreCards from './components/ExploreCards.vue'
import CtaSection from './components/CtaSection.vue'
import TeamGrid from './components/TeamGrid.vue'
import PlaceholderPage from './components/PlaceholderPage.vue'
import ResearchList from './components/ResearchList.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('HeroSection', HeroSection)
    app.component('ImpactMetrics', ImpactMetrics)
    app.component('MissionFeatures', MissionFeatures)
    app.component('ExploreCards', ExploreCards)
    app.component('CtaSection', CtaSection)
    app.component('TeamGrid', TeamGrid)
    app.component('PlaceholderPage', PlaceholderPage)
    app.component('ResearchList', ResearchList)
  },
} satisfies Theme
