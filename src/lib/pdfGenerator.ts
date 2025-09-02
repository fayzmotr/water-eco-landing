import { jsPDF } from 'jspdf';
import { Product } from '../types';

interface PDFOptions {
  includeImages?: boolean;
  includeTechnicalSpecs?: boolean;
  includeConstructionProcess?: boolean;
  includePartners?: boolean;
}

export class ECGPDFGenerator {
  private doc: jsPDF;
  private currentY: number = 20;
  private pageWidth: number;
  private pageHeight: number;

  constructor() {
    this.doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.pageHeight = this.doc.internal.pageSize.getHeight();
  }

  private addHeader() {
    // ECG Logo and Company Header
    this.doc.setFillColor(45, 85, 153); // ECG Blue
    this.doc.rect(0, 0, this.pageWidth, 40, 'F');
    
    // Company Name
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(24);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('ECO CONSTRUCTION GROUP', 20, 18);
    
    // Tagline
    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text('Engineering & Construction Excellence', 20, 28);
    
    // Contact Info
    this.doc.setFontSize(10);
    this.doc.text('Phone: +998 (71) 256-26-00  |  Email: ecgtashkent@gmail.com', 20, 36);
    
    this.currentY = 50;
  }

  private addFooter() {
    const footerY = this.pageHeight - 20;
    this.doc.setFontSize(8);
    this.doc.setTextColor(128, 128, 128);
    this.doc.text('ECO CONSTRUCTION GROUP - Tashkent, Mirabadsky district, Shahrisabz str. 36', 20, footerY);
    this.doc.text('www.ecoconstructiongroup.uz', this.pageWidth - 60, footerY);
  }

  private checkPageBreak(requiredSpace: number) {
    if (this.currentY + requiredSpace > this.pageHeight - 40) {
      this.doc.addPage();
      this.currentY = 20;
    }
  }

  private addTitle(title: string, size: number = 16) {
    this.checkPageBreak(15);
    this.doc.setFontSize(size);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(45, 85, 153);
    this.doc.text(title, 20, this.currentY);
    this.currentY += 10;
  }

  private addSubtitle(subtitle: string) {
    this.checkPageBreak(10);
    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(0, 0, 0);
    this.doc.text(subtitle, 20, this.currentY);
    this.currentY += 8;
  }

  private addText(text: string, indent: number = 0) {
    this.checkPageBreak(8);
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(0, 0, 0);
    
    // Split long text into multiple lines
    const splitText = this.doc.splitTextToSize(text, this.pageWidth - 40 - indent);
    this.doc.text(splitText, 20 + indent, this.currentY);
    this.currentY += splitText.length * 5 + 3;
  }

  private addBulletPoint(text: string) {
    this.checkPageBreak(8);
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(0, 0, 0);
    this.doc.text('•', 25, this.currentY);
    
    const splitText = this.doc.splitTextToSize(text, this.pageWidth - 50);
    this.doc.text(splitText, 30, this.currentY);
    this.currentY += splitText.length * 5 + 2;
  }

  private addSeparator() {
    this.checkPageBreak(10);
    this.doc.setDrawColor(200, 200, 200);
    this.doc.line(20, this.currentY, this.pageWidth - 20, this.currentY);
    this.currentY += 8;
  }

  private addSpecificationTable(specifications: Record<string, string>) {
    this.addSubtitle('Technical Specifications');
    
    const entries = Object.entries(specifications);
    const tableStartY = this.currentY;
    
    // Table header background
    this.doc.setFillColor(240, 240, 240);
    this.doc.rect(20, this.currentY - 3, this.pageWidth - 40, 8, 'F');
    
    // Headers
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Parameter', 25, this.currentY + 2);
    this.doc.text('Specification', this.pageWidth / 2 + 10, this.currentY + 2);
    this.currentY += 8;
    
    // Table rows
    this.doc.setFont('helvetica', 'normal');
    entries.forEach(([key, value], index) => {
      this.checkPageBreak(8);
      
      // Alternate row colors
      if (index % 2 === 0) {
        this.doc.setFillColor(250, 250, 250);
        this.doc.rect(20, this.currentY - 3, this.pageWidth - 40, 6, 'F');
      }
      
      this.doc.text(key, 25, this.currentY);
      this.doc.text(value, this.pageWidth / 2 + 10, this.currentY);
      this.currentY += 6;
    });
    
    this.currentY += 5;
  }

