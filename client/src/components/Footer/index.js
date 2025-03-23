import styled from 'styled-components';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <SocialLinks>
          <SocialIcon href="#" aria-label="Facebook">
            <FaFacebookF />
          </SocialIcon>
          <SocialIcon href="#" aria-label="Instagram">
            <FaInstagram />
          </SocialIcon>
          <SocialIcon href="#" aria-label="Twitter">
            <FaTwitter />
          </SocialIcon>
          <SocialIcon href="#" aria-label="YouTube">
            <FaYoutube />
          </SocialIcon>
        </SocialLinks>
        
        <FooterLinks>
          <FooterLinkColumn>
            <FooterLink href="#">FAQ</FooterLink>
            <FooterLink href="#">Relations Investisseurs</FooterLink>
            <FooterLink href="#">Modes de lecture</FooterLink>
            <FooterLink href="#">Mentions légales</FooterLink>
          </FooterLinkColumn>
          
          <FooterLinkColumn>
            <FooterLink href="#">Centre d'aide</FooterLink>
            <FooterLink href="#">Recrutement</FooterLink>
            <FooterLink href="#">Conditions d'utilisation</FooterLink>
            <FooterLink href="#">Nous contacter</FooterLink>
          </FooterLinkColumn>
          
          <FooterLinkColumn>
            <FooterLink href="#">Compte</FooterLink>
            <FooterLink href="#">Cartes cadeaux</FooterLink>
            <FooterLink href="#">Confidentialité</FooterLink>
            <FooterLink href="#">Test de vitesse</FooterLink>
          </FooterLinkColumn>
          
          <FooterLinkColumn>
            <FooterLink href="#">Presse</FooterLink>
            <FooterLink href="#">Acheter des cartes cadeaux</FooterLink>
            <FooterLink href="#">Préférences de cookies</FooterLink>
            <FooterLink href="#">Informations légales</FooterLink>
          </FooterLinkColumn>
        </FooterLinks>
        
        <ServiceCode>Code de service</ServiceCode>
        
        <Copyright>
          © {new Date().getFullYear()} Netflix Clone - Projet éducatif
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.lightGrey};
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const FooterContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const SocialLinks = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SocialIcon = styled.a`
  color: ${({ theme }) => theme.colors.light};
  font-size: 20px;
  margin-right: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform ${({ theme }) => theme.transitions.fast}, 
              color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    transform: scale(1.2);
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FooterLinks = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FooterLinkColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.lightGrey};
  text-decoration: none;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: 14px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ServiceCode = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.lightGrey};
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: 13px;
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors.light};
    border-color: ${({ theme }) => theme.colors.light};
  }
`;

const Copyright = styled.div`
  font-size: 13px;
`;

export default Footer;