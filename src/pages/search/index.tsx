import { ReactElement, useState } from 'react';
import SearchInput from '@modules/search/components/SearchInput';
import Container from '@components/Container/Container';
import styled from 'styled-components';
import Heading from '@components/Heading/Heading';
import Spacer from '@components/Spacer/Spacer';
import Tabs from '@components/Tabs/Tabs';
import TrackSearch from '@modules/search/components/TrackSearch';
import AlbumSearch from '@modules/search/components/AlbumSearch';
import ArtistSearch from '@modules/search/components/ArtistSearch';
import { NextPageWithLayout } from '../_app';
import DefaultLayout from '@layouts/DefaultLayout/DefaultLayout';
import useDebounce from '@hooks/useDebounce';

const tabs = [
   { label: 'Az összes', value: 'all' },
   { label: 'Dalok', value: 'tracks' },
   { label: 'Albumok', value: 'albums' },
   { label: 'Előadók', value: 'artists' },
];

const SearchPage: NextPageWithLayout = () => {
   const [searchQuery, setSearchQuery] = useState('');
   const [activeTab, setActiveTab] = useState<'all' | 'tracks' | 'albums' | 'artists'>('all');
   const debouncedSearchQuery = useDebounce(searchQuery, 400);

   return (
      <StyledSearchPage>
         <Container>
            <SearchInput
               value={searchQuery}
               placeholder="Mit szeretnél hallgatni?"
               autoFocus
               onChange={(e) => setSearchQuery(e.target.value)}
            />
            {debouncedSearchQuery !== '' ? (
               <>
                  <Spacer y={20} />
                  <Tabs items={tabs} value={activeTab} onChange={(value) => setActiveTab(value)} />
                  <Spacer y={40} />
                  {activeTab === 'all' ? (
                     <SearchPageHeading as="h2" level={2}>
                        Dalok
                     </SearchPageHeading>
                  ) : null}
                  {activeTab === 'all' || activeTab === 'tracks' ? (
                     <TrackSearch
                        searchQuery={debouncedSearchQuery}
                        limit={activeTab === 'all' ? 5 : 25}
                     />
                  ) : null}
                  {activeTab === 'all' ? <Spacer y={40} /> : null}
                  {activeTab === 'all' ? (
                     <SearchPageHeading as="h2" level={2}>
                        Albumok
                     </SearchPageHeading>
                  ) : null}
                  {activeTab === 'all' || activeTab === 'albums' ? (
                     <AlbumSearch
                        searchQuery={debouncedSearchQuery}
                        limit={activeTab === 'all' ? 9 : 45}
                     />
                  ) : null}
                  {activeTab === 'all' ? <Spacer y={40} /> : null}
                  {activeTab === 'all' ? (
                     <SearchPageHeading as="h2" level={2}>
                        Előadók
                     </SearchPageHeading>
                  ) : null}
                  {activeTab === 'all' || activeTab === 'artists' ? (
                     <ArtistSearch
                        searchQuery={debouncedSearchQuery}
                        limit={activeTab === 'all' ? 9 : 45}
                     />
                  ) : null}
               </>
            ) : null}
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
