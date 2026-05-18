import ContactHero from '@/features/Contact/ContactHero';
import AvailabilityStatus from '@/features/Contact/AvailabilityStatus';
import ContactSection from '@/features/Contact/ContactSection';
import ContactFAQ from '@/features/Contact/ContactFAQ';

const ContactPage = () => {
  return (
    <div className="bg-black">
      <ContactHero />
      <AvailabilityStatus />
      <ContactSection />
      <ContactFAQ />
    </div>
  );
};

export default ContactPage;

