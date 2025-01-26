import { StyledHeader, StyledHeaderMainText, StyledHeaderSubText } from './Header.styles';

const Header = () => {
  return (
    <StyledHeader>   
      <StyledHeaderMainText>JDictionarySearch</StyledHeaderMainText>
      <StyledHeaderSubText>English-Japanese/Japanese-English dictionary search aggregator</StyledHeaderSubText>
    </StyledHeader>
  );
};

export default Header;
