import React from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';

// Team member data
const teamMembers = [
  {
    name: 'Luson Basumatary',
    role: 'Lead Developer || Founder',
    description:
      'As the Lead Developer, Luson Basumatary brings a wealth of experience and technical expertise to our platform. With a deep understanding of software development and a passion for innovation, He leads the development team in creating a robust, secure, and user-friendly platform.',
  },
  {
    name: 'Rohit Bansal',
    role: 'Frontend Developer',
    description:
      'As the Frontend Developer,Rohit Bansal  specializes in crafting intuitive and visually appealing user interfaces. He is dedicated to enhancing the user experience by translating complex requirements into simple, accessible designs.',
  },
  {
    name: 'Kalpesh Jain',
    role: 'UI/UX Designer',
    description:
      'kalpesh Jain is focused on making our platform user-friendly and engaging. With a background in user experience design and a passion for visual storytelling, He creates seamless interactions and visually appealing layouts.',
  },
  {
    name: 'Simranpreet Kaur',
    role: 'Graphic Designer',
    description:
      'As our Graphic Designer, Simranpreet Kaur brings a flair for creativity and a strong sense of visual aesthetics. She creates compelling graphics, icons, and visual elements that enhance our platform.',
  },
  {
    name: 'Kartik Kaushal',
    role: 'Healthcare Researcher',
    description:
      'Kartik Kaushal brings expertise in medical research and data analysis. He focuses on understanding the latest trends and needs in outpatient care to ensure our platform meets high standards.',
  },
  {
    name: 'Shubham',
    role: 'Technology Researcher',
    description:
      'Shubham explores emerging technologies and trends to enhance our platform’s functionality. He conducts in-depth research to identify innovative solutions and integrate cutting-edge features.',
  },
];

const AboutPage = () => {
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  const slideIn = useSpring({
    transform: 'translateX(0%)',
    from: { transform: 'translateX(-100%)' },
    config: { duration: 1000 },
  });

  return (
    <>
      <Container>
        <animated.div style={fadeIn}>
          
        <VisionSection>
            <VisionTitle>Our Vision</VisionTitle>
            <VisionText>
              At Medi-Connect, we envision a world where accessing outpatient
              care is as simple as a few clicks. By leveraging technology and
              innovation, we aim to provide a platform that bridges the gap
              between patients and healthcare providers, making high-quality
              care accessible to everyone, anywhere.
            </VisionText>
          </VisionSection>
          <Title>About Us</Title>
          <Subtitle>Meet the Team</Subtitle>
          <TeamGrid>
            {teamMembers.map((member, index) => (
              <animated.div key={index} style={slideIn}>
                <TeamCard>
                  <Role>{member.role}</Role>
                  <Name>{member.name}</Name>
                  <Description>{member.description}</Description>
                </TeamCard>
              </animated.div>
            ))}
          </TeamGrid>
          <GitTeamTitle>Our Amazing Open Source Contributors</GitTeamTitle>
          <div align="center">
            <a href="https://github.com/Luson045/medi-connect/graphs/contributors">
              <img alt="git team" src="https://contrib.rocks/image?repo=Luson045/medi-connect&&max=1000" />
            </a>
          </div>
          <JoinUsSection>
            <JoinUsTitle>Join Us on Our Journey</JoinUsTitle>
            <JoinUsText>
              We are excited about the future and the positive impact we can
              make on healthcare through our online OPD platform. If you have
              any questions or feedback, feel free to reach out to us. Together,
              we can create a better, more connected healthcare experience.
            </JoinUsText>
          </JoinUsSection>
        </animated.div>
      </Container>
    </>
  );
};

// Styled Components
const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 100px;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Title = styled.h2`
font-size: 2rem;
margin-bottom: 1rem;
color: #c229b8;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #666;
`;

const TeamGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
`;

const TeamCard = styled.div`
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  width: 300px;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const Role = styled.h3`
  font-size: 1.25rem;
  color: #c229b8;
`;

const Name = styled.h4`
  font-size: 1.125rem;
  color: #333;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666;
`;

const VisionSection = styled.section`
  margin: 3rem 0;
`;

const VisionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #c229b8;
`;

const VisionText = styled.p`
  font-size: 1.125rem;
  color: #333;
  line-height: 1.6;
`;

const JoinUsSection = styled.section`
  margin: 3rem 0;
`;

const JoinUsTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #c229b8;
`;

const JoinUsText = styled.p`
  font-size: 1.125rem;
  color: #333;
  line-height: 1.6;
`;

const GitTeamTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #c229b8;
`;
export default AboutPage;
