import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import { useRecoilValue } from 'recoil'; // Import Recoil
import { mode } from '../store/atom'; // Import the mode atom
import luson from '../assets/images/luson.jpg';

// Team member data
const teamMembers = [
  {
    id: 1,
    name: 'Luson Basumatary',
    role: 'Lead Developer || Founder',
    description:
      'Luson Basumatary brings a wealth of experience in software development and a passion for innovation. He leads the team in creating a robust and user-friendly platform.',
    imageUrl: luson,
    linkedin: 'https://www.linkedin.com/in/luson-basumatary-79a93b244/',
    github: 'https://github.com/Luson045',
    email: 'mailto:luson@example.com',
  },
  {
    id: 2,
    name: 'Rohit Bansal',
    role: 'Frontend Developer',
    description:
      'Rohit specializes in crafting intuitive user interfaces, translating complex requirements into accessible designs.',
    imageUrl: 'https://via.placeholder.com/150',
    linkedin: 'https://www.linkedin.com/in/luson-basumatary',
    github: 'https://github.com/luson045',
    email: 'mailto:luson@example.com',
  },
  {
    id: 3,
    name: 'Kalpesh Jain',
    role: 'UI/UX Designer',
    description:
      'Kalpesh is focused on making our platform user-friendly and engaging, ensuring seamless interactions.',
    imageUrl: 'https://via.placeholder.com/150',
    linkedin: 'https://www.linkedin.com/in/luson-basumatary',
    github: 'https://github.com/luson045',
    email: 'mailto:luson@example.com',
  },
  {
    id: 4,
    name: 'Simranpreet Kaur',
    role: 'Graphic Designer',
    description:
      'Simranpreet creates compelling graphics and visual elements that enhance the user experience.',
    imageUrl: 'https://via.placeholder.com/150',
    linkedin: 'https://www.linkedin.com/in/luson-basumatary',
    github: 'https://github.com/luson045',
    email: 'mailto:luson@example.com',
  },
  {
    id: 5,
    name: 'Kartik Kaushal',
    role: 'Healthcare Researcher',
    description:
      'Kartik ensures that our platform meets high standards by staying updated with the latest trends in healthcare.',
    imageUrl: 'https://via.placeholder.com/150',
    linkedin: 'https://www.linkedin.com/in/luson-basumatary',
    github: 'https://github.com/luson045',
    email: 'mailto:luson@example.com',
  },
  {
    id: 6,
    name: 'Shubham',
    role: 'Technology Researcher',
    description:
      'Shubham explores emerging technologies to integrate cutting-edge features into our platform.',
    imageUrl: 'https://via.placeholder.com/150',
    linkedin: 'https://www.linkedin.com/in/luson-basumatary',
    github: 'https://github.com/luson045',
    email: 'mailto:luson@example.com',
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
  const [viewed, setViewed] = useState({
    users: false,
    opd: false,
    accidents: false,
    hospitals: false,
  });
  const [expandedIds, setExpandedIds] = useState({});

  const charLimit = 100; // Adjust character limit as needed

  const toggleReadMore = (id) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getLimitedText = (text, limit) =>
    text.length > limit ? text.slice(0, limit) + '...' : text;

  const dark = useRecoilValue(mode); // Get dark mode value from Recoil
  return (
    <Container dark={dark}>
      <animated.div style={fadeIn}>
        {/* Two-box section for Vision and Mission */}
        <VisionMissionContainer>
          <Box dark={dark}>
            <VisionTitle dark={dark} className="font-semibold">
              Our Vision
            </VisionTitle>
            <VisionText dark={dark} className="font-sans ">
              At Med-Space, we envision a world where accessing outpatient care
              is as simple as a few clicks. By leveraging technology and
              innovation, we aim to provide a platform that bridges the gap
              between patients and healthcare providers, making high-quality
              care accessible to everyone, anywhere. We strive to ensure that
              every patient can connect with the right healthcare professionals
              at the right time, improving overall health outcomes globally.
            </VisionText>
          </Box>
          <Box dark={dark}>
            <MissionTitle dark={dark} className="font-semibold">
              Our Mission
            </MissionTitle>
            <MissionText dark={dark} className="font-sans">
              Our mission is to revolutionize outpatient care by creating a
              comprehensive, easy-to-use platform that empowers patients and
              healthcare providers alike. We are committed to building
              technology that simplifies healthcare processes, improves access,
              and enhances patient experience. With a focus on continuous
              innovation, we work to ensure that the Medi-Connect platform
              evolves to meet the changing needs of the healthcare industry.
            </MissionText>
          </Box>
        </VisionMissionContainer>

        <Title dark={dark}>Meet our awesome team</Title>
        <TeamGrid>
          {teamMembers.map((member, index) => (
            <animated.div key={index} style={slideIn}>
              <TeamCard dark={dark} className="flex flex-col items-center">
                <ProfileImage
                  src={member.imageUrl}
                  className="shadow-md"
                  alt={`${member.name}'s profile`}
                />
                <Name dark={dark}>{member.name}</Name>
                <Role dark={dark}>{member.role}</Role>

                {/* Social Media Icons */}
                {/* <SocialIcons className="my-3">
              <div className="border-2 rounded-full px-[10px] py-[4px] flex items-center border-gray-500">
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} size="x" />
                </a>
              </div>
              <div className="border-2 rounded-full px-[10px] py-[4px] flex items-center border-gray-500">
                <a href={member.github} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faGithub} size="x" />
                </a>
              </div>
              <div className="border-2 rounded-full px-[10px] py-[5px] flex items-center border-gray-500">
                <a href={`mailto:${member.email}`} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faEnvelope} size="x" />
                </a>
              </div>
            </SocialIcons> */}
                <SocialIcons className="my-3 flex gap-3">
                  <div
                    style={{
                      perspective: '1000px',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      background:
                        'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
                      animation: 'gradientShift 4s ease infinite',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform =
                        'rotateY(10deg) rotateX(10deg) scale(1.1)';
                      e.currentTarget.style.boxShadow =
                        '0px 8px 16px rgba(0, 0, 0, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform =
                        'rotateY(0deg) rotateX(0deg) scale(1)';
                      e.currentTarget.style.boxShadow =
                        '0px 4px 8px rgba(0, 0, 0, 0.2)';
                    }}
                    className="border-2 rounded-full px-[10px] py-[4px] flex items-center border-gray-500"
                  >
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faLinkedin}
                        size="x"
                        style={{
                          transition: 'transform 0.3s ease',
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.transform = 'scale(1.2)')
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.transform = 'scale(1)')
                        }
                      />
                    </a>
                  </div>

                  <div
                    style={{
                      perspective: '1000px',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      background:
                        'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
                      animation: 'gradientShift 4s ease infinite',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform =
                        'rotateY(10deg) rotateX(10deg) scale(1.1)';
                      e.currentTarget.style.boxShadow =
                        '0px 8px 16px rgba(0, 0, 0, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform =
                        'rotateY(0deg) rotateX(0deg) scale(1)';
                      e.currentTarget.style.boxShadow =
                        '0px 4px 8px rgba(0, 0, 0, 0.2)';
                    }}
                    className="border-2 rounded-full px-[10px] py-[4px] flex items-center border-gray-500"
                  >
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faGithub}
                        size="x"
                        style={{
                          transition: 'transform 0.3s ease',
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.transform = 'scale(1.2)')
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.transform = 'scale(1)')
                        }
                      />
                    </a>
                  </div>

                  <div
                    style={{
                      perspective: '1000px',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      background:
                        'linear-gradient(135deg, #ff7eb3 0%, #ff65a3 100%)',
                      animation: 'gradientShift 4s ease infinite',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform =
                        'rotateY(10deg) rotateX(10deg) scale(1.1)';
                      e.currentTarget.style.boxShadow =
                        '0px 8px 16px rgba(0, 0, 0, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform =
                        'rotateY(0deg) rotateX(0deg) scale(1)';
                      e.currentTarget.style.boxShadow =
                        '0px 4px 8px rgba(0, 0, 0, 0.2)';
                    }}
                    className="border-2 rounded-full px-[10px] py-[4px] flex items-center border-gray-500"
                  >
                    <a
                      href={`mailto:${member.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        size="x"
                        style={{
                          transition: 'transform 0.3s ease',
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.transform = 'scale(1.2)')
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.transform = 'scale(1)')
                        }
                      />
                    </a>
                  </div>
                </SocialIcons>

                <Description dark={dark}>
                  <div className="md:hidden">{member.description}</div>
                  <div className="hidden md:block">
                    {expandedIds[member.id]
                      ? member.description
                      : getLimitedText(member.description, charLimit)}

                    {member.description.length > charLimit && (
                      <span
                        onClick={() => toggleReadMore(member.id)}
                        className="text-blue-500 cursor-pointer ml-1 text-[12px]"
                      >
                        {expandedIds[member.id] ? 'Read Less' : 'Read More'}
                      </span>
                    )}
                  </div>
                </Description>
              </TeamCard>
            </animated.div>
          ))}
        </TeamGrid>
        <StatsSection>
          {/* First Stat */}
          <StatItem>
            <VisibilitySensor
              partialVisibility
              offset={{ bottom: 200 }}
              onChange={(isVisible) => {
                if (isVisible) {
                  setViewed((prev) => ({ ...prev, users: true }));
                }
              }}
            >
              {({ isVisible }) => (
                <StatNumber>
                  {viewed.users || isVisible ? (
                    <CountUp start={0} end={1234} duration={3} suffix="+" />
                  ) : (
                    1234
                  )}
                </StatNumber>
              )}
            </VisibilitySensor>
            Total Users
          </StatItem>

          {/* Second Stat */}
          <StatItem>
            <VisibilitySensor
              partialVisibility
              offset={{ bottom: 200 }}
              onChange={(isVisible) => {
                if (isVisible) {
                  setViewed((prev) => ({ ...prev, opd: true }));
                }
              }}
            >
              {({ isVisible }) => (
                <StatNumber>
                  {viewed.opd || isVisible ? (
                    <CountUp start={0} end={567} duration={3} suffix="+" />
                  ) : (
                    567
                  )}
                </StatNumber>
              )}
            </VisibilitySensor>
            Total OPD Registrations
          </StatItem>

          {/* Third Stat */}
          <StatItem>
            <VisibilitySensor
              partialVisibility
              offset={{ bottom: 200 }}
              onChange={(isVisible) => {
                if (isVisible) {
                  setViewed((prev) => ({ ...prev, accidents: true }));
                }
              }}
            >
              {({ isVisible }) => (
                <StatNumber>
                  {viewed.accidents || isVisible ? (
                    <CountUp start={0} end={234} duration={3} suffix="+" />
                  ) : (
                    234
                  )}
                </StatNumber>
              )}
            </VisibilitySensor>
            Total Accidents Reported
          </StatItem>

          {/* Fourth Stat */}
          <StatItem>
            <VisibilitySensor
              partialVisibility
              offset={{ bottom: 200 }}
              onChange={(isVisible) => {
                if (isVisible) {
                  setViewed((prev) => ({ ...prev, hospitals: true }));
                }
              }}
            >
              {({ isVisible }) => (
                <StatNumber>
                  {viewed.hospitals || isVisible ? (
                    <CountUp start={0} end={45} duration={3} suffix="+" />
                  ) : (
                    45
                  )}
                </StatNumber>
              )}
            </VisibilitySensor>
            Nearby Hospitals
          </StatItem>
        </StatsSection>
        <GitTeamTitle dark={dark}>
          Our Amazing Open Source Contributors
        </GitTeamTitle>
        <div style={{ textAlign: 'center' }}>
          <a href="https://github.com/Luson045/medi-connect/graphs/contributors">
            <img
              alt="git team"
              src="https://contrib.rocks/image?repo=Luson045/medi-connect&&max=1000"
            />
          </a>
        </div>

        <JoinUsSection dark={dark}>
          <JoinUsTitle dark={dark}>Join Us on Our Journey</JoinUsTitle>
          <JoinUsText dark={dark}>
            We are excited about the future and the positive impact we can make
            on healthcare through our online OPD platform. If you have any
            questions or feedback, feel free to reach out to us. Together, we
            can create a better, more connected healthcare experience.
          </JoinUsText>
        </JoinUsSection>
      </animated.div>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 100px;
  background-color: ${({ dark }) => (dark === 'dark' ? '#1a202c' : '#fff')};
  color: ${({ dark }) => (dark === 'dark' ? '#e2e8f0' : '#333')};
`;

// Two-box structure for Vision and Mission
const VisionMissionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 3rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Box = styled.div`
  flex: 1;
  padding: 2rem;
  background-color: ${({ dark }) => (dark === 'dark' ? '#2d3748' : '#f0f8ff')};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const VisionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${({ dark }) => (dark === 'dark' ? '#f6e05e' : '#c229b8')};
`;

const VisionText = styled.p`
  font-size: 1.125rem;
  color: ${({ dark }) => (dark === 'dark' ? '#e2e8f0' : '#161D6F')};
  line-height: 1.6;
`;

const MissionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${({ dark }) => (dark === 'dark' ? '#f6e05e' : '#c229b8')};
`;

const MissionText = styled.p`
  font-size: 1.125rem;
  color: ${({ dark }) => (dark === 'dark' ? '#e2e8f0' : '#333')};
  line-height: 1.6;
`;

// Team Grid
const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 1.75rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TeamCard = styled.div`
  background-color: ${({ dark }) => (dark === 'dark' ? '#2d3748' : '#F4F6FF')};
  color: ${({ dark }) => (dark === 'dark' ? '#e2e8f0' : '#333')};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 450px;
  text-align: center;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const ProfileImage = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  margin: 0 auto;
  display: block;
`;
const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;

  a {
    &:hover {
      color: ${({ dark }) =>
        dark === 'dark' ? 'white' : 'blue'}; /* Optional hover effect */
    }
  }
`;

const Name = styled.h4`
  font-size: 1.25rem;
  margin-bottom: 0.2rem;
  color: ${({ dark }) => (dark === 'dark' ? '#B7E0FF' : '#333')};
  font-weight: bold;
`;

const Role = styled.h5`
  font-size: 1rem;
  margin-bottom: 0.2rem;
  color: ${({ dark }) => (dark === 'dark' ? '#FFF4B5' : '#c229b8')};
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: ${({ dark }) => (dark === 'dark' ? 'white' : '#666')};
  line-height: 1.4;
`;

// Community Section
const GitTeamTitle = styled.h3`
  font-size: 2.5rem;
  color: ${({ dark }) => (dark === 'dark' ? '#f6e05e' : '#c229b8')};
  text-align: center;
  margin-top: 2rem;
`;

// Join Us Section
const JoinUsSection = styled.div`
  margin-top: 3rem;
  text-align: center;
  padding: 2rem;
  background-color: ${({ dark }) => (dark === 'dark' ? '#2d3748' : '#fff')};
  border-radius: 8px;
`;

const JoinUsTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${({ dark }) => (dark === 'dark' ? '#f6e05e' : '#c229b8')};
`;

const JoinUsText = styled.p`
  font-size: 1.125rem;
  color: ${({ dark }) => (dark === 'dark' ? '#e2e8f0' : '#666')};
`;

const Title = styled.h3`
  font-size: 2.5rem;
  color: ${({ dark }) => (dark === 'dark' ? '#f6e05e' : '#c229b8')};
  text-align: center;
  margin-bottom: 2rem;
  font-weight: bold;
`;

const StatsSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  padding: 3rem 0;
  background-color: #e8f4f8;
  width: 100%;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.2rem;
  color: #333;
  font-weight: bold;
  width: 45%;
  margin: 1rem;

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const StatNumber = styled.div`
  font-size: 2rem;
  color: #66b3ff;
  margin-bottom: 0.3rem;
`;

export default AboutPage;
