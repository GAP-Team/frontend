
// FIXME: find the right name for this component and move where it belongs as it is not a label
const TitleSection = ({
  badge,
  title,
  subtitle,
}: {
  badge?: any;
  title: string;
  subtitle: string;
}): JSX.Element => {
  return (
    <div className="flex justify-center flex-col items-center text-center py-14 px-10">
      {badge ?? { badge }}
      <h1 className="text-4xl font-bold my-5">{title}</h1>
      <p className="text-lg font-normal max-w-4xl mx-auto">{subtitle}</p>
    </div>
  );
};

export default TitleSection;
