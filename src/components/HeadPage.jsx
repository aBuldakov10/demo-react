import React from 'react';
import Helmet from 'react-helmet';

const HeadPage = ({ headPageData }) => {
  const { title, description, keywords, bodyAttributes } = headPageData;

  return (
    <Helmet
      title={title}
      meta={[
        { name: 'description', content: description },
        { name: 'keywords', content: keywords },
      ]}
      bodyAttributes={bodyAttributes}
      htmlAttributes={{ lang: 'ru' }}
    />
  );
};

export default HeadPage;
