import Link from 'next/link';
import styled from 'styled-components';
import { extendClickableArea, truncateText } from '@styles/utils';
import ImagePlaceholder from '@components/ImagePlaceholder/ImagePlaceholder';
import EquilateralImage from '@components/EquilateralImage/EquilateralImage';

type CardProps = {
   title: string;
   image: string | undefined;
   roundedImage?: boolean;
   extras: any;
   url: string;
};

const Card = ({ title, image, roundedImage = false, extras, url }: CardProps) => {
   return (
      <StyledCard>
         <CardImageContainer rounded={roundedImage}>
            {image && image !== '' ? (
               <EquilateralImage src={image} width={200} height={200} alt="" />
            ) : (
               <ImagePlaceholder />
            )}
         </CardImageContainer>
         <CardTitle>
            <CardLink href={url}>{title}</CardLink>
         </CardTitle>
         <CardExtras>{extras}</CardExtras>
      </StyledCard>
   );
};

const StyledCard = styled.div`
   position: relative;
   padding: 16px 16px 30px;
   border-radius: 6px;
   background: #181818;
   transition: background-color 0.3s;

   &:hover {
      background: #282828;
   }
`;

const CardImageContainer = styled.div<{ rounded: boolean }>`
   margin-bottom: 22px;
   border-radius: ${(p) => (p.rounded ? '50%' : 0)};
   box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
   overflow: hidden;
`;

const CardTitle = styled.h3`
   font-size: 15px;
   font-weight: 700;
   ${truncateText}
`;

const CardLink = styled(Link)`
   ${extendClickableArea}
`;

const CardExtras = styled.div`
   margin-top: 10px;
   font-size: 14px;
   color: ${(p) => p.theme.colors.text.soft};

   > a {
      position: relative;
      z-index: 2;
   }

   > a:hover {
      text-decoration: underline;
   }
`;

export default Card;
