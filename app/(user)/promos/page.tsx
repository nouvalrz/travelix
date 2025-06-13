import { Suspense } from "react";

import PromoListWrapper from "@/components/user/promos/PromoListWrapper";
import PromosHeader from "@/components/user/promos/PromosHeader";
const PromosPage = () => {
  return (
    <>
      <section className="flex flex-col" id="jumbotron">
        <div className="h-[300px] w-full relative">
          <PromosHeader />
        </div>
      </section>
      <section className="px-4 py-12">
        <div className="mx-auto container">
          <Suspense fallback={<p>Loading...</p>}>
            <PromoListWrapper />
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default PromosPage;
