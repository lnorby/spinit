import {ReactNode} from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Artist from '@modules/artist/models/Artist';

type ArtistLinksProps = {
   artists: Artist[];
};

const ArtistLinks = ({ artists }: ArtistLinksProps) => {
   const links: ReactNode[] = artists.map((artist) => (
      <ArtistLink href={artist.url} key={artist.url}>
         {artist.name}
      </ArtistLink>
   ));

   return <>{links.reduce((prev, current) => [prev, ', ', current])}</>;
};

const ArtistLink = styled(Link)`
   &:hover {
      color: ${(p) => p.theme.colors.text.normal};
      text-decoration: underline;
   }
`;

export default ArtistLinks;
