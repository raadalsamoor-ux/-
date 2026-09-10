import React from 'react';
import { TemplateDefinition } from './types';
import { TemplateWedding01 } from './TemplateWedding01';
import { TemplateWedding02 } from './TemplateWedding02';
import { TemplateWedding03 } from './TemplateWedding03';
import { TemplateWedding04 } from './TemplateWedding04';
import { TemplateWedding05 } from './TemplateWedding05';
import { TemplateWedding06 } from './TemplateWedding06';
import { TemplateHenna01 } from './TemplateHenna01';
import { TemplateGrad01 } from './TemplateGrad01';

export const TEMPLATE_REGISTRY: Record<string, TemplateDefinition> = {
  'wedding-01': {
    templateId: 'wedding-01',
    name: 'الخمري المخملي',
    latinName: 'Velvet Burgundy',
    category: 'wedding',
    description: 'طابع ملكي باللون العنابي الداكن وتطريزات ذهبية مع ختم شمعي كلاسيكي وأجواء فخمة.',
    palette: ['#2A050B', '#6E0F1B', '#C9A45C', '#F5E6DA'],
    tags: ['ملكي', 'خمري', 'ذهب كلاسيكي'],
    Component: TemplateWedding01
  },
  'wedding-02': {
    templateId: 'wedding-02',
    name: 'العاجي الكلاسيكي',
    latinName: 'Ivory Classic',
    category: 'wedding',
    description: 'أناقة خالدة بخلفية عاجية دافئة، لمسات زيتونية هادئة وبرونزية مع إطار مزدوج متناسق.',
    palette: ['#FCF8ED', '#B6933E', '#7E8B6C', '#2E2D24'],
    tags: ['كلاسيكي', 'عاجي', 'راقي'],
    Component: TemplateWedding02
  },
  'wedding-03': {
    templateId: 'wedding-03',
    name: 'الملكي الكحلي والذهب',
    latinName: 'Royal Navy & Gold',
    category: 'wedding',
    description: 'فخامة ليلية ساحرة بالأزرق الداكن الملكي مع خطوط هندسية عربية مذهبة وتباين رفيع.',
    palette: ['#0A1128', '#1C2541', '#D4AF37', '#F8FAFC'],
    tags: ['كحلي', 'ملكي', 'ذهبي'],
    Component: TemplateWedding03
  },
  'wedding-04': {
    templateId: 'wedding-04',
    name: 'الزمردي النبيل',
    latinName: 'Noble Emerald',
    category: 'wedding',
    description: 'لون أخضر زمردي إمبراطوري مستوحى من الطبيعة والقصور الراقية مع أقواس ذهبية نبيلة.',
    palette: ['#0B2B20', '#143D2E', '#E2C992', '#F5EFE6'],
    tags: ['زمردي', 'نبيل', 'أندلسي'],
    Component: TemplateWedding04
  },
  'wedding-05': {
    templateId: 'wedding-05',
    name: 'الوردي الباستيل الرومانسي',
    latinName: 'Pastel Blossom',
    category: 'wedding',
    description: 'أجواء شاعرية ناعمة بدرجات الورد المطفأ ولمسات الشامبانيا وزخارف رقيقة.',
    palette: ['#FFF5F5', '#DF7A86', '#B7707E', '#3D2B2E'],
    tags: ['باستيل', 'رومانسي', 'ناعم'],
    Component: TemplateWedding05
  },
  'wedding-06': {
    templateId: 'wedding-06',
    name: 'المودرن مينيمال نوار',
    latinName: 'Noir Minimal',
    category: 'wedding',
    description: 'تصميم فوتوغرافي تحريري معاصر بالأسود والأبيض وخطوط هندسية واضحة بدون زوائد.',
    palette: ['#121212', '#FFFFFF', '#A39B8B', '#F7F5F0'],
    tags: ['مودرن', 'مينيمال', 'عصري'],
    Component: TemplateWedding06
  },
  'henna-01': {
    templateId: 'henna-01',
    name: 'ليلة الحنّاء التراثية',
    latinName: 'Heritage Henna',
    category: 'henna',
    description: 'أصالة التراث العربي وزخارف الحناء الشرقية باللون القرمزي والذهبي الدافئ.',
    palette: ['#4A121A', '#8C271E', '#DCAE5B', '#FDF6EC'],
    tags: ['حنّاء', 'تراث', 'شرقي'],
    Component: TemplateHenna01
  },
  'grad-01': {
    templateId: 'grad-01',
    name: 'الوسام الملكي للتخرّج',
    latinName: 'Royal Graduation',
    category: 'grad',
    description: 'احتفال أكاديمي رفيع يجمع كبرياء الإنجاز ووسام التفوق بالياقوتي الأزرق والذهب.',
    palette: ['#0B1B3D', '#1D3557', '#E5A93C', '#F8F9FA'],
    tags: ['تخرج', 'أكاديمي', 'وسام'],
    Component: TemplateGrad01
  }
};

/**
 * Mapping legacy design slugs to templateId
 */
export const SLUG_TO_TEMPLATE_ID: Record<string, string> = {
  // Wedding designs
  'anasandrama': 'wedding-01',
  'monther-mais': 'wedding-02',
  'hamzeh-farah': 'wedding-03',
  'tareq-leila': 'wedding-04',
  'bayan-nour': 'wedding-05',
  'omar-salma': 'wedding-06',
  'yousef-dana': 'wedding-01',
  'abdullah-sarah': 'wedding-02',
  'kareem-huda': 'wedding-03',
  'ahmad-reem': 'wedding-04',
  'hashem-zeina': 'wedding-05',
  // Henna
  'zaffat-henna': 'henna-01',
  'layali-al-uns': 'henna-01',
  // Grad
  'mrtareq': 'grad-01',
  'dr-aya': 'grad-01',
  'eng-fadi': 'grad-01'
};

/**
 * Robust helper to resolve Template Definition from either templateId or designSlug
 */
export function getTemplate(templateId?: string, fallbackSlug?: string): TemplateDefinition {
  if (templateId && TEMPLATE_REGISTRY[templateId]) {
    return TEMPLATE_REGISTRY[templateId];
  }

  if (fallbackSlug && SLUG_TO_TEMPLATE_ID[fallbackSlug]) {
    const resolvedId = SLUG_TO_TEMPLATE_ID[fallbackSlug];
    if (TEMPLATE_REGISTRY[resolvedId]) {
      return TEMPLATE_REGISTRY[resolvedId];
    }
  }

  // If fallbackSlug direct match in registry
  if (fallbackSlug && TEMPLATE_REGISTRY[fallbackSlug]) {
    return TEMPLATE_REGISTRY[fallbackSlug];
  }

  // Default fallback
  return TEMPLATE_REGISTRY['wedding-01'];
}

export function getAllTemplates(): TemplateDefinition[] {
  return Object.values(TEMPLATE_REGISTRY);
}
