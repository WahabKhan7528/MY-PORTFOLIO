import ContactHero from '../components/ContactHero';
import AvailabilityStatus from '../components/AvailabilityStatus';
import Contact from '../components/Contact';
import ContactFAQ from '../components/ContactFAQ';

const ContactPage = () => {
  return (
    <div className="bg-black">
      <ContactHero />
      <AvailabilityStatus />
      <Contact />
      <ContactFAQ />
    </div>
  );
};

export default ContactPage;
