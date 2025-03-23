import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSearch, FaBell, FaUser } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // Effect to handle scroll for navbar background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchActive(false);
    }
  };

  return (
    <NavbarContainer isScrolled={isScrolled}>
      <NavContent>
        <LeftSection>
          <Logo href="/">
            <LogoImage src="/netflix-logo.png" alt="Netflix" />
          </Logo>
          <NavMenu>
            <NavItem>
              <NavLink href="/" isActive={router.pathname === '/'}>
                Accueil
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/series" isActive={router.pathname === '/series'}>
                Séries
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/films" isActive={router.pathname === '/films'}>
                Films
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/new" isActive={router.pathname === '/new'}>
                Nouveautés
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/my-list" isActive={router.pathname === '/my-list'}>
                Ma liste
              </NavLink>
            </NavItem>
          </NavMenu>
        </LeftSection>
        <RightSection>
          <SearchContainer active={searchActive}>
            <SearchForm onSubmit={handleSearch}>
              <SearchButton 
                type="button" 
                onClick={() => setSearchActive(!searchActive)}
              >
                <FaSearch />
              </SearchButton>
              {searchActive && (
                <SearchInput
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Titres, personnes, genres"
                  autoFocus
                />
              )}
            </SearchForm>
          </SearchContainer>
          <NavIcon>
            <FaBell />
          </NavIcon>
          <ProfileContainer>
            <Avatar>
              <FaUser />
            </Avatar>
            <ProfileDropdown>
              <ProfileMenuItem>Profil</ProfileMenuItem>
              <ProfileMenuItem>Paramètres</ProfileMenuItem>
              <ProfileMenuItem>Déconnexion</ProfileMenuItem>
            </ProfileDropdown>
          </ProfileContainer>
        </RightSection>
      </NavContent>
    </NavbarContainer>
  );
};

// Styled components
const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  background: ${({ isScrolled, theme }) => 
    isScrolled 
      ? theme.colors.dark 
      : 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)'
  };
  transition: background-color ${({ theme }) => theme.transitions.default};
  z-index: 1000;
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(Link)`
  margin-right: ${({ theme }) => theme.spacing.lg};
`;

const LogoImage = styled.img`
  height: 25px;
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 35px;
  }
`;

const NavMenu = styled.ul`
  display: none;
  list-style: none;
  margin: 0;
  padding: 0;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`;

const NavItem = styled.li`
  margin-right: ${({ theme }) => theme.spacing.md};
`;

const NavLink = styled(Link)`
  color: ${({ isActive, theme }) => isActive ? theme.colors.light : theme.colors.lightGrey};
  text-decoration: none;
  font-size: 14px;
  font-weight: ${({ isActive }) => isActive ? 'bold' : 'normal'};
  transition: color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: ${({ theme }) => theme.colors.light};
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  position: relative;
  margin-right: ${({ theme }) => theme.spacing.md};
  width: ${({ active }) => active ? '240px' : 'auto'};
  transition: width ${({ theme }) => theme.transitions.default};
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
`;

const SearchButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.light};
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xs};
`;

const SearchInput = styled.input`
  background: ${({ theme }) => theme.colors.dark};
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  color: ${({ theme }) => theme.colors.light};
  padding: ${({ theme }) => theme.spacing.xs};
  margin-left: ${({ theme }) => theme.spacing.xs};
  width: 100%;
  outline: none;
`;

const NavIcon = styled.div`
  color: ${({ theme }) => theme.colors.light};
  margin-right: ${({ theme }) => theme.spacing.md};
  font-size: 18px;
  cursor: pointer;
`;

const ProfileContainer = styled.div`
  position: relative;
  
  &:hover {
    > div:last-child {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.dark};
`;

const ProfileDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 150px;
  background-color: rgba(0, 0, 0, 0.9);
  border: 1px solid ${({ theme }) => theme.colors.mediumGrey};
  margin-top: ${({ theme }) => theme.spacing.xs};
  opacity: 0;
  visibility: hidden;
  transition: opacity ${({ theme }) => theme.transitions.default}, 
              visibility ${({ theme }) => theme.transitions.default};
`;

const ProfileMenuItem = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.light};
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.mediumGrey};
  }
`;

export default Navbar;