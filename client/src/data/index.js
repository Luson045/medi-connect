import { 
  Heart, 
  Stethoscope, 
  PhoneCall, 
  Ambulance, 
  Clipboard, 
  Hospital, 
  ShieldAlert, 
  Smile 
} from 'lucide-react';

// data.js
export const services = [
  {
    icon: Clipboard, // Relevant icon
    title: 'Cosmetic Dentistry',
    details:
      'Our cosmetic dentistry services are designed to transform your smile and boost your confidence...',
    modalDetails: 
      `• <strong>Teeth Whitening:</strong> Brighten your smile by several shades with our professional whitening treatments.<br />
      • <strong>Veneers:</strong> Thin porcelain or composite shells are custom-made to cover the front surface of your teeth, improving their appearance.<br />
      • <strong>Dental Bonding:</strong> This procedure uses a tooth-colored resin to repair decayed, chipped, or cracked teeth.<br />
      • <strong>Gum Contouring:</strong> Reshape and redefine your gum line to enhance your smile's symmetry and balance.`
  },
  {
    icon: Stethoscope, // Relevant icon
    title: 'Dental Implants',
    details:
      'Dental implants offer a permanent solution for missing teeth, replicating the look, feel, and function of natural teeth...',
    modalDetails: 
      `• <strong>Permanent Solution:</strong> Titanium posts are surgically placed into the jawbone to serve as roots for replacement teeth.<br />
      • <strong>Natural Function:</strong> Implants function like natural teeth, allowing you to eat, speak, and smile confidently.<br />
      • <strong>Bone Preservation:</strong> They help maintain jawbone structure and prevent further tooth loss.<br />
      • <strong>Long-lasting:</strong> With proper care, dental implants can last a lifetime.`
  },
  {
    icon: Ambulance, // Relevant icon
    title: 'Orthodontics',
    details:
      'Our orthodontic treatments address misaligned teeth and bite issues with precision and care...',
    modalDetails: 
      `• <strong>Braces:</strong> Traditional metal or ceramic braces are effective for correcting alignment issues.<br />
      • <strong>Clear Aligners:</strong> Custom-made clear trays that gradually shift your teeth into place without the visibility of braces.<br />
      • <strong>Improved Bite:</strong> Correcting misalignments enhances oral health and function.<br />
      • <strong>Personalized Treatment:</strong> Each treatment plan is tailored to meet your specific needs and lifestyle.`
  },
  {
    icon: Hospital, // Relevant icon
    title: 'Pediatric Dentistry',
    details:
      'We specialize in providing gentle and effective dental care for children...',
    modalDetails: 
      `• <strong>Gentle Care:</strong> Our team is trained to provide a comfortable environment for children during dental visits.<br />
      • <strong>Preventive Services:</strong> We focus on preventive care to avoid future dental issues, including sealants and fluoride treatments.<br />
      • <strong>Education:</strong> Teaching children about proper oral hygiene habits from an early age is a priority.<br />
      • <strong>Tailored Approach:</strong> Each child’s needs are addressed individually to ensure a positive experience.`
  },
  {
    icon: Heart, // Relevant icon
    title: 'Root Canal Therapy',
    details:
      'When a tooth is severely damaged or infected, root canal therapy can save it from extraction...',
    modalDetails: 
      `• <strong>Pain Relief:</strong> Root canal therapy alleviates pain caused by infection or damage to the tooth.<br />
      • <strong>Preservation:</strong> The procedure allows you to keep your natural tooth, avoiding extraction.<br />
      • <strong>Comprehensive Treatment:</strong> Our team ensures thorough cleaning and sealing of the tooth to prevent future infections.<br />
      • <strong>Quick Recovery:</strong> Most patients return to normal activities shortly after treatment.`
  },
  {
    icon: PhoneCall, // Relevant icon
    title: 'Teeth Whitening',
    details:
      'Achieve a brighter, more radiant smile with our professional teeth whitening services...',
    modalDetails: 
      `• <strong>In-Office Whitening:</strong> Our professional treatments provide immediate and noticeable results.<br />
      • <strong>Custom Take-Home Kits:</strong> We also offer personalized kits for at-home whitening with professional guidance.<br />
      • <strong>Safe and Effective:</strong> Our methods are designed to minimize sensitivity and ensure safety.<br />
      • <strong>Long-lasting Results:</strong> With proper care, your bright smile can last for months.`
  },
  {
    icon: ShieldAlert, // Use Tooth icon for gum disease treatment
    title: 'Gum Disease Treatment',
    details:
      'Our periodontal care focuses on diagnosing and treating gum disease at every stage...',
    modalDetails: 
      `• <strong>Comprehensive Evaluation:</strong> We assess the health of your gums and underlying structures.<br />
      • <strong>Non-Surgical Treatments:</strong> Scaling and root planing are effective methods to treat gum disease.<br />
      • <strong>Maintenance:</strong> Regular check-ups and cleanings help prevent the progression of gum disease.<br />
      • <strong>Education:</strong> We provide guidance on proper oral hygiene practices to maintain gum health.`
  },
  {
    icon: Smile, // Use Smile icon for smile makeovers
    title: 'Smile Makeovers',
    details:
      'For patients seeking comprehensive smile enhancements, we offer full smile makeover services...',
    modalDetails: 
      `• <strong>Customized Approach:</strong> Each smile makeover is tailored to the individual's needs and aesthetic goals.<br />
      • <strong>Multi-Disciplinary Team:</strong> Our team combines various specialties to achieve the desired results.<br />
      • <strong>Advanced Technology:</strong> We use the latest techniques and technology to ensure optimal outcomes.<br />
      • <strong>Transformative Results:</strong> A complete smile makeover can significantly enhance self-esteem and confidence.`
  },
];