  private addConstructionProcess() {
    this.addTitle('Construction Methodology', 14);
    
    const phases = [
      {
        phase: 'Phase 1: Site Assessment & Design',
        duration: '2-4 weeks',
        activities: [
          'Geological and environmental assessment',
          'Water quality and flow rate analysis',
          'Capacity requirements calculation',
          'Technology selection and system design',
          'Regulatory compliance planning'
        ]
      },
      {
        phase: 'Phase 2: Construction & Installation',
        duration: '3-20 months',
        activities: [
          'Site preparation and civil works',
          'HDPE container installation',
          'European equipment integration',
          'Piping and electrical systems',
          'Control system programming',
          'Quality assurance testing'
        ]
      },
      {
        phase: 'Phase 3: Commissioning & Training',
        duration: '2-6 weeks',
        activities: [
          'System performance testing',
          'Process optimization',
          'Operator training programs',
          'Documentation handover',
          'Warranty activation'
        ]
      }
    ];

    phases.forEach((phase, index) => {
      this.checkPageBreak(40);
      
      // Phase header
      this.doc.setFillColor(45, 85, 153);
      this.doc.rect(20, this.currentY - 3, this.pageWidth - 40, 10, 'F');
      
      this.doc.setTextColor(255, 255, 255);
      this.doc.setFontSize(12);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text(phase.phase, 25, this.currentY + 3);
      this.doc.text(`Duration: ${phase.duration}`, this.pageWidth - 80, this.currentY + 3);
      
      this.currentY += 12;
      
      // Activities
      this.doc.setTextColor(0, 0, 0);
      this.doc.setFontSize(10);
      this.doc.setFont('helvetica', 'normal');
      
      phase.activities.forEach(activity => {
        this.addBulletPoint(activity);
      });
      
      this.currentY += 5;
    });
  }

  private addEuropeanPartners() {
    this.addTitle('European Technology Partners', 14);
    
    const partners = [
      { name: 'REKO', country: 'Germany', specialty: 'Advanced filtration systems and water treatment technology' },
      { name: 'TORAY', country: 'Japan', specialty: 'World-leading membrane filtration and reverse osmosis technology' },
      { name: 'Pieralisi', country: 'Italy', specialty: 'Industrial separation equipment and centrifugal technology' },
      { name: 'BÖRGER', country: 'Germany', specialty: 'Rotary lobe pumps and advanced pumping solutions' },
      { name: 'WILO', country: 'Germany', specialty: 'High-efficiency pumps and intelligent pumping systems' }
    ];

    partners.forEach(partner => {
      this.checkPageBreak(15);
      
      // Partner box
      this.doc.setFillColor(245, 250, 255);
      this.doc.rect(20, this.currentY - 2, this.pageWidth - 40, 12, 'F');
      this.doc.setDrawColor(45, 85, 153);
      this.doc.rect(20, this.currentY - 2, this.pageWidth - 40, 12);
      
      this.doc.setFontSize(11);
      this.doc.setFont('helvetica', 'bold');
      this.doc.setTextColor(45, 85, 153);
      this.doc.text(`${partner.name} (${partner.country})`, 25, this.currentY + 2);
      
      this.doc.setFontSize(9);
      this.doc.setFont('helvetica', 'normal');
      this.doc.setTextColor(0, 0, 0);
      this.doc.text(partner.specialty, 25, this.currentY + 7);
      
      this.currentY += 15;
    });
  }

  private addPerformanceMetrics() {
    this.addTitle('Proven Performance Metrics', 14);
    
    // Performance box
    this.doc.setFillColor(240, 255, 240);
    this.doc.rect(20, this.currentY - 3, this.pageWidth - 40, 30, 'F');
    this.doc.setDrawColor(34, 197, 94);
    this.doc.rect(20, this.currentY - 3, this.pageWidth - 40, 30);
    
    const metrics = [
      '25+ successful projects completed across Uzbekistan',
      '98-99% treatment efficiency consistently achieved',
      '8 years of specialized water treatment experience',
      'Capacities from 500 m³/day to 35,000 m³/day proven',
      '99.2% on-time project delivery rate',
      '100% client satisfaction record'
    ];

    metrics.forEach(metric => {
      this.doc.setFontSize(10);
      this.doc.setFont('helvetica', 'normal');
      this.doc.setTextColor(0, 100, 0);
      this.doc.text('✓', 25, this.currentY);
      this.doc.setTextColor(0, 0, 0);
      this.doc.text(metric, 32, this.currentY);
      this.currentY += 4.5;
    });
    
    this.currentY += 8;
  }

