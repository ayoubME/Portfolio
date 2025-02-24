import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Link, Font } from '@react-pdf/renderer';
import personalData from '../data/personal.json';

// Register a standard font that's guaranteed to work
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica-Bold.ttf', fontWeight: 700 }
  ]
});

const styles = StyleSheet.create({
  page: { 
    padding: 40, 
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff' 
  },
  headerContainer: { 
    padding: 20, 
    backgroundColor: '#22c55e', 
    color: '#fff', 
    marginBottom: 20 
  },
  headerText: { 
    fontSize: 24,
    fontFamily: 'Helvetica',
    fontWeight: 700,
    marginBottom: 8
  },
  section: { 
    marginBottom: 20, 
    padding: 16, 
    borderBottom: '1px solid #eaeaea'
  },
  subHeader: { 
    fontSize: 18,
    fontFamily: 'Helvetica',
    fontWeight: 700,
    marginBottom: 12,
    color: '#22c55e'
  },
  text: { 
    fontSize: 11,
    lineHeight: 1.5,
    marginBottom: 6,
    color: '#333333'
  },
  bulletPoint: { 
    fontSize: 11,
    lineHeight: 1.6,
    marginBottom: 4,
    color: '#333333'
  },
  link: { 
    fontSize: 11,
    color: '#22c55e',
    textDecoration: 'none',
    marginTop: 2
  },
  projectContainer: { 
    marginBottom: 16,
    paddingBottom: 8
  },
  skillsContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    marginBottom: 12,
    gap: 8
  },
  skillTag: { 
    fontSize: 10,
    padding: '4 8',
    backgroundColor: '#22c55e', 
    color: '#ffffff', 
    marginRight: 4,
    marginBottom: 4
  },
  roleTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica',
    fontWeight: 700,
    color: '#333333',
    marginBottom: 4
  },
  contactInfo: {
    fontSize: 11,
    color: '#ffffff',
    marginBottom: 4
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8
  }
});

const CVDocument = ({ language }: { language: 'fr' | 'en' }) => {
  const data = {
    ...personalData.general,
    ...personalData[language]
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{data.name}</Text>
          <Text style={styles.contactInfo}>{data.role}</Text>
          <Text style={styles.contactInfo}>{data.location}</Text>
          <Text style={styles.contactInfo}>{data.email}</Text>
          <View style={styles.socialLinks}>
            <Link style={styles.link} src={`https://${data.github}`}>GitHub</Link>
            <Link style={styles.link} src={`https://${data.linkedin}`}>LinkedIn</Link>
          </View>
        </View>

        {/* Bio */}
        <View style={styles.section}>
          <Text style={styles.text}>{data.bio}</Text>
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>
            {language === 'fr' ? 'Compétences' : 'Skills'}
          </Text>
          {Object.entries(data.skills).map(([category, skills]) => (
            <View key={category}>
              <Text style={[styles.text, { color: '#22c55e', marginTop: 8 }]}>
                {category.charAt(0).toUpperCase() + category.slice(1)}:
              </Text>
              <View style={styles.skillsContainer}>
                {(skills as string[]).map((skill, index) => (
                  <Text key={index} style={styles.skillTag}>{skill}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>
            {language === 'fr' ? 'Expériences' : 'Experience'}
          </Text>
          {Object.values(data.experience.roles).map((role, index) => (
            <View key={index} style={{ marginBottom: 16 }}>
              <Text style={styles.roleTitle}>{role.title}</Text>
              <Text style={[styles.text, { color: '#666666' }]}>{role.period}</Text>
              <Text style={styles.text}>{role.description}</Text>
            </View>
          ))}
        </View>

        {/* Projects */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>
            {language === 'fr' ? 'Projets' : 'Projects'}
          </Text>
          {data.projects.map((project, index) => (
            <View key={index} style={styles.projectContainer}>
              <Text style={styles.roleTitle}>{project.title}</Text>
              <Text style={styles.text}>{project.description}</Text>
              <Text style={styles.text}>
                {language === 'fr' ? 'Technologies : ' : 'Technologies: '}
                {project.tech.join(', ')}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export const CVDownloadButton = ({ language }: { language: 'fr' | 'en' }) => (
  <PDFDownloadLink
    document={<CVDocument language={language} />}
    fileName={`CV_${personalData.general.name.replace(/\s+/g, '_')}_${language}.pdf`}
  >
    {({ loading, error }) => {
      if (error) {
        console.error('PDF generation error:', error);
        return language === 'fr' ? 'Erreur de génération' : 'Generation error';
      }
      return loading ? 
        (language === 'fr' ? 'Génération...' : 'Generating...') : 
        (language === 'fr' ? 'Télécharger CV' : 'Download CV');
    }}
  </PDFDownloadLink>
);