import hematbox1 from '@/assets/images/projects/hematbox-1.png'
import hematbox2 from '@/assets/images/projects/hematbox-2.png'
import hematbox3 from '@/assets/images/projects/hematbox-3.png'
import bingo1 from '@/assets/images/projects/bingo-1.png'
import bingo2 from '@/assets/images/projects/bingo-2.png'
import bingo3 from '@/assets/images/projects/bingo-3.png'
import eyip1 from '@/assets/images/projects/eyip-1.png'
import eyip2 from '@/assets/images/projects/eyip-2.png'
import agung1 from '@/assets/images/projects/agung-1.png'
import agung2 from '@/assets/images/projects/agung-3.png'
import agung3 from '@/assets/images/projects/agung-3.png'

export type Project = {
  name: string
  stack: string[]
  notes: string
  period: string
  photos: string[]
}

export const projects: Project[] = [
  {
    name: 'BinGo: Your AI Lens for a Cleaner Beach',
    stack: ['Express', 'React', 'Supabase', 'ONNX'],
    notes:
      'An innovative platform powered by computer vision and machine learning, designed to identify and classify beach waste materials instantly using a camera. The system helps volunteers optimize coastal waste management, assess recycling potential, and receive tabular ML-based processing recommendations without manual text input.',
    period: '2026',
    photos: [bingo1, bingo2, bingo3],
  },
  {
    name: 'EyesonYourIdealPlate (EYIP)',
    stack: ['Laravel', 'Python', 'ESP32-S3', 'MySQL', 'ONNX'],
    notes:
      'An innovative AI and IoT-based system developed to detect pest contamination in food in real-time using an ESP32-S3 camera module and ONNX inference model. The platform ensures food safety by providing a web dashboard for monitoring, automatic image labeling with bounding boxes, and comprehensive analytic reports exportable in multiple formats.',
    period: '2025',
    photos: [eyip1, eyip2],
  },
  {
    name: 'HematBox',
    stack: ['Golang', 'Laravel', 'MySQL', 'Vue.js'],
    notes:
      'An innovative web platform built to rescue surplus food by connecting culinary businesses with consumers through a discounted ordering system. Powered by a scalable Golang backend and Vue.js frontend, the system features an interactive real-time offer map (GIS), dual account management, a business operations dashboard, and a streamlined checkout flow for efficient transactions.',
    period: 'Nov 2025 – Sep 2025',
    photos: [hematbox1, hematbox2, hematbox3],
  },
  {
    name: 'Agung Berkah Service',
    stack: ['Laravel', 'Vue', 'MySQL'],
    notes:
      'Developed an administrative and financial management system using Laravel and Vue.js to digitize business processes, complemented by SEO optimization that improved operational efficiency and enhanced website visibility on search engines.',
    period: 'Jan 2026 – Feb 2026',
    photos: [agung1, agung2, agung3],
  },
]
