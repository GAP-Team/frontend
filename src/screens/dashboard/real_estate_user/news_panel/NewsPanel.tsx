import React from 'react'
import HeaderSection from '../HeaderSection';
import NewsList from './NewsList';
import { news } from '@/utils/Constants';
import ScrollableSection from '../ScrollableSection';

const NewsPanel = () => {
  return (
    <ScrollableSection>
      <HeaderSection titletext='NEUE NACHRICHTEN' count={3} overviewText='Alle anzeigen' />
      <NewsList news={news}/>
    </ScrollableSection>
  );
}

export default NewsPanel;