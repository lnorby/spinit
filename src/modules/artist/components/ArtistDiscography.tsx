import { useState } from 'react';
import useArtistAlbums from '@modules/album/hooks/useArtistAlbums';
import { AlbumType } from '@modules/album/types';
import AlbumList from '@modules/album/components/AlbumList';
import Tabs from '@components/Tabs/Tabs';
import Spacer from '@components/Spacer/Spacer';

type ArtistDiscographyProps = {
   artistId: string;
};

const tabs = [
   { label: 'Albumok', value: 'album' },
   { label: 'Kislemezek és EP-k', value: 'single' },
   { label: 'Válogatások', value: 'compilation' },
];

const ArtistDiscography = ({ artistId }: ArtistDiscographyProps) => {
   const [albumType, setAlbumType] = useState<AlbumType>('album');

   const query = useArtistAlbums(artistId, albumType, 20);

   return (
      <>
         <Tabs items={tabs} value={albumType} onChange={(value) => setAlbumType(value)} />
         <Spacer y={25} />
         {query.isLoading ? <p>Betöltés...</p> : null}
         {query.isError ? <p>Nem sikerült betölteni a tartalmat.</p> : null}
         {query.data ? <AlbumList albums={query.data} showArtists={false} /> : null}
         {!query.isLoading && !query.data?.[0] ? <p>Nincs ilyen album.</p> : null}
      </>
   );
};

export default ArtistDiscography;
