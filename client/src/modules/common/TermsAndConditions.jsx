import React from 'react';
import styled from 'styled-components';

const TermsAndConditions = () => {
  return (
    <Container>
      <Title>Terms and Conditions</Title>
      <EffectiveDate>Effective Date: October 7, 2024</EffectiveDate>

      <CardSection>
        <Card>
          <SectionTitle>Introduction</SectionTitle>
          <SectionContent>
            These Terms and Conditions govern your use of Medi-Connect’s platform. By accessing or using our services, you agree to be bound by these terms. Please read them carefully. Updates to these terms will be posted on this page, and the effective date will be modified accordingly.
          </SectionContent>
        </Card>

        <Card>
          <SectionTitle>User Obligations</SectionTitle>
          <SectionContent>
            As a user, you are responsible for providing accurate information and complying with all applicable laws. You agree not to engage in any activity that could harm the platform, including unauthorized use or violations of intellectual property.
          </SectionContent>
        </Card>

        <Card>
          <SectionTitle>Intellectual Property</SectionTitle>
          <SectionContent>
            All content on this website, including text, images, and logos, is owned by Medi-Connect. Users are prohibited from using or distributing our intellectual property without explicit permission.
          </SectionContent>
        </Card>

        <Card>
          <SectionTitle>Limitation of Liability</SectionTitle>
          <SectionContent>
            Medi-Connect is not liable for any damages or losses arising from the use of the platform. This includes issues related to third-party content or factors beyond our control.
          </SectionContent>
        </Card>

        <Card>
          <SectionTitle>Termination</SectionTitle>
          <SectionContent>
            Either party may terminate this agreement under certain conditions. If your access is terminated, you will no longer have rights to use the platform, and all obligations under the terms will cease.
          </SectionContent>
        </Card>

        <Card>
          <SectionTitle>Governing Law</SectionTitle>
          <SectionContent>
            These terms are governed by the laws of India. Any disputes related to these terms will be handled in the jurisdiction of the courts in India.
          </SectionContent>
        </Card>

        <Card>
          <SectionTitle>Changes to the Terms</SectionTitle>
          <SectionContent>
            Medi-Connect reserves the right to modify these terms at any time. You will be notified of changes via email or a notification on the website.
          </SectionContent>
        </Card>

        <Card>
          <SectionTitle>Contact Information</SectionTitle>
          <SectionContent>
            If you have any questions about these Terms and Conditions, please contact us at support@medi-connect.com.
          </SectionContent>
        </Card>
      </CardSection>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  padding: 3rem;  /* Increased padding for better spacing */
  max-width: 1200px;  /* Increased max-width for the container */
  margin: 0 auto;
  line-height: 1.6;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 80px;  /* Added margin-top to avoid collision with navbar */
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #c229b8;
  text-align: center;
  margin-bottom: 1rem;
`;

const EffectiveDate = styled.p`
  text-align: center;
  font-size: 1rem;
  color: #666;
  margin-bottom: 2rem;
`;

const CardSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));  /* Responsive grid layout */
  gap: 1.5rem;  /* Gap between cards */
`;

const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #c229b8;
  margin-bottom: 0.5rem;
`;

const SectionContent = styled.p`
  font-size: 1.125rem;
  color: #333;
`;

export default TermsAndConditions;