import {ReactElement, useState} from 'react';
import SearchInput from '@modules/search/components/SearchInput';
import Container from '@components/Container/Container';
import styled from 'styled-components';
import Heading from '@components/Heading/Heading';
import Spacer from '@components/Spacer/Spacer';
import Tabs from '@components/Tabs/Tabs';
import TrackSearch from '@modules/search/components/TrackSearch';
import AlbumSearch from '@modules/search/components/AlbumSearch';
import ArtistSearch from '@modules/search/components/ArtistSearch';
import {NextPageWithLayout} from '../_app';
import DefaultLayout from '@layouts/DefaultLayout/DefaultLayout';

const SearchPage: NextPageWithLayout = () => {
   const [searchQuery, setSearchQuery] = useState('');

   return (
      <StyledSearchPage>
         <Container>
            <SearchInput onChange={(value) => setSearchQuery(value)} />
            <Spacer y={20} />
            <Tabs
               items={[
                  {
                     label: 'Az összes',
                     content: (
                        <>
                           <SearchPageHeading as="h2" level={2}>
                              Dalok
                           </SearchPageHeading>
                           <TrackSearch searchQuery={searchQuery} limit={5} loadMore={false} />
                           <Spacer y={40} />
                           <SearchPageHeading as="h2" level={2}>
                              Albumok
                           </SearchPageHeading>
                           <AlbumSearch searchQuery={searchQuery} limit={9} loadMore={false} />
                           <Spacer y={40} />
                           <SearchPageHeading as="h2" level={2}>
                              Előadók
                           </SearchPageHeading>
                           <ArtistSearch searchQuery={searchQuery} limit={9} loadMore={false} />
                        </>
                     ),
                  },
                  {
                     label: 'Dalok',
                     content: <TrackSearch searchQuery={searchQuery} limit={30} loadMore={true} />,
                  },
                  {
                     label: 'Albumok',
                     content: <AlbumSearch searchQuery={searchQuery} limit={45} loadMore={true} />,
                  },
                  {
                     label: 'Előadók',
                     content: <ArtistSearch searchQuery={searchQuery} limit={45} loadMore={true} />,
                  },
               ]}
               hidden={searchQuery === ''}
            />
         </Container>
      </StyledSearchPage>
   );
};

SearchPage.getLayout = (page: ReactElement) => (
   <DefaultLayout title="Keresés">{page}</DefaultLayout>
);

const StyledSearchPage = styled.div`
   padding: 80px 0 40px;
`;

const SearchPageHeading = styled(Heading)`
   margin-bottom: 25px;
`;

export default SearchPage;
