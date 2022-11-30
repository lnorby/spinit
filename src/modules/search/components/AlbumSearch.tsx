import useAlbums from '@modules/album/hooks/useAlbums';
import AlbumList from '@modules/album/components/AlbumList';
import ScrollObserver from '@components/ScrollObserver/ScrollObserver';

type AlbumSearchProps = {
   searchQuery: string;
   limit: number;
   loadMore: boolean;
};

const AlbumSearch = ({ searchQuery, limit, loadMore }: AlbumSearchProps) => {
   const query = useAlbums(searchQuery, limit);

   if (query.isLoading) {
      return null;
   }

   if (query.isError) {
      return <p>Nem sikerült betölteni a tartalmat.</p>;
   }

   const albums = query.data?.pages.map((page) => page.albums).flat() ?? [];

   if (!albums[0]) {
      return <p>Nincs találat.</p>;
   }

   return (
      <>
         <AlbumList albums={albums} showArtists={true} />
         {loadMore && query.hasNextPage ? (
            <ScrollObserver onTrigger={() => query.fetchNextPage()} />
         ) : null}
      </>
   );
};

export default AlbumSearch;
