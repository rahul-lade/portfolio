import { Suspense } from 'react';
import { PageClient } from './_components/PageClient';

const Page = () => {
  return (
    <Suspense>
      <PageClient />
    </Suspense>
  );
};

export default Page;
