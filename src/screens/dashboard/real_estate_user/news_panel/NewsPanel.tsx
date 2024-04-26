import React from 'react'
import HeaderSection from '../HeaderSection';
import NewsList from './NewsList';
import { news } from '@/utils/Constants';

const NewsPanel = () => {
  return (
    <>
      <HeaderSection titletext='NEUE NACHRICHTEN' count={3} overviewText='Alle anzeigen' />
      <NewsList news={news}/>
    </>
  );
}

export default NewsPanel;