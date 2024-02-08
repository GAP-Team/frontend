const TitleSection = ({
  badge,
  title,
  subtitle,
}: {
  badge?: any;
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="flex justify-center items-center text-center py-14 px-10">
      <div className="text-center">
        {badge ?? { badge }}
        <h1 className="text-4xl font-bold my-5">{title}</h1>
        <p className="text-lg font-normal max-w-4xl mx-auto">{subtitle}</p>
      </div>
    </div>
  );
};

export default TitleSection;
