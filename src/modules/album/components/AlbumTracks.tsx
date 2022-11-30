import useAlbumTracks from '@modules/track/hooks/useAlbumTracks';
import TrackList from '@modules/track/components/TrackList';
import ScrollObserver from '@components/ScrollObserver/ScrollObserver';

type AlbumTracksProps = {
   albumId: string;
};

const AlbumTracks = ({ albumId }: AlbumTracksProps) => {
   const query = useAlbumTracks(albumId, 25);

   if (query.isLoading) {
      return null;
   }

   if (query.isError) {
      return <p>Nem sikerült betölteni a tartalmat.</p>;
   }

   const tracks = query.data?.pages.map((page) => page.tracks).flat() ?? [];

   return (
      <>
         <TrackList
            tracks={tracks}
            showAlbumImage={false}
            showArtists={true}
            showAlbumName={false}
         />
         {query.hasNextPage ? <ScrollObserver onTrigger={() => query.fetchNextPage()} /> : null}
      </>
   );
};

export default AlbumTracks;