  private addContactSection() {
    this.addTitle('Next Steps & Contact Information', 14);
    
    this.addText('Ready to discuss your water treatment facility requirements? Our engineering team is ready to provide:');
    this.currentY += 3;
    
    const services = [
      'Free site assessment and consultation',
      'Customized capacity analysis and system design',
      'European technology recommendations',
      'Detailed cost estimates and project timelines',
      'Reference project portfolios and case studies'
    ];

    services.forEach(service => {
      this.addBulletPoint(service);
    });

    this.currentY += 5;
    
    // Contact box
    this.doc.setFillColor(45, 85, 153);
    this.doc.rect(20, this.currentY - 3, this.pageWidth - 40, 25, 'F');
    
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Contact ECO CONSTRUCTION GROUP', 25, this.currentY + 3);
    
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text('Phone: +998 (71) 256-26-00', 25, this.currentY + 9);
    this.doc.text('Email: ecgtashkent@gmail.com', 25, this.currentY + 14);
    this.doc.text('Address: Tashkent, Mirabadsky district, Shahrisabz str. 36', 25, this.currentY + 19);
  }

  public generateSolutionPDF(product: Product, options: PDFOptions = {}): void {
    const {
      includeImages = false,
      includeTechnicalSpecs = true,
      includeConstructionProcess = true,
      includePartners = true
    } = options;

    // Page 1: Header and Overview
    this.addHeader();
    
    // Solution title and description
    this.addTitle(product.name, 18);
    this.addText(`Category: ${product.category}`);
    this.currentY += 5;
    
    this.addSubtitle('Project Overview');
    this.addText(product.description);
    this.currentY += 5;

    // Technical specifications
    if (includeTechnicalSpecs && product.specifications) {
      this.addSpecificationTable(product.specifications);
    }

    // Performance metrics
    this.addPerformanceMetrics();
    this.addFooter();

    // Page 2: Construction Process
    if (includeConstructionProcess) {
      this.doc.addPage();
      this.currentY = 20;
      this.addConstructionProcess();
      this.addFooter();
    }

    // Page 3: European Partners
    if (includePartners) {
      this.doc.addPage();
      this.currentY = 20;
      this.addEuropeanPartners();
      
      // Technology innovation section
      this.addTitle('HDPE Container Technology Innovation', 14);
      this.addText('Revolutionary modular treatment systems built with High-Density Polyethylene containers for rapid deployment, excellent chemical resistance, and long-term durability.');
      
      const hdpeFeatures = [
        'Modular containerized design for flexible installation',
        'Chemical-resistant HDPE construction',
        'Rapid 3-6 month deployment timeline',
        'Scalable capacity expansion capabilities',
        'Weather-resistant operation in all climates',
        'Minimal site preparation requirements',
        '25+ year operational lifespan',
        '40% energy savings compared to traditional systems'
      ];

      hdpeFeatures.forEach(feature => {
        this.addBulletPoint(feature);
      });

      this.addFooter();
    }

    // Final page: Contact and next steps
    this.doc.addPage();
    this.currentY = 20;
    this.addContactSection();
    this.addFooter();

    // Generate filename and download
    const filename = `ECG_${product.name.replace(/\s+/g, '_')}_Specification.pdf`;
    this.doc.save(filename);
  }

  public generateCompanyProfile(): void {
    this.addHeader();
    
    this.addTitle('Company Profile', 18);
    this.addText('ECO CONSTRUCTION GROUP is a leading engineering and construction company specializing in water treatment facility design, construction, and modernization across Uzbekistan.');
    
    // Continue with company profile content...
    // This would include company history, certifications, project portfolio, etc.
    
    this.doc.save('ECG_Company_Profile.pdf');
  }
}

export const generateSolutionPDF = (product: Product, options?: PDFOptions) => {
  const generator = new ECGPDFGenerator();
  generator.generateSolutionPDF(product, options);
};

export const generateCompanyProfile = () => {
  const generator = new ECGPDFGenerator();
  generator.generateCompanyProfile();
};