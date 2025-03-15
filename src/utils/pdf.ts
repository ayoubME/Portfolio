import { StyleSheet } from '@react-pdf/renderer';

export const pdfStyles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    padding: 20,
    backgroundColor: '#22c55e',
    color: '#fff',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'Helvetica',
    fontWeight: 700,
    marginBottom: 8,
  },
  section: {
    marginBottom: 20,
    padding: 16,
    borderBottom: '1px solid #eaeaea',
  },
  subHeader: {
    fontSize: 18,
    fontFamily: 'Helvetica',
    fontWeight: 700,
    marginBottom: 12,
    color: '#22c55e',
  },
  text: {
    fontSize: 11,
    lineHeight: 1.5,
    marginBottom: 6,
    color: '#333333',
  },
  bulletPoint: {
    fontSize: 11,
    lineHeight: 1.6,
    marginBottom: 4,
    color: '#333333',
  },
  link: {
    fontSize: 11,
    color: '#22c55e',
    textDecoration: 'none',
    marginTop: 2,
  },
  projectContainer: {
    marginBottom: 16,
    paddingBottom: 8,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    gap: 8,
  },
  skillTag: {
    fontSize: 10,
    padding: '4 8',
    backgroundColor: '#22c55e',
    color: '#ffffff',
    marginRight: 4,
    marginBottom: 4,
  },
  roleTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica',
    fontWeight: 700,
    color: '#333333',
    marginBottom: 4,
  },
  contactInfo: {
    fontSize: 11,
    color: '#ffffff',
    marginBottom: 4,
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
});
