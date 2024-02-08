import React from "react";
import Badge from "../common/badge";
import TitleSection from "../common/title-section";

const BlogSection = () => {
  return (
    <section className="pb-20">
      <TitleSection
        title="Immer gut informiert"
        subtitle="Lorem ipsum dolor sit amet consectetur adipiscing elit. Eaque sed
          tenetur rem quam nihil dolorum expedita maxime nisi recusandae sequi
          magni culpa fuga accusamus eveniet fugiat ipsum ab consequuntur."
        badge={<Badge title="Unser Blog" color="#ffeecc" />}
      />
      <div className="container max-w-7xl ">
        <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 gap-7 px-14 ">
          <BlogCard
            title="Lorem ipsum dolor sit amet consectetur adipiscing elit."
            source="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          />
          <BlogCard
            title="Lorem ipsum dolor sit amet consectetur adipiscing elit."
            source="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          />
          <BlogCard
            title="Lorem ipsum dolor sit amet consectetur adipiscing elit."
            source="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          />
          <BlogCard
            title="Lorem ipsum dolor sit amet consectetur adipiscing elit."
            source="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          />
        </div>
      </div>
    </section>
  );
};

function BlogCard({ title, source }: { title: string; source: string }) {
  return (
    <>
      <div className="container overflow-hidden ">
        <figure>
          <img
            src={source}
            alt={`${title}`}
            className="lg:h-64 w-full max-w-full rounded-lg"
          />
        </figure>
        <div className="py-4">
          <a
            href="#"
            className="inline-block font-bold text-xl text-justify hover:underline mb-4"
          >
            {title}
          </a>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
        </div>
      </div>
    </>
  );
}

export default BlogSection;
