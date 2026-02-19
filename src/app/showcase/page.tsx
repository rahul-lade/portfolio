import { Suspense } from 'react';
import { PageClient } from './_components/PageClient';

const Page = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <PageClient />
    </Suspense>
  );
};

export default Page;
